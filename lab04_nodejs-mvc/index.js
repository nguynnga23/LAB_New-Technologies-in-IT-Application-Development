const express = require('express');
const app = express();

// Register middleware
app.use(express.json({extended: false}));
app.use(express.static("./views")); // Cho phép dùng các tài nguyên tĩnh như css, js, images,...

// Configs view engine
app.set("view engine", "ejs"); // Khai báo rằng app sẽ dùng engine ejs để render trang web
app.set("views", "./views"); // Nội dung render trang web sẽ nằm trong thư mục tên "views"

app.get("/", (req, res) => {
    return res.render("index"); // 
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
