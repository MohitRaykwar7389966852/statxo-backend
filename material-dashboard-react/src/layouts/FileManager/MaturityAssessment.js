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
import "./maturityStyle.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from '@mui/material/Snackbar';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

export default function DataGridProDemo() {

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "No",width:"70px",cellStyle:{background:"#0174DF",color:"white"}},
    { field: "Section",width:"110px",cellStyle:{background:"#81BEF7",color:"white"}},
    { field: "Basic"},
    { field: "Developing"},
    { field: "Progressing"},
    { field: "Advanced"},
    { field: "Market_Leading"},
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      cellStyle: { fontSize: "10px",lineHeight:"20px" },
      wrapText: true,
      autoHeight: true,
    };
  }, []);

  const rowData = [
    {
      No:1,
      Section:"Strategy/Vision",
      Basic:"No clear link between strategy or organisation and programme selection. Lack of a compelling vision for change agreed across the organisation.",
      Developing:"Some alignment between portfolio of change and strategy. Some programmes have clear imperative and vision, with some level of buy-in.",
      Progressing:"Portfolio of change broadly aligned to strategy with agreement across senior levels. Still lacking buy-in among wider employee base to own the change.",
      Advanced:"Well defined portfolio of change, which can flexibly adapt to changing environment. Majority of employees feel connected to the imperative and vision for change.",
      Market_Leading:"All change undertaken is aligned to strategy with widespread buy-in and ownership throughout organisation"
    },
    {
      No:2,
      Section:"LEADERSHIP",
      Basic:"No clear link between strategy or organisation and programme selection. Lack of a compelling vision for change agreed across the organisation.",
      Developing:"Some alignment between portfolio of change and strategy. Some programmes have clear imperative and vision, with some level of buy-in.",
      Progressing:"Portfolio of change broadly aligned to strategy with agreement across senior levels. Still lacking buy-in among wider employee base to own the change.",
      Advanced:"Well defined portfolio of change, which can flexibly adapt to changing environment. Majority of employees feel connected to the imperative and vision for change.",
      Market_Leading:"All change undertaken is aligned to strategy with widespread buy-in and ownership throughout organisation"
    },
    {
      No:3,
      Section:"CHANGE STRUCTURE",
      Basic:"No clear link between strategy or organisation and programme selection. Lack of a compelling vision for change agreed across the organisation.",
      Developing:"Some alignment between portfolio of change and strategy. Some programmes have clear imperative and vision, with some level of buy-in.",
      Progressing:"Portfolio of change broadly aligned to strategy with agreement across senior levels. Still lacking buy-in among wider employee base to own the change.",
      Advanced:"Well defined portfolio of change, which can flexibly adapt to changing environment. Majority of employees feel connected to the imperative and vision for change.",
      Market_Leading:"All change undertaken is aligned to strategy with widespread buy-in and ownership throughout organisation"
    },
    {
      No:4,
      Section:"CHANGE IMPACT",
      Basic:"No clear link between strategy or organisation and programme selection. Lack of a compelling vision for change agreed across the organisation.",
      Developing:"Some alignment between portfolio of change and strategy. Some programmes have clear imperative and vision, with some level of buy-in.",
      Progressing:"Portfolio of change broadly aligned to strategy with agreement across senior levels. Still lacking buy-in among wider employee base to own the change.",
      Advanced:"Well defined portfolio of change, which can flexibly adapt to changing environment. Majority of employees feel connected to the imperative and vision for change.",
      Market_Leading:"All change undertaken is aligned to strategy with widespread buy-in and ownership throughout organisation"
    },
    {
      No:5,
      Section:"BENEFITS REALISATION",
      Basic:"No clear link between strategy or organisation and programme selection. Lack of a compelling vision for change agreed across the organisation.",
      Developing:"Some alignment between portfolio of change and strategy. Some programmes have clear imperative and vision, with some level of buy-in.",
      Progressing:"Portfolio of change broadly aligned to strategy with agreement across senior levels. Still lacking buy-in among wider employee base to own the change.",
      Advanced:"Well defined portfolio of change, which can flexibly adapt to changing environment. Majority of employees feel connected to the imperative and vision for change.",
      Market_Leading:"All change undertaken is aligned to strategy with widespread buy-in and ownership throughout organisation"
    },
    {
      No:6,
      Section:"TRANSITION PLANNING",
      Basic:"No clear link between strategy or organisation and programme selection. Lack of a compelling vision for change agreed across the organisation.",
      Developing:"Some alignment between portfolio of change and strategy. Some programmes have clear imperative and vision, with some level of buy-in.",
      Progressing:"Portfolio of change broadly aligned to strategy with agreement across senior levels. Still lacking buy-in among wider employee base to own the change.",
      Advanced:"Well defined portfolio of change, which can flexibly adapt to changing environment. Majority of employees feel connected to the imperative and vision for change.",
      Market_Leading:"All change undertaken is aligned to strategy with widespread buy-in and ownership throughout organisation"
    },
    {
      No:7,
      Section:"PEOPLE CAPABILITY",
      Basic:"No clear link between strategy or organisation and programme selection. Lack of a compelling vision for change agreed across the organisation.",
      Developing:"Some alignment between portfolio of change and strategy. Some programmes have clear imperative and vision, with some level of buy-in.",
      Progressing:"Portfolio of change broadly aligned to strategy with agreement across senior levels. Still lacking buy-in among wider employee base to own the change.",
      Advanced:"Well defined portfolio of change, which can flexibly adapt to changing environment. Majority of employees feel connected to the imperative and vision for change.",
      Market_Leading:"All change undertaken is aligned to strategy with widespread buy-in and ownership throughout organisation"
    },
    {
      No:8,
      Section:"STAKEHOLDER MANAGEMENT",
      Basic:"No clear link between strategy or organisation and programme selection. Lack of a compelling vision for change agreed across the organisation.",
      Developing:"Some alignment between portfolio of change and strategy. Some programmes have clear imperative and vision, with some level of buy-in.",
      Progressing:"Portfolio of change broadly aligned to strategy with agreement across senior levels. Still lacking buy-in among wider employee base to own the change.",
      Advanced:"Well defined portfolio of change, which can flexibly adapt to changing environment. Majority of employees feel connected to the imperative and vision for change.",
      Market_Leading:"All change undertaken is aligned to strategy with widespread buy-in and ownership throughout organisation"
    },
    {
      No:9,
      Section:"CULTURE",
      Basic:"No clear link between strategy or organisation and programme selection. Lack of a compelling vision for change agreed across the organisation.",
      Developing:"Some alignment between portfolio of change and strategy. Some programmes have clear imperative and vision, with some level of buy-in.",
      Progressing:"Portfolio of change broadly aligned to strategy with agreement across senior levels. Still lacking buy-in among wider employee base to own the change.",
      Advanced:"Well defined portfolio of change, which can flexibly adapt to changing environment. Majority of employees feel connected to the imperative and vision for change.",
      Market_Leading:"All change undertaken is aligned to strategy with widespread buy-in and ownership throughout organisation"
    },
    {
      No:10,
      Section:"METHODOLOGY/TOOLS",
      Basic:"No clear link between strategy or organisation and programme selection. Lack of a compelling vision for change agreed across the organisation.",
      Developing:"Some alignment between portfolio of change and strategy. Some programmes have clear imperative and vision, with some level of buy-in.",
      Progressing:"Portfolio of change broadly aligned to strategy with agreement across senior levels. Still lacking buy-in among wider employee base to own the change.",
      Advanced:"Well defined portfolio of change, which can flexibly adapt to changing environment. Majority of employees feel connected to the imperative and vision for change.",
      Market_Leading:"All change undertaken is aligned to strategy with widespread buy-in and ownership throughout organisation"
    },
  ];

  return (
    <DashboardLayout>
        <Typography style={{
        fontWeight:"bold",
        marginTop:"10px",
        textAlign:"center",
        color:"#37474f",
        marginBottom:"10px"
      }}>Organisational Change Maturity Assessment</Typography>
      <div className="ag-theme-alpine" style={{width:"100%",height:"500px",fontSize:"12px"}}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
        />
      </div>
      
    </DashboardLayout>
  );
}
