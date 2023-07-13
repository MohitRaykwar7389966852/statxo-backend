require("dotenv").config();
const config = require("../databaseConfig/config");
const sql = require("mssql");

const SpendData = async function (req, res) {
    try {

        let spend;

        spend = await sql.connect(config)
        .then(pool => {
            console.log("connected");
            return pool.request().query(`SELECT TOP(100) * FROM [DevOps].[SpendData]`);
        });
        return res.status(200).send({ result:spend.recordset, message:"spend data fetched successfully" });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const SavingData = async function (req, res) {
    try {
        let save = await sql.connect(config)
        .then(pool => {
            console.log("connected");
            return pool.request().query(`SELECT * FROM [DevOps].[SavingData_2]`);
        });
        return res.status(200).send({ result:save.recordset, message:"saving data fetched successfully" });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

module.exports = {
SpendData,SavingData
};
