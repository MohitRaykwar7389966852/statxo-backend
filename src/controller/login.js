require("dotenv").config();
const config = require("../databaseConfig/config");
const sql = require("mssql");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const signup = async function (req, res) {
    try {
       ; const { body } = req;
        console.log(body);
        const {name,email,pass} = body
        let hashPass = bcrypt.hashSync(pass, saltRounds);
        console.log(hashPass);

        var poolConnection = await sql.connect(config);
        console.log("connected");
        // var maxid = await poolConnection.request().query(`SELECT max(Id)
        // FROM [DevOps].[Login_Details]`);
        // console.log(maxid);
        // let nextid = Number(maxid.recordset[0][""]) + 1;
        // console.log(nextid);

        var inserted = await poolConnection.request()
            .query(`INSERT INTO DevOps.Login_Table 
        (Name,Email,Pass)
        VALUES('${name}','${email}','${hashPass}')
        `);
        console.log(inserted);

        poolConnection.close();
        console.log("disconnected");
        
        return res.status(201).send({ status:true, result: inserted , message:"user registered successfully" });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};


const signin = async function (req, res) {
    try {
        console.log("--Login--");
        const { query } = req;
        console.log(query);
        const {email,pass} = query
        var poolConnection = await sql.connect(config);
        console.log("connected");
        var loginCheck = await poolConnection.request().query(`SELECT *
        FROM [DevOps].[Login_Table] WHERE Email = '${email}'`);
        let loginArray = loginCheck.recordset;
        if(loginArray.length === 0) return res.status(400).send({status:false, message:"Email not matched" });
        let checkPass = bcrypt.compareSync(pass,loginArray[0].Pass);
        if(checkPass === false) return res.status(400).send({ status:false, message:"Password not matched" });
        // let token = jwt.sign(
        //     {
        //       email: loginArray[0].Email,
        //       iat: Math.floor(Date.now() / 1000),
        //       exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
        //     },
        //     "statxo"
        //   );
        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({status:true,result:loginArray[0], message:"Login successfully" });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const deleteUser = async function (req, res) {
    try {
        console.log("--delete user--");
        
        var poolConnection = await sql.connect(config);
        console.log("connected");
        var fileData = await poolConnection.request().query(`DELETE
        FROM [DevOps].[Login_Table]`);
        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({status:true,result:fileData, message:"All user deleted successfully" });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

module.exports = {
    signup,signin,deleteUser
};
