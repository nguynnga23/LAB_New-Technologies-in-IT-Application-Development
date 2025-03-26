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

## 4. Chi tiết Flow cho từng chức năng:
### 1. `GET /` (Lấy danh sách khóa học)
- Mục đích: Hiển thị danh sách khóa học từ DynamoDB trên giao diện index.ejs.
- Luồng hoạt động:
```
[Client]
   | Gửi GET /
   v
[server.js]
   | Khởi động server, gọi src/app.js
   v
[src/app.js]
   | app.use('/', courseRoutes) -> Chuyển yêu cầu đến route
   v
[src/routes/course.route.js]
   | router.get('/', courseController.getAllCourses)
   v
[src/controllers/course.controller.js]
   | courseController.getAllCourses()
   | Gọi courseModel.getCourses()
   v
[src/models/course.model.js]
   | courseModel.getCourses()
   | Sử dụng AWS từ src/configs/aws.helper.js
   | dynamodb.scan({ TableName: 'Courses' })
   v
[DynamoDB]
   | Trả về danh sách khóa học (Items)
   v
[src/controllers/course.controller.js]
   | Nhận dữ liệu từ model
   | res.render('index', { courses })
   v
[views/index.ejs]
   | Render HTML với danh sách khóa học
   | Sử dụng CSS từ public/index.css
   v
[Client]
   | Nhận và hiển thị giao diện
```

### 2. `POST /save` (Thêm khóa học)
- Mục đích: Nhận dữ liệu từ form (bao gồm file ảnh nếu có), upload ảnh lên S3, lưu thông tin khóa học vào DynamoDB, rồi redirect về trang chính.
- Luồng hoạt động:
```
[Client]
   | Gửi POST /save (form: title, description, image)
   v
[server.js]
   | Chuyển yêu cầu đến src/app.js
   v
[src/app.js]
   | app.use('/', courseRoutes)
   | Middleware multer xử lý file upload
   v
[src/routes/course.route.js]
   | router.post('/save', upload.single('image'), courseController.saveCourse)
   v
[src/controllers/course.controller.js]
   | courseController.saveCourse()
   | if (req.file) {
   |   Gọi uploadService.uploadFile(req.file)
   | }
   | Gọi courseModel.addCourse(course)
   |         \
   v          v
[src/services/upload.service.js]  [src/models/course.model.js]
   | uploadService.uploadFile()     | courseModel.addCourse()
   | Sử dụng AWS từ aws.helper.js   | Sử dụng AWS từ aws.helper.js
   | s3.upload()                   | dynamodb.put()
   v          v
[AWS S3]    [DynamoDB]
   | Trả URL ảnh  | Trả trạng thái lưu
   v          v
[src/controllers/course.controller.js]
   | Nhận URL ảnh (nếu có) và trạng thái từ model
   | res.redirect('/')
   v
[Client]
   | Nhận redirect, gửi GET / để hiển thị danh sách mới
```

### 3. POST /delete (Xóa khóa học)
- Mục đích: Xóa khóa học khỏi DynamoDB dựa trên ID, rồi redirect về trang chính.
- Luồng hoạt động:
```
[Client]
   | Gửi POST /delete (form: id)
   v
[server.js]
   | Chuyển yêu cầu đến src/app.js
   v
[src/app.js]
   | app.use('/', courseRoutes)
   v
[src/routes/course.route.js]
   | router.post('/delete', courseController.removeCourse)
   v
[src/controllers/course.controller.js]
   | courseController.removeCourse()
   | Gọi courseModel.deleteCourse(id)
   v
[src/models/course.model.js]
   | courseModel.deleteCourse(id)
   | Sử dụng AWS từ aws.helper.js
   | dynamodb.delete({ TableName: 'Courses', Key: { id } })
   v
[DynamoDB]
   | Trả trạng thái xóa
   v
[src/controllers/course.controller.js]
   | res.redirect('/')
   v
[Client]
   | Nhận redirect, gửi GET / để hiển thị danh sách mới
```

### Tóm tắt luồng tổng thể
1. Khởi động: `server.js` → `app.js` → cấu hình Express và `routes`.
2. Nhận yêu cầu: `Client` → `course.route.js`→ `course.controller.js`.
3. Xử lý dữ liệu:
- Lấy dữ liệu: `course.model.js` → `DynamoDB`.
- Upload ảnh: `upload.service.js` → `S3`.
- Thêm/Xóa: `course.model.js` → `DynamoDB`.
4. Trả kết quả: `Controller` → `index.ejs` → `Client` (hoặc redirect).