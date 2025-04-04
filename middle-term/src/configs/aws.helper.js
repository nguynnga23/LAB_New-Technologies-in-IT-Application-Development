const AWS = require("aws-sdk");
require('dotenv').config();
const config = new AWS.Config({
    accessKeyId: process.env.AWD_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

AWS.config = config;
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports = {dynamoDB, s3};