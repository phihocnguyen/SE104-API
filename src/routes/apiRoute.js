import authRouter from './auth'
import studentRouter from './student'
import subjectRouter from './subject'
import programRouter from './program'
import semesterRouter from './semester'

const express = require('express')
const apiRouter = express.Router()

apiRouter.get('/', (req, res) => {
    res.json('ready to use')
})

apiRouter.use('/auth', authRouter)
apiRouter.use('/student', studentRouter)
apiRouter.use('/subject', subjectRouter)
apiRouter.use('/program', programRouter)
apiRouter.use('/semester', semesterRouter)
export default apiRouter