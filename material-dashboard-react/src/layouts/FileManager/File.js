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
// import "./action.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { FileManagerComponent } from "@syncfusion/ej2-react-filemanager";

/* refer the styles from package folder */
import "../../../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css";
import "../../../node_modules/@syncfusion/ej2-icons/styles/bootstrap5.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css";
import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/bootstrap5.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/bootstrap5.css";
import "../../../node_modules/@syncfusion/ej2-layouts/styles/bootstrap5.css";
import "../../../node_modules/@syncfusion/ej2-grids/styles/bootstrap5.css";
import "../../../node_modules/@syncfusion/ej2-react-filemanager/styles/bootstrap5.css";

export default function DataGridProDemo() {
  let hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
  return (
    <DashboardLayout>
      <FileManagerComponent
        id="file"
        ajaxSettings={{
          url: hostUrl + "api/FileManager/FileOperations",
        }}
      />
    </DashboardLayout>
  );
}
