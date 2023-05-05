import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
import "./file.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import FileManager, { Permissions, ItemView } from "devextreme-react/file-manager";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import FileViewer from "react-file-viewer";

import CropFreeIcon from "@mui/icons-material/CropFree";
import MDBox from "components/MDBox";

import "./Cube.css";
import Cube from "react-3d-cube";

import ConvertApi from "convertapi-js";

import Dropdown from "react-bootstrap/Dropdown";

export default function DataGridProDemo() {
  const [fileItems, setFileItems] = useState([
    {
      name: "Program Project & Workstream",
      isDirectory: true,
      items: [
        {
          name: "Mobilize",
          isDirectory: true,
          items: [
            {
              name: "file.txt",
              isDirectory: false,
              value: "this is normal text file",
            },
          ],
        },
        {
          name: "Design",
          isDirectory: true,
          items: [
            {
              name: "file.txt",
              isDirectory: false,
              value: "this is normal text file",
            },
          ],
        },
        {
          name: "Emplement",
          isDirectory: true,
          items: [
            {
              name: "file.txt",
              isDirectory: false,
              value: "this is normal text file",
            },
          ],
        },
        {
          name: "Embed",
          isDirectory: true,
          items: [
            {
              name: "file.txt",
              isDirectory: false,
              value: "this is normal text file",
            },
          ],
        },
      ],
    },
    {
      name: "Education",
      isDirectory: true,
      items: [
        {
          name: "Education.txt",
          isDirectory: false,
          value: "this is normal text file",
        },
      ],
    },
    {
      name: "Process",
      isDirectory: true,
      items: [
        {
          name: "process.txt",
          isDirectory: false,
          value: "this is normal text file",
        },
      ],
    },
    {
      name: "Methodology",
      isDirectory: true,
      items: [
        {
          name: "Methodology.txt",
          isDirectory: false,
          value: "this is normal text file",
        },
      ],
    },
    {
      name: "Tools",
      isDirectory: true,
      items: [
        {
          name: "Tool-1",
          isDirectory: true,
          items: [
            {
              name: "tool1.txt",
              isDirectory: false,
              value: "this is normal text file",
            },
          ],
        },
        {
          name: "Tool-2",
          isDirectory: true,
          items: [
            {
              name: "tool2.txt",
              isDirectory: false,
              value: "this is normal text file",
            },
          ],
        },
        {
          name: "Tool-3",
          isDirectory: true,
          items: [
            {
              name: "tool3.txt",
              isDirectory: false,
              value: "this is normal text file",
            },
          ],
        },
      ],
    },
  ]);
  const [fileSource, setFileSource] = useState([]);

  const [itemViewMode, setitemViewMode] = useState("thumbnails");

  const onOptionChanged = (e) => {
    // console.log(e);
    if (e.fullName === "itemView.mode") {
      setitemViewMode(e.value);
    }
  };

  // <div>
  //       <center>
  //         <div
  //           style={{
  //             width: 300,
  //             height: 300,
  //           }}
  //         >
  //           <Cube size={300} index="front">
  //             <div
  //               style={{
  //                 background: "red",
  //                 width: "100%",
  //                 height: "100%",
  //                 padding: "10px",
  //                 color: "white",
  //               }}
  //             >
  //               There is no one who loves pain itself, who seeks after it and wants to have it,
  //               simply because it is pain.
  //             </div>
  //             <div
  //               style={{
  //                 background: "blue",
  //                 width: "100%",
  //                 height: "100%",
  //                 padding: "10px",
  //                 color: "white",
  //               }}
  //             >
  //               There is no one who loves pain itself, who seeks after it and wants to have it,
  //               simply because it is pain.
  //             </div>
  //             <div
  //               style={{
  //                 background: "green",
  //                 width: "100%",
  //                 height: "100%",
  //                 padding: "10px",
  //                 color: "white",
  //               }}
  //             >
  //               There is no one who loves pain itself, who seeks after it and wants to have it,
  //               simply because it is pain.
  //             </div>
  //             <div
  //               style={{
  //                 background: "yellow",
  //                 width: "100%",
  //                 height: "100%",
  //                 padding: "10px",
  //                 color: "white",
  //               }}
  //             >
  //               There is no one who loves pain itself, who seeks after it and wants to have it,
  //               simply because it is pain.
  //             </div>
  //             <div
  //               style={{
  //                 background: "grey",
  //                 width: "100%",
  //                 height: "100%",
  //                 padding: "10px",
  //                 color: "white",
  //               }}
  //             >
  //               There is no one who loves pain itself, who seeks after it and wants to have it,
  //               simply because it is pain.
  //             </div>
  //             <div
  //               style={{
  //                 background: "pink",
  //                 width: "100%",
  //                 height: "100%",
  //                 padding: "10px",
  //                 color: "white",
  //               }}
  //             >
  //               There is no one who loves pain itself, who seeks after it and wants to have it,
  //               simply because it is pain.
  //             </div>
  //           </Cube>
  //         </div>
  //       </center>
  //     </div>

  const customizeIcon = (fileSystemItem) => {
    if (fileSystemItem.isDirectory) {
      return "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/thumbnails/folder.svg";
    }
    const fileExtension = fileSystemItem.getFileExtension();
    switch (fileExtension) {
      case ".txt":
        return "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/thumbnails/doc-txt.svg";
      case ".pdf":
        return "https://icones.pro/wp-content/uploads/2021/03/icone-pdf-symbole-png-rouge.png";
      case ".xlsx":
        return "https://icones.pro/wp-content/uploads/2021/04/icone-excel-vert.png";
      case ".docx":
        return "https://icones.pro/wp-content/uploads/2022/06/icone-microsoft-word.png";
      case ".ppt":
        return "https://icones.pro/wp-content/uploads/2021/09/icone-de-fichier-powerpoint-rouge.png";
      case ".pptx":
        return "https://icones.pro/wp-content/uploads/2021/09/icone-de-fichier-powerpoint-rouge.png";
      case ".jpg":
        return "https://sunrust.org/wiki/images/a/a9/Gallery_icon.png";
      case ".png":
        return "https://sunrust.org/wiki/images/a/a9/Gallery_icon.png";
    }
  };

  const folderCreated = (e) => {
    console.log("folderCreated");
    setFileItems([...fileItems]);
  };

  const [fileUrl, setFileUrl] = useState([{}]);
  const [ViewBar, setViewBar] = useState({ width: "0px", display: "none" });
  const [DocRender, setDocRender] = useState({ display: "none" });
  const [OrgRender, setOrgRender] = useState({ display: "none" });
  const [zoom, setZoom] = useState(false);

  const [file, setFile] = useState("");
  const [ft, setFt] = useState("");

  const [fname, setFname] = useState("");
  const [linkUrl, setlinkUrl] = useState("");
  const [b64, setb64] = useState("");

  const SelectedFileOpened = (e) => {
    // e.component.executeAction("open", { file: e.file });
    setFileUrl([{ uri: "", fileType: "" }]);
    console.log("item opened");
    let fileName = e.file.name;
    let ext = fileName.split(".").pop();
    let code = e.file.dataItem.content;
    let res = `data:${ext};base64,${code}`;
    // let file = new File([code], fileName, { type: ext });

    let byteStr = atob(res.split(",")[1]);
    let ab = new ArrayBuffer(byteStr.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteStr.length; i++) {
      ia[i] = byteStr.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: ext });
    let fUrl = URL.createObjectURL(blob);
    console.log(fUrl);
    if (ext === "xlsx" || ext === "docx") {
      setFile(fUrl);
      setFt(ext);
      setDocRender({ display: "block" });
      setOrgRender({ display: "none" });
    } else {
      setDocRender({ display: "none" });
      setOrgRender({ display: "block" });
      setFileUrl([{ uri: fUrl, fileType: ext, fileName: fileName }]);
    }

    setViewBar({
      display: "block",
      width: "1100px",
      height: "600px",
      background: "white",
      overflow: "scroll",
    });
  };

  useEffect(() => {
    console.log(fileItems);
  }, [fileItems]);

  useEffect(() => {
    if (fileUrl.length !== 0) console.log(fileUrl);
  }, [fileUrl]);

  const handleCloseView = () => {
    setViewBar({ width: "0px", display: "none" });
    setFileUrl([{}]);
  };

  const handleZoom = () => {
    if (zoom === false) {
      setZoom(true);
      setViewBar({
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 2000,
        background: "white",
        display: "block",
      });
    } else {
      setZoom(false);
      setViewBar({
        width: "1100px",
        height: "600px",
        background: "white",
        display: "block",
        overflow: "scroll",
      });
    }
  };

  const [cp, setCP] = useState("");
  const [fcp, setFCP] = useState(false);

  let loc = useLocation();

  const contentReady = (e) => {
    if (fcp === false) {
      setFCP(true);
      if (loc.state === null) console.log("current path state null");
      else {
        setCP(loc.state.path);
        window.history.replaceState({}, document.title);
      }
    }
  };

  const directoryChange = (e) => {
    let path = e.directory.pathKeys;
    let cPath = path[path.length - 1];
    setCP(cPath);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };
  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleTool1 = () => {
    setAnchorEl1(null);
    window.open("https://www.google.com/");
  };

  const handleTool2 = () => {
    setAnchorEl1(null);
    window.open("https://react.dev/");
  };

  const handleTool3 = () => {
    setAnchorEl1(null);
    window.open("https://www.npmjs.com/");
  };

  const handleEducation = () => {
    setAnchorEl2(null);
    window.open("https://www.statxo.com/");
  };

  const handleProcess = () => {
    setAnchorEl3(null);
    window.open(
      "https://venngage-wordpress.s3.amazonaws.com/uploads/2022/09/Project-Workflow-Chart.png"
    );
  };

  const handleMethodology = () => {
    setAnchorEl4(null);
    window.open("https://cdn2.hubspot.net/hub/127273/file-2233387379-png/PMO_Methodology.png");
  };

  const handlepdf = () => {
    window.open("https://statxo-my.sharepoint.com/:b:/p/mohit_raykwar/ERw8e8mTg11Kk-SuMNrKTE4BmSTfEzYRvmTgTjyyQJhUqg?e=b5gGjy");
  };

  return (
    <DashboardLayout>
      <Box
        style={{
          background: "#1565c0",
          boxShadow: "2px 2px 5px grey",
          width: "100%",
          marginBottom: "5px",
          marginTop: "5px",
        }}
      >
        <Button style={{color:"white"}} onClick={handleClick1}>Tools</Button>
        <Menu
          anchorEl={anchorEl1}
          open={open1}
          onClose={handleClose1}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleTool1}>Tool 1</MenuItem>
          <MenuItem onClick={handleTool2}>Tool 2</MenuItem>
          <MenuItem onClick={handleTool3}>Tool 3</MenuItem>
        </Menu>

        <Button style={{color:"white"}} onClick={handleClick2}>Education</Button>
        <Menu
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleEducation}>Education 1</MenuItem>
          <MenuItem onClick={handleEducation}>Education 2</MenuItem>
          <MenuItem onClick={handleEducation}>Education 3</MenuItem>
        </Menu>

        <Button style={{color:"white"}} onClick={handleClick3}>Process</Button>
        <Menu
          anchorEl={anchorEl3}
          open={open3}
          onClose={handleClose3}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handlepdf}>Process 1</MenuItem>
          <MenuItem onClick={handleProcess}>Process 2</MenuItem>
          <MenuItem onClick={handleProcess}>Process 3</MenuItem>
        </Menu>

        <Button style={{color:"white"}} onClick={handleClick4}>Methodology</Button>
        <Menu
          anchorEl={anchorEl4}
          open={open4}
          onClose={handleClose4}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleMethodology}>Methodology 1</MenuItem>
          <MenuItem onClick={handleMethodology}>Methodology 2</MenuItem>
          <MenuItem onClick={handleMethodology}>Methodology 3</MenuItem>
        </Menu>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <FileManager
          currentPath={cp}
          onContentReady={contentReady}
          onCurrentDirectoryChanged={directoryChange}
          fileSystemProvider={fileItems}
          onDirectoryCreated={folderCreated}
          onSelectedFileOpened={SelectedFileOpened}
          customizeThumbnail={customizeIcon}
          height={600}
          style={{ width: "100%",background:"#90caf9" }}
          onOptionChanged={onOptionChanged}
        >
          <ItemView mode={itemViewMode}></ItemView>
          <Permissions
            create={true}
            copy={true}
            move={true}
            delete={true}
            rename={true}
            upload={true}
            download={true}
          ></Permissions>
        </FileManager>
        <Box style={ViewBar}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="2.25rem"
              height="2.25rem"
              bgColor="white"
              shadow="sm"
              borderRadius="50%"
              color="dark"
              onClick={handleCloseView}
              sx={{ cursor: "pointer", m: 1 }}
            >
              <CloseIcon />
            </MDBox>
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="2.25rem"
              height="2.25rem"
              bgColor="white"
              shadow="sm"
              borderRadius="50%"
              color="dark"
              onClick={handleZoom}
              sx={{ cursor: "pointer", m: 1 }}
            >
              <CropFreeIcon />
            </MDBox>
          </Box>
          <Box style={DocRender}>
            <FileViewer fileType={ft} filePath={file} />
          </Box>
          <Box style={OrgRender}>
            <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={fileUrl}
              config={{
                header: {
                  disableHeader: false,
                  disableFileName: false,
                  retainURLParams: false,
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
