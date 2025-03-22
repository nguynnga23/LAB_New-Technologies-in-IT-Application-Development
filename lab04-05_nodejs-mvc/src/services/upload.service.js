// const s3 = require("../configs/aws.helper")
// // Hàm upload ảnh lên S3
// const uploadToS3 = (file) => {
//     const params = {
//         Bucket: process.env.BUCKET_NAME,  // Thay bằng tên Bucket của bạn
//         Key: `images/${Date.now()}_${file.originalname}`, // Tên file trên S3
//         Body: file.buffer,  // Dữ liệu file (từ Multer)
//         ACL: 'public-read',  // Quyền truy cập công khai
//         ContentType: file.mimetype  // Loại nội dung của file (ví dụ image/jpeg)
//     };

//     return s3.upload(params).promise();  // Trả về Promise
// };

// module.exports = uploadToS3;  // Export hàm upload để sử dụng ở các file khác
