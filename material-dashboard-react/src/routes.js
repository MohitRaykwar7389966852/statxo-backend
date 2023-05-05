/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import ProjectStatus from "layouts/ProjectStatus";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Actiontracker from "layouts/Action-Tracker/Actiontracker";
import ActionTree from "layouts/Action-Tracker/ActionTree";
import ActionApproval from "layouts/Action-Tracker/ActionApproval";
import SpendDashboard from "layouts/SpendDashboard/SpendDashboard";
import SavingDashboard from "layouts/SavingDashboard/SavingDashboard";
import FileManager from "layouts/FileManager/FileManager";
import DocManager from "layouts/FileManager/DocManager";
import MaturityAssessment from "layouts/FileManager/MaturityAssessment";
import EnterpriseModel from "layouts/FileManager/EnterpriseModel";
import File from "layouts/FileManager/File";
// import CategoryTree from "layouts/CategoryTree/CategoryTree";
import Helpdesk from "layouts/Helpdesk/Helpdesk";
// import Validation from "layouts/Validation/Validation";
// import ProjectStatistics from "layouts/ProjectStatistics/ProjectStatistics";
// @mui icons
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Icon from "@mui/material/Icon";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountTreeSharpIcon from "@mui/icons-material/AccountTreeSharp";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
// import AdminPanel from "layouts/Admin/AdminPanel";

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "Home",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <DocManager />,
  },
  {
    type: "collapse",
    name: "Enterprise Model",
    key: "Enterprise Model",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/enterprise-model",
    component: <EnterpriseModel />,
  },
  {
    type: "collapse",
    name: "File Manager",
    key: "File-Manager",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/file-manager",
    component: <FileManager />,
  },
  {
    type: "collapse",
    name: "Maturity Assessment",
    key: "Maturity Assessment",
    icon: (
      <Icon fontSize="small">
        <ViewTimelineIcon />
      </Icon>
    ),
    route: "/maturity-assessment",
    component: <MaturityAssessment />,
  },
  {
    type: "collapse",
    name: "Project Status",
    key: "tables",
    icon: (
      <Icon fontSize="small">
        <ViewTimelineIcon />
      </Icon>
    ),
    route: "/ProjectStatus",
    component: <ProjectStatus />,
  },
  {
    type: "collapse",
    name: "Saving Dashboard",
    key: "Saving Dashboard",
    icon: (
      <Icon fontSize="small">
        <SavingsIcon />
      </Icon>
    ),
    route: "/saving-dashboard",
    component: <SavingDashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "pdf",
  //   key: "pdf",
  //   icon: (
  //     <Icon fontSize="small">
  //       <ViewTimelineIcon />
  //     </Icon>
  //   ),
  //   route: "/pdf",
  //   component: ,
  // },
  // {
  //   type: "collapse",
  //   name: "Project Statistics",
  //   key: "Project-Statistics",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/project-statistics",
  //   component: <ProjectStatistics />,
  // },
  // {
  //   type: "collapse",
  //   name: "Validation",
  //   key: "Validation",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/validation",
  //   component: <Validation />,
  // },
  // {
  //   type: "collapse",
  //   name: "Spend Dashboard",
  //   key: "Spend Dashboard",
  //   icon: (
  //     <Icon fontSize="small">
  //       <CurrencyExchangeIcon />
  //     </Icon>
  //   ),
  //   route: "/spend-dashboard",
  //   component: <SpendDashboard />,
  // },
  // {
  //   type: "collapse",
  //   name: "Action Tracker",
  //   key: "Action-Tracker",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/actiontracker",
  //   component: <Actiontracker />,
  // },
  // {
  //   type: "collapse",
  //   name: "Action Tree",
  //   key: "Action-Tree",
  //   icon: (
  //     <Icon fontSize="small">
  //       <AccountTreeSharpIcon />
  //     </Icon>
  //   ),
  //   route: "/actiontree",
  //   component: <ActionTree />,
  // },
  // {
  //   type: "collapse",
  //   name: "File",
  //   key: "File",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/file",
  //   component: <File />,
  // },
  // {
  //   // type: "collapse",
  //   name: "Action Approval",
  //   key: "Action-Approval",
  //   route: "/actionapproval/:actionId",
  //   component: <ActionApproval />,
  // },
  // {
  //   // type: "collapse",
  //   // name: "Profile",
  //   // key: "profile",
  //   // icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   // type: "collapse",
  //   // name: "Sign In",
  //   // key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   // type: "collapse",
  //   // name: "Sign Up",
  //   // key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
  // // {
  // //   type: "collapse",
  // //   name: "Admin Panel",
  // //   key: "admin panel",
  // //   icon: <Icon fontSize="small">assignment</Icon>,
  // //   route: "/adminpanel",
  // //   component: <AdminPanel />,
  // // },
  // {
  //   type: "collapse",
  //   name: "Help Desk",
  //   key: "help-desk",
  //   icon: (
  //     <Icon fontSize="small">
  //       <HelpCenterIcon />
  //     </Icon>
  //   ),
  //   route: "/help-desk",
  //   component: <Helpdesk />,
  // },
];

export default routes;
