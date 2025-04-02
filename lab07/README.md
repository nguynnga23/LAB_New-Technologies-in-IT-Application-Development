# Lab07: New Technologies in IT Application Development

This project is a simple web application for managing papers using **Node.js**, **Express**, and **AWS DynamoDB**. It includes features for adding, viewing, and deleting papers, with input validation and database integration.

## Features

- **Add Papers**: Users can add new papers with details such as ISBN, paper name, author, page count, and published year.
- **View Papers**: Displays a list of all papers stored in the DynamoDB table.
- **Delete Papers**: Allows users to delete papers by their ISBN.
- **Validation**: Ensures all input fields are valid and ISBNs are unique.

## Project Structure

```
lab07/
├── public/                 # Static files (CSS, images, etc.)
├── src/
│   ├── configs/            # Configuration files
│   ├── controllers/        # Controllers for handling business logic
│   │   └── paper.controller.js
│   ├── models/             # Models for interacting with DynamoDB
│   │   └── paper.model.js
│   ├── routes/             # Express routes
│   ├── utils/              # Utility functions
│   │   └── validate.js
│   └── views/              # EJS templates for rendering HTML
├── .gitignore              # Files and directories to ignore in Git
├── package.json            # Project dependencies and scripts
├── server.js               # Entry point for starting the server
└── README.md               # Documentation for the project
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lab07
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
   AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
   AWS_REGION=<your-aws-region>
   ```

4. Ensure you have an AWS DynamoDB table named `Paper` with the following schema:
   - **Primary Key**: `ISBN` (String)

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Use the interface to:
   - Add new papers by filling out the form and clicking "Save".
   - View the list of papers in the table.
   - Delete papers by clicking the "Delete" button.

## Validation Rules

The following validation rules are applied when adding a paper:

- **ISBN**: Must be unique and follow a valid format.
- **Paper Name**: Must contain only letters, numbers, and spaces.
- **Author**: Must contain only letters, numbers, and spaces.
- **Page Sum**: Must be a positive integer.
- **Published Year**: Must not exceed the current year.

## Key Code Highlights

### Add Paper Logic (`savePaper` in `paper.controller.js`)

The `savePaper` function handles adding a new paper. It validates the input, adds the paper to the database, and redirects the user upon success.

```javascript
const savePaper = async (req, res) => {
    const isbn = req.body.isbn;
    try {
        const paper = {
            ISBN: isbn,
            paper_name: req.body.paper_name,
            author: req.body.author,
            page_sum: req.body.page_sum,
            published_year: req.body.published_year
        };

        // Validate paper input
        const errors = await validatePaper(paper);
        if (errors) {
            return res.status(400).json({ errors });
        }

        // Add paper to the database
        await addPaper(paper);

        // Redirect after successful operation
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while processing your request.", error: error.message });
    }
};
```

## Future Improvements

- Add file upload functionality to store paper-related files in AWS S3.
- Implement pagination for the paper list.
- Add unit tests for validation and controller logic.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.

## Author

Developed as part of the **New Technologies in IT Application Development** course.
