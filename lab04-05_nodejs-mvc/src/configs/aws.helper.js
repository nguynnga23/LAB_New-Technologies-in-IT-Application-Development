const AWS = require("aws-sdk");
require('dotenv').config();  // Đọc các biến môi trường từ file .env

// Cấu hình AWS SDK
const config = new AWS.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // Lấy thông tin từ biến môi trường
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',  // Region mặc định nếu không có trong biến môi trường
});

AWS.config = config;  // Cấu hình SDK

// Khởi tạo DynamoDB và S3
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

// Export các đối tượng để sử dụng ở các file khác
module.exports = { dynamoDB, s3 };
