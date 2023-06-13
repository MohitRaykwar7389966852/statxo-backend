require("dotenv").config();
const config = require("../databaseConfig/config");
const sql = require("mssql");

const validationData = async function (req, res) {
    try {
        var poolConnection = await sql.connect(config);
        console.log("connected");
        var data = await poolConnection.request().query(`SELECT *
        FROM [DevOps].[ValidationTable]`);
        poolConnection.close();
        console.log("disconnected");
        console.log(data.recordsets);
        return res.status(200).send({ result: data.recordsets });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

module.exports = {
    validationData,
};
