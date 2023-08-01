require("dotenv").config();
const config = require("../databaseConfig/config");
const sql = require("mssql");

const SpendData = async function (req, res) {
    try {
        const user = req.userDetails;
        const inClause = req.inClause;

        let spend;
        spend = await sql.connect(config)
        .then(pool => {
            console.log("connected");
            return pool.request().query(`SELECT * FROM [DevOps].[SpendData] ${inClause}`);
        });
        return res.status(200).send({ result:spend.recordset, message:"spend data fetched successfully" });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const SavingData = async function (req, res) {
    try {
        const inClause = req.inClause;

        let save = await sql.connect(config)
        .then(pool => {
            console.log("connected");
            return pool.request().query(`SELECT * FROM [DevOps].[SavingData_2] ${inClause}`);
        });
        return res.status(200).send({ result:save.recordset, message:"saving data fetched successfully" });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

module.exports = {
SpendData,SavingData
};
