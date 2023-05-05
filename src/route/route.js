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
const { helpDesk } = require("../controller/helpDesk");

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

module.exports = router;
