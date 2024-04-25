const express = require('express')
const { createNewStudent, editStudent, getAllStudents, deleteStudent } = require('../controllers/student')
const studentRouter = express.Router()

studentRouter.post('/create', createNewStudent)
studentRouter.put('/edit/:mssv', editStudent)
studentRouter.get('/allstudents', getAllStudents)
studentRouter.delete('/delete/:mssv', deleteStudent)
export default studentRouter