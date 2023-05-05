import * as React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";

// // @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import HelpdeskLayout from "layouts/authentication/components/HelpdeskLayout";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import projectsTableData from "layouts/tables/data/projectsTableData";

import FormHelperText from "@mui/material/FormHelperText";
import "../Action-Tracker/action.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function Helpdesk() {
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [title, settitle] = React.useState("");
  const [comment, setcomment] = React.useState("");
  const [date, setdate] = React.useState(dayjs());
  const [priority, setpriority] = React.useState("");
  const [section, setsection] = React.useState("");
  const [file, setfile] = React.useState("");
  const [filename, setfilename] = React.useState("");
  const [titleError, settitleError] = React.useState(false);
  const [commentError, setcommentError] = React.useState(false);
  const [priorityError, setpriorityError] = React.useState(false);
  const [sectionError, setsectionError] = React.useState(false);
  const [titleErrorText, settitleErrorText] = React.useState("");
  const [commentErrorText, setcommentErrorText] = React.useState("");
  const [priorityErrorText, setpriorityErrorText] = React.useState("");
  const [sectionErrorText, setsectionErrorText] = React.useState("");

  const handleChangesection = (event) => {
    setsection(event.target.value);
  };
  const handleChangepriority = (event) => {
    setpriority(event.target.value);
  };
  const handleChangedate = (newValue) => {
    setdate(newValue);
  };
  const handleFile = (e) => {
    setfilename(e.target.value);
    setfile(e.target.files[0]);
  };

  // loading backdrop
  const [openLoad, setOpenLoad] = React.useState(false);
  const handleCloseLoad = () => {
    setOpenLoad(false);
  };
  const handleOpenLoad = () => {
    setOpenLoad(true);
  };

  const helpdeskform = async (e) => {
    e.preventDefault();
    if (title === "") {
      settitleError(true);
      settitleErrorText("Title is Required");
    } else {
      settitleError(false);
      settitleErrorText("");
    }
    if (comment === "") {
      setcommentError(true);
      setcommentErrorText("Comment is Required");
    } else {
      setcommentError(false);
      setcommentErrorText("");
    }
    if (priority === "") {
      setpriorityError(true);
      setpriorityErrorText("Priority is Required");
    } else {
      setpriorityError(false);
      setpriorityErrorText("");
    }
    if (section === "") {
      setsectionError(true);
      setsectionErrorText("Section is Required");
    } else {
      setsectionError(false);
      setsectionErrorText("");
    }
    if (title === "" || comment === "" || priority === "" || section === "") return;
    handleOpenLoad();
    let cdate = date.format("DD/MM/YYYY");
    console.log("request sending...");
    await axios
      .post(
        "http://localhost:4000/helpdesk",
        {
          title: title,
          comment: comment,
          date: cdate,
          priority: priority,
          section: section,
          file: file,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        let data = res.data;
        console.log(data);
        handleCloseLoad();
        toast.success("Help Request Sent Successfully", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-success",
        });
        settitle("");
        setcomment("");
        setpriority("");
        setsection("");
        setfile("");
        setfilename("");
      })
      .catch((error) => {
        handleCloseLoad();
        console.log(error.message);
        toast.error("Failed To Send Help Request", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error",
        });
      });
  };

  return (
    <>
      <HelpdeskLayout>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoad}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <MDBox
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Card
            style={{
              maxWidth: 400,
              justify: "start",
              alignContent: "start",
              alignItems: "center",
            }}
          >
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Helpdesk
              </MDTypography>
              <MDTypography display="block" variant="button" color="white" my={1}>
                Raise a support ticket to receive assistance from professionals.
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox mb={2}>
                <TextField
                  error={titleError}
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  id="standard-basic"
                  label="Enter Title"
                  variant="standard"
                  fullWidth
                />
                <FormHelperText style={{ marginRight: "100px", color: "red" }}>
                  {titleErrorText}
                </FormHelperText>
              </MDBox>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <TextField
                    error={commentError}
                    multiline
                    rows={3}
                    label="Comments"
                    variant="standard"
                    sx={{ width: 250, m: 1 }}
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                  />
                  <FormHelperText style={{ marginLeft: "10px", color: "red" }}>
                    {commentErrorText}
                  </FormHelperText>
                </MDBox>
                <MDBox mb={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={handleChangedate}
                        renderInput={(params) => <TextField {...params} />}
                        disabled
                      />
                    </Stack>
                  </LocalizationProvider>
                </MDBox>
                <MDBox mb={2}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel error={priorityError} id="demo-simple-select-label">
                        Priority
                      </InputLabel>
                      <Select
                        error={priorityError}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={priority}
                        label="Priority"
                        onChange={handleChangepriority}
                        style={{ height: 40 }}
                      >
                        <MenuItem value="Need help in the next 1 hour">
                          P1 - Need help in the next 1 hour
                        </MenuItem>
                        <MenuItem value="Need help sometime today">
                          P2 - Need help sometime today
                        </MenuItem>
                        <MenuItem value="Can wait a few days">P3 - Can wait a few days</MenuItem>
                      </Select>
                    </FormControl>
                    <FormHelperText style={{ marginRight: "100px", color: "red" }}>
                      {priorityErrorText}
                    </FormHelperText>
                  </Box>
                </MDBox>
                <MDBox mb={2}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel error={sectionError} id="demo-simple-select-label">
                        Section
                      </InputLabel>
                      <Select
                        error={sectionError}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={section}
                        label="Section"
                        onChange={handleChangesection}
                        style={{ height: 40 }}
                      >
                        <MenuItem value="Dashboard Issues">Dashboard Issues</MenuItem>
                        <MenuItem value="Profile Issues">Profile Issues</MenuItem>
                        <MenuItem value="Project Status">Project Status</MenuItem>
                        <MenuItem value="Spend Dashboard">Spend Dashboard</MenuItem>
                        <MenuItem value="Saving Dashboard">Saving Dashboard</MenuItem>
                        <MenuItem value="Action Tracker">Action Tracker</MenuItem>
                        <MenuItem value="Action Tree">Action Tree</MenuItem>
                        <MenuItem value="Help Desk">Help Desk</MenuItem>
                        <MenuItem value="Sign In">Sign In</MenuItem>
                        <MenuItem value="Sign Up">Sign Up</MenuItem>
                      </Select>
                    </FormControl>
                    <FormHelperText style={{ marginRight: "100px", color: "red" }}>
                      {sectionErrorText}
                    </FormHelperText>
                  </Box>
                </MDBox>
                <MDBox mb={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <input
                      type="file"
                      name="myImage"
                      accept="image/*"
                      label="Your Image File"
                      value={filename}
                      onChange={handleFile}
                    />
                  </Stack>
                  <FormHelperText style={{ marginTop: "10px" }}>
                    You can share screenshot of page
                  </FormHelperText>
                </MDBox>

                <MDBox mt={4} mb={1}>
                  <MDButton onClick={helpdeskform} variant="gradient" color="info" fullWidth>
                    submit
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>

          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                All Queries
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns: pColumns, rows: pRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </MDBox>
      </HelpdeskLayout>

      {<ToastContainer style={{ fontSize: "15px" }} toastStyle={{ borderRadius: "10px" }} />}
    </>
  );
}
export default Helpdesk;
