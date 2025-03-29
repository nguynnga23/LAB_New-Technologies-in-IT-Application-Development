const AWS = require("aws-sdk");
require("dotenv").config();
const config = new AWS.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccesskey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

AWS.config = config;

// Khoi tao DynamoDB va S3
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports = {dynamoDB, s3};

