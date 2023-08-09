require("dotenv").config();
const config = require("../databaseConfig/config");
const sql = require("mssql");
const jwt = require('jsonwebtoken');

const brandList = async function (req, res) {
    try {
        const user = req.userDetails;
        var poolConnection = await sql.connect(config);
        console.log("connected");

        var data = await poolConnection.request().query(`SELECT DISTINCT(Company)
        FROM DevOps.ExcessRights`);
        data=data.recordset;
        
        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({status:true,result:data, message:"Brand List Fetched successfully" });
        
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const clientList = async function (req, res) {
    try {
        // const user = req.userDetails;
        const brand = req.query.brand;
        var poolConnection = await sql.connect(config);
        console.log("connected");

        var data = await poolConnection.request().query(`SELECT Email AS title
        FROM DevOps.ExcessRights WHERE Company = '${brand}'`);
        data=data.recordset;
        
        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({status:true,result:data, message:"Access Data successfully" });
        
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const tableList = async function (req, res) {
    try {
        const user = req.userDetails;
        var poolConnection = await sql.connect(config);
        console.log("connected");

        var data = await poolConnection.request().query(`SELECT table_name
        FROM INFORMATION_SCHEMA.TABLES
        WHERE table_type = 'BASE TABLE'
        AND table_schema = 'DevOps'`);
        data=data.recordset;
        
        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({status:true,result:data, message:"Access Data successfully" });
        
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const tableColumn = async function (req, res) {
    try {
        const tableName = req.query.tableName;
        var poolConnection = await sql.connect(config);
        console.log("connected");

        var data = await poolConnection.request().query(`SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = '${tableName}'`);
        data=data.recordset;
        
        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({status:true,result:data, message:"Access Data successfully" });
        
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const columnValue = async function (req, res) {
    try {
        const columnName = req.query.columnName;
        const tableName = req.query.tableName;
        const condition = req.query.condition;
        
        let arr = condition.split('"');
        let str = arr.join("'");
        var poolConnection = await sql.connect(config);
        console.log("connected");

        console.log(str);
        

        var data = await poolConnection.request().query(`SELECT DISTINCT(${columnName}) AS title
        FROM DevOps.${tableName} ${str}`);
        data=data.recordset;

        console.log(data);
        
        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({status:true,result:data, message:"Access Data successfully" });
        
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const addRight = async function (req, res) {
    try {
        const query = req.query.query;
        const mail = req.query.email;
        let email = JSON.parse(mail);
        var poolConnection = await sql.connect(config);
        console.log("connected");

        console.log(email);

        // const values = email.map((value) => `'${value}'`).join(', ');
        // let Clause =  `WHERE Email IN (${values})`;

        // console.log(Clause);

        for(let i =0; i<email.length; i++){
         await poolConnection
            .request()
            .query(
                `UPDATE DevOps.ExcessRights SET  Access = '${query}' WHERE Email = 'mohit.raykwar@statxo.com'`
            );
        }

        var data = await poolConnection.request().query(`SELECT *
        FROM [DevOps].[ExcessRights]`);

        console.log(data);
        
        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({status:true,result:data, message:"Access Data successfully" });
        
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

module.exports = {
    brandList,clientList,tableList,tableColumn,columnValue,addRight
};
