const express = require("express");
const multer = require("multer");
const route = express.Router();

const {getAllCar, saveCar, removeCar} = require("../controllers/car.controller");

const upload = multer({storage: multer.memoryStorage()});

route.get("/", getAllCar);
route.post("/save", upload.single("image"), saveCar);
route.post("/delete", removeCar);

module.exports = route;