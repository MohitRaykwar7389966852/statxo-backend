require("dotenv").config();
const config = require("../databaseConfig/config");
const sql = require("mssql");
const nodemailer = require("nodemailer");
const stream = require("stream");
const { google } = require("googleapis");
const path = require("path");
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

        let { title, comment, date, priority, section } = body;

        let fileUrl = "";
        if (files.length !== 0) {
            let uploaded = await uploadFile(files[0]);
            fileUrl = "https://drive.google.com/open?id=" + uploaded.id;
            fileUrl = fileUrl.toString();
        }

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

module.exports = { helpDesk };
