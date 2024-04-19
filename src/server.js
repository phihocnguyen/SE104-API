const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()



const { errorHandlingMiddleware } = require('./middlewares/errorHandling')
const port = process.env.PORT || 3000



app.use(errorHandlingMiddleware)


app.get('/', (req,res) => {
  res.send('<h1> Hello World </h1>')
})
sequelize
  .sync()
  .then(() => app.listen(port, () => console.log(`listen on port ${port}`)) )
  .catch(err => {throw new Error(err)})
