const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./course');
const meRouter = require('./me');

function route(app) {
    // cấu hình ở đây sẽ lại tách ra từng file
    app.use('/news', newsRouter);

    app.use('/me', meRouter);

    app.use('/courses', courseRouter);

    app.use('/', siteRouter);   

    // app.post('/search', (req, res) => {
    //     console.log(req.body);
    //     res.send('');
    // });
}

exports.route = route;
