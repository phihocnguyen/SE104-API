const express = require('express')
const { createNewStudent, editStudent, getAllStudents, deleteStudent, getStudentByMssv, updateSTDC } = require('../controllers/student')
const studentRouter = express.Router()

studentRouter.post('/create', createNewStudent)
studentRouter.put('/edit/:mssv', editStudent)
studentRouter.get('/allstudents', getAllStudents)
studentRouter.delete('/delete/:mssv', deleteStudent)
studentRouter.get('/detail/:mssv', getStudentByMssv)
studentRouter.put('/setstdc/:mssv/:stdc', updateSTDC)
export default studentRouter