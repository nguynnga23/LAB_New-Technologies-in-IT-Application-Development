const express = require("express");
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Cấu hình view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
const courseRoutes = require("./routes/course.route");
app.use("/", courseRoutes);

module.exports = app;
