import authRouter from './auth'
import studentRouter from './student'
import subjectRouter from './subject'
import programRouter from './program'
import semesterRouter from './semester'
import enrollmentRouter from './enrollment'
import formRouter from './form'
import feeRouter from './fee'

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
apiRouter.use('/enrollment', enrollmentRouter)
apiRouter.use('/form', formRouter)
apiRouter.use('/fee', feeRouter)
export default apiRouter