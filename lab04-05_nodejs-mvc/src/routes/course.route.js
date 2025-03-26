const express = require("express");
const multer = require('multer');
const router = express.Router();
const { getAllCourses, saveCourse, removeCourse } = require("../controllers/course.controller");
const upload = multer({ storage: multer.memoryStorage() });  // Lưu trữ file trong bộ nhớ

// Route lấy danh sách khóa học
router.get("/", getAllCourses);
// Route thêm khóa học
// router.post("/save", saveCourse);
router.post('/save', upload.single('image'), saveCourse);  // 'image' là tên trường file trong form HTML
// Route xóa khóa học
router.post("/delete", removeCourse);

module.exports = router;
