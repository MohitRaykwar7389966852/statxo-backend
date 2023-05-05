import React from "react";
import PropTypes from "prop-types";
import Iframe from "react-iframe";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import { ToastContainer, toast } from "react-toastify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CropFreeIcon from "@mui/icons-material/CropFree";
import MDBox from "components/MDBox";

function SavingDashboard() {
  const [value, setValue] = React.useState(0);
  const handleTabs = (e, val) => {
    setValue(val);
  };
  const [tabDisplay, setTabDisplay] = React.useState({ width: "100%", display: "block" });
  const [tabStyle, setTabStyle] = React.useState({});
  const [frameHeight, setFrameHeight] = React.useState("645px");
  const [zoom, setZoom] = React.useState(true);

  const fullScreen = () => {
    if (zoom === true) {
      setTabDisplay({ width: "100%", display: "none" });
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
      setTabDisplay({ width: "100%", display: "block" });
      setFrameHeight("645px");
      setTabStyle({});
      setZoom(true);
    }
  };
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <Box style={tabDisplay}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleTabs}>
            <Tab label="Saving Dashboard" />
            <Tab label="Action Tracker" />
          </Tabs>
          <Divider />
        </AppBar>
      </Box>
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

      <TabPanel value={value} index={0}>
        <div style={tabStyle}>
          <Iframe
            title="Sanitized Spend Dashboard, PI, v11"
            width="100%"
            height={frameHeight}
            src="https://app.powerbi.com/reportEmbed?reportId=ca6c95ef-4fa3-4035-b4f2-0dbc15731fd0&autoAuth=true&ctid=55e0a09f-7836-4d37-b386-b5605b46a125"
            frameborder="0"
            position="relative"
            allowFullScreen="true"
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={tabStyle}>
          <Iframe
            url="https://apps.powerapps.com/play/13625f4d-ea2b-4883-bc8c-8834e0ecee5c?tenantId=55e0a09f-7836-4d37-b386-b5605b46a125"
            width="100%"
            height={frameHeight}
            display="block"
            position="relative"
            allowFullScreen
          />
        </div>
      </TabPanel>
      {<ToastContainer style={{ fontSize: "15px" }} toastStyle={{ borderRadius: "10px" }} />}
    </DashboardLayout>
  );
}
function TabPanel(props) {
  TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired,
    index: PropTypes.node.isRequired,
  };
  const { children, value, index } = props;
  return <div>{value === index && <h1>{children}</h1>}</div>;
}

export default SavingDashboard;
