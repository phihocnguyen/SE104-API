const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./config/database')
require('dotenv').config()
const { errorHandlingMiddleware } = require('./middlewares/errorHandling')
const { default: apiRouter } = require('./routes/apiRoute')

const app = express()
app.use(cors({
    credentials: true
}))
app.use(bodyParser.json())
// require('./models/taikhoan')
// require('./models/sinhvien')
// require('./models/monhoc')
// require('./models/chuongtrinhhoc')
// require('./models/hocki')
// require('./models/dkhocphan')
// require('./models/phieudkhocphan')
// require('./models/phieuthuhocphi')
const port = process.env.PORT || 3000


app.get('/', (req, res) => {
    res.send('<h1> Hello World </h1>')
})
app.use('/api', apiRouter)
// app.use(errorHandlingMiddleware)
app.use(errorHandlingMiddleware)
sequelize
    .sync()
    .then(() => app.listen(port, () => {
        console.log('connected to db')
        console.log(`listen on port ${process.env.PORT}`)
    }) )
    .catch(err => {throw new Error(err)})
