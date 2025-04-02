const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'Paper';

const nameRegex = /^[a-zA-Z0-9\s]+$/;
const authorRegex = /^[a-zA-Z0-9\s]+$/;
const isbnRegex = /^[0-9-]+$/;
const pagesRegex = /^[0-9]+$/;
const yearRegex = /^[0-9]+$/;

const checkEmpty = (payload) => {
    return Object.values(payload).some(value => !value);
};

const isISBNUnique = async (isbn) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { ISBN: isbn }
    };
    
    const result = await dynamoDB.get(params).promise();
    return !result.Item;
};

const validatePaper = async (payload) => {
    const { ISBN, paper_name, author, page_sum, published_year, image } = payload;
    const errors = [];
    const currentYear = new Date().getFullYear();

    // if (checkEmpty(payload)) {
    //     errors.push('All fields are required. Please make sure all fields are filled out.');
    // }

    if (!isbnRegex.test(ISBN)) {
        errors.push('Invalid ISBN format. Please ensure the ISBN contains only numbers and hyphens (e.g., "978-3-16-148410-0").');
    }

    if (!nameRegex.test(paper_name)) {
        errors.push('Paper name must be a valid string. It can include letters, numbers, and spaces only.');
    }

    if (!authorRegex.test(author)) {
        errors.push('Author name must be a valid string. It can include letters, numbers, and spaces only.');
    }

    if (!pagesRegex.test(page_sum) || parseInt(page_sum) <= 0) {
        errors.push('Page sum must be a positive integer. Please enter a number greater than zero.');
    }

    if (!yearRegex.test(published_year) || parseInt(published_year) > currentYear) {
        errors.push(`Published year must be an integer and not exceed the current year (${currentYear}). Please check the year you entered.`);
    }

    if (!(await isISBNUnique(ISBN))) {
        errors.push('This ISBN already exists in the database. Please provide a unique ISBN.');
    }

    return errors.length > 0 ? errors : null;
};

module.exports = { validatePaper };
