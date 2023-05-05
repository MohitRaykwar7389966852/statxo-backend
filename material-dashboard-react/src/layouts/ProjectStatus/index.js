import React, { useState } from "react";
import Iframe from "react-iframe";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { ToastContainer, toast } from "react-toastify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CropFreeIcon from "@mui/icons-material/CropFree";
import MDBox from "components/MDBox";

function ProjectStatus() {
  const [tabDisplay, setTabDisplay] = React.useState({ display: "block" });
  const [tabStyle, setTabStyle] = React.useState({});
  const [frameHeight, setFrameHeight] = React.useState("645px");
  const [zoom, setZoom] = React.useState(true);

  const fullScreen = () => {
    if (zoom === true) {
      setTabDisplay({ display: "none" });
      setFrameHeight("100%");
      setTabStyle({
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 2000,
      });
      setZoom(false);
    } else {
      setTabDisplay({ display: "block" });
      setFrameHeight("645px");
      setTabStyle({});
      setZoom(true);
    }
  };
  return (
    <DashboardLayout>
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="3.25rem"
        height="3.25rem"
        bgColor="white"
        shadow="sm"
        borderRadius="50%"
        position="fixed"
        right="2rem"
        bottom="6rem"
        zIndex={2001}
        color="dark"
        sx={{ cursor: "pointer" }}
        onClick={fullScreen}
      >
        <CropFreeIcon />
      </MDBox>

      <Box style={tabDisplay}>
        <DashboardNavbar />
      </Box>
      <Box style={tabStyle}>
        <Iframe
          url="https://airtable.com/embed/shrZDiWIABB8f6AIo?backgroundColor=gray"
          width="100%"
          height={frameHeight}
          display="block"
          position="relative"
          allowFullScreen
        />
      </Box>
      {<ToastContainer style={{ fontSize: "15px" }} toastStyle={{ borderRadius: "10px" }} />}
    </DashboardLayout>
  );
}

export default ProjectStatus;
