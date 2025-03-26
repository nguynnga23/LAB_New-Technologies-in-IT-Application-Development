## 1. Tổng quan
Dự án này là một ứng dụng Node.js sử dụng mô hình MVC (Model-View-Controller) để quản lý danh sách các khóa học. Nó bao gồm các chức năng chính:

- Hiển thị danh sách khóa học.
- Thêm khóa học (bao gồm upload hình ảnh lên AWS S3).
- Xóa khóa học.

Dữ liệu được lưu trữ trong DynamoDB, và hình ảnh được lưu trữ trên AWS S3.

## 2. Cấu trúc thư mục
Cấu trúc thư mục của dự án như sau:
```
lab04-05_nodejs-mvc/
├── .env
├── .gitignore
├── data.js
├── HDTuan6.docx
├── package.json
├── public/
│   └── index.css
├── server.js
├── src/
│   ├── app.js
│   ├── configs/
│   │   └── aws.helper.js
│   ├── controllers/
│   │   └── course.controller.js
│   ├── models/
│   │   └── course.model.js
│   ├── routes/
│   │   └── course.route.js
│   └── services/
│       └── upload.service.js
└── views/
    └── index.ejs
```
## 3. Phân tích chi tiết
### 3.1. Frontend (View)
- File: `index.ejs`
    - Hiển thị danh sách các khóa học trong bảng.
    - Form thêm khóa học với các trường: ID, tên, loại, học kỳ, khoa, và hình ảnh.
    - Hỗ trợ xóa khóa học qua nút "Delete".
    - Sử dụng CSS từ file `index.css` để tạo giao diện.
### 3.2. Backend (Controller & Routes)
- File: `course.controller.js`
    - `getAllCourses`: Lấy danh sách khóa học từ DynamoDB và render ra giao diện.
    - `saveCourse`:
        - Xử lý thêm khóa học.
        - Upload hình ảnh lên AWS S3 (nếu có).
        - Lưu thông tin khóa học vào DynamoDB.
    - `removeCourse`: Xóa khóa học khỏi DynamoDB dựa trên ID.
- File: `course.route.js`
    - `GET /`: Hiển thị danh sách khóa học.
    - `POST /save`: Thêm khóa học (bao gồm upload hình ảnh).
    - `POST /delete`: Xóa khóa học.
### 3.3. Model
- File: `course.model.js`
    - `getCourses`: Lấy danh sách khóa học từ DynamoDB.
    - `addCourse`: Thêm khóa học vào DynamoDB.
    - `deleteCourse`: Xóa khóa học khỏi DynamoDB dựa trên ID.
### 3.4. AWS Integration
- File: `aws.helper.js`
    - Cấu hình AWS SDK với thông tin từ file .env.
    - Khởi tạo các đối tượng DynamoDB và S3.
- File: `upload.service.js`
    - `uploadToS3`: Upload file lên AWS S3 và trả về URL của file.
### 3.5. Server
- File: `app.js`
    - Cấu hình middleware:
        - `express.json()` và `express.urlencoded()` để xử lý dữ liệu từ request.
        - `express.static()` để phục vụ file tĩnh.
    - Cấu hình view engine là EJS.
    - Sử dụng route `courseRoutes`.
- File: `server.js`
    - Khởi chạy server trên cổng được cấu hình trong .env hoặc mặc định là 3000.

## 4. Luồng hoạt động:
- `GET /`: Client gửi yêu cầu → `Route` gọi `getAllCourses` trong `Controller` → `Controller` gọi `getCourses` từ `Model` → `Model` lấy dữ liệu từ `DynamoDB` → `Controller` render view `courses.ejs` với dữ liệu.
- `POST /save`: Client gửi form → `Route` gọi `saveCourse` (với middleware upload) → `Controller` upload ảnh lên S3 (qua `S3Service`), gọi `addCourse` từ `Model` → `Model` lưu vào `DynamoDB` → `Redirect` về /.
- `POST /delete`: Client gửi ID → Route gọi `removeCourse` → `Controller` gọi `deleteCourse` từ `Model` → `Model` xóa khỏi `DynamoDB` → `Redirect` về /.