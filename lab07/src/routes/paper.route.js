const express = require('express');
const multer = require("multer");
const route = express.Router();

const {getListPapers, savePaper, removePaper} = require("../controllers/paper.controller");
const upload = multer({storage: multer.memoryStorage()});

// Get papers
route.get("/", getListPapers);

// Add paper
route.post("/save", savePaper)
// route.post("/save", upload.single('image', addPaper))

// Delete paper
route.post('/delete', removePaper);

module.exports = route;
