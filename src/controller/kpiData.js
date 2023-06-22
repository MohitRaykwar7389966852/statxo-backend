require("dotenv").config();
const config = require("../databaseConfig/config");
const sql = require("mssql");

const getKpi = async function (req, res) {
    try {
        var poolConnection = await sql.connect(config);
        console.log("connected");
        let data=[];

        function formatCompactNumber(number) {
        // number=  Math.around(number);
        number = number+"";
        num = number.split(".");
        return Number(num[0]);
        //   if (number < 1000) {
        //     return number;
        //   } 
        // // else if (number >= 1000 && number < 1_000_000) {
        // //     return (number / 1000).toFixed(1);
        // //   }
        // //    else 
        //    else if (number >= 1_000_000 && number < 1_000_000_000) {
        //     return Math(number / 1_000_000).toFixed(1);
        //   }
        // //    else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
        // //     return (number / 1_000_000_000).toFixed(1);
        // //   } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
        // //     return (number / 1_000_000_000_000).toFixed(1);
        // //   }
        }

        //spend
        let sum1 = await poolConnection.request().query(`SELECT SUM(AmountEUR) 
        FROM [DevOps].[SpendData]`);
        var sup1 = await poolConnection.request().query(`SELECT DISTINCT Supplier_Key
        FROM [DevOps].[SpendData]`);

        // saving
        let sum2 = await poolConnection.request().query(`SELECT SUM(AmountEUR)
        FROM [DevOps].[SavingData]`);
        var sup2 = await poolConnection.request().query(`SELECT DISTINCT Supplier_Key
        FROM [DevOps].[SavingData]`);

        //action
        var resp = await poolConnection.request().query(`SELECT SUM(AmountEUR)
        FROM [DevOps].[ActionTracking_test]`);

        //help
        var help = await poolConnection.request().query(`SELECT Status
        FROM [DevOps].[Help_Desk_Table]`);

        help = help.recordsets[0];

        let pending=0;
        let rejected=0;
        let inprogress=0;
        for(let i=0; i<help.length; i++){
            if(help[i].Status == "Pending") pending++;
            else if(help[i].Status == "In Progress") inprogress++;
            else rejected++;
        }

        // chart spend
        var spendYear = await poolConnection.request().query(`SELECT DISTINCT Year
        FROM [DevOps].[SpendData] ORDER BY Year ASC`);
        spendYear = spendYear.recordsets[0];
        let spendYr=[];
        for(let i=0; i<spendYear.length; i++){
            spendYr.push(spendYear[i].Year);
        };
        console.log(spendYr);

        var spend = await poolConnection.request().query(`SELECT Year,SUM(AmountEUR)
        FROM [DevOps].[SpendData] GROUP BY Year ORDER BY Year ASC`);
        spend = spend.recordsets[0];

        let spend2 = await poolConnection.request().query(`SELECT Month_Name,Year,SUM(AmountEUR)
            FROM [DevOps].[SpendData] GROUP BY Month_Name,Year ORDER BY Year ASC`);
        
        spend2 = spend2.recordsets[0];

        //last status
        let lastspend = await poolConnection.request().query(`SELECT MAX(YearMonth)
            FROM [DevOps].[SpendData]`);

        let lastsaving = await poolConnection.request().query(`SELECT MAX(YearMonth)
            FROM [DevOps].[SavingData]`);

        let lastaction = await poolConnection.request().query(`SELECT MAX(YearMonth)
            FROM [DevOps].[ActionTracking_test]`);

        var spend = await poolConnection.request().query(`SELECT YearMonth,SUM(AmountEUR)
        FROM [DevOps].[SpendData] GROUP BY YearMonth ORDER BY YearMonth ASC`);

        spend = spend.recordsets[0];

        let ar=[];
        let m=["jan","feb","mar","april", "may", "jun", "jul", "aug", "sep", "oct", "nov", "ec"];

        for(let i=0; i<spend.length; i++){
          
                let str = spend[i]["YearMonth"];
                let year = str.slice(0,4);
                let month = str.slice(str.length-2);
                if(month.slice(0,1) == "0") month.slice(0,-1);
                let key = m[month-1];
                if(ar.length == 0 || ar[ar.length-1]["state"] !== year){
                    ar.push({
                        state:year
                    });
                    ar[ar.length-1][key] = formatCompactNumber(spend[i][""]);
                }
                else if(ar[ar.length-1]["state"] == year){
                    ar[ar.length-1][key] = formatCompactNumber(spend[i][""]);
                }
        }

        data.push({
            total:sum1.recordsets[0][0][""],
            supplier:sup1.recordsets[0].length
        },
        {
            total:sum2.recordsets[0][0][""],
            supplier:sup2.recordsets[0].length
        },
        {
        total:resp.recordsets[0][0][""]
        },
        {
            pending:pending,
            inprogress:inprogress,
            rejected:rejected
        },{
            year:spendYr,
            chart:spend,
            chart2:spend2
        },
        {
            lastspend:lastspend.recordsets[0][0][""],
            lastsaving:lastsaving.recordsets[0][0][""],
            lastaction:lastaction.recordsets[0][0][""]
        },
        {
            stacked:ar
        }
        );


        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({ result: data, message:"kpi fetched successfully" });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};




// const deleteFiles = async function (req, res) {
//     try {
//         var poolConnection = await sql.connect(config);
//         console.log("connected");
//         var fileData = await poolConnection.request().query(`DELETE
//         FROM [DevOps].[Table_FileMgr]`);
//         console.log(fileData);
//         poolConnection.close();
//         console.log("disconnected");
//         return res.status(200).send({ result: fileData , message:"files deleted successfully" });
//     } catch (e) {
//         res.status(500).send({ status: false, message: e.message });
//     }
// };

module.exports = {
    getKpi
};
