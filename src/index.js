const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

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
})

app.get('/news', (req, res) => {
    res.render('news');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

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