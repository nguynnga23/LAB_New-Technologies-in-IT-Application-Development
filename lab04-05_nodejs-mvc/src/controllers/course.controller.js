const { getCourses, addCourse, deleteCourse } = require("../models/course.model");
const uploadToS3 = require("../services/upload.service");

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
    // Ensure 'id' is a number
    const id = Number(req.body.id);
    
    // Check if the conversion to number was successful (if not, handle the error)
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid id, it must be a number" });
    }
    // Process file upload (if exists)
    // let imageUrl = null;
    // if (req.file) {
    //     try {
    //         const uploadedImage = await uploadToS3(req.file);  // Upload ảnh lên S3
    //         imageUrl = uploadedImage.Location;  // Lấy URL ảnh từ S3
    //     } catch (error) {
    //         return res.status(500).json({ message: "Error uploading image", error: error.message });
    //     }
    // }
    try {
        const course = {
            id: id,
            name: req.body.name,
            course_type: req.body.course_type,
            semester: req.body.semester,
            department: req.body.department,
            // image: imageUrl
        };
        await addCourse(course);
        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ message: "Error adding course" });
    }
};

// Xử lý xóa khóa học
const removeCourse = async (req, res) => {
     // Ensure 'id' is a number
     const id = Number(req.body.id);
    
     // Check if the conversion to number was successful (if not, handle the error)
     if (isNaN(id)) {
         return res.status(400).json({ message: "Invalid id, it must be a number" });
     }
    try {
        const courseId = id;
        await deleteCourse(courseId);
        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({ message: "Error deleting course" });
    }
};

module.exports = { getAllCourses, saveCourse, removeCourse };
