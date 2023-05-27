const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('combined'))

app.get('/trang-chu', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Nodemon để lăng nghe sự thay đổi của những file trong source code để reaload lại mà không cần Ctrl C
// Giúp cho chúng ta dễ dàng reload code hơn mà ko cần thoát server để reload lại

// Morgan: thư viện quan sát được các log, request từ phía client lên Node server của mình