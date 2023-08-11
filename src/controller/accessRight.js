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
        

        var data = await poolConnection.request().query(`SELECT DISTINCT([${columnName}]) AS title
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
        console.log(mail);
        const table = req.query.table;
        let email = JSON.parse(mail);
        var poolConnection = await sql.connect(config);
        console.log("connected");

        // email clause
        const values = email.map((value) => `'${value}'`).join(', ');
        let Clause =  `WHERE Email IN (${values})`;
        console.log(Clause);

        var data1 = await poolConnection.request().query(`SELECT *
        FROM [DevOps].[ExcessRights] ${Clause}`);
        data1 = data1.recordset;

        let arr = [];
        data1.map(x=>{
            let obj = x.Access;
            obj = JSON.parse(obj);
            obj[table] = query;
            arr.push([x.Email,obj]);
        });

        console.log(arr);

        for(let i=0; i<arr.length; i++){
            let accessEmail = arr[i][0];
            let access = arr[i][1];
            access = JSON.stringify(access);
            console.log(access);
            console.log(accessEmail);
            await poolConnection
            .request()
            .query(
                `UPDATE DevOps.ExcessRights SET  Access = '${access}' WHERE Email = '${accessEmail}'`
            ); 
        };


        //  await poolConnection
        //     .request()
        //     .query(
        //         `UPDATE DevOps.ExcessRights SET  Access = '{}' ${Clause}`
        //     );
        
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

const accessClient = async function (req, res) {
    try {
        const table = req.query.table;
        var poolConnection = await sql.connect(config);
        console.log("connected");

        var data = await poolConnection.request().query(`SELECT *
        FROM [DevOps].[ExcessRights]`);
        data = data.recordset;
        let arr=[];
        data.map(x=>{
        if(x.Access !== "" || x.Access !== undefined || x.Access !== null){
            let access = x.Access;
            if(access == "All") return;
            access = JSON.parse(access);
            console.log(access);
            let rights = access[table];
            if(rights){
                arr.push({
                    Email:x.Email,
                    Query:rights
                });
                console.log(arr);
            }
        }        
        });
        console.log(arr);
        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({status:true,result:arr, message:"Access Data successfully" }); 
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

module.exports = {
    brandList,clientList,tableList,tableColumn,columnValue,addRight,accessClient
};
