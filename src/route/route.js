const express = require("express");
const router = express.Router();
const {
	actionTracker,
	actionUpdate,
	actionTree,
	actionTreeById,
	actionAdd,
	actionApproval,
	createActionTable,
} = require("../controller/actionTracker");
const { helpDesk,getQuery,getQueryById,helpResponse } = require("../controller/helpDesk");
const { fileManager,getFiles,deleteFiles,updateFiles } = require("../controller/fileManager");
const { signup,signin,deleteUser,resetPass,verifyPass } = require("../controller/login");
const { notification,getNotification,delNotification } = require("../controller/notification");
const { categoryTree,addCategory,categoryTreeById, categoryApproval } = require("../controller/categoryTree");
const { validationData, validationShortTable } = require("../controller/validationData");
const { getKpi,getChart,getActivity } = require("../controller/kpiData");

//statxo
//action tracker
router.get("/actiontracker", actionTracker);
router.get("/createActionTable", createActionTable);
router.put("/actionUpdate/:actionId", actionUpdate);

//action tree
router.get("/actiontree", actionTree);
router.get("/actiontreeById/:actionId", actionTreeById);
router.post("/actionadd", actionAdd);
router.get("/actionapproval/:Id", actionApproval);

//help
router.post("/helpdesk", helpDesk);
router.get("/getQuery", getQuery);
router.get("/getQueryById/:Id", getQueryById);
router.get("/helpResponse/:Id",helpResponse );

//file-manager
router.post("/filemanager",fileManager);
router.get("/getFiles",getFiles);
router.put("/updateFiles",updateFiles);
router.delete("/deleteFiles",deleteFiles);

//login
router.post("/signup",signup);
router.get("/signin",signin);
router.get("/deleteUser",deleteUser);
router.get("/forget-password",resetPass);
router.put("/reset-password",verifyPass);

//notification
router.post("/notification",notification);
router.get("/getNotification",getNotification);
router.delete("/delNotification",delNotification);

//category tree
router.get("/categoryTree",categoryTree);
router.post("/addCategory",addCategory);
router.get("/categoryTreeById/:categoryId",categoryTreeById);
router.get("/categoryapproval/:Id",categoryApproval);

//validation
router.get("/validationData",validationData);
router.get("/validationShort",validationShortTable);

//kpi
router.get("/getKpi",getKpi);
router.get("/getChart",getChart);
router.get("/getActivity",getActivity);

module.exports = router;
