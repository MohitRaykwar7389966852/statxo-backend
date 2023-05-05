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
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./action.css";
import Menu from "@mui/material/Menu";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Card from "@mui/material/Card";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const minDate = dayjs("2020-01-01T00:00:00.000");
const maxDate = dayjs("2030-01-01T00:00:00.000");

export default function DataGridProDemo() {
  const [age, setAge] = useState("");
  const [rows, setrows] = useState("");
  const [FilteredData, setFilteredData] = React.useState("");
  const [l1category, setl1category] = React.useState("");
  const [l2category, setl2category] = React.useState("");
  const [l3category, setl3category] = React.useState("");
  const [l4category, setl4category] = React.useState("");
  const [legalentity, setlegalentity] = React.useState("");
  const [vendorname, setvendorname] = React.useState("");
  const [actiontype, setactiontype] = React.useState("");
  const [actionname, setactionname] = React.useState("");
  const [pageSize, setPageSize] = React.useState(100);
  const [indRow, setIndRow] = React.useState([]);
  const [rowHeight, setrowHeight] = React.useState(24);
  const [rowPad, setrowPad] = React.useState("0px");
  const [rowFont, setrowFont] = React.useState("11px");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // create action filter table
  const [caRow, setcaRow] = useState("");
  const [caTable, setcaTable] = useState("");
  const [sup, setSup] = useState("");
  const [com, setCom] = useState("");
  const [subCom, setSubCom] = useState("");
  const [supList, setSupList] = useState([]);
  const [comList, setcomList] = useState([]);
  const [subcomList, setsubcomList] = useState([]);
  const [planStart, setplanStart] = useState(dayjs());
  const [planEnd, setplanEnd] = useState(dayjs());
  const [caActionName, setcaActionName] = useState("");
  const [caType, setcaType] = useState("");
  const [caTypeDetail, setcaTypeDetail] = useState("");
  const [Numeric, setNumeric] = useState("");
  const [numericSign, setNumericSign] = useState("");
  const [caFormData, setcaFormData] = useState([]);
  const [frPlanStart, setfrPlanStart] = useState(false);
  const [caLoad, setcaLoad] = useState(false);

  //errors
  const [caActionNameError, setcaActionNameError] = useState(false);
  const [caTypeError, setcaTypeError] = useState(false);
  const [caTypeDetailError, setcaTypeDetailError] = useState(false);
  const [NumericError, setNumericError] = useState(false);
  const [supError, setSupError] = useState(false);
  const [comError, setComError] = useState(false);
  const [subComError, setSubComError] = useState(false);

  //error msg
  const [caActionNameErrorText, setcaActionNameErrorText] = useState("");
  const [caTypeErrorText, setcaTypeErrorText] = useState("");
  const [caTypeDetailErrorText, setcaTypeDetailErrorText] = useState("");
  const [NumericErrorText, setNumericErrorText] = useState("");
  const [supErrorText, setSupErrorText] = useState("");
  const [comErrorText, setComErrorText] = useState("");
  const [subComErrorText, setSubComErrorText] = useState("");

  //filter datalist
  const [l1categoryList, setl1categoryList] = useState([{ title: "All" }]);
  const [l2categoryList, setl2categoryList] = useState([{ title: "All" }]);
  const [l3categoryList, setl3categoryList] = useState([{ title: "All" }]);
  const [l4categoryList, setl4categoryList] = useState([{ title: "All" }]);
  const [companyList, setcompanyList] = useState([{ title: "All" }]);
  const [vendorList, setvendorList] = useState([{ title: "All" }]);
  const [acNameList, setacNameList] = useState([{ title: "All" }]);
  const [acTypeList, setacTypeList] = useState([{ title: "All" }]);

  var dataLoad = async () => {
    await axios
      .get("http://localhost:4000/actiontracker")
      .then((res) => {
        let data = res.data.result[0];
        setrows(data);
        setFilteredData(data);
        // setcaTable(data);
        console.log("data loaded");
      })
      .catch((error) => {
        let d = [];
        setrows(d);
        setFilteredData(d);
        // setcaTable(d);
        console.log(error.message);
        toast.error("Failed To Load Data", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error",
        });
      });
  };

  var caDataLoad = async () => {
    handleOpenLoad();
    await axios
      .get("http://localhost:4000/createActionTable")
      .then((res) => {
        let data = res.data.result[0];
        setcaTable(data);
        setcaRow(data);
        console.log("data loaded");
        handleCloseLoad();
      })
      .catch((error) => {
        let d = [];
        setcaTable(d);
        setcaRow(d);
        console.log(error.message);
        handleCloseLoad();
        toast.error("Failed To Load Data", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error",
        });
      });
  };

  useEffect(dataLoad, []);
  useEffect(caDataLoad, []);

  const onGridReady = () => {
    gridRef.current.api.setHeaderHeight(rowHeight);
    // for (let i = 0; i < columnDefs.length; i++) {
    //   columnDefs[i].cellStyle = { fontSize: "20px", paddingTop: rowPad };
    // }
  };

  const onGridReadyCreateTable = () => {
    gridRefAction.current.api.setHeaderHeight(24);
    gridRefAction.current.api.onRowHeightChanged();
  };

  const rowDataUpdatedMain = () => {
    if (FilteredData.length === 0) return;
    else {
      FilteredData.map((x) => {
        if (x.ReportingLevel1 !== null) {
          let c = 0;
          for (let i = 0; i < l1categoryList.length; i++) {
            if (l1categoryList[i].title === x.ReportingLevel1) c++;
          }
          if (c === 0) l1categoryList.push({ title: x.ReportingLevel1 });
        }

        if (x.ReportingLevel2 !== null) {
          let c = 0;
          for (let i = 0; i < l2categoryList.length; i++) {
            if (l2categoryList[i].title === x.ReportingLevel2) c++;
          }
          if (c === 0) l2categoryList.push({ title: x.ReportingLevel2 });
        }

        if (x.ReportingLevel3 !== null) {
          let c = 0;
          for (let i = 0; i < l3categoryList.length; i++) {
            if (l3categoryList[i].title === x.ReportingLevel3) c++;
          }
          if (c === 0) l3categoryList.push({ title: x.ReportingLevel3 });
        }

        if (x.ReportingLevel4 !== null) {
          let c = 0;
          for (let i = 0; i < l4categoryList.length; i++) {
            if (l4categoryList[i].title === x.ReportingLevel4) c++;
          }
          if (c === 0) l4categoryList.push({ title: x.ReportingLevel4 });
        }

        if (x.CompanyName !== null) {
          let c = 0;
          for (let i = 0; i < companyList.length; i++) {
            if (companyList[i].title === x.CompanyName) c++;
          }
          if (c === 0) companyList.push({ title: x.CompanyName });
        }

        if (x.VendorNameHarmonized !== null) {
          let c = 0;
          for (let i = 0; i < vendorList.length; i++) {
            if (vendorList[i].title === x.VendorNameHarmonized) c++;
          }
          if (c === 0) vendorList.push({ title: x.VendorNameHarmonized });
        }

        if (x.ActionType !== null) {
          let c = 0;
          for (let i = 0; i < acTypeList.length; i++) {
            if (acTypeList[i].title === x.ActionType) c++;
          }
          if (c === 0) acTypeList.push({ title: x.ActionType });
        }
        if (x.ActionName !== null) {
          let c = 0;
          for (let i = 0; i < acNameList.length; i++) {
            if (acNameList[i].title === x.ActionName) c++;
          }
          if (c === 0) acNameList.push({ title: x.ActionName });
        }
      });
    }
  };

  const rowDataUpdated = () => {
    if (caTable.length === 0) return;
    caTable.map((x) => {
      let c1 = 0;
      let c2 = 0;
      let c3 = 0;
      if (x.VendorNameHarmonized === null) c1++;
      else {
        for (let i = 0; i < supList.length; i++) {
          if (supList[i].title == x.VendorNameHarmonized) {
            c1++;
            break;
          }
        }
      }
      if (x.ReportingLevel3 === null) c2++;
      else {
        for (let i = 0; i < comList.length; i++) {
          if (comList[i].title == x.ReportingLevel3) {
            c2++;
            break;
          }
        }
      }
      if (x.ReportingLevel4 === null) c3++;
      else {
        for (let i = 0; i < subcomList.length; i++) {
          if (subcomList[i].title == x.ReportingLevel4) {
            c3++;
            break;
          }
        }
      }
      if (c1 === 0) supList.push({ title: x.VendorNameHarmonized });
      if (c2 === 0) comList.push({ title: x.ReportingLevel3 });
      if (c3 === 0) subcomList.push({ title: x.ReportingLevel4 });
    });
    setSupList([...supList]);
    setcomList([...comList]);
    setsubcomList([...subcomList]);
  };

  const handleLoadSup = () => {
    gridRefAction.current.api.showLoadingOverlay();
  };

  const handleLoadCom = () => {
    if (comList.length > 1) gridRefAction.current.api.showLoadingOverlay();
  };

  const handleLoadSubCom = () => {
    if (subcomList.length > 1) gridRefAction.current.api.showLoadingOverlay();
  };

  useEffect(() => {
    if (caTypeDetail === "Percentage") setNumericSign("%");
    else if (caTypeDetail === "Value") setNumericSign("V");
    else if (caTypeDetail === "Value / Ton") setNumericSign("V/T");
    else if (caTypeDetail === "Value / Piece") setNumericSign("V/P");
    else setNumericSign("");
  }, [caTypeDetail]);

  useEffect(() => {
    createTableFilter();
  }, [sup]);

  useEffect(() => {
    createTableFilter();
  }, [com]);

  useEffect(() => {
    createTableFilter();
  }, [subCom]);

  useEffect(() => {
    console.log(frPlanStart);
    if (frPlanStart === false) {
      setfrPlanStart(true);
      return;
    }
    console.log(planStart.format("M/YYYY"));
    gridRefAction.current.api.redrawRows();
  }, [planStart]);

  const createTableFilter = (e) => {
    // gridRefAction.current.api.showLoadingOverlay();
    if (sup === "" && com === "" && subCom === "") {
      rowDataUpdated();
    } else if (sup !== "" && com !== "") {
      let arr = [];
      caTable.map((x) => {
        let c = 0;
        if (x.VendorNameHarmonized === sup && x.ReportingLevel3 === com) {
          if (x.ReportingLevel4 === null) c++;
          else {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].title == x.ReportingLevel4) {
                c++;
                break;
              }
            }
          }

          if (c === 0) arr.push({ title: x.ReportingLevel4 });
        }
      });
      setsubcomList([...arr]);
    } else if (sup !== "") {
      let arr1 = [];
      let arr2 = [];
      caTable.map((x) => {
        let c1 = 0,
          c2 = 0;
        if (x.VendorNameHarmonized === sup) {
          if (x.ReportingLevel3 === null) c1++;
          else {
            for (let i = 0; i < arr1.length; i++) {
              if (arr1[i].title == x.ReportingLevel3) {
                c1++;
                break;
              }
            }
          }
          if (x.ReportingLevel4 === null) c2++;
          else {
            for (let i = 0; i < arr2.length; i++) {
              if (arr2[i].title == x.ReportingLevel4) {
                c2++;
                break;
              }
            }
          }

          if (c1 === 0) arr1.push({ title: x.ReportingLevel3 });
          if (c2 === 0) arr2.push({ title: x.ReportingLevel4 });
        }
      });
      setcomList([...arr1]);
      setsubcomList([...arr2]);
    }
    let rw = [...caRow];
    if (sup !== "") rw = rw.filter((x) => x.VendorNameHarmonized === sup);
    if (com !== "") rw = rw.filter((x) => x.ReportingLevel3 === com);
    if (subCom !== "") rw = rw.filter((x) => x.ReportingLevel4 === subCom);
    setcaTable(rw);
  };

  const [firstFilter, setFirstFilter] = useState(false);

  useEffect(() => {
    if (firstFilter === false) setFirstFilter(true);
    else changeFilter();
  }, [
    l1category,
    l2category,
    l3category,
    l4category,
    legalentity,
    vendorname,
    actiontype,
    actionname,
  ]);

  const changeFilter = (e) => {
    let rw = [...rows];
    if (l1category !== "All" && l1category !== "")
      rw = rw.filter((x) => x.ReportingLevel1 === l1category);
    if (l2category !== "All" && l2category !== "")
      rw = rw.filter((x) => x.ReportingLevel2 === l2category);
    if (l3category !== "All" && l3category !== "")
      rw = rw.filter((x) => x.ReportingLevel3 === l3category);
    if (l4category !== "All" && l4category !== "")
      rw = rw.filter((x) => x.ReportingLevel4 === l4category);
    if (legalentity !== "All" && legalentity !== "")
      rw = rw.filter((x) => x.CompanyName === legalentity);
    if (vendorname !== "All" && vendorname !== "")
      rw = rw.filter((x) => x.VendorNameHarmonized === vendorname);
    if (actiontype !== "All" && actiontype !== "")
      rw = rw.filter((x) => x.ActionType === actiontype);
    if (actionname !== "All" && actionname !== "")
      rw = rw.filter((x) => x.ActionName === actionname);
    setFilteredData(rw);
  };

  const resetFilter = (e) => {
    setl1category("");
    setl2category("");
    setl3category("");
    setl4category("");
    setlegalentity("");
    setvendorname("");
    setactiontype("");
    setactionname("");
    setFilteredData(rows);
    gridRef.current.api.setFilterModel(null);
  };

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const gridRef = useRef();

  class CellRenderer {
    createGui() {
      const template =
        '<span><button id="theButton" style="height: 25px; width:25px; background:#4BB543; color:white; border:#4BB543; border-radius"1px;>✎</button><span id="theValue" style="padding-left: 4px;"></span></span>';
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = template;
      this.eGui = tempDiv.firstElementChild;
    }

    init(params) {
      // create the gui
      this.createGui();
      // keep params, we use it in onButtonClicked
      this.params = params;

      // attach the value to the value span
      const eValue = this.eGui.querySelector("#theValue");

      eValue.innerHTML = params.value;
      // setup the button, first get reference to it
      this.eButton = this.eGui.querySelector("#theButton");

      this.buttonClickListener = () => this.onButtonClicked();
      this.eButton.addEventListener("click", this.buttonClickListener);
    }
    onButtonClicked() {
      // start editing this cell. see the docs on the params that this method takes
      const startEditingParams = {
        rowIndex: this.params.rowIndex,
        colKey: this.params.column.getId(),
      };
      this.params.api.startEditingCell(startEditingParams);
    }
    getGui() {
      // returns our gui to the grid for this cell
      return this.eGui;
    }
    refresh() {
      return false;
    }
    destroy() {
      // be good, clean up the listener
      this.eButton.removeEventListener("click", this.buttonClickListener);
    }
  }

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "CompanyName",
      width: 140,
      headerCheckboxSelection: false,
      checkboxSelection: false,
      showDisabledCheckboxes: false,
    },
    { field: "BusinessUnit", width: 135 },
    { field: "BusinessUnitName", width: 170 },
    { field: "Channel", width: 105 },
    { field: "VendorNameHarmonized", width: 150 },
    { field: "ReportingLevel1", width: 160 },
    { field: "ReportingLevel2", width: 160 },
    { field: "ReportingLevel3", width: 160 },
    { field: "ReportingLevel4", width: 160 },
    { field: "Type", width: 100 },
    { field: "Quantity", width: 100 },
    { field: "AmountEUR", width: 100 },
    { field: "PostingYear", width: 100 },
    { field: "PostingMonth", width: 100 },
    { field: "Entity_Country", width: 100 },
    { field: "Entity_Currency", width: 100 },
    { field: "Entity_HoldingPrimaryClusterP" },
    { field: "Entity_OperatingUnitP", width: 150 },
    { field: "Entity_PrimaryClusterP" },
    { field: "Entity_RegionP", width: 120 },
    { field: "PostingDate" },
    { field: "ItemType", width: 100 },
    { field: "FinanceType", width: 100 },
    { field: "AmountLCY", width: 100 },
    { field: "YearMonth", width: 100 },
    { field: "MonthIndex", width: 100 },
    {
      field: "ActionType",
      width: 150,
      cellRenderer: "",
      editable: false,
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        cellHeight: 50,
        values: ["Price - Negotiation", "Product - ERP", "Provision", "Rebate"],
      },
      onCellValueChanged: (params) => {
        let rownode = {};
        rownode.Id = params.data.Id;
        rownode.ActionType = params.data.ActionType;
        let c = 0;

        if (indRow.length === 0) {
          indRow.push(rownode);
          setIndRow(indRow);
        } else {
          for (let i = 0; i < indRow.length; i++) {
            if (indRow[i].Id === rownode.Id) {
              c++;
              indRow[i].ActionType = rownode.ActionType;
            }
          }
          if (c === 0) indRow.push(rownode);
          setIndRow(indRow);
        }

        console.log(indRow);
      },
    },
    { field: "ActionNumber", width: 150 },
    {
      field: "ActionName",
      width: 150,
      cellRenderer: "",
      editable: false,
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        cellHeight: 50,
        values: [
          "Additional Task",
          "Felss Price Change",
          "Fright Reduction",
          "Price Increase",
          "Price red -2%",
          "Rebate",
          "SMP Price Change",
          "Timken to JinMyung",
        ],
      },
      onCellValueChanged: (params) => {
        let rownode = {};
        rownode.Id = params.data.Id;
        rownode.ActionName = params.data.ActionName;
        let c = 0;

        if (indRow.length === 0) {
          indRow.push(rownode);
          setIndRow(indRow);
          console.log("first");
        } else {
          for (let i = 0; i < indRow.length; i++) {
            if (indRow[i].Id === rownode.Id) {
              c++;
              indRow[i].ActionName = rownode.ActionName;
            }
          }
          if (c === 0) indRow.push(rownode);
          setIndRow(indRow);
        }

        console.log(indRow);
      },
    },
    {
      field: "Value/Percent",
      width: 100,
      // cellRenderer: "",
      // editable: false,
      // cellEditor: "agRichSelectCellEditor",
      // cellEditorPopup: true,
      // cellEditorParams: {
      //   cellHeight: 50,
      //   values: ["Precent", "Value"],
      // },
    },
    {
      field: "NumericalValue",
      width: 100,
      // cellRenderer: "",
      // editable: false,
    },
    { field: "ActionDescription", width: 100 },
    { field: "Status", width: 100 },
    { field: "EditedBy", width: 100 },
    { field: "EditedOn", width: 150 },
    {
      field: "StartingMonth",
      width: 150,
    },
    {
      field: "EndingMonth",
      width: 150,
    },
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

  // Create Action Form Table

  const gridRefAction = useRef();

  const [actionColumnDefs, setActionColumnDefs] = useState([
    {
      field: "VendorNameHarmonized",

      headerName: "Supplier",
      width: 130,
    },
    { field: "ReportingLevel3", headerName: "Commodity", width: 135 },
    {
      field: "ReportingLevel4",
      headerName: "Subcommodity",
      width: 135,
    },
    { field: "MonthYear", width: 130 },
    { field: "AmountEUR(Pre)", headerName: "PreAmount", width: 135, aggFunc: "sum" },
    { field: "AmountEUR(Post)", headerName: "PostAmount", width: 135, aggFunc: "sum" },
  ]);

  // const autoGroupColumnDef = useMemo(() => {
  //   return {
  //     width: 130,
  //     cellStyle: function (params) {
  //       if (params.value == planStart.format("M/YYYY"))
  //         return { background: "#4BB543", color: "white", fontSize: "10px" };
  //       else return { fontSize: "10px" };
  //     },
  //   };
  // }, [planStart]);

  const getRowStyle = (params) => {
    if (params.data.MonthYear == planStart.format("M/YYYY")) {
      return { background: "green", color: "white" };
    } else return null;
  };

  const actionDefaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "10px" },
    };
  }, []);

  // Example of consuming Grid Event ???
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Example using Grid's API ???
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  const onBtnExport1 = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);
  const onBtnExport2 = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  const isRowSelectable = useMemo(() => {}, []);

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
  };

  const [actiontypeupdate, setactiontypeupdate] = useState("");
  const [actionnameupdate, setactionnameupdate] = useState("");

  const bulkUpdate = () => {
    console.log(actiontypeupdate);
    var SelectedRows = gridRef.current.api.getSelectedNodes();
    console.log(SelectedRows);
    for (let i = 0; i < SelectedRows.length; i++) {
      if (actiontypeupdate !== "") SelectedRows[i].setDataValue("ActionType", actiontypeupdate);
      if (actionnameupdate !== "") SelectedRows[i].setDataValue("ActionName", actionnameupdate);
    }
  };

  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

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

  //edit mode save changes warning
  const [editwarn, seteditwarn] = React.useState(false);
  const handleEditWarn = () => {
    seteditwarn(true);
  };
  const handleCloseEditWarn = () => {
    seteditwarn(false);
  };

  const editwarnsave = () => {
    handleCloseEditWarn();
    savechanges();
  };

  const editwarnnotsave = () => {
    handleCloseEditWarn();
    setIndRow([]);
    dataLoad();
  };

  const editmode = () => {
    if (show === true) {
      if (indRow.length !== 0) {
        handleEditWarn();
      }
      gridRef.current.api.deselectAll();
      setactiontypeupdate("");
      setactionnameupdate("");
      columnDefs[0] = {
        field: "CompanyName",
        headerCheckboxSelection: false,
        checkboxSelection: false,
        showDisabledCheckboxes: false,
      };
    }
    setShow((prev) => !prev);
    setVisible(false);
    for (let i = 0; i < columnDefs.length; i++) {
      if (columnDefs[i].field === "ActionType" || columnDefs[i].field === "ActionName") {
        if (columnDefs[i]["editable"] === false) {
          columnDefs[i]["editable"] = true;
          columnDefs[i]["cellRenderer"] = CellRenderer;
        } else {
          gridRef.current.api.stopEditing();
          columnDefs[i]["editable"] = false;
          columnDefs[i]["cellRenderer"] = "";
        }
      }
    }
    gridRef.current.api.setColumnDefs(columnDefs);
    gridRef.current.api.refreshCells();
  };

  const bulkmode = () => {
    setVisible((prev) => !prev);
    gridRef.current.api.deselectAll();
    setactiontypeupdate("");
    setactionnameupdate("");
    if (columnDefs[0].checkboxSelection === false) {
      columnDefs[0] = {
        field: "CompanyName",
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
      };
    } else {
      columnDefs[0] = {
        field: "CompanyName",
        headerCheckboxSelection: false,
        checkboxSelection: false,
        showDisabledCheckboxes: false,
      };
    }

    gridRef.current.api.setColumnDefs(columnDefs);
    gridRef.current.api.refreshCells();
  };

  // loading backdrop
  const [openLoad, setOpenLoad] = React.useState(false);
  const handleCloseLoad = () => {
    setOpenLoad(false);
  };
  const handleOpenLoad = () => {
    setOpenLoad(true);
  };

  const savechanges = () => {
    if (indRow.length !== 0) {
      let c = 0;
      handleOpenLoad();
      indRow.map(async (x, index) => {
        await axios
          .put(
            "http://localhost:4000/actionUpdate/" + x.Id,
            {
              ActionType: x.ActionType,
              ActionName: x.ActionName,
            },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            handleCloseLoad();
            let data = res.data;
            c += 1;
            console.log(data);
          })
          .catch((error) => {
            handleCloseLoad();
            console.log(error.message);
          });

        if (c === indRow.length && index + 1 === indRow.length) {
          toast.success("Data Edited Successfully", {
            position: toast.POSITION.TOP_CENTER,
            className: "toast-success",
          });
          dataLoad();
        } else if (c === 0 && index + 1 === indRow.length) {
          toast.error("Failed To Edit Data", {
            position: toast.POSITION.TOP_CENTER,
            className: "toast-error",
          });
        }
        // else if (c !== 0 && c !== indRow.length && index + 1 === indRow.length) {
        //   toast.warning("Data Edited But Have Isuue With Some Data !", {
        //     position: toast.POSITION.TOP_CENTER,
        //   });
        //   dataLoad();
        // }
      });
      setIndRow([]);
    }
  };

  // create action dialog

  const [openCreateAction, setCreateAction] = React.useState(false);
  const handleOpenCreateAction = () => {
    setCreateAction(true);
  };
  const handleCloseCreateAction = () => {
    setCreateAction(false);
    setcaActionName("");
    setcaType("");
    setcaTypeDetail("");
    setNumeric("");
    setplanStart(dayjs());
    setplanEnd(dayjs());
    setSup("");
    setCom("");
    setSubCom("");
    setcaActionNameError(false);
    setcaActionNameErrorText("");
    setcaTypeError(false);
    setcaTypeErrorText("");
    setcaTypeDetailError(false);
    setcaTypeDetailErrorText("");
    setNumericError(false);
    setNumericErrorText("");
    setSupError(false);
    setSupErrorText("");
    setComError(false);
    setComErrorText("");
    setSubComError(false);
    setSubComErrorText("");
  };

  const createAction = (e) => {
    e.preventDefault();

    if (caActionName === "") {
      setcaActionNameError(true);
      setcaActionNameErrorText("Action Name Is Required");
    } else {
      setcaActionNameError(false);
      setcaActionNameErrorText("");
    }
    if (caType === "") {
      setcaTypeError(true);
      setcaTypeErrorText("Type Is Required");
    } else {
      setcaTypeError(false);
      setcaTypeErrorText("");
    }
    if (caTypeDetail === "") {
      setcaTypeDetailError(true);
      setcaTypeDetailErrorText("Type Details Is Required");
    } else {
      setcaTypeDetailError(false);
      setcaTypeDetailErrorText("");
    }
    if (Numeric === "") {
      setNumericError(true);
      setNumericErrorText("Numeric Value Is Required");
    } else if (/^\d+$/.test(Numeric) === false) {
      setNumericError(true);
      setNumericErrorText("Only Number Accepted");
    } else {
      setNumericError(false);
      setNumericErrorText("");
    }
    if (sup === "") {
      setSupError(true);
      setSupErrorText("Supplier Is Required");
    } else {
      setSupError(false);
      setSupErrorText("");
    }
    if (com === "") {
      setComError(true);
      setComErrorText("Commodity Is Required");
    } else {
      setComError(false);
      setComErrorText("");
    }
    if (subCom === "") {
      setSubComError(true);
      setSubComErrorText("Subcommodity Is Required");
    } else {
      setSubComError(false);
      setSubComErrorText("");
    }

    if (
      caActionName === "" ||
      caType === "" ||
      caTypeDetail === "" ||
      Numeric === "" ||
      sup === "" ||
      com === "" ||
      subCom === ""
    )
      return;
    else {
      console.log("create action data : =>");
      console.log(caActionName);
      console.log(caType);
      console.log(caTypeDetail);
      console.log(Numeric);
      console.log(planStart.format("MM/YYYY"));
      console.log(planEnd.format("MM/YYYY"));
      console.log(sup);
      console.log(com);
      console.log(subCom);
    }
  };

  const resetFormData = () => {
    setcaActionName("");
    setcaType("");
    setcaTypeDetail("");
    setNumeric("");
    setplanStart(dayjs());
    setplanEnd(dayjs());
    setSup("");
    setCom("");
    setSubCom("");

    setcaActionNameError(false);
    setcaActionNameErrorText("");
    setcaTypeError(false);
    setcaTypeErrorText("");
    setcaTypeDetailError(false);
    setcaTypeDetailErrorText("");
    setNumericError(false);
    setNumericErrorText("");
    setSupError(false);
    setSupErrorText("");
    setComError(false);
    setComErrorText("");
    setSubComError(false);
    setSubComErrorText("");
  };

  return (
    <DashboardLayout>
      <Dialog
        open={editwarn}
        onClose={handleCloseEditWarn}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Save Changes"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to turn off edit mode without saving changes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={editwarnnotsave}>Don't save</Button>
          <Button onClick={editwarnsave}>save changes</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,
          pt: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            ml: 2,
            mr: 2,
          }}
        >
          <Box>
            <Stack>
              <Autocomplete
                value={l1category}
                options={l1categoryList}
                getOptionLabel={(option) => option.title ?? option ?? ""}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ width: "120px" }}
                    label="L1 Category"
                    value={l1category}
                    onSelect={(e) => setl1category(e.target.value)}
                  />
                )}
                renderOption={(props, option) => (
                  <Box style={{ fontSize: 11 }} {...props}>
                    {option.title}
                  </Box>
                )}
              />
            </Stack>
          </Box>
          <Box>
            <Stack>
              <Autocomplete
                value={l2category}
                options={l2categoryList}
                getOptionLabel={(option) => option.title ?? option ?? ""}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ width: "120px", height: "30px" }}
                    label="L2 Category"
                    value={l2category}
                    onSelect={(e) => setl2category(e.target.value)}
                  />
                )}
                renderOption={(props, option) => (
                  <Box style={{ fontSize: 11 }} {...props}>
                    {option.title}
                  </Box>
                )}
              />
            </Stack>
          </Box>
          <Box>
            <Stack>
              <Autocomplete
                value={l3category}
                options={l3categoryList}
                getOptionLabel={(option) => option.title ?? option ?? ""}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ width: "120px" }}
                    label="L3 Category"
                    value={l3category}
                    onSelect={(e) => setl3category(e.target.value)}
                  />
                )}
                renderOption={(props, option) => (
                  <Box style={{ fontSize: 11 }} {...props}>
                    {option.title}
                  </Box>
                )}
              />
            </Stack>
          </Box>
          <Box>
            <Stack>
              <Autocomplete
                value={l4category}
                options={l4categoryList}
                getOptionLabel={(option) => option.title ?? option ?? ""}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ width: "120px" }}
                    label="L4 Category"
                    value={l4category}
                    onSelect={(e) => setl4category(e.target.value)}
                  />
                )}
                renderOption={(props, option) => (
                  <Box style={{ fontSize: 11 }} {...props}>
                    {option.title}
                  </Box>
                )}
              />
            </Stack>
          </Box>
          <Box>
            <Stack>
              <Autocomplete
                value={legalentity}
                options={companyList}
                getOptionLabel={(option) => option.title ?? option ?? ""}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ width: "130px" }}
                    label="Company Name"
                    value={legalentity}
                    onSelect={(e) => setlegalentity(e.target.value)}
                  />
                )}
                renderOption={(props, option) => (
                  <Box style={{ fontSize: 11 }} {...props}>
                    {option.title}
                  </Box>
                )}
              />
            </Stack>
          </Box>
          <Box>
            <Stack>
              <Autocomplete
                value={vendorname}
                options={vendorList}
                getOptionLabel={(option) => option.title ?? option ?? ""}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ width: "120px" }}
                    label="Vendor Name"
                    value={vendorname}
                    onSelect={(e) => setvendorname(e.target.value)}
                  />
                )}
                renderOption={(props, option) => (
                  <Box style={{ fontSize: 11 }} {...props}>
                    {option.title}
                  </Box>
                )}
              />
            </Stack>
          </Box>
          <Box>
            <Stack>
              <Autocomplete
                value={actiontype}
                options={acTypeList}
                getOptionLabel={(option) => option.title ?? option ?? ""}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ width: "120px" }}
                    label="Action Type"
                    value={actiontype}
                    onSelect={(e) => setactiontype(e.target.value)}
                  />
                )}
                renderOption={(props, option) => (
                  <Box style={{ fontSize: 11 }} {...props}>
                    {option.title}
                  </Box>
                )}
              />
            </Stack>
          </Box>
          <Box>
            <Stack>
              <Autocomplete
                value={actionname}
                options={acNameList}
                getOptionLabel={(option) => option.title ?? option ?? ""}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ width: "120px" }}
                    label="Action Name"
                    value={actionname}
                    onSelect={(e) => setactionname(e.target.value)}
                  />
                )}
                renderOption={(props, option) => (
                  <Box style={{ fontSize: 11 }} {...props}>
                    {option.title}
                  </Box>
                )}
              />
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button onClick={resetFilter}>
            Reset <RestartAltIcon />
          </Button>
          <Button onClick={handleClickOpen}>
            Export <FileDownloadIcon />
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Select Export Format"}
              <Button onClick={handleClose}>Close</Button>
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
          <Button onClick={handleOpenCreateAction}>
            Create Action <AddIcon />
          </Button>

          <Dialog fullScreen open={openCreateAction} onClose={handleCloseCreateAction}>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openLoad}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <AppBar sx={{ position: "relative", bgcolor: "#2196f3" }}>
              <Toolbar>
                <IconButton
                  sx={{ color: "#f5f5f5" }}
                  edge="start"
                  color="inherit"
                  onClick={handleCloseCreateAction}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1, color: "#f5f5f5", fontWeight: "bold", textAlign: "center" }}
                  variant="h6"
                  component="div"
                >
                  Create New Action
                </Typography>
              </Toolbar>
            </AppBar>

            <FormControl
              onSubmit={createAction}
              sx={{ pt: 4, alignItems: "left" }}
              component="form"
              variant="standard"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Card sx={{ pl: 1, pr: 1, ml: 1, boxShadow: 3 }}>
                  <Typography
                    style={{
                      background: "#2196f3",
                      color: "white",
                      borderRadius: "5px",
                      padding: "5px",
                      fontSize: "15px",
                      width: "100px",
                      textAlign: "center",
                      position: "relative",
                      left: 5,
                      top: -15,
                      boxShadow: "1px 1px 5px black",
                    }}
                  >
                    General
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: 13, pt: 2.5 }}>Action Name</Typography>
                    <TextField
                      error={caActionNameError}
                      value={caActionName}
                      onChange={(e) => setcaActionName(e.target.value)}
                      size="small"
                      style={{ width: "200px", margin: "8px" }}
                      type="text"
                    />
                  </Box>
                  <FormHelperText style={{ marginLeft: "110px", color: "red" }}>
                    {caActionNameErrorText}
                  </FormHelperText>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: 13, pt: 2.5 }}>Budget Action</Typography>
                    <TextField
                      size="small"
                      style={{ width: "200px", margin: "8px" }}
                      type="text"
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
                    <Typography sx={{ fontSize: 13, pt: 2.5 }}>Type</Typography>
                    <FormControl>
                      <Select
                        IconComponent={() => (
                          <ArrowDropDownIcon style={{ width: "20px", height: "20px" }} />
                        )}
                        error={caTypeError}
                        value={caType}
                        onChange={(e) => setcaType(e.target.value)}
                        style={{ height: "35px", width: "200px", margin: "8px", fontSize: "12px" }}
                      >
                        <MenuItem value="Price - Negotiation">Price - Negotiation</MenuItem>
                        <MenuItem value="Product - ERP">Product - ERP</MenuItem>
                        <MenuItem value="Provision">Provision</MenuItem>
                        <MenuItem value="Rebate">Rebate</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <FormHelperText style={{ marginLeft: "110px", color: "red" }}>
                    {caTypeErrorText}
                  </FormHelperText>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: 13, pt: 2.5 }}>Type Details</Typography>
                    <FormControl>
                      <Select
                        IconComponent={() => (
                          <ArrowDropDownIcon style={{ width: "20px", height: "20px" }} />
                        )}
                        error={caTypeDetailError}
                        value={caTypeDetail}
                        onChange={(e) => setcaTypeDetail(e.target.value)}
                        style={{ height: "35px", width: "200px", margin: "8px", fontSize: "12px" }}
                      >
                        <MenuItem value="Percentage">Percentage</MenuItem>
                        <MenuItem value="Value">Value</MenuItem>
                        <MenuItem value="Value / Ton">Value / Ton</MenuItem>
                        <MenuItem value="Value / Piece">Value / Piece</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <FormHelperText style={{ marginLeft: "110px", color: "red" }}>
                    {caTypeDetailErrorText}
                  </FormHelperText>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: 13, pt: 2.5 }}>Numerical Value</Typography>
                    <TextField
                      error={NumericError}
                      value={Numeric}
                      onChange={(e) => setNumeric(e.target.value)}
                      size="small"
                      style={{ width: "200px", margin: "8px" }}
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <IconButton style={{ fontSize: "11px" }}>{numericSign}</IconButton>
                        ),
                      }}
                    />
                  </Box>
                  <FormHelperText style={{ marginLeft: "110px", color: "red" }}>
                    {NumericErrorText}
                  </FormHelperText>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: 13, pt: 2.5 }}>Plan Start</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        views={["month", "year"]}
                        minDate={minDate}
                        maxDate={maxDate}
                        value={planStart}
                        onChange={(newValue) => {
                          setplanStart(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            style={{ height: "40px", width: "200px", margin: "8px" }}
                            {...params}
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: 13, pt: 2.5 }}>Plan End</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        views={["month", "year"]}
                        minDate={minDate}
                        maxDate={maxDate}
                        value={planEnd}
                        onChange={(newValue) => {
                          setplanEnd(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            style={{ height: "40px", width: "200px", margin: "8px" }}
                            {...params}
                            helperText={null}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>

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
                      style={{ width: "200px", margin: "8px" }}
                      value="User"
                      type="text"
                      disabled
                    />
                  </Box>
                </Card>
                <Box>
                  <Card sx={{ pl: 1, pr: 1, ml: 1, boxShadow: 3, pb: 3 }}>
                    <Typography
                      style={{
                        background: "#2196f3",
                        color: "white",
                        borderRadius: "5px",
                        padding: "5px",
                        fontSize: "15px",
                        width: "100px",
                        textAlign: "center",
                        position: "relative",
                        left: 5,
                        top: -15,
                        boxShadow: "1px 1px 5px black",
                      }}
                    >
                      Supplier
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontSize: 13, pt: 2.5 }}>Group Supplier</Typography>
                      <Stack>
                        <Autocomplete
                          error={supError}
                          freeSolo
                          options={supList}
                          value={sup}
                          onChange={handleLoadSup}
                          getOptionLabel={(option) => option.title ?? option ?? ""}
                          disableClearable
                          renderInput={(params) => (
                            <TextField
                              error={supError}
                              {...params}
                              size="small"
                              value={sup}
                              style={{ width: "200px", margin: "8px" }}
                              onSelect={(e) => setSup(e.target.value)}
                            />
                          )}
                        />
                      </Stack>
                    </Box>
                    <FormHelperText style={{ marginLeft: "100px", color: "red" }}>
                      {supErrorText}
                    </FormHelperText>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontSize: 13, pt: 2.5 }}>Local Code</Typography>
                      <TextField
                        size="small"
                        style={{ width: "200px", margin: "8px" }}
                        type="text"
                        disabled
                      />
                    </Box>
                  </Card>
                  <Card sx={{ pl: 1, pr: 1, ml: 1, mt: 4, boxShadow: 3, pb: 3 }}>
                    <Typography
                      style={{
                        background: "#2196f3",
                        color: "white",
                        borderRadius: "5px",
                        padding: "5px",
                        fontSize: "15px",
                        width: "100px",
                        textAlign: "center",
                        position: "relative",
                        left: 5,
                        top: -15,
                        boxShadow: "1px 1px 5px black",
                      }}
                    >
                      Item
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontSize: 13, pt: 2.5 }}>Commodity</Typography>
                      <Stack>
                        <Autocomplete
                          error={comError}
                          freeSolo
                          options={comList}
                          value={com}
                          onChange={handleLoadCom}
                          getOptionLabel={(option) => option.title ?? option ?? ""}
                          disableClearable
                          renderInput={(params) => (
                            <TextField
                              error={comError}
                              {...params}
                              size="small"
                              value={com}
                              style={{ width: "200px", margin: "8px" }}
                              onSelect={(e) => setCom(e.target.value)}
                            />
                          )}
                        />
                      </Stack>
                    </Box>
                    <FormHelperText style={{ marginLeft: "100px", color: "red" }}>
                      {comErrorText}
                    </FormHelperText>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontSize: 13, pt: 2.5 }}>Subcommodity</Typography>
                      <Stack>
                        <Autocomplete
                          error={subComError}
                          freeSolo
                          options={subcomList}
                          value={subCom}
                          onChange={handleLoadSubCom}
                          getOptionLabel={(option) => option.title ?? option ?? ""}
                          disableClearable
                          renderInput={(params) => (
                            <TextField
                              error={subComError}
                              {...params}
                              size="small"
                              value={subCom}
                              style={{ width: "200px", margin: "8px" }}
                              onSelect={(e) => setSubCom(e.target.value)}
                              onBlur={createTableFilter}
                            />
                          )}
                        />
                      </Stack>
                    </Box>
                    <FormHelperText style={{ marginLeft: "100px", color: "red" }}>
                      {subComErrorText}
                    </FormHelperText>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontSize: 13, pt: 2.5 }}>Item</Typography>
                      <TextField
                        size="small"
                        style={{ width: "200px", margin: "8px" }}
                        type="text"
                        disabled
                      />
                    </Box>
                  </Card>
                  <Button
                    type="submit"
                    sx={{ mt: 3, mb: 1, width: 200, ml: 12 }}
                    variant="containedPrimary"
                  >
                    Create Action
                  </Button>
                  <Box>
                    <Button
                      variant="containedPrimary"
                      sx={{ width: 200, ml: 12 }}
                      onClick={resetFormData}
                    >
                      Reset <RestartAltIcon />
                    </Button>
                  </Box>
                </Box>
                <div className="ag-theme-alpine" style={{ width: 620, height: 500 }}>
                  <AgGridReact
                    ref={gridRefAction}
                    rowData={caTable} // Row Data for Rows
                    columnDefs={actionColumnDefs} // Column Defs for Columns
                    defaultColDef={actionDefaultColDef}
                    rowHeight={24}
                    onGridReady={onGridReadyCreateTable}
                    onRowDataUpdated={rowDataUpdated}
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                    overlayLoadingTemplate={
                      '<span class="ag-overlay-loading-center">Loading...</span>'
                    }
                    getRowStyle={getRowStyle}
                  />
                  <Typography style={{ fontSize: "15px" }}>Row : {caTable.length}</Typography>
                </div>
              </Box>
            </FormControl>
          </Dialog>

          <FormControlLabel
            style={{ display: "none" }}
            control={<Switch onChange={editmode} />}
            label="EDIT MODE"
          />
          {show && <FormControlLabel control={<Switch onChange={bulkmode} />} label="BULK MODE" />}
          {show && (
            <Button variant="textSuccess" onClick={savechanges}>
              save changes
            </Button>
          )}
        </Box>

        {visible && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box sx={{ minWidth: 20, m: 2, mt: 0, mb: 1 }}>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-label">Action Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={actiontypeupdate}
                  label="Age"
                  onChange={(e) => setactiontypeupdate(e.target.value)}
                  style={{ height: 40, width: 100 }}
                >
                  <MenuItem value="Price - Negotiation">Price - Negotiation</MenuItem>
                  <MenuItem value="Product - ERP">Product - ERP</MenuItem>
                  <MenuItem value="Provision">Provision</MenuItem>
                  <MenuItem value="Rebate">Rebate</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 20, m: 2, mt: 0, mb: 1 }}>
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-label">Action Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={actionnameupdate}
                  label="Age"
                  onChange={(e) => setactionnameupdate(e.target.value)}
                  style={{ height: 40, width: 100 }}
                >
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
            <Button onClick={bulkUpdate}>Bulk Update</Button>
          </Box>
        )}
      </Box>
      <div className="ag-theme-alpine" style={{ width: "100%", height: 520, fontSize: rowFont }}>
        <AgGridReact
          ref={gridRef}
          rowData={FilteredData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef}
          rowHeight={rowHeight}
          sideBar={sideBar}
          suppressClickEdit={true}
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection={"multiple"}
          suppressRowClickSelection={true}
          undoRedoCellEditing={true}
          isRowSelectable={isRowSelectable}
          onGridReady={onGridReady}
          onRowDataUpdated={rowDataUpdatedMain}
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
        <Typography style={{ fontSize: "15px" }}>Row : {FilteredData.length}</Typography>
      </div>

      {<ToastContainer style={{ fontSize: "15px" }} toastStyle={{ borderRadius: "10px" }} />}
    </DashboardLayout>
  );
}
