const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());


// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.get('/search', (req, res) => {
    //console.log(req.query.q);
    res.render('search');
});

app.post('/search', (req, res) => {
    console.log(req.body);
    res.send('');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
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