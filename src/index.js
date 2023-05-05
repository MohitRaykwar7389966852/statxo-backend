require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./route/route.js");
const app = express();
const cors = require("cors");
const multer = require("multer");

app.use(
    cors({
        origin: "*",
    })
);
app.use(multer().any());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", route);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("material-dashboard-react/build"));
}

app.listen(process.env.PORT, function () {
    console.log("Express app running on port " + process.env.PORT);
});
