const express = require('express');
const app = express();
const PORT = 3000;
let courses = require("./data");
// Register middleware
app.use(express.json({extended: false}));
app.use(express.urlencoded({ extended: true })); // Dùng để phân tích dữ liệu gửi từ form
app.use(express.static("./views")); // Cho phép dùng các tài nguyên tĩnh như css, js, images,...

// Configs view engine
app.set("view engine", "ejs"); // Khai báo rằng app sẽ dùng engine ejs để render trang web
app.set("views", "./views"); // Nội dung render trang web sẽ nằm trong thư mục tên "views"

app.get("/", (req, res) => {
    return res.render("index", {courses}); // 
});

app.post("/save", (req, res) => {
    const id = Number(req.body.id);
    console.log(id);
    const name = req.body.name;
    const course_type = req.body.course_type;
    const semester = req.body.semester;
    const department = req.body.department;

    const params = {
        "id": id,
        "name": name,
        "course_type": course_type,
        "semester": semester,
        "department": department
    }
    console.log(params);
    courses.push(params);
    return res.redirect("/");
});

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});
