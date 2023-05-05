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

  const[vision,setVision] = useState({
    transform: "scaleX(0)",
  });

  const[action,setAction] = useState({
    transform: "scaleX(0)",
  });

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
    if(top3.display === "block"){
      setcapBtn(capRef.current.offsetHeight);
    console.log(capBtn)
    }
    else{
    setcapBtn(60);
    console.log(capBtn);
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

  const [btn1, setBtn1] = useState({
    width: "100px",
    position: "absolute",
    top: 100,
    left: 310,
    opacity: 0,
  });

  const [btn2, setBtn2] = useState({
    width: "100px",
    position: "absolute",
    top: 100,
    left: 460,
    opacity: 0,
  });

  const [btn3, setBtn3] = useState({
    width: "100px",
    position: "absolute",
    top: 100,
    left: 620,
    opacity: 0,
  });

  const [btn4, setBtn4] = useState({
    width: "100px",
    position: "absolute",
    top: 100,
    left: 780,
    opacity: 0,
  });

  const [btn5, setBtn5] = useState({
    width: "100px",
    position: "absolute",
    top: 100,
    left: 935,
    opacity: 0,
  });

  const [animate1, setAnimate1] = useState({transform: "scaleY(0)",});

  const [animate2, setAnimate2] = useState({transform: "scaleY(0)",});

  const [animate3, setAnimate3] = useState({transform: "scaleY(0)",});

  const [animate4, setAnimate4] = useState({transform: "scaleY(0)",});

  const [animate5, setAnimate5] = useState({transform: "scaleY(0)",});

  const [round1, setRound1] = useState({opacity: 0});
  const [round2, setRound2] = useState({opacity: 0});
  const [round3, setRound3] = useState({opacity: 0});
  const [round4, setRound4] = useState({opacity: 0});
  const [round5, setRound5] = useState({opacity: 0});

  const handleAnimate = () => {

    setVision({
      width:"290px",
      height:"2px",
      background:"grey", 
      transition:"transform 1500ms",
      transformOrigin:"0 0",
      transform: "scaleX(1)",
      transitionDelay:"500ms"
    });

    setAction({
      width:"160px",
      height:"2px",
      background:"grey", 
      transition:"transform 1500ms",
      transformOrigin:"0 0",
      transform: "scaleX(1)",
      transitionDelay:"1500ms"
    });

    setRound1({
      border:"2px solid #64b5f6",
      width:"30px",
      height:"30px",
      borderRadius:"50%",
      position:"absolute",
      top:355,
      left:310,
      zIndex:20,
      opacity: 1,
      transition: "opacity 100ms",
      transitionDelay: "500ms",
    });

    setRound2({
      border:"2px solid #64b5f6",
      width:"30px",
      height:"30px",
      borderRadius:"50%",
      position:"absolute",
      top:355,
      left:450,
      zIndex:20,
      opacity: 1,
      transition: "opacity 100ms",
      transitionDelay: "1000ms",
    });

    setRound3({
      border:"2px solid #64b5f6",
      width:"30px",
      height:"30px",
      borderRadius:"50%",
      position:"absolute",
      top:355,
      left:610,
      zIndex:20,
      opacity: 1,
      transition: "opacity 100ms",
      transitionDelay: "1500ms",
    });

    setRound4({
      border:"2px solid #64b5f6",
      width:"30px",
      height:"30px",
      borderRadius:"50%",
      position:"absolute",
      top:355,
      left:760,
      zIndex:20,
      opacity: 1,
      transition: "opacity 100ms",
      transitionDelay: "2000ms",
    });

    setRound5({
      border:"2px solid #64b5f6",
      width:"30px",
      height:"30px",
      borderRadius:"50%",
      position:"absolute",
      top:355,
      left:910,
      zIndex:20,
      opacity: 1,
      transition: "opacity 100ms",
      transitionDelay: "2500ms",
    });

    setAnimate1({
      width: "2px",
      height: "200px",
      borderLeft: "2px dotted #64b5f6",
      transition: "transform 500ms",
      transform: "scaleY(1)",
      position: "absolute",
      top: 155,
      left: 323,
    });

    setBtn1({
      background:"#64b5f6",
      width: "100px",
      position: "absolute",
      top: 110,
      left: 280,
      opacity: 1,
      transition: "opacity 100ms",
      transitionDelay: "500ms",
    });

    setAnimate2({
      width: "2px",
      height: "120px",
      borderLeft: "2px dotted #64b5f6",
      transition: "transform 500ms",
      transitionDelay: "500ms",
      transform: "scaleY(1)",
      position: "absolute",
      top: 235,
      left: 463,
      zIndex:20
    });

    setBtn2({
      background:"#64b5f6",
      width: "100px",
      position: "absolute",
      top: 190,
      left: 417,
      opacity: 1,
      transition: "opacity 100ms",
      transitionDelay: "1000ms",
    });

    setAnimate3({
      width: "2px",
      height: "70px",
      borderLeft: "2px dotted #64b5f6",
      transition: "transform 500ms",
      transitionDelay: "1000ms",
      transform: "scaleY(1)",
      position: "absolute",
      top: 287,
      left: 623,
      zIndex:20
    });

    setBtn3({
      background:"#64b5f6",
      width: "100px",
      position: "absolute",
      top: 250,
      left: 575,
      opacity: 1,
      transition: "opacity 100ms",
      transitionDelay: "1500ms",
    });

    setAnimate4({
      width: "2px",
      height: "140px",
      borderLeft: "2px dotted #64b5f6",
      transition: "transform 500ms",
      transitionDelay: "1500ms",
      transform: "scaleY(1)",
      position: "absolute",
      top: 215,
      left: 774,
    });

    setBtn4({
      background:"#64b5f6",
      width: "100px",
      position: "absolute",
      top: 170,
      left: 725,
      opacity: 1,
      transition: "opacity 100ms",
      transitionDelay: "2000ms",
    });

    setAnimate5({
      width: "2px",
      height: "200px",
      borderLeft: "2px dotted #64b5f6",
      transition: "transform 500ms",
      transitionDelay: "2000ms",
      transform: "scaleY(1)",
      position: "absolute",
      top: 155,
      left: 925,
      zIndex:20
    });

    setBtn5({
      background:"#64b5f6",
      width: "100px",
      position: "absolute",
      top: 120,
      left: 875,
      opacity: 1,
      transition: "opacity 100ms",
      transitionDelay: "2500ms",
    });
  };

  useEffect(handleAnimate,[]);

  return (
    <DashboardLayout>
      <Typography style={{
        fontWeight:"bold",
        marginTop:"10px",
        marginLeft:"310px",
        color:"#37474f"
      }}>Approach To Transformation Delivery To Drive Vision Into Action</Typography>
      <Box>
        <Button variant="containedPrimary" style={btn1}>
          situational assessment
          <Box style={{width:"0px",height:"0px",border:"10px solid transparent",borderTop:"10px solid #64b5f6",position:"absolute",top:45,left:34,zIndex:30}}></Box>
        </Button>
        <Button variant="containedPrimary" style={btn2}>
          strategy development
          <Box style={{width:"0px",height:"0px",border:"10px solid transparent",borderTop:"10px solid #64b5f6",position:"absolute",top:45,left:37,zIndex:30}}></Box>
        </Button>
        <Button variant="containedPrimary" style={btn3}>
          strategy deployment
          <Box style={{width:"0px",height:"0px",border:"10px solid transparent",borderTop:"10px solid #64b5f6",position:"absolute",top:45,left:39,zIndex:30}}></Box>
        </Button>
        <Button variant="containedPrimary" style={btn4}>
          strategy enabling
          <Box style={{width:"0px",height:"0px",border:"10px solid transparent",borderTop:"10px solid #64b5f6",position:"absolute",top:45,left:40,zIndex:30}}></Box>
        </Button>
        <Button variant="containedPrimary" style={btn5}>
          capability building
          <Box style={{width:"0px",height:"0px",border:"10px solid transparent",borderTop:"10px solid #64b5f6",position:"absolute",top:45,left:40,zIndex:30}}></Box>
        </Button>

        <Box style={round1}></Box>
        <Box style={round2}></Box>
        <Box style={round3}></Box>
        <Box style={round4}></Box>
        <Box style={round5}></Box>

        <Box style={animate1}></Box>
        <Box style={animate2}></Box>
        <Box style={animate3}></Box>
        <Box style={animate4}></Box>
        <Box style={animate5}></Box>
        <Box
          style={{
            background: "#1565c0",
            width: "600px",
            height: "40px",
            marginTop: "300px",
            marginLeft: "300px",
            marginBottom: "100px",
          }}
        >
          <Typography style={{
            position:"absolute",
            top:360,
            left:470,
            zIndex:30,
            color:"white",
            fontSize:"15px",
          }}>TRANSFORMATION DELIVERY FRAMEWORK</Typography>
          <Box
            style={{
              background: "#90caf9",
              width: "600px",
              height: "50px",
              transform: "skewX(-50deg) rotateX(55deg)",
              position: "relative",
              top: -40,
              left: 17,
            }}
          ></Box>
          <Box
            style={{
              background: "#90caf9",
              width: "40px",
              height: "40px",
              marginTop: "20px",
              transform: "skewY(-40deg) rotateY(30deg)",
              position: "relative",
              top: -85,
              left: 598,
            }}
          ></Box>
        </Box>
        <Box style={{
          position:"absolute",
          top:420,
          left:320
        }}>
        <Typography style={{
            color:"grey",
            fontSize:"15px"
          }}>Vision</Typography>
          <Box style={vision}></Box>
          <ArrowRightIcon style={{
            position:"relative",
            top:-14,
            left:280
          }} />
        </Box>
        <Box style={{
          position:"absolute",
          top:420,
          left:780
        }}>
        <Typography style={{
            color:"grey",
            fontSize:"15px"
          }}>Action</Typography>
          <Box style={action}></Box>
          <ArrowRightIcon style={{
            position:"relative",
            top:-14,
            left:150
          }} />
        </Box>
      </Box>   
      </DashboardLayout>
  );
}
