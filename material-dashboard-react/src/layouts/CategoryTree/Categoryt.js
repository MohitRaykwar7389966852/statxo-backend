import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TextField from "@mui/material/TextField";
import AccountTreeSharpIcon from "@mui/icons-material/AccountTreeSharp";
var rows = [
  {
    L1Category: "10 - Indirect - Other",
    L2Category: "10.1 - Indirect - Other",
    L3Category: "10.1.1 - Indirect- Other",
    L4Category: "10.1.1.1 - Indirect - Other",
  },
  {
    L1Category: "10 - Indirect - Other",
    L2Category: "10.2 - Capex in Progress",
    L3Category: "10.2.1 - Capex in Progress",
    L4Category: "10.2.1.1 - Capex in Progress",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.06 Royalties / Licenses",
    L4Category: "I2.11.06.01 Royalties / Licenses",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.01 Media Agency",
    L4Category: "I2.04.01.01 Agency Fees &amp; Bonus",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.01 Working Media - TV, Video on Demand, Catch Up TV",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.04 Media Coop advertising",
    L4Category: "I2.04.04.01 Working Media - Coop Advertising",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.08 Working Media - Print  Insertion ",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.10 Working Media - Digital Display",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.11 Working Media - Digital Social ( Insta, FB…)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.02 Working Media - Digital Search SMO",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.03 Media Ad tech",
    L4Category: "I2.04.03.04 Tracking &amp; trafficking",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.04 Working Media - Emails",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.07 Working Media - Other",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.03 Working Media - Digital Video (Youtube…)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.05 Working Media - Radio",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.06 Working Media - Cinema",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.09 Working Media - Outdoor/Billboard",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.02 Working Media",
    L4Category: "I2.04.02.12 Working Media - Digital Search SEA",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.03 Media Ad tech",
    L4Category: "I2.04.03.01 Adserving",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.03 Media Ad tech",
    L4Category: "I2.04.03.02 Adverification",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.03 Media Ad tech",
    L4Category: "I2.04.03.03 DSP",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.03 Media Ad tech",
    L4Category: "I2.04.03.05 Tag management",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.05 Affiliation",
    L4Category: "I2.04.05.01 Media - Affiliation",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.06 Media Audits",
    L4Category: "I2.04.06.01 Media Audits",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.07 Customer Relationship Management ",
    L4Category: "I2.04.07.01 Coupons",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.07 Customer Relationship Management ",
    L4Category: "I2.04.07.02 Commercial and Sales - Trade Marketing",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.08 Digital Marketing",
    L4Category: "I2.04.08.01 SEO",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.08 Digital Marketing",
    L4Category: "I2.04.08.02 Community Management",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.08 Digital Marketing",
    L4Category: "I2.04.08.03 Webmastering",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.01 Brand Creative Agencies  - Creation",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.04 Creative Agencies fees for Pack Design  - Creation",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.07 Creative Agencies  for other designs (Set, GWP) - Creation",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.01 HR - Temp labour",
    L4Category: "I2.05.01.01 Temporary Labour",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.02 HR expenses",
    L4Category: "I2.05.02.01 Employee relocation services &amp; fees",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.02 HR expenses",
    L4Category: "I2.05.02.02 External Payroll Services",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.02 HR expenses",
    L4Category: "I2.05.02.03 Recruitment",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.03 Training",
    L4Category: "I2.05.03.01 Corporate Training",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.04 HR Company Car leasing",
    L4Category: "I2.05.04.01 Car Long Term Leasing",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.04 HR Company Car leasing",
    L4Category: "I2.05.04.04 Fuel cards",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.04 HR Company Car leasing",
    L4Category: "I2.05.04.06 Car maintenance &amp; repairs",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.05 Accounting &amp; Auditing Consulting",
    L4Category: "I2.05.05.01 Accounting &amp; Auditing Fees",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.06 Consulting",
    L4Category: "I2.05.06.01 Strategic Consulting",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.06 IT Intellectual Services",
    L4Category: "I2.06.06.07 IT Consulting",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.06 Consulting",
    L4Category: "I2.05.06.02 Operational consulting",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.07 Legal",
    L4Category: "I2.05.07.01 Trademarks - Intellectual Property",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.07 Legal",
    L4Category: "I2.05.07.02 Law firms / collection companies / bailiff",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.08 Translations",
    L4Category: "I2.05.08.01 Translations",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.09 Insurance",
    L4Category: "I2.05.09.01 Employee Insurance",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.09 Insurance",
    L4Category: "I2.05.09.02 Company Insurance",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.10 Documentation",
    L4Category: "I2.05.10.01 Professional Associations &amp; Subscriptions",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.10 Documentation",
    L4Category: "I2.05.10.03 Research &amp; Studies (Non Marketing)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.10 Documentation",
    L4Category: "I2.05.10.03 Research &amp; Studies (Non Marketing)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.11 Bank charges",
    L4Category: "I2.05.11.01 Bank charges",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.12 Call Centers",
    L4Category: "I2.05.12.01 Call Centers",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.14 I&amp;D - Testing",
    L4Category: "I2.05.14.01 External Services - I&amp;D",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.14 I&amp;D - Testing",
    L4Category: "I2.05.14.02 Product Testing",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.16 FM - Real Estate",
    L4Category: "I2.05.16.01 Building Rents",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.16 FM - Real Estate",
    L4Category: "I2.05.16.02 Shop Rents",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.17 FM - Building  Services",
    L4Category: "I2.05.17.08 Building Maintenance",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.18 Office furniture &amp; supplies",
    L4Category: "I2.05.18.01 Office Furniture",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.17 FM - Building  Services",
    L4Category: "I2.05.17.09 Small Material &amp; Equipment",
  },
  {
    L1Category: "5 - Indirect - Professional Services &amp; Facilities",
    L2Category: "5.4 - Facility Management",
    L3Category: "5.4.2 - Building  Services",
    L4Category: "5.4.2.13 - Building  Services - Services Others",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.17 FM - Building  Services",
    L4Category: "I2.05.17.01 Receptionist",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.17 FM - Building  Services",
    L4Category: "I2.05.17.02 Waste Services Management",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.17 FM - Building  Services",
    L4Category: "I2.05.17.04 Cleaning",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.17 FM - Building  Services",
    L4Category: "I2.05.17.06 Catering-Canteen",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.17 FM - Building  Services",
    L4Category: "I2.05.17.07 Security",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.16 Routers &amp; folding",
    L4Category: "I2.04.16.02 Mailing - Folding",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.18 Office furniture &amp; supplies",
    L4Category: "I2.05.18.02 Office supplies ",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.02 Software",
    L4Category: "I2.06.02.03 Software (Subscription SAAS)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.01 Hardware",
    L4Category: "I2.06.01.04 Hardware Miscellanous",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.01 Hardware",
    L4Category: "I2.06.01.05 Maintenance Hardware retail",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.01 Hardware",
    L4Category: "I2.06.01.06 Hardware Equipment Rentals",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.02 Software",
    L4Category: "I2.06.02.01 Licence Software On Premise (acquisition)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.02 Software",
    L4Category: "I2.06.02.02 On Premise Maintenance Software",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.04 Hosting",
    L4Category: "I2.06.04.03 Managed Services",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.01 Hardware",
    L4Category: "I2.06.01.07 Hardware Equipment Leasing",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.04 Hosting",
    L4Category: "I2.06.04.01 IT Hosting Services",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.02 Software",
    L4Category: "I2.06.02.07 CRM Miscellanous",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.02 Software",
    L4Category: "I2.06.02.05 CRM SMS",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.03 Brand Creative Agencies  - Post production",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.10 Retail Design &amp; Creative Agencies  - Creation",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.03 Telecoms",
    L4Category: "I2.06.03.04 Telecommunications Miscellanous",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.03 Telecoms",
    L4Category: "I2.06.03.06 Telecommunications Network Corporate / Office",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.03 Telecoms",
    L4Category: "I2.06.03.07 Telecommunications&nbsp; Network Retail (SHOPS)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.01 MRO - Supplies &amp; Spare Parts",
    L4Category: "I2.07.01.01 Consumables and Spare Parts - Equipment Parts",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.01 MRO - Supplies &amp; Spare Parts",
    L4Category: "I2.07.01.02 Consumables and Spare Parts - Supplies / Consumables",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.02 MRO - Services",
    L4Category: "I2.07.02.01 Maintenance of Distribution / Handling / Storage equipment",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.03 MRO - Personal Protective Supplies &amp; Clothes",
    L4Category: "I2.07.03.01 Personal Protection Supplies",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.04 Energy &amp; Utilities",
    L4Category: "I2.07.04.01 Electricity",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.04 Energy &amp; Utilities",
    L4Category: "I2.07.04.03 Gas",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.04 Energy &amp; Utilities",
    L4Category: "I2.07.04.05 Water",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.04 Energy &amp; Utilities",
    L4Category: "I2.07.04.07 Fuel",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.05 Manufacturing Equipment",
    L4Category: "I2.07.05.01 Manufacturing Equipment leasing",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.13 I&amp;D - Lab Equipment &amp; Supplies",
    L4Category: "I2.05.13.02 Laboratory Equipment",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.02 Brand Creative Agencies  - Execution",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.08 Mailing",
    L4Category: "I2.07.08.01 Stamp Duties",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.08 Mailing",
    L4Category: "I2.07.08.02 Parcel Shipment B2C",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.09 Transportation",
    L4Category: "I2.07.09.03 Custom Brokerage",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.09 Transportation",
    L4Category: "I2.07.09.04 Road on sale B2B",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.09 Transportation",
    L4Category: "I2.07.09.10 Ocean Freight on sale B2B",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.09 Transportation",
    L4Category: "I2.07.09.02 4PL - 4th Party Logistic",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.06 Shop Services",
    L4Category: "I2.09.06.06 High Security Transportation - Cash",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.10 Warehousing",
    L4Category: "I2.07.10.02 Storage &amp; Warehousing Services",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.10 Warehousing",
    L4Category: "I2.07.10.03 Warehousing - Relabelling / Customisation ",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.01 Travel",
    L4Category: "I2.08.01.01 Travel - Airline",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.01 Travel",
    L4Category: "I2.08.01.10 Travel - Travel Agency Fees",
  },
  {
    L1Category: "8 - Indirect - Travel &amp; Entertainment",
    L2Category: "8.1 - Travel &amp; Entertainment (MICE)",
    L3Category: "8.1.1 - Travel",
    L4Category: "8.1.1.11 - Travel - Travel Other",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.01 Travel",
    L4Category: "I2.08.01.05 Travel - Car Rental / Short term",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.01 Travel",
    L4Category: "I2.08.01.07 Travel - Hotel",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.01 Travel",
    L4Category: "I2.08.01.08 Travel - Restaurants",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.01 Travel",
    L4Category: "I2.08.01.09 Travel - Personal Car kms Reimbursement",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.01 Travel",
    L4Category: "I2.08.01.11 Travel - Private Cars Repairs",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.02 Event &amp; Incentive",
    L4Category: "I2.08.02.01 Event agencies",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.02 Event &amp; Incentive",
    L4Category: "I2.08.02.02 Meeting Catering",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.02 Event &amp; Incentive",
    L4Category: "I2.08.02.03 Meetings - Spoke Person, hosts…",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.02 Event &amp; Incentive",
    L4Category: "I2.08.02.07 Exhibitions",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.10 Retail Design &amp; Creative Agencies  - Creation",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.01 Permanent Merchandising",
    L4Category: "I2.09.01.01 Permanent merchandising",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.02 Shop Construction",
    L4Category: "I2.09.02.01 Architects/geometers",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.02 Shop Construction",
    L4Category: "I2.09.02.02 Shop Fitters ",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.02 Shop Construction",
    L4Category: "I2.09.02.03 Air conditioner (Equipment &amp; fitting)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.03 Shop Equipments",
    L4Category: "I2.09.03.01 Shop Equipments leasing",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.03 Shop Equipments",
    L4Category: "I2.09.03.03 Shop Lightning",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.03 Shop Equipments",
    L4Category: "I2.09.03.05 Shop Security System",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.03 Shop Equipments",
    L4Category: "I2.09.03.07 Shop Counting Cells",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.11 Retail Design &amp; Creative Agencies - Execution",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.04 Shop Supplies",
    L4Category: "I2.09.04.01 Shop clothes &amp; Accessories",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.04 Shop Supplies",
    L4Category: "I2.09.04.02 Shop Consumables",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.12 Retail Design &amp; Creative Agencies  - Post production",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.05 Institute Supplies",
    L4Category: "I2.09.05.01 Institute Devices",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.05 Institute Supplies",
    L4Category: "I2.09.05.03 Institute Supplies",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.06 Shop Services",
    L4Category: "I2.09.06.01 Shop Maintenance",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.06 Shop Services",
    L4Category: "I2.09.06.02 Shop Cleaning",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.05 Creative Agencies fees for Pack Design - Execution",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.06 Creative Agencies fees for Pack Design  - Post production",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.08 Creative Agencies  for other designs (Set, GWP)  - Execution",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.09 Creative Agencies  for other designs (Set, GWP)  - Post production",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.11 Retail Design &amp; Creative Agencies - Execution",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.09 Creative agencies",
    L4Category: "I2.04.09.12 Retail Design &amp; Creative Agencies  - Post production",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.10 Adverstising production",
    L4Category: "I2.04.10.02 Photoshoot - Shooting",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.10 Adverstising production",
    L4Category: "I2.04.10.01 Copyrights ",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.10 Adverstising production",
    L4Category: "I2.04.10.03 Photoshoot - Retouching",
  },
  {
    L1Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
    L2Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
    L3Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
    L4Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.11 Marketing studies",
    L4Category: "I2.04.11.03 Database/ mailing list",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.11 Marketing studies",
    L4Category:
      "I2.04.11.02 Tailor-made Marketing Studies (Quali, quanti, media studies, image audit and mystery shopping)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.11 Marketing studies",
    L4Category: "I2.04.11.01 Ready- Made Marketing Studies (benchmarks, Market intelligence…)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.12 POS",
    L4Category: "I2.04.12.01 POS (PLV)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.13 Paper",
    L4Category: "I2.04.13.01 Paper for Printing",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.14 Shopping bags &amp; wrapping",
    L4Category: "I2.04.14.01 Printed Shopping Bags",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.15 Printed material",
    L4Category:
      "I2.04.15.01 Printed Material - Catalog / PR Brochure,  Postcard, Deco, Press brochure, leaflets",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.15 Printed material",
    L4Category:
      "I2.04.15.01 Printed Material - Catalog / PR Brochure,  Postcard, Deco, Press brochure, leaflets",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.16 Routers &amp; folding",
    L4Category: "I2.04.16.01 Printed Material - Print routers",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.16 Routers &amp; folding",
    L4Category: "I2.04.16.02 Mailing - Folding",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.12 POS",
    L4Category: "I2.04.12.02 Temporary POS",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.14 Shopping bags &amp; wrapping",
    L4Category: "I2.04.14.02 Gift Wrapping",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.12 POS",
    L4Category: "I2.04.12.03 Temporary POS - Display Fulfillment/Embellishment",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.17 Public relation",
    L4Category: "I2.04.17.04 PR - Talent Management Services (infuencers…)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.17 Public relation",
    L4Category: "I2.04.17.02 PR Agency Fees - external communication",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.17 Public relation",
    L4Category: "I2.04.17.05 Influencer Marketing &amp; Events",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.17 Public relation",
    L4Category: "I2.04.17.01 PR Agency Fees - internal communications",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.17 Public relation",
    L4Category: "I2.04.17.01 PR Agency Fees - internal communications",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.17 Public relation",
    L4Category: "I2.04.17.02 PR Agency Fees - external communication",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.17 Public relation",
    L4Category: "I2.04.17.03 PR Agency Fees - crisis communication",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.17 Public relation",
    L4Category: "I2.04.17.03 PR Agency Fees - crisis communication",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.17 Public relation",
    L4Category: "I2.04.17.06 PR - Social Media Activity Reports",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.21 Premium/Gift with Purchase - various",
    L4Category: "I2.04.21.03 Gift other various",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.22 Premium/Gift with Purchase",
    L4Category: "I2.04.22.01 Promotional items / Gifts / branded items",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.18 Premium/Gift with Purchase - Bag pouch and vanity",
    L4Category: "I2.04.18.01 Accessory",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.18 Premium/Gift with Purchase - Bag pouch and vanity",
    L4Category: "I2.04.18.02 Beauty case / vanity",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.18 Premium/Gift with Purchase - Bag pouch and vanity",
    L4Category: "I2.04.18.03 City bag",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.18 Premium/Gift with Purchase - Bag pouch and vanity",
    L4Category: "I2.04.18.04 Container for pdb kit",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.18 Premium/Gift with Purchase - Bag pouch and vanity",
    L4Category: "I2.04.18.05 Leisure bag",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.18 Premium/Gift with Purchase - Bag pouch and vanity",
    L4Category: "I2.04.18.06 Other Bag pouch and vanity",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.18 Premium/Gift with Purchase - Bag pouch and vanity",
    L4Category: "I2.04.18.07 Shopping bag",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.19 Premium/Gift with Purchase - Textile",
    L4Category: "I2.04.19.01 Fashion textile accessory",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.19 Premium/Gift with Purchase - Textile",
    L4Category: "I2.04.19.02 Home textile",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.19 Premium/Gift with Purchase - Textile",
    L4Category: "I2.04.19.03 Ready-made clothes",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.19 Premium/Gift with Purchase - Textile",
    L4Category: "I2.04.19.04 Well-being textile",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.20 Premium/Gift with Purchase - Watch",
    L4Category: "I2.04.20.01 Ladie s watch",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.20 Premium/Gift with Purchase - Watch",
    L4Category: "I2.04.20.02 Men s watch",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.21 Premium/Gift with Purchase - various",
    L4Category: "I2.04.21.01 Sport accessory",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.21 Premium/Gift with Purchase - various",
    L4Category: "I2.04.21.02 Umbrella",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.23 Premium/Gift with Purchase - Beauty accessory",
    L4Category: "I2.04.23.01 Body accessory",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.23 Premium/Gift with Purchase - Beauty accessory",
    L4Category: "I2.04.23.02 Face care accessory",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.23 Premium/Gift with Purchase - Beauty accessory",
    L4Category: "I2.04.23.03 Hair accessory",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.23 Premium/Gift with Purchase - Beauty accessory",
    L4Category: "I2.04.23.04 Make-up accessory",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.23 Premium/Gift with Purchase - Beauty accessory",
    L4Category: "I2.04.23.05 Manicure / pedicure accessory ",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.23 Premium/Gift with Purchase - Beauty accessory",
    L4Category: "I2.04.23.06 Multi family accessory",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.23 Premium/Gift with Purchase - Beauty accessory",
    L4Category: "I2.04.23.07 Other Beauty accessory",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.24 Premium/Gift with Purchase - Container",
    L4Category: "I2.04.24.01 Bag / out of cash bag",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.24 Premium/Gift with Purchase - Container",
    L4Category: "I2.04.24.02 Basket",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.24 Premium/Gift with Purchase - Container",
    L4Category: "I2.04.24.03 Basket / basket",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.24 Premium/Gift with Purchase - Container",
    L4Category: "I2.04.24.04 Box / closed container",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.24 Premium/Gift with Purchase - Container",
    L4Category: "I2.04.24.05 Other container",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.24 Premium/Gift with Purchase - Container",
    L4Category: "I2.04.24.06 Pouch",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.25 Premium/Gift with Purchase - Culinary art",
    L4Category: "I2.04.25.01 Utility cuisine",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.25 Premium/Gift with Purchase - Culinary art",
    L4Category: "I2.04.25.02 Well-being cuisine",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.26 Premium/Gift with Purchase - Decoration &amp; home storage",
    L4Category: "I2.04.26.01 Decoration",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.26 Premium/Gift with Purchase - Decoration &amp; home storage",
    L4Category: "I2.04.26.02 Green accessory",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.26 Premium/Gift with Purchase - Decoration &amp; home storage",
    L4Category: "I2.04.26.03 Storage",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.27 Premium/Gift with Purchase - Electronic",
    L4Category: "I2.04.27.01 Beauty",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.27 Premium/Gift with Purchase - Electronic",
    L4Category: "I2.04.27.02 Well-being",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.27 Premium/Gift with Purchase - Electronic",
    L4Category: "I2.04.27.03 Other Electronic",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.28 Premium/Gift with Purchase -Fashion accessories",
    L4Category: "I2.04.28.01 Flip flops",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.28 Premium/Gift with Purchase -Fashion accessories",
    L4Category: "I2.04.28.02 Hat",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.28 Premium/Gift with Purchase -Fashion accessories",
    L4Category: "I2.04.28.03 Key holder",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.28 Premium/Gift with Purchase -Fashion accessories",
    L4Category: "I2.04.28.04 Sunglasses",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.28 Premium/Gift with Purchase -Fashion accessories",
    L4Category: "I2.04.28.05 Other accessories",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.29 Premium/Gift with Purchase - Jewelry",
    L4Category: "I2.04.29.01 Ring",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.29 Premium/Gift with Purchase - Jewelry",
    L4Category: "I2.04.29.02 Pin / badge",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.29 Premium/Gift with Purchase - Jewelry",
    L4Category: "I2.04.29.03 Necklace",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.29 Premium/Gift with Purchase - Jewelry",
    L4Category: "I2.04.29.04 Jewelry set",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.29 Premium/Gift with Purchase - Jewelry",
    L4Category: "I2.04.29.05 Earrings",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.29 Premium/Gift with Purchase - Jewelry",
    L4Category: "I2.04.29.06 Bracelet",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.30 Premium/Gift with Purchase - Stationery &amp; accessories",
    L4Category: "I2.04.30.01 Stationery accessory",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.30 Premium/Gift with Purchase - Stationery &amp; accessories",
    L4Category: "I2.04.30.02 Stationery",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.31 Sponsoring",
    L4Category: "I2.04.31.01 Sponsoring",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.01 HR - Temp labour",
    L4Category: "I2.05.01.01 Temporary Labour",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.02 HR expenses",
    L4Category: "I2.05.02.04 Broker Social Benefits",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.04 HR Company Car leasing",
    L4Category: "I2.05.04.05 Car Insurance costs",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.02 HR expenses",
    L4Category: "I2.05.02.06 Outplacement",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.02 HR expenses",
    L4Category: "I2.05.02.07 Pensions Services",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.06 Consulting",
    L4Category: "I2.05.06.02 Operational consulting",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.10 Documentation",
    L4Category: "I2.05.10.02 Magazines &amp; Newspapers",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.13 I&amp;D - Lab Equipment &amp; Supplies",
    L4Category: "I2.05.13.01 Services &amp; Maintenance",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.15 I&amp;D - Claim management",
    L4Category: "I2.05.15.01 Claim management",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.17 FM - Building  Services",
    L4Category: "I2.05.17.09 Small Material &amp; Equipment",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.17 FM - Building  Services",
    L4Category: "I2.05.17.03 Gardening &amp; Flowers",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.17 FM - Building  Services",
    L4Category: "I2.05.17.05 Catering-Services",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.05 - Indirect - Professional Services &amp; Facilities",
    L3Category: "I2.05.17 FM - Building  Services",
    L4Category: "I2.05.17.03 Gardening &amp; Flowers",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.04 - Indirect - Marketing &amp; Communications",
    L3Category: "I2.04.15 Printed material",
    L4Category:
      "I2.04.15.01 Printed Material - Catalog / PR Brochure,  Postcard, Deco, Press brochure, leaflets",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.01 Hardware",
    L4Category: "I2.06.01.01 Purchase of Corp Hardware - Computer/Screen",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.01 Hardware",
    L4Category: "I2.06.01.02 Purchase of Retail Hardware",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.01 Hardware",
    L4Category: "I2.06.01.03 Purchase of Hardware Small Accessories",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.02 Software",
    L4Category: "I2.06.02.04 APP Mobile",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.02 Software",
    L4Category: "I2.06.02.06 CRM Push Notification",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.03 Telecoms",
    L4Category: "I2.06.03.01 Mobile Telefony Suscription &amp; consumptions (Voice &amp; Data)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.03 Telecoms",
    L4Category: "I2.06.03.02 Landline Phone for Corp",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.03 Telecoms",
    L4Category: "I2.06.03.01 Mobile Telefony Suscription &amp; consumptions (Voice &amp; Data)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.03 Telecoms",
    L4Category: "I2.06.03.02 Landline Phone for Corp",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.03 Telecoms",
    L4Category: "I2.06.03.03 Landline Phone for Shops RETAIL",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.03 Telecoms",
    L4Category: "I2.06.03.05 Telecommunication Services",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.04 Hosting",
    L4Category: "I2.06.04.02 Cloud Public",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.05 Service Desk",
    L4Category: "I2.06.05.01 Service Desk",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.06 IT Intellectual Services",
    L4Category: "I2.06.06.01 SERVICE DELIVERY CENTERS (CDS)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.06 IT Intellectual Services",
    L4Category:
      "I2.06.06.02 TMA = TPAM (third party applications maintenance), \nMCO  (maintenance in operational condition)\nTME = TMO (third-party maintenance operation)",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.06 IT Intellectual Services",
    L4Category: "I2.06.06.03 Temporary Labour IT – Time &amp; Materials",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.06 - Indirect - IT &amp; Telecoms",
    L3Category: "I2.06.06 IT Intellectual Services",
    L4Category: "I2.06.06.04 Integration",
  },
  {
    L1Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
    L2Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
    L3Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
    L4Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.02 MRO - Services",
    L4Category: "I2.07.02.02 Maintenance of Manufacturing Equipment",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.03 MRO - Personal Protective Supplies &amp; Clothes",
    L4Category: "I2.07.03.02 Work clothes",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.04 Energy &amp; Utilities",
    L4Category: "I2.07.04.06 Wood",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.05 Manufacturing Equipment",
    L4Category: "I2.07.05.03 Distribution / Handling / Storage Equipments leasing",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.06 Manufacturing Engineering",
    L4Category: "I2.07.06.01 Manufacturing Engineering",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.07 Manufacturing Buildings Construction ",
    L4Category: "I2.07.07.01 Buildings Construction &amp; Equipments",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.07 Manufacturing Buildings Construction ",
    L4Category: "I2.07.07.01 Buildings Construction &amp; Equipments",
  },
  {
    L1Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
    L2Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
    L3Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
    L4Category: "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.09 Transportation",
    L4Category: "I2.07.09.07 Air Freight on sale B2B",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.07 - Indirect - Operations",
    L3Category: "I2.07.10 Warehousing",
    L4Category: "I2.07.10.01 Pallet",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.01 Travel",
    L4Category: "I2.08.01.02 Travel - Train",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.01 Travel",
    L4Category: "I2.08.01.03 Travel - Rental Car Petrol Cost",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.02 Event &amp; Incentive",
    L4Category: "I2.08.02.05 Team building",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.02 Event &amp; Incentive",
    L4Category: "I2.08.02.03 Meetings - Spoke Person, hosts…",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.05.03 Training",
    L4Category: "I2.05.03.02 Local/Specific Training",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.02 Shop Construction",
    L4Category: "I2.09.02.01 Architects/geometers",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.03 Shop Equipments",
    L4Category: "I2.09.03.08 Shop Signs",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.03 Shop Equipments",
    L4Category: "I2.09.03.04 Shop Ground",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.06 Shop Services",
    L4Category: "I2.09.06.04 Shop Security",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.09 - Indirect - Retail",
    L3Category: "I2.09.06 Shop Services",
    L4Category: "I2.09.06.05 Shop services - Waste",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.01 Donations &amp; Gifts",
    L4Category: "I2.11.01.01 Charity Donations",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.02 InterCompany",
    L4Category: "I2.11.02.01 Intercompany",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.03 Pension Funds",
    L4Category: "I2.11.03.01 Pension Funds",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.04 Tax &amp; Duties",
    L4Category: "I2.11.04.01 Tax &amp; Duties - Custom Tax or Duty",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.04 Tax &amp; Duties",
    L4Category: "I2.11.04.02 Tax &amp; Duties - Corporate income Tax",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.04 Tax &amp; Duties",
    L4Category: "I2.11.04.03 Tax &amp; Duties - Payroll Tax",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.04 Tax &amp; Duties",
    L4Category: "I2.11.04.04 Tax &amp; Duties - Property Tax",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.04 Tax &amp; Duties",
    L4Category: "I2.11.04.05 Tax &amp; Duties - Sales / value added tax",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.04 Tax &amp; Duties",
    L4Category: "I2.11.04.06 Tax &amp; Duties - Local business Tax",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.04 Tax &amp; Duties",
    L4Category: "I2.11.04.10 Tax &amp; Duties - Other Taxes",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "macht Ihr nen ",
    L4Category: "I2.11.04.10 Tax &amp; Duties - Other Taxes",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.04 Tax &amp; Duties",
    L4Category: "I2.11.04.05 Tax &amp; Duties - Sales / value added tax",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.11 - Non-Purchase Expenses",
    L3Category: "I2.11.05 Trade Spending",
    L4Category: "I2.11.05.01 Trade Spending",
  },
  {
    L1Category: "I2 - Indirect procurement",
    L2Category: "I2.08 - Indirect - Travel &amp; Entertainment",
    L3Category: "I2.08.01 Travel",
    L4Category: "I2.08.01.14 Travel - Lodge Card",
  },
];
export default function DataGridProDemo() {
  const [age, setAge] = useState("");
  const [FilteredData, setFilteredData] = React.useState(rows);
  const [l1category, setl1category] = React.useState("");
  const [l2category, setl2category] = React.useState("");
  const [l3category, setl3category] = React.useState("");
  const [l4category, setl4category] = React.useState("");
  const [legalentity, setlegalentity] = React.useState("");
  const [actiontype, setactiontype] = React.useState("");
  const [actionname, setactionname] = React.useState("");
  const [pageSize, setPageSize] = React.useState(100);
  const [l1categorytree, setl1categorytree] = React.useState("");
  const [l2categorytree, setl2categorytree] = React.useState("");
  const [l3categorytree, setl3categorytree] = React.useState("");
  const [l4categorytree, setl4categorytree] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const changeFilter = (e) => {
    let rw = [...rows];
    if (l1category !== "all" && l1category !== "")
      rw = rw.filter((x) => x.L1Category === l1category);
    if (l2category !== "all" && l2category !== "")
      rw = rw.filter((x) => x.L2Category === l2category);
    if (l3category !== "all" && l3category !== "")
      rw = rw.filter((x) => x.L3Category === l3category);
    if (l4category !== "all" && l4category !== "")
      rw = rw.filter((x) => x.L4Category === l4category);
    setFilteredData(rw);
  };

  const resetFilter = (e) => {
    setl1category("");
    setl2category("");
    setl3category("");
    setl4category("");
    setFilteredData(rows);
  };

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const gridRef = useRef();

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "L1Category" },
    { field: "L2Category", width: 350 },
    { field: "L3Category" },
    { field: "L4Category", width: 350 },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
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

  let L1CategoryFilter = [];
  let L2CategoryFilter = [];
  let L3CategoryFilter = [];
  let L4CategoryFilter = [];

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].L1Category !== "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED") {
      if (L1CategoryFilter.includes(rows[i]["L1Category"])) continue;
      else L1CategoryFilter.push(rows[i]["L1Category"]);
    }

    if (rows[i].L2Category !== "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED") {
      if (L2CategoryFilter.includes(rows[i]["L2Category"])) continue;
      else L2CategoryFilter.push(rows[i]["L2Category"]);
    }

    if (rows[i].L3Category !== "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED") {
      if (L3CategoryFilter.includes(rows[i]["L3Category"])) continue;
      else L3CategoryFilter.push(rows[i]["L3Category"]);
    }

    if (rows[i].L4Category !== "DELETED CATEGORY. CONTENT TO BE RECLASSIFIED") {
      if (L4CategoryFilter.includes(rows[i]["L4Category"])) continue;
      else L4CategoryFilter.push(rows[i]["L4Category"]);
    }
  }
  const [l1error, setl1error] = useState(false);
  const [l2error, setl2error] = useState(false);
  const [l3error, setl3error] = useState(false);
  const [l4error, setl4error] = useState(false);

  const savecategory = (e) => {
    e.preventDefault();
    if (!l1categorytree) setl1error(true);
    else setl1error(false);
    if (!l2categorytree) setl2error(true);
    else setl2error(false);
    if (!l3categorytree) setl3error(true);
    else setl3error(false);
    if (!l4categorytree) setl4error(true);
    else setl4error(false);

    if (!l1categorytree || !l2categorytree || !l3categorytree || !l4categorytree) {
      return;
    } else {
      console.log(l1categorytree, l2categorytree, l3categorytree, l4categorytree);
    }
  };

  return (
    <DashboardLayout>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,
          pl: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ minWidth: 20, m: 1 }}>
            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-label">L1 Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={l1category}
                label="L1 category"
                onChange={(e) => setl1category(e.target.value)}
                style={{ height: 40, width: 100 }}
              >
                <MenuItem value="all">All</MenuItem>
                {L1CategoryFilter.map((x) => {
                  return <MenuItem value={x}>{x}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 20, m: 1 }}>
            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-label">L2 Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={l2category}
                label="L2 Category"
                onChange={(e) => setl2category(e.target.value)}
                style={{ height: 40, width: 100 }}
              >
                <MenuItem value="all">All</MenuItem>
                {L2CategoryFilter.map((x) => {
                  return <MenuItem value={x}>{x}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 20, m: 1 }}>
            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-label">L3 Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={l3category}
                label="l3category"
                onChange={(e) => setl3category(e.target.value)}
                style={{ height: 40, width: 100 }}
              >
                <MenuItem value="all">All</MenuItem>
                {L3CategoryFilter.map((x) => {
                  return <MenuItem value={x}>{x}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 20, m: 1 }}>
            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-label">L4 Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={l4category}
                label="Age"
                onChange={(e) => setl4category(e.target.value)}
                style={{ height: 40, width: 100 }}
              >
                <MenuItem value="all">All</MenuItem>
                {L4CategoryFilter.map((x) => {
                  return <MenuItem value={x}>{x}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Button onClick={changeFilter}>
          Filter <FilterAltIcon />
        </Button>
        <Button onClick={resetFilter}>
          Reset <RestartAltIcon />
        </Button>
        <Button onClick={handleClickOpen}>
          Add Category <AddIcon />
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add New Category"}</DialogTitle>
          <DialogContent sx={{ p: 0, pl: 20 }}>
            <AccountTreeSharpIcon style={{ color: "#4BB543", width: 40, height: 40 }} />
          </DialogContent>
          <DialogActions>
            <FormControl component="form" onSubmit={savecategory} variant="standard">
              <FormControl variant="standard" sx={{ pl: 1.5, mb: 2 }}>
                <InputLabel sx={{ ml: 1.5 }} id="demo-simple-select-label">
                  L1 Category
                </InputLabel>
                <Select
                  error={l1error}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={l1categorytree}
                  label="L1 category"
                  onChange={(e) => setl1categorytree(e.target.value)}
                  style={{ height: 30, width: 290 }}
                >
                  {L1CategoryFilter.map((x) => {
                    return <MenuItem value={x}>{x}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ pl: 1.5, mb: 2 }}>
                <InputLabel sx={{ ml: 1.5 }} id="demo-simple-select-label">
                  L2 Category
                </InputLabel>
                <Select
                  error={l2error}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={l2categorytree}
                  label="L2 Category"
                  onChange={(e) => setl2categorytree(e.target.value)}
                  style={{ height: 30, width: 290 }}
                >
                  {L2CategoryFilter.map((x) => {
                    return <MenuItem value={x}>{x}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ pl: 1.5, mb: 2 }}>
                <InputLabel sx={{ ml: 1.5 }} id="demo-simple-select-label">
                  L3 Category
                </InputLabel>
                <Select
                  error={l3error}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={l3categorytree}
                  label="l3category"
                  onChange={(e) => setl3categorytree(e.target.value)}
                  style={{ height: 30, width: 290 }}
                >
                  {L3CategoryFilter.map((x) => {
                    return <MenuItem value={x}>{x}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <TextField
                error={l4error}
                style={{ width: "300px", margin: "8px" }}
                type="text"
                label="L4 Category"
                value={l4categorytree}
                onChange={(e) => setl4categorytree(e.target.value)}
              />
              <Button type="submit" sx={{ mt: 2, mb: 1 }} variant="containedSuccess">
                save Category
              </Button>
            </FormControl>
          </DialogActions>
        </Dialog>
      </Box>

      <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={FilteredData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </DashboardLayout>
  );
}
