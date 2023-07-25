require("dotenv").config();
const config = require("../databaseConfig/config");
const sql = require("mssql");
const nodemailer = require("nodemailer");
const stream = require("stream");
const { google } = require("googleapis");
const path = require("path");
const { admin } = require("googleapis/build/src/apis/admin");
// const axios = require("axios");

const KEYFILEPATH = path.join("credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const uploadFile = async (fileObject) => {
    console.log("uploading started...");
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    console.log("buffer completed");
    const { data } = await google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: [process.env.FOLDER],
        },
        fields: "id,name",
    });
    console.log(`Uploaded file ${data.name} ${data.id} ${data}`);
    return data;
};

var transport = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secureConnection:false,
    requireTLS: true,
    tls: { ciphers: "SSLv3" },
    auth: {
        user: process.env.STATXO_MAIL,
        pass: process.env.STATXO_MAIL_PASS,
    },
});

const helpDesk = async function (req, res) {
    try {
        let { body, files } = req;
        console.log(body, files);
        const user = req.userDetails;

        let { title, comment, date, priority, section } = body;

        let fileUrl = "";
        if (files.length !== 0) {
            let uploaded = await uploadFile(files[0]);
            fileUrl = "https://drive.google.com/open?id=" + uploaded.id;
            fileUrl = fileUrl.toString();
        }
        console.log(user.Email,title,section,priority,comment,date,fileUrl);
        var poolConnection = await sql.connect(config);
        console.log("connected");

        let inserted = await poolConnection.request()
            .query(`INSERT INTO DevOps.Help_Desk_Table 
        (Email,Title,Comment,Priority,Section,Date,Attachment,Status,Admin_Comment)
        VALUES('${user.Email}','${title}','${comment}','${priority}','${section}','${date}','${fileUrl}','Pending','')
        `);

        var maxid = await poolConnection.request().query(`SELECT max(Id)
        FROM [DevOps].[Help_Desk_Table]`);
        let id = maxid.recordset[0][""];
        console.log(id);
        poolConnection.close();
        console.log("disconnected");
        let siteView = `http://localhost:3000/help-response/${id}`;
        const mailOptions = {
            from: process.env.STATXO_MAIL,
            to: process.env.ADMIN_MAIL,
            subject: "Help Desk Query",
            html: `<html>
                <head>
                    <style type="text/css">
                        div a{
                            text-decoration: none;
                            color: white;
                            border: none;
                            padding: 8px;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body style="font-family: open sans;">
                <h3 class="text-primary">Hello Admin</h3>
                <p style="color:#757575">User Send A Help Request</p>
                <div>
                    <a style="background:#4FC3F7; margin-right:4px;" href=${siteView}>Site View</a>
                </div>
                <div style="font-size:13px;">
                <p>Title : ${title}</p>
                <p>Comment : ${comment}</p>
                <p>Date : ${date}</p>
                <p>Priority : ${priority}</p>
                <p>Section : ${section}</p>
                <p>Attachment : <a style="background: #5c6bc0;" href=${fileUrl}>Attachment</a></p>
                </div>
                <h1 style="color:#C2185B; margin-bottom:0px;">STATXO</h1>
                <p style="color:#C2185B; font-size:10px;  margin-bottom:10px;">Powering Smarter Decisions</p>
                <p style="color:#757575; font-size:14px;">Website :- <a style="color:blue; text-decoration:underline;" href="https://www.statxo.com/">www.statxo.com</a></p>
                <p style="color:#757575; font-size:14px;">Number :- XXXXXXXXXX</p>
                <p style="color:#C2185B; font-size:13px;  margin-bottom:10px;">New Delhi | Bengaluru | Romania | US</p>
                <p style="font-size:11px;">Disclaimer Statement</p>
                <p style="font-size:13px;">This message may also contain any attachments if included will contain purely confidential information intended for a specific individual 
                and purpose, and is protected by law. If you are not the intended recipient of this message, you are requested to delete this message and are hereby notified that any disclosure,
                 copying, or distribution of this message, or the taking of any action based on it, is strictly prohibited.</p>
                `,
        };

        transport.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                return res.status(400).send({ status:false,message: err.message });
            } else {
                console.log(info);
                return res.status(200).send({ status:true,message: "Request sent successfully" });
            }
        });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const getQuery = async function (req, res) {
    try {
        const user = req.userDetails;
        var poolConnection = await sql.connect(config);
        console.log("connected");

        let data = await poolConnection.request().query(`SELECT *
        FROM [DevOps].[Help_Desk_Table] WHERE Email = '${user.Email}'`);
        console.log(data.recordsets);
        return res.status(200).send({ status:true, result: data.recordsets , message:"Help queries fetched successfully" });

    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const getQueryById = async function (req, res) {
    try {
        let { params } = req;
        let { Id } = params;

        var poolConnection = await sql.connect(config);
        console.log("connected");

        let data = await poolConnection.request().query(`SELECT *
        FROM [DevOps].[Help_Desk_Table] WHERE Id = ${Id}`);
        console.log(data.recordsets);
        return res.status(200).send({ status:true, result: data.recordsets , message:"Help queries fetched successfully" });

    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const helpResponse = async function (req, res) {
    try {
        let Id = req.params.Id;
        let status = req.query.Status;
        let adminComment = req.query.adminComment;
        console.log(adminComment);
        // if (adminComment === undefined) adminComment = "";
        // let date = new Date().toLocaleString("en-US", {
        //     timeZone: "Asia/Kolkata",
        // // });
        // console.log(Status,date,Id);
        var poolConnection = await sql.connect(config);
        console.log("connected");
        var st = await poolConnection.request().query(`SELECT Status
        FROM [DevOps].[Help_Desk_Table] WHERE Id = ${Id}`);
        let lastStatus = st.recordset[0].Status;
        if (lastStatus == "Pending") {
            let updated = await poolConnection
                .request()
                .query(
                    `UPDATE DevOps.Help_Desk_Table SET Admin_Comment ='${adminComment}', Status =${status} WHERE Id = ${Id}`
                );
            let queryData = await poolConnection
                .request()
                .query(
                    `SELECT * FROM DevOps.Help_Desk_Table WHERE Id = ${Id}`
                );
            let qData = queryData.recordsets[0][0];

            let {
                Title,
                Comment,
                Section,
                Priority,
                Date,
                Status,
                Attachment,
                Admin_Comment,
                Email
            } = qData;

            console.log(qData);

            let userMail = Email;
            const mailOptions = {
                from: process.env.STATXO_MAIL,
                to: userMail,
                subject: "Help Desk Response",
                html: `<html>
                <head>
                    <style type="text/css">
                        div a{
                            text-decoration: none;
                            color: white;
                            border: none;
                            padding: 8px;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body style="font-family: open sans;">
                <h3 class="text-primary">Hello Admin</h3>
                <p style="color:#757575">Help Request with data mentioned below is ${Status}</p>
                <div style="font-size:13px;">
                <p>Title : ${Title}</p>
                <p>Section : ${Section}</p>
                <p>Priority : ${Priority}</p>
                <p>Date : ${Date}</p>
                <p>Status : ${Status}</p>
                <p>Comment : ${Comment}</p>
                <p>Attachment : <a style="background: #5c6bc0;" href=${Attachment}>Attachment</a></p>
                <p>Admin Response : ${Admin_Comment}</p>
                </div>
                <h1 style="color:#C2185B; margin-bottom:0px;">STATXO</h1>
                <p style="color:#C2185B; font-size:10px;  margin-bottom:10px;">Powering Smarter Decisions</p>
                <p style="color:#757575; font-size:14px;">Website :- <a style="color:blue; text-decoration:underline;" href="https://www.statxo.com/">www.statxo.com</a></p>
                <p style="color:#757575; font-size:14px;">Number :- XXXXXXXXXX</p>
                <p style="color:#C2185B; font-size:13px;  margin-bottom:10px;">New Delhi | Bengaluru | Romania | US</p>
                <p style="font-size:11px;">Disclaimer Statement</p>
                <p style="font-size:13px;">This message may also contain any attachments if included will contain purely confidential information intended for a specific individual 
                and purpose, and is protected by law. If you are not the intended recipient of this message, you are requested to delete this message and are hereby notified that any disclosure,
                 copying, or distribution of this message, or the taking of any action based on it, is strictly prohibited.</p>
                `,
            };

            transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    return res.status(400).send({ status:false,message: err.message });
                } else {
                    console.log(info);
                }
            });
            res.status(200).send({
                    message: "help query status updated successfully",
                    result: updated,
                });
        } else if (lastStatus == "In Progress") {
            res.status(200).send({
                message: "Help query is already in progress",
            });
        } else if (lastStatus == "Rejected"){
            res.status(200).send({
                message: "Help query is already rejected",
            });
        }
        poolConnection.close();
        console.log("disconnected");

        return;
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

module.exports = { helpDesk,getQuery,getQueryById,helpResponse };
