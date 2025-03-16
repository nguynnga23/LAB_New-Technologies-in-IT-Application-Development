const { getCourses, addCourse, deleteCourse } = require("../models/course.model");

// Hiển thị danh sách khóa học
const getAllCourses = async (req, res) => {
    try {
        const courses = await getCourses();
        return res.render("index", { courses }); // Nếu dùng View Engine như EJS
    } catch (error) {
        return res.status(500).json({ message: "Error fetching courses" });
    }
};

// Xử lý thêm khóa học
const saveCourse = async (req, res) => {
    try {
        const course = {
            id: req.body.id,
            name: req.body.name,
            course_type: req.body.course_type,
            semester: req.body.semester,
            department: req.body.department
        };
        await addCourse(course);
        return res.redirect("/courses");
    } catch (error) {
        return res.status(500).json({ message: "Error adding course" });
    }
};

// Xử lý xóa khóa học
const removeCourse = async (req, res) => {
    try {
        const courseId = req.body.id;
        await deleteCourse(courseId);
        return res.redirect("/courses");
    } catch (error) {
        return res.status(500).json({ message: "Error deleting course" });
    }
};

module.exports = { getAllCourses, saveCourse, removeCourse };
