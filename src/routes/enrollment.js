const express = require('express')
const { createEnrollment, getEnrollmentsByMssv, getEnrollmentsBySemester, getAllEnrollments, deleteEnrollment } = require('~/controllers/enrollment')

const enrollmentRouter = express.Router()

enrollmentRouter.post('/create', createEnrollment)
enrollmentRouter.get('/allenrollmentsbymssv/:mssv', getEnrollmentsByMssv)
enrollmentRouter.get('/allenrollmentsbysemester', getEnrollmentsBySemester)
enrollmentRouter.get('/allenrollments', getAllEnrollments)
enrollmentRouter.delete('/delete/:maMonHoc', deleteEnrollment)
export default enrollmentRouter