const express = require("express");
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// Cau hinh view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Route
const paperRoutes = require("./routes/paper.route");
app.use("/", paperRoutes);
module.exports = app;