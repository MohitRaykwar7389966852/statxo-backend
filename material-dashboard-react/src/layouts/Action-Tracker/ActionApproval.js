import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, Button } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import Menu from "@mui/material/Menu";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import "./action.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function DataGridProDemo() {
  // const [actionData, setActionData] = React.useState([]);
  const [actiontype, setactiontype] = React.useState("");
  const [actionname, setactionname] = React.useState("");
  const [actionnumber, setactionnumber] = React.useState("");
  const [actiondescription, setactiondescription] = React.useState("");
  const [owner, setowner] = React.useState("");
  const [approver, setapprover] = React.useState("");
  const [attachment, setattachment] = React.useState("");
  const [rejectValue, setRejectValue] = React.useState("");
  const [rejectError, setRejectError] = React.useState(false);
  const [rejectMsg, setRejectMsg] = React.useState("");

  const param = useParams();
  let actionId = param.actionId;

  const navigate = useNavigate();

  var dataLoad = async () => {
    handleOpenLoad();
    await axios
      .get("http://localhost:4000/actiontreeById/" + actionId)
      .then((res) => {
        handleCloseLoad();
        let data = res.data.result[0];
        setactiontype(data[0].ActionType);
        setactionname(data[0].ActionName);
        setactionnumber(data[0].ActionNumber);
        setactiondescription(data[0].ActionDescription);
        setowner(data[0].Owner);
        setapprover(data[0].Approver);
        setattachment(data[0].Attachment);
        console.log("data loaded");
      })
      .catch((error) => {
        handleCloseLoad();
        console.log(error.message);
        toast.error("Failed To Load Data", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error",
        });
      });
  };

  useEffect(dataLoad, []);
  useNavigate(attachment);

  const showAttachment = async () => {
    console.log(attachment);
    window.open(attachment, "_blank");
  };

  const approve = async () => {
    handleOpenLoad();
    setRejectError(false);
    setRejectMsg("");
    await axios
      .get("http://localhost:4000/actionapproval/" + actionId + "?Status='Approved'")
      .then((res) => {
        handleCloseLoad();
        console.log(res);
        console.log(res.data);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-success",
        });
      })
      .catch((error) => {
        handleCloseLoad();
        toast.error("Failed to Update Action", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error",
        });
        console.log(error.message);
      });
  };

  const reject = async () => {
    if (rejectValue === "") {
      setRejectError(true);
      setRejectMsg("Rejection Reason Is Required");
    } else {
      setRejectError(false);
      setRejectMsg("");
      handleCloseReject();
      handleOpenLoad();
      await axios
        .get(
          "http://localhost:4000/actionapproval/" +
            actionId +
            "?Status='Rejected'&Description=" +
            rejectValue
        )
        .then((res) => {
          handleCloseLoad();
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
            className: "toast-success",
          });
          console.log(res);
        })
        .catch((error) => {
          handleCloseLoad();
          toast.error("Failed to Update Action", {
            position: toast.POSITION.TOP_CENTER,
            className: "toast-error",
          });
          console.log(error.message);
        });
      setRejectValue("");
    }
  };

  const [openReject, setOpenReject] = React.useState(false);

  const handleClickOpenReject = () => {
    setOpenReject(true);
  };
  const handleCloseReject = () => {
    setOpenReject(false);
  };

  // loading backdrop
  const [openLoad, setOpenLoad] = React.useState(false);
  const handleCloseLoad = () => {
    setOpenLoad(false);
  };
  const handleOpenLoad = () => {
    setOpenLoad(true);
  };

  return (
    <DashboardLayout>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,
          height: 600,
        }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoad}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <AppBar sx={{ position: "relative", borderRadius: 1, bgcolor: "#2196f3" }}>
          <Toolbar>
            <Typography
              sx={{ ml: 2, flex: 1, color: "#f5f5f5", fontWeight: "bold", textAlign: "center" }}
              variant="h6"
              component="div"
            >
              Action Approval Window
            </Typography>
          </Toolbar>
        </AppBar>

        <FormControl
          sx={{ pt: 5, alignItems: "center", ml: 25 }}
          component="form"
          variant="standard"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 13, pt: 2.5 }}>Action Type</Typography>
                <TextField
                  size="small"
                  style={{ width: "240px", margin: "8px" }}
                  type="text"
                  value={actiontype}
                  disabled
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 13, pt: 2.5 }}>Action Name</Typography>
                <TextField
                  size="small"
                  style={{ width: "240px", margin: "8px" }}
                  type="text"
                  value={actionname}
                  disabled
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 13, pt: 2.5 }}>Action Number</Typography>
                <TextField
                  size="small"
                  style={{ width: "240px", margin: "8px" }}
                  type="text"
                  value={actionnumber}
                  disabled
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Typography sx={{ fontSize: 13, pt: 2.5 }}>Attachment</Typography>
                <Button sx={{ mt: 2 }} onClick={showAttachment}>
                  Attachment
                </Button>
              </Box>
            </Box>
            <Box sx={{ ml: 5 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 13, pt: 2.5 }}>Owner</Typography>
                <TextField
                  size="small"
                  style={{ width: "240px", margin: "8px" }}
                  type="text"
                  value={owner}
                  disabled
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 13, pt: 2.5 }}>Approver</Typography>

                <TextField
                  size="small"
                  style={{ width: "240px", margin: "8px" }}
                  type="text"
                  value={approver}
                  disabled
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 13, pt: 2.5 }}>Action Description</Typography>
                <TextField
                  size="small"
                  multiline
                  rows={3}
                  style={{ width: "240px", margin: "8px" }}
                  type="text"
                  value={actiondescription}
                  disabled
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              onClick={approve}
              sx={{ mt: 5, mb: 1, width: 150, ml: 50 }}
              variant="containedPrimary"
            >
              Approve
            </Button>
            <Button
              onClick={handleClickOpenReject}
              sx={{ mt: 5, mb: 1, width: 150, ml: 2 }}
              variant="containedError"
            >
              Reject
            </Button>
            <Dialog open={openReject} onClose={handleCloseReject}>
              <DialogTitle id="alert-dialog-title">{"Add Rejection Description"}</DialogTitle>
              <Box>
                <TextField
                  multiline
                  rows={3}
                  style={{ width: "300px", margin: "8px" }}
                  type="text"
                  placeholder="write reason of rejection"
                  value={rejectValue}
                  onChange={(e) => setRejectValue(e.target.value)}
                  error={rejectError}
                />
                <FormHelperText style={{ marginLeft: "10px", color: "red" }}>
                  {rejectMsg}
                </FormHelperText>
                <Button sx={{ m: 2, ml: 28 }} onClick={reject} variant="containedError">
                  Reject
                </Button>
              </Box>
            </Dialog>
          </Box>
        </FormControl>
      </Box>
      {<ToastContainer style={{ fontSize: "15px" }} toastStyle={{ borderRadius: "10px" }} />}
    </DashboardLayout>
  );
}
