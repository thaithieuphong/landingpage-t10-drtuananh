const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const route = require("./routes/routes");
const db = require("./config/db/db");
const cors = require("cors");
const cookieSession = require("cookie-session");
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require("dotenv").config();
// const PORT = 3001;

if (`${process.env.NODE_ENV}` !== "production") {
	require("dotenv").config();
}

// Cung cấp middleware trên Express để kích hoạt CORS
var corsOptions = {
	origin: "http://crm.drtuananh.vn",
};

// Method Override
app.use(methodOverride("_method"));

// Kiểm tra trước khi đến lớp bảo mật
app.use(cors(corsOptions));

// Lưu trữ dữ liệu trên client mà không yêu cầu csdl ở server
app.use(
	cookieSession({
		name: "Hachitech-session",
		secret: "PHONGTT119",
		httpOnly: true,
		secure: false, // change to 'true' when switching to production enviroment
		sameSite: 'strict',
		path: '/'
	})
);

app.use(session({
	secret: "khoabaomatdanhchoflash",
	saveUninitialized: true,
	resave: true
}));

app.use(flash());

// Kết nối tới cơ sở dữ liệu
db.connect();

// Cấu hình đường dẫn tệp tin tĩnh
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.sep));

// Phân tích cú pháp yêu cầu của các loại nội dung
app.use(bodyParser.urlencoded({ extended: true, limit: '2gb' }));
app.use(bodyParser.json());

// Xem những yêu cầu được ghi chép lại
app.use(morgan("combined"));

// Mẫu thiết kế giao diện
app.engine(
	"hbs",
	engine({extname: ".hbs"})
);

// Cấu hình đuôi tệp tin
app.set("view engine", "hbs");
// Cấu hình đường dẫn đến tệp tin chứa giao diện người dùng
app.set("views", path.join(__dirname, "views"));

app.use(function (req, res, next) {
	res.locals.messages_createCustomer_success = req.flash('messages_createCustomer_success');
	res.locals.messages_createCustomer_failure = req.flash('messages_createCustomer_failure');
	next();
});

app.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept"
	);
	next();
});

// Khởi tạo các tuyến đường
route(app);

app.listen(process.env.PORT, () => {
	console.log(`Ứng dụng đang chạy trên port ${process.env.PORT}`);
});
