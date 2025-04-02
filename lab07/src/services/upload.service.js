const {s3} = require("../configs/aws.helper");

const uploadToS3 = (file) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    return s3.upload(params).promise();
}

module.exports = { uploadToS3 };