const dynamoDB = require("../configs/aws.helper");

const TABLE_NAME = "Subject";

// Lấy danh sách khóa học
const getCourses = async () => {
    const params = { TableName: TABLE_NAME };
    try {
        const result = await dynamoDB.scan(params).promise();
        return result.Items; // Trả về danh sách khóa học
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];  // Trả về mảng rỗng nếu có lỗi
    }
};

// Thêm khóa học
const addCourse = async (course) => {
    const params = {
        TableName: TABLE_NAME,
        Item: course, // Thêm thông tin khóa học vào DynamoDB
    };
    try {
        await dynamoDB.put(params).promise();
        console.log("Course added:", course);
    } catch (error) {
        console.error("Error adding course:", error);
    }
};

// Xóa khóa học
const deleteCourse = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: id }  // Lưu ý: 'id' phải trùng với tên khóa chính trong DynamoDB
    };
    try {
        await dynamoDB.delete(params).promise();
        console.log("Course deleted:", id);
    } catch (error) {
        console.error("Error deleting course:", error);
    }
};

module.exports = { getCourses, addCourse, deleteCourse };
