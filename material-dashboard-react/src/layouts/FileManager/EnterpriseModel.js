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
// import "./pyramid.css";
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
import chart from './chart.png';
import table from './table.png';
import FileManager, { Permissions, ItemView } from "devextreme-react/file-manager";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import FileViewer from "react-file-viewer";

import CropFreeIcon from "@mui/icons-material/CropFree";
import MDBox from "components/MDBox";

// import "./Cube.css";
// import Cube from "react-3d-cube";
// import ConvertApi from "convertapi-js";
// import AnimateHeight from "react-animate-height";

export default function DataGridProDemo() {
  const [top1, setTop1] = useState({ display: "block" });
  const [top2, setTop2] = useState({ display: "none" });
  const [mid1, setMid1] = useState({ display: "block" });
  const [mid2, setMid2] = useState({ display: "none" });
  const [down1, setDown1] = useState({ display: "block" });
  const [down2, setDown2] = useState({ display: "none" });

  const [top3, setTop3] = useState({ display: "none" });
  const [mid3, setMid3] = useState({ display: "none" });
  const [down3, setDown3] = useState({ display: "none" });

  const [btnState,setbtnState] =useState(false);
  const [resetState,setresetState] =useState(true);

  const handleResetDN = () => {
    setresetState(true);
    setbtnState(false);
    setTop1({ display: "block" });
    setTop2({ display: "none" });

    setMid1({ display: "block" });
    setMid2({ display: "none" });

    setDown1({ display: "block" });
    setDown2({ display: "none" });

    setTop3({display:"none"});
    setMid3({display:"none"});
    setDown3({display:"none"});

  setmenu1({background:"none",color:"#0174DF"});
  setmenu2({background:"none",color:"#0174DF"});
  setmenu3({background:"none",color:"#0174DF"});
  setmenu4({background:"none",color:"#0174DF"});

  };

  const[menu1,setmenu1] = useState({background:"none",color:"#0174DF"});
  const[menu2,setmenu2] = useState({background:"none",color:"#0174DF"});
  const[menu3,setmenu3] = useState({background:"none",color:"#0174DF"});
  const[menu4,setmenu4] = useState({background:"none",color:"#0174DF"});

  const[midht,setmidht]=useState();
  const[midBtn,setmidBtn]=useState();
  const[downht,setdownht]=useState();
  const[downBtn,setdownBtn]=useState();
  const[capht,setcapht]=useState();
  const[capBtn,setcapBtn]=useState();
  const midRef = useRef(null);
  const downRef = useRef(null);
  const capRef = useRef(null);

  const handleTop = () => {
    setresetState(false);
    setTop1({ display: "none" });
    setTop2({ display: "block" });
    
    setTop3({ display: "none" });
    setMid3({ display: "none" });
    setDown3({ display: "none" });
    
  };

  const handleMid = () => {
    setresetState(false);
    setMid1({ display: "none" });
    setMid2({ display: "block" });
    setTop3({ display: "none" });
    setMid3({ display: "none" });
    setDown3({ display: "none" });
    setmidht();
  };

  const handleDown = () => {
    setresetState(false);
    setDown1({ display: "none" });
    setDown2({ display: "block" });
    setTop3({ display: "none" });
    setMid3({ display: "none" });
    setDown3({ display: "none" });
    setdownht();
  };

  const handleCap = () => {
    setmenu1({display:"none"});
    setmenu2({display:"none"});
    setmenu3({display:"none"});
    setresetState(false);
    setbtnState(true);

    setTop1({display:"none"});
    setTop2({display:"none"});
    setMid1({ display: "none" });
    setMid2({ display: "none" });
    setDown1({display:"none"});
    setDown2({display:"none"});

    setTop3({ display: "block" });
    setMid3({ display: "block" });
    setDown3({display:"block"});
    setcapht();

  };

  useEffect(()=>{
    if(mid1.display === "block"){
      setmidBtn(60);
    console.log(midBtn)
    }
    else{
    setmidBtn(midRef.current.offsetHeight);
    console.log(midBtn);
    }
  },[mid1,mid2,midht]);

  useEffect(()=>{
    if(down1.display === "block"){
      setdownBtn(60);
    console.log(downBtn)
    }
    else{
    setdownBtn(downRef.current.offsetHeight);
    console.log(downBtn);
    }
  },[down1,down2,downht]);

  useEffect(()=>{
    if(top3.display === "block" && capBtn === 60){
        setcapBtn(capRef.current.offsetHeight);
    }
    else if(top3.display === "none"){
    setcapBtn(60);
    }
  },[top3,mid3,down3,capht]);

  let navigate = useNavigate();

  const handleMaturity = () => {
    navigate("/maturity-assessment");
  };

  const handleMobilize = () => {
    navigate("/file-manager", { state: { path: "Program Project & Workstream/Mobilize" } });
  };

  const handleDesign = () => {
    navigate("/file-manager", { state: { path: "Program Project & Workstream/Design" } });
  };

  const handleEmplement = () => {
    navigate("/file-manager", { state: { path: "Program Project & Workstream/Emplement" } });
  };

  const handleEmbed = () => {
    navigate("/file-manager", { state: { path: "Program Project & Workstream/Embed" } });
  };

  return (
    <DashboardLayout>
      <Box
        style={{
          color: "white",
          fontSize: "15px",
        }}
      >
        <Typography style={{
        fontWeight:"bold",
        color:"#37474f",
        marginBottom:"50px",
        marginTop:"30px",
        marginLeft:"440px"
      }}>Transformation Delivery Enterprise Model <Button style={{position:"absolute",top:45,left:110}} variant="containedPrimary" disabled={resetState} onClick={handleResetDN}>< RestartAltIcon style={{width:"20px",height:"20px"}} size="large" /></Button></Typography>
    <Box style={{
      display:"flex",
      flexDirection:"row",
    }}>
    <Box style={{
          width:"160px",
          marginLeft:"60px",
          marginRight:"80px",
          marginBottom:"150px",
          marginTop:"5px"
          }}>
          <Button onClick={handleTop} style={{width:"125px",height:"90px",marginBottom:"5px",boxShadow:"3px 3px 3px grey"}} sx={menu1} variant="containedPrimary" >Transformation Delivery NETWORK</Button>
          <Button onClick={handleMid} style={{width:"125px",height:midBtn,marginBottom:"5px",boxShadow:"3px 3px 3px grey"}} sx={menu2} variant="containedPrimary">Transformation Delivery TOOLKIT</Button>
          <Button onClick={handleDown} style={{width:"125px",height:downBtn,marginBottom:"5px",boxShadow:"3px 3px 3px grey"}} sx={menu3} variant="containedPrimary">Transformation Delivery STRUCTURE</Button>
          <Button onClick={handleCap} style={{width:"125px",height:capBtn,marginBottom:"5px",boxShadow:"3px 3px 3px grey"}} sx={menu4} variant="containedPrimary">Transformation Delivery CAPABILITY</Button>
        </Box>
        <Box ref={capRef} style={{fontSize:"13px"}}>
        <Box
          style={{
            width: "700px",
            background: "#1565c0",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "5px",
            padding: "10px",
            borderRadius:"10px 10px 0 0"
          }}
          sx={top1}
          onClick={handleTop}
        >
          TRANSFORMATION NETWORK
        </Box>
        <Box
          style={{
            width: "700px",
            background: "#1565c0",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "5px",
            padding: "10px",
          }}
          sx={top1}
          onClick={handleTop}
        >
          CULTURE AND BEHAVIOURS
        </Box>

        <Box
          style={{
            width: "700px",
            background: "#1565c0",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "5px",
            padding: "10px",
            borderRadius:"10px 10px 0 0"
          }}
          sx={top2}
        >
          IMPACTED EMPLOYEES
        </Box>
        <Box
          style={{
            width: "700px",
            background: "#1565c0",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "5px",
            padding: "10px",
          }}
          sx={top2}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <p>EXECUTIVE SPONSORS</p>
            <p>FUNCTIONAL LEADERS</p>
            <p>CHANGE AGENTS</p>
          </Box>
        </Box>

        <Box
          style={{
            width: "700px",
            background: "#1565c0",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "5px",
            padding: "10px",
            borderRadius:"10px 10px 0 0"
          }}
          sx={top3}
        >
          CHANGE NETWORK
        </Box>
        <Box
          style={{
            width: "700px",
            background: "#1565c0",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "5px",
            padding: "10px",
          }}
          sx={top3}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <p>EXECUTIVE SPONSORS</p>
            <p>FUNCTIONAL LEADERS</p>
            <p>MANAGERS & CHANGE AGENTS</p>
          </Box>
        </Box>

        <Box
          style={{
            width: "700px",
            background: "#90caf9",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "7px",
            padding: "10px",
          }}
          sx={mid1}
          onClick={handleMid}
        >
          TRANSFORMATION DELIVERY TOOLKIT
          <p style={{ fontSize: "13px" }}>
            Creating organisations consistent toolkit to delivering change
          </p>
        </Box>

        <Box
          style={{
            width: "700px",
            background: "#90caf9",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "7px",
            padding: "10px",
          }}
          sx={mid3}
        >All Employee
        </Box>

        <Box
        ref={midRef}
          style={{
            width: "700px",
            background: "#90caf9",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "5px",
            padding: "10px",
          }}
          sx={mid2}
        >
          <Accordion
            style={{
              width: "500px",
              marginLeft: "90px",
              marginBottom: "3px",
              background: "#1565c0",
            }}
          >
            <AccordionSummary style={{ color: "white" }} expandIcon={<ExpandMoreIcon />}>
              <Typography
                style={{
                  textAlign: "center",
                  width: "480px",
                  fontSize: "12px",
                }}
              >
                PROGRAMES, PROJECTS & WORKSTREAMS
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
                onClick={handleMobilize}
                style={{ marginLeft: "5px" }}
                variant="containedPrimary"
              >
                Mobilize
              </Button>
              <Button
                onClick={handleDesign}
                style={{ marginLeft: "5px" }}
                variant="containedPrimary"
              >
                Design
              </Button>
              <Button
                onClick={handleEmplement}
                style={{ marginLeft: "5px" }}
                variant="containedPrimary"
              >
                Emplement
              </Button>
              <Button
                onClick={handleEmbed}
                style={{ marginLeft: "5px" }}
                variant="containedPrimary"
              >
                Embed
              </Button>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              width: "500px",
              marginLeft: "90px",
              marginBottom: "3px",
              background: "#1565c0",
            }}
          >
            <AccordionSummary style={{ color: "white" }} expandIcon={<ExpandMoreIcon />}>
              <Typography
                style={{
                  textAlign: "center",
                  width: "480px",
                  fontSize: "12px",
                }}
              >
                People Change Management
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Mobilize
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Design
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Emplement
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Embed
              </Button>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              width: "500px",
              marginLeft: "90px",
              marginBottom: "3px",
              background: "#1565c0",
            }}
          >
            <AccordionSummary style={{ color: "white" }} expandIcon={<ExpandMoreIcon />}>
              <Typography
                style={{
                  textAlign: "center",
                  width: "480px",
                  fontSize: "12px",
                }}
              >
                Operating Model Design
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Mobilize
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Design
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Emplement
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Embed
              </Button>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              width: "500px",
              marginLeft: "90px",
              marginBottom: "3px",
              background: "#1565c0",
            }}
          >
            <AccordionSummary style={{ color: "white" }} expandIcon={<ExpandMoreIcon />}>
              <Typography
                style={{
                  textAlign: "center",
                  width: "480px",
                  fontSize: "12px",
                }}
              >
                Program Management
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Mobilize
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Design
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Emplement
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Embed
              </Button>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box
          style={{
            width: "700px",
            background: "#90caf9",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "7px",
            padding: "10px",
          }}
          sx={down1}
          onClick={handleDown}
        >
          TRANSFORMATION DELIVERY STRUCTURE
          <p style={{ fontSize: "12px" }}>
            Creating organisations consistent toolkit to delivering change
          </p>
        </Box>

        <Box
          style={{
            width: "700px",
            background: "#90caf9",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "7px",
            padding: "10px",
          }}
          sx={down3}
        >
          <img src={chart} width="650px" />
        </Box>

        <Box
        ref={downRef}
          style={{
            width: "700px",
            background: "#90caf9",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "5px",
            padding: "10px",
          }}
          sx={down2}
        >
          <Accordion
            style={{
              width: "500px",
              marginLeft: "90px",
              marginBottom: "3px",
              background: "#1565c0",
            }}
          >
            <AccordionSummary style={{ color: "white" }} expandIcon={<ExpandMoreIcon />}>
              <Typography
                style={{
                  textAlign: "center",
                  width: "480px",
                  fontSize: "13px",
                }}
              >
                Change Portfolio Alignment
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Mobilize
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Design
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Emplement
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Embed
              </Button>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              width: "500px",
              marginLeft: "90px",
              marginBottom: "3px",
              background: "#1565c0",
            }}
          >
            <AccordionSummary style={{ color: "white" }} expandIcon={<ExpandMoreIcon />}>
              <Typography
                style={{
                  textAlign: "center",
                  width: "480px",
                  fontSize: "13px",
                }}
              >
                Bussiness Unit Change Hub
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Mobilize
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Design
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Emplement
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Embed
              </Button>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              width: "500px",
              marginLeft: "90px",
              marginBottom: "3px",
              background: "#1565c0",
            }}
          >
            <AccordionSummary style={{ color: "white" }} expandIcon={<ExpandMoreIcon />}>
              <Typography
                style={{
                  textAlign: "center",
                  width: "480px",
                  fontSize: "13px",
                }}
              >
                Program Management
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Mobilize
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Design
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Emplement
              </Button>
              <Button style={{ marginLeft: "5px" }} variant="containedPrimary">
                Embed
              </Button>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box
          style={{
            width: "700px",
            background: "#1565c0",
            boxShadow: "5px 5px 5px black",
            textAlign: "center",
            margin: "7px",
            padding: "10px",
            borderRadius:"0 0 10px 10px"
          }}
          onClick={handleMaturity}
        >
          TRANSFORMATION MATURITY ASSESSMENT
        </Box>
      </Box>
      </Box>
      </Box>
    </DashboardLayout>
  );
}
