const express = require('express')
const app = express()
const port = 3000

app.get('/trang-chu', (req, res) => {
    var a = 1;
    var b = 2;

    var c = a + b;
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Nodemon để lăng nghe sự thay đổi của những file trong source code để reaload lại mà không cần Ctrl C
// Giúp cho chúng ta dễ dàng reload code hơn mà ko cần thoát server để reload lại