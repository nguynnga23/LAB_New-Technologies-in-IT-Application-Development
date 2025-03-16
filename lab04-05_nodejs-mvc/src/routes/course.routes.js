const express = require("express");
const router = express.Router();
const { getAllCourses, saveCourse, removeCourse } = require("../controllers/course.controller");

// Route lấy danh sách khóa học
router.get("/", getAllCourses);

// Route thêm khóa học
router.post("/save", saveCourse);

// Route xóa khóa học
router.post("/delete", removeCourse);

module.exports = router;
