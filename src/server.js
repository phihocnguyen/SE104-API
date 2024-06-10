const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./config/database')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const { errorHandlingMiddleware } = require('./middlewares/errorHandling')
const { default: apiRouter } = require('./routes/apiRoute')

const app = express()

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
require('./models/taikhoan')
require('./models/sinhvien')
require('./models/monhoc')
require('./models/chuongtrinhhoc')
require('./models/hocki')
require('./models/dkhocphan')
require('./models/phieudkhocphan')
require('./models/phieuthuhocphi')
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
