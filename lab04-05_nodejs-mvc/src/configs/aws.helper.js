const AWS = require("aws-sdk");
require('dotenv').config();

// Cấu hình AWS SDK
const config = new AWS.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

AWS.config = config;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;
