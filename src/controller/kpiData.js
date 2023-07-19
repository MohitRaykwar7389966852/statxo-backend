require("dotenv").config();
const config = require("../databaseConfig/config");
const sql = require("mssql");

const getKpi = async function (req, res) {
    try {
        let {email} = req.query;
        var poolConnection = await sql.connect(config);
        console.log("connected");
        let data=[];

        //spend
        let sp = await poolConnection.request().query(`SELECT SUM(AmountEUR),COUNT(DISTINCT CompanyName),COUNT(DISTINCT Supplier_Key),COUNT(CompanyName),COUNT(DISTINCT ReportingLevel4),MAX(YearMonth),MIN(YearMonth),COUNT(DISTINCT Entity_Country)
        FROM [DevOps].[SpendData]`);

        // saving
        let sv = await poolConnection.request().query(`SELECT SUM(CALC_AmountEUR_YTD_TY),COUNT(DISTINCT CompanyPrimaryCluster),SUM(CALC_PriceVariance_YTD),MAX(YearMonth),MIN(YearMonth),COUNT(DISTINCT Entity_RegionP)
        FROM [DevOps].[SavingData_2]`);

        // //action
        let ac = await poolConnection.request().query(`SELECT SUM(AmountEUR),COUNT(DISTINCT CompanyName),COUNT(DISTINCT VendorNameHarmonized),MAX(YearMonth),MIN(YearMonth),COUNT(DISTINCT ActionName),COUNT(DISTINCT Entity_Country),COUNT(case when Status = 'Pending' then 1 else null end)
        FROM [DevOps].[ActionTracking_test]`);

        let ac2 = await poolConnection.request().query(`SELECT SUM([AmountEUR(Pre)]),SUM([AmountEUR(Post)])
        FROM [DevOps].[ActionTracking_test_upd]`);
        ac2 = ac2.recordsets[0][0][""][1]-ac2.recordsets[0][0][""][0];

        //help
        var help = await poolConnection.request().query(`SELECT COUNT(Status),COUNT(case when Status = 'Pending' then 1 else null end),COUNT(case when Status = 'In Progress' then 1 else null end),COUNT(case when Status = 'Rejected' then 1 else null end),COUNT(case when Status = 'Successfull' then 1 else null end)
        FROM [DevOps].[Help_Desk_Table] WHERE Email = '${email}'`);
        
        var lasthelp = await poolConnection.request().query(`SELECT Date
        FROM [DevOps].[Help_Desk_Table] WHERE Email = '${email}'`);
        lasthelp = lasthelp.recordsets[0];
        let mn=0;
        let yr=0;
        for(let i=0; i<lasthelp.length; i++){
            let date = lasthelp[i].Date;
            date = date.split("/");
            let month = date[1];
            let year = date[2];
            if(yr<year){
                mn = month;
                yr = year;
            }
            else if(yr == year && month > mn){
                mn = month;
            }
        }
        let lhelp = yr+""+mn;

        data.push(
            {
                totalSpend:sp.recordsets[0][0][""][0],
                spendEntity:sp.recordsets[0][0][""][1],
                spendSupplier:sp.recordsets[0][0][""][2],
                spendTransaction:sp.recordsets[0][0][""][3],
                spendL4Category:sp.recordsets[0][0][""][4],
                spendTimeRange:[sp.recordsets[0][0][""][6],sp.recordsets[0][0][""][5]],
                spendCountry:sp.recordsets[0][0][""][7],
                totalSave:sv.recordsets[0][0][""][0],
                saveEntity:sv.recordsets[0][0][""][1],
                saveVariance1:sv.recordsets[0][0][""][2],
                saveTimeRange:[sv.recordsets[0][0][""][4],sv.recordsets[0][0][""][3]],
                saveRegion:sv.recordsets[0][0][""][5],
                totalAction:ac.recordsets[0][0][""][0],
                actionEntity:ac.recordsets[0][0][""][1],
                actionSupplier:ac.recordsets[0][0][""][2],
                actionTimeRange:[ac.recordsets[0][0][""][4],ac.recordsets[0][0][""][3]],
                actionNumber:ac.recordsets[0][0][""][5],
                actionCountry:ac.recordsets[0][0][""][6],
                actionUnderCons:ac.recordsets[0][0][""][7],
                actionSaving:ac2,
                helpTicket:help.recordsets[0][0][""][0],
                pending:help.recordsets[0][0][""][1],
                progress:help.recordsets[0][0][""][2],
                reject:help.recordsets[0][0][""][3],
                success:help.recordsets[0][0][""][4],
                helpTime:lhelp,
            }
        );

        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({ result: data, message:"kpi fetched successfully" });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const getChart = async function (req, res) {
    try {

        function formatCompactNumber(number) {
            number = number+"";
            num = number.split(".");
            return Number(num[0]);
            }

        var poolConnection = await sql.connect(config);
        console.log("connected");

        var spend = await poolConnection.request().query(`SELECT CompanyName,YearMonth,SUM(AmountEUR)
        FROM [DevOps].[SpendData] GROUP BY CompanyName,YearMonth ORDER BY CompanyName,YearMonth ASC`);
        spend = spend.recordsets[0];
        let ar=[];
        let m=["jan","feb","mar","april", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        for(let i=0; i<spend.length; i++){
              
                let str = spend[i]["YearMonth"];
                let year = str.slice(0,4);
                let month = str.slice(str.length-2);
                let companyKey = spend[i]["CompanyName"];
                if(month.slice(0,1) == "0") month.slice(0,-1);
                let key = m[month-1];
                

                if(ar.length == 0 || !ar[ar.length-1][companyKey]){
                    if(ar.length ==0) ar.push({});
                    ar[ar.length-1][companyKey] = [{
                        state:year,
                        [key]:formatCompactNumber(spend[i][""])
                    }];
                }
                else {
                        let arr = ar[ar.length-1][companyKey];

                        if(arr[arr.length-1]["state"] == year){
                            arr[arr.length-1][key] = formatCompactNumber(spend[i][""]);
                        }
                        else if (arr[arr.length-1]["state"] !== year){
                            arr.push({
                                state:year,
                                [key]:formatCompactNumber(spend[i][""])
                            });
                        }
                        
                        ar[ar.length-1][companyKey] = arr;
                }
            }
            console.log(ar);
        poolConnection.close();
        console.log("disconnected");
        return res.status(200).send({ result: ar, message:"chart fetched successfully" });
    } catch (e) {
        res.status(500).send({ status: false, message: e.message });
    }
};

const getActivity = async function (req, res) {
    try {
        let { email } = req.query;

        var poolConnection = await sql.connect(config);
        console.log("connected");

        let data = await poolConnection.request().query(`SELECT *
        FROM [DevOps].[Notification_Table] WHERE Email = '${email}'`);

        poolConnection.close();
        console.log("disconnected");
        return res.status(201).send({ status:true, result: data.recordsets[0] , message:"Activities fetched successfully" });

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
    getKpi,getChart,getActivity
};
