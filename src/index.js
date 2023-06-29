const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

const app = express();
const port = 3000;

// import từ file routes/index
const route = require('./routes/index').route;

const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

// Middleware
app.get('/middleware', 
    function(req, res, next) {
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            req.face = 'Gach Gach Gach Gach Gach Gach Gach Gach Gach'
            return next();
        }
        res.status(403).json({message: 'Access denied'});
    },
    function(req, res, next) {
        res.json({
            message: 'Successfully middleware',
            face: req.face
        });
    }
);

// Custom Middleware
app.use(SortMiddleware);

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            // Tạo helper để render sort
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-up-short-wide',
                    desc: 'fa-solid fa-arrow-down-short-wide'
                }   

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }

                const icon = icons[sortType];

                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`
            }
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init: chạy file routes được import bên trên và lấy ra các app được cấu hình trong routes/index
route(app);

// Việc Start lên 1 web server và lắng nghe port: 3000
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

// Nodemon để lăng nghe sự thay đổi của những file trong source code để reaload lại mà không cần Ctrl C
// Giúp cho chúng ta dễ dàng reload code hơn mà ko cần thoát server để reload lại

// Morgan: thư viện quan sát được các log, request từ phía client lên Node server của mình

//=======================================================================================================//
// KIẾN THỨC CỐT LÕI:

//10. Template engine (handlebars): Giúp bạn có thể viết ra các file chứa html ở những nới khác
// gọn gàn hơn đạt được hiệu quả khi code HTML thủ công

//11. Static file & SCSS:
// - Giúp dự án của chúng ta cấu hình được những file tĩnh (vd: file css, img)
// - Cấu hình được CSS Preprocessors ( sd được những file như .scss)

//12. Use Bootstrap

//13. Basic routing: định nghĩa ra các tuyến đường giúp bạn truy cập vào website của chúng ta
//- Biến request: chưa thông tin của tuyển đường (PATH) mà nó gửi lên server
//- Biến response: chứa thông tin được trả về khi client yêu cầu. Giúp bạn tùy chọn, cấu hình, setup
// làm sao để cho việc client trả về ntn, trả về cái gì

//14. Query parameters: khái niệm truyền dữ liệu qua chính url

//16. Form default behavior: Hành vi mặc định của form: khi ta nhấn vào ô input có submit thì nó sẽ đính tất cả
// ô input có name trong form đó lên trên query parameter với phương thức là GET

//17. POST method: sử dụng khi muốn gửi dữ liệu từ client lên server và không gử qua url (GET thì có gửi qua url)

//24. Prettier - Code formatter: Giúp chúng ta format lại code để nhìn cho đẹp hơn
// Kết hợp thêm 2 thư viện: Lint-staged và husky; dùng để cấu hình khi mà các thành viên trong team commit code lên
// thì prettier sẽ chạy. Khi đó đẩy code lên git thì sẽ luôn tuân theo 1 format được cấu hình sẵn
// lint-staged: giúp chạy một command trên những file được add vào git
// husky: cung cấp những Git hooks

//30. [CRUD] Update course: 
// Method-Override: Cho phép bạn sử dụng các động từ HTTP như PUT hoặc DELETE ở những nơi mà máy khách không hỗ trợ.

// GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
// GET: Gửi yêu cầu lên Server, yêu cầu Server gửi dữu liệu về Client
// POST: Gửi yêu cầu lên Server, yêu cầu Server lưu lại, tạo mới dữu liệu
// PUT, PATCH: Chỉnh sửa dữ liệu


//32. Soft delete?
// Xóa mềm: không xóa thật, là khi xóa thì trên website sẽ không hiện nữa nhưng trong db thì vẫn còn
