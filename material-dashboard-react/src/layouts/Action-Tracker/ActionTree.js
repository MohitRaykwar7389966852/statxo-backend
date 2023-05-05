import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
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
  const [rows, setrows] = useState("");
  const [FilteredData, setFilteredData] = React.useState(rows);
  const [actiontypef, setactiontypef] = React.useState("");
  const [actionnamef, setactionnamef] = React.useState("");
  const [actiontype, setactiontype] = React.useState("");
  const [actionname, setactionname] = React.useState("");
  const [actionnumber, setactionnumber] = React.useState("");
  const [actiondescription, setactiondescription] = React.useState("");
  const [owner, setowner] = React.useState("");
  const [approver, setapprover] = React.useState("");
  const [attachment, setattachment] = React.useState("");
  // const [editon, setedion] = React.useState("");
  const [pageSize, setPageSize] = React.useState(100);
  const [rowHeight, setrowHeight] = React.useState(24);
  const [rowPad, setrowPad] = React.useState("0px");
  const [rowFont, setrowFont] = React.useState("11px");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  var dataLoad = async () => {
    await axios
      .get("http://localhost:4000/actiontree")
      .then((res) => {
        let data = res.data.result[0];
        setrows(data);
        setFilteredData(data);
        console.log("data loaded");
      })
      .catch((error) => {
        let d = [];
        setrows(d);
        setFilteredData(d);
        console.log(error.message);
        toast.error("Failed To Load Data", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error",
        });
      });
  };

  useEffect(dataLoad, []);

  const onGridReady = () => {
    gridRef.current.api.setHeaderHeight(rowHeight);
    // for (let i = 0; i < columnDefs.length; i++) {
    //   columnDefs[i].cellStyle = { fontSize: rowFont, paddingTop: rowPad };
    // }
  };

  const changeFilter = (e) => {
    let rw = [...rows];
    if (actiontypef !== "all" && actiontypef !== "")
      rw = rw.filter((x) => x.ActionType === actiontypef);
    if (actionnamef !== "all" && actionnamef !== "")
      rw = rw.filter((x) => x.ActionName === actionnamef);
    setFilteredData(rw);
  };

  const resetFilter = (e) => {
    setactiontypef("");
    setactionnamef("");
    setFilteredData(rows);
    gridRef.current.api.setFilterModel(null);
  };

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const gridRef = useRef();

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "ActionType", width: 140 },
    { field: "ActionNumber", width: 140 },
    { field: "ActionName", width: 140 },
    { field: "ActionDescription", width: 140 },
    { field: "Owner", width: 110 },
    { field: "Approver", width: 115 },
    { field: "EditedOn", width: 160 },
    { field: "Attachment", width: 130 },
    { field: "Status", width: 130 },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      cellStyle: { fontSize: "11px" },
    };
  }, []);

  // Example of consuming Grid Event ???
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  const sideBar = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        minWidth: 225,
        maxWidth: 225,
        width: 225,
      },
      {
        id: "filters",
        labelDefault: "Filters",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
    ],
    position: "right",
    defaultToolPanel: "none",
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setactiontype("");
    setactionname("");
    setactionnumber("");
    setactiondescription("");
    setowner("");
    setapprover("");
    setattachment("");
    setatError(false);
    setanError(false);
    setanumError(false);
    setapproverError(false);
    setatErrorText("");
    setanErrorText("");
    setanumErrorText("");
    setapproverErrorText("");
  };

  const handleAttachment = (e) => {
    const files = e.target.files[0];
    setattachment(files);
  };

  const approverValue = {
    "Mohit Raykwar": "mohit.raykwar@statxo.com",
    "Abhishek Singh": "abhishek.singh@statxo.com",
    "Prashant Sahu": "prashant.sahu@statxo.com",
  };
  const [atError, setatError] = React.useState(false);
  const [anError, setanError] = React.useState(false);
  const [anumError, setanumError] = React.useState(false);
  const [approverError, setapproverError] = React.useState(false);
  const [atErrorText, setatErrorText] = React.useState("");
  const [anErrorText, setanErrorText] = React.useState("");
  const [anumErrorText, setanumErrorText] = React.useState("");
  const [approverErrorText, setapproverErrorText] = React.useState("");

  // loading backdrop
  const [openLoad, setOpenLoad] = React.useState(false);
  const handleCloseLoad = () => {
    setOpenLoad(false);
  };
  const handleOpenLoad = () => {
    setOpenLoad(true);
  };

  const saveaction = async (e) => {
    e.preventDefault();
    if (actiontype === "") {
      setatError(true);
      setatErrorText("Action Type Is Required");
    } else {
      setatError(false);
      setatErrorText("");
    }
    if (actionname === "") {
      setanError(true);
      setanErrorText("Action Name Is Required");
    } else {
      setanError(false);
      setanErrorText("");
    }
    if (actionnumber === "") {
      setanumError(true);
      setanumErrorText("Action Number Is Required");
    } else if (/^\d+$/.test(actionnumber) === false) {
      setanumError(true);
      setanumErrorText("Only Number Accepted");
    } else {
      setanumError(false);
      setanumErrorText("");
    }
    if (approver === "") {
      setapproverError(true);
      setapproverErrorText("Approver Is Required");
    } else {
      setapproverError(false);
      setapproverErrorText("");
    }
    if (
      actiontype === "" ||
      actionname === "" ||
      actionnumber === "" ||
      owner === "" ||
      approver === ""
    )
      return;
    else {
      let approverMail = approverValue[approver];
      handleOpenLoad();
      await axios
        .post(
          "http://localhost:4000/actionAdd",
          {
            ActionType: actiontype,
            ActionName: actionname,
            ActionNumber: actionnumber,
            ActionDescription: actiondescription,
            Owner: owner,
            Approver: approver,
            Attachment: attachment,
            ApproverMail: approverMail,
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          handleCloseLoad();
          let data = res.data;
          console.log(data);
          setactiontype("");
          setactionname("");
          setactionnumber("");
          setactiondescription("");
          setowner("");
          setapprover("");
          setattachment("");
          toast.success("Action Sent For Approval", {
            position: toast.POSITION.TOP_CENTER,
            className: "toast-success",
          });
        })
        .catch((error) => {
          handleCloseLoad();
          console.log(error.message);
        });
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const op = Boolean(anchorEl);
  const handleClicksizemenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosesizemenu = () => {
    setAnchorEl(null);
  };

  const rowsize = (e) => {
    let size = e.target.value;
    handleClosesizemenu();
    setrowHeight(size);
    gridRef.current.api.forEachNode(function (rownode) {
      rownode.setRowHeight(size);
    });
    let fs;
    let pt;
    if (size === 24) {
      fs = "11px";
      pt = "0px";
    } else if (size === 30) {
      fs = "13px";
      pt = "0px";
    } else {
      fs = "15px";
      pt = "0px";
    }
    setrowFont(fs);
    setrowPad(pt);
    for (let i = 0; i < columnDefs.length; i++) {
      columnDefs[i].cellStyle = { fontSize: fs, paddingTop: pt };
    }
    gridRef.current.api.setHeaderHeight(size);
    gridRef.current.api.onRowHeightChanged();
    gridRef.current.api.setColumnDefs(columnDefs);
    gridRef.current.api.refreshCells();
  };

  //export
  const [openExport, setOpenExport] = React.useState(false);

  const handleClickOpenExport = () => {
    setOpenExport(true);
  };
  const handleCloseExport = () => {
    setOpenExport(false);
  };

  const onBtnExport1 = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);
  const onBtnExport2 = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  return (
    <DashboardLayout>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            ml: 2,
          }}
        >
          <Box sx={{ minWidth: 20, m: 1 }}>
            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-label">Action Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={actiontypef}
                label="Age"
                onChange={(e) => setactiontypef(e.target.value)}
                style={{ height: 40, width: 100 }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Price - Negotiation">Price - Negotiation</MenuItem>
                <MenuItem value="Product - ERP">Product - ERP</MenuItem>
                <MenuItem value="Provision">Provision</MenuItem>
                <MenuItem value="Rebate">Rebate</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 20, m: 1 }}>
            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-label">Action Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={actionnamef}
                label="Age"
                onChange={(e) => setactionnamef(e.target.value)}
                style={{ height: 40, width: 100 }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Additional Task">Additional Task</MenuItem>
                <MenuItem value="Felss Price Change">Felss Price Change</MenuItem>
                <MenuItem value="Fright Reduction">Fright Reduction</MenuItem>
                <MenuItem value="Price Increase">Price Increase</MenuItem>
                <MenuItem value="Price red -2%">Price red -2%</MenuItem>
                <MenuItem value="Rebate">Rebate</MenuItem>
                <MenuItem value="SMP Price Change">SMP Price Change</MenuItem>
                <MenuItem value="Timken to JinMyung">Timken to JinMyung</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box>
          <Button onClick={changeFilter}>
            Filter <FilterAltIcon />
          </Button>
          <Button onClick={resetFilter}>
            Reset <RestartAltIcon />
          </Button>
          <Button onClick={handleClickOpenExport}>
            Export <FileDownloadIcon />
          </Button>
          <Dialog open={openExport} onClose={handleCloseExport}>
            <DialogTitle id="alert-dialog-title">
              {"Select Export Format"}
              <Button onClick={handleCloseExport}>Close</Button>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Select file format to export the data
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onBtnExport1}>
                CSV <FileDownloadIcon />
              </Button>
              <Button onClick={onBtnExport2}>
                Excel <FileDownloadIcon />
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClicksizemenu}
          >
            {" "}
            Density <DensityMediumIcon />
          </Button>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={op}
            onClose={handleClosesizemenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem value={24} onClick={rowsize}>
              Small
            </MenuItem>
            <MenuItem value={30} onClick={rowsize}>
              Medium
            </MenuItem>
            <MenuItem value={35} onClick={rowsize}>
              Large
            </MenuItem>
          </Menu>
          <Button onClick={handleClickOpen}>
            Add Action <AddIcon />
          </Button>
          <Dialog
            maxWidth={"lg"}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{ sx: { overflow: "visible" } }}
          >
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openLoad}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Typography
              style={{
                background: "#2196f3",
                color: "white",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "15px",
                width: "150px",
                textAlign: "center",
                position: "absolute",
                left: 30,
                top: -15,
                boxShadow: "1px 1px 5px black",
              }}
            >
              Add New Action
            </Typography>
            <Button
              style={{
                background: "#2196f3",
                color: "white",
                position: "absolute",
                right: 20,
                top: -15,
                height: "30px",
                fontSize: "17px",
                boxShadow: "1px 1px 5px black",
              }}
              variant="containedPrimary"
              onClick={handleClose}
            >
              <CloseIcon />
            </Button>
            <FormControl
              sx={{ p: 4, alignItems: "center" }}
              component="form"
              onSubmit={saveaction}
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
                      error={atError}
                      size="small"
                      style={{ width: "240px", margin: "8px" }}
                      type="text"
                      value={actiontype}
                      onChange={(e) => setactiontype(e.target.value)}
                    />
                  </Box>
                  <FormHelperText style={{ marginLeft: "100px", color: "red" }}>
                    {atErrorText}
                  </FormHelperText>
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
                      error={anError}
                      style={{ width: "240px", margin: "8px" }}
                      type="text"
                      value={actionname}
                      onChange={(e) => setactionname(e.target.value)}
                    />
                  </Box>
                  <FormHelperText style={{ marginLeft: "100px", color: "red" }}>
                    {anErrorText}
                  </FormHelperText>
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
                      error={anumError}
                      style={{ width: "240px", margin: "8px" }}
                      type="text"
                      value={actionnumber}
                      onChange={(e) => setactionnumber(e.target.value)}
                    />
                  </Box>
                  <FormHelperText style={{ marginLeft: "100px", color: "red" }}>
                    {anumErrorText}
                  </FormHelperText>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: 13, pt: 2.5 }}>Attachment</Typography>
                    <input
                      accept="image/*,.xlsx, .xls, .csv"
                      style={{ width: "240px", margin: "18px", paddingLeft: "10px" }}
                      type="file"
                      onChange={handleAttachment}
                    />
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
                      onChange={(e) => setowner(e.target.value)}
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

                    <FormControl>
                      <Select
                        error={approverError}
                        style={{ height: "40px", width: "240px", margin: "8px", fontSize: "12px" }}
                        value={approver}
                        onChange={(e) => setapprover(e.target.value)}
                      >
                        <MenuItem value="Mohit Raykwar">Mohit Raykwar</MenuItem>
                        <MenuItem value="Abhishek Singh">Abhishek Singh</MenuItem>
                        <MenuItem value="Prashant Sahu">Prashant Sahu</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <FormHelperText style={{ marginLeft: "120px", color: "red" }}>
                    {approverErrorText}
                  </FormHelperText>
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
                      onChange={(e) => setactiondescription(e.target.value)}
                    />
                  </Box>
                </Box>
              </Box>

              <Button type="submit" sx={{ mt: 1, width: 200, ml: 64 }} variant="containedPrimary">
                save action
              </Button>
            </FormControl>
          </Dialog>
        </Box>
      </Box>

      <div className="ag-theme-alpine" style={{ width: "100%", height: 520, fontSize: rowFont }}>
        <AgGridReact
          ref={gridRef}
          rowData={FilteredData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef}
          rowHeight={rowHeight}
          sideBar={sideBar}
          onGridReady={onGridReady}
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
      {<ToastContainer style={{ fontSize: "15px" }} toastStyle={{ borderRadius: "10px" }} />}
    </DashboardLayout>
  );
}
