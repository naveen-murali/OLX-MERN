const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require("express-fileupload");

dotenv.config({ path: "./config/config.env" });

const mongodb = require('./config/connect');
mongodb.connect();


const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" || process.env.ALLOWED_ORIGIN }));
if (process.env.NODE_ENV === "development")
    app.use(morgan("dev"));

app.use(express.json());
app.use(fileUpload());
app.use(express.static(__dirname + "/public"));

app.use("/api", require("./routers/user"));
app.use("/api/admin", require("./routers/admin"));

app.listen(PORT,
    () => console.log("[SERVER is running] http://localhost:3000")
);