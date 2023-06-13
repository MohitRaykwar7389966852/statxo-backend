require("dotenv").config();
const config = require("../databaseConfig/config");
const sql = require("mssql");


const notification = async function (req, res) {
    try {
        let { body } = req;
        console.log(body);
        let { email,message,status } = body;

        var poolConnection = await sql.connect(config);
        console.log("connected");

        let noteCheck = await poolConnection.request().query(`SELECT *
        FROM [DevOps].[Notification_Table] WHERE Email = '${email}'`);
        let note = noteCheck.recordset;
        let time = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
        });
        let result;
        if(note.length === 0 ){
            let msg = [{id:1,message:message,timestamp:time,status:status}];
            msg = JSON.stringify(msg);
            result = await poolConnection.request()
            .query(`INSERT INTO DevOps.Notification_Table 
            (Email,Message)
            VALUES('${email}','${msg}')
            `);
        }
        else{
            let noteArray = JSON.parse(note[0].Message);
            let genId = noteArray.length+1;
            noteArray.push({id:genId,message:message,timestamp:time,status:status});

            msg = JSON.stringify(noteArray);
            console.log(msg);
            result = await poolConnection
                .request()
                .query(
                    `UPDATE DevOps.Notification_Table SET Message ='${msg}' WHERE Email = '${email}'`
                );
        }
        console.log(result.recordset);
        return res.status(201).send({ status:true, result: result , message:"Notification saved successfully" });

    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const getNotification = async function (req, res) {
    try {
        let { query } = req;
        let { email } = query;

        var poolConnection = await sql.connect(config);
        console.log("connected");

        let data = await poolConnection.request().query(`SELECT *
        FROM [DevOps].[Notification_Table] WHERE Email = '${email}'`);
        console.log(data);
        console.log(data.recordset);
        return res.status(201).send({ status:true, result: data.recordset , message:"Notification fetched successfully" });

    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const delNotification = async function (req, res) {
    try {
        let { query } = req;
        let { email } = query;

        var poolConnection = await sql.connect(config);
        console.log("connected");

        let data = await poolConnection.request().query(`DELETE
        FROM [DevOps].[Notification_Table] WHERE Email = '${email}'`);
        return res.status(201).send({ status:true, result: data.recordset , message:"Notification removed successfully" });

    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};


module.exports = { notification,getNotification,delNotification };
