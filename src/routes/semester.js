import { createNewSemester, deleteSemester, editSemester, getAllSemesters, getAllSubjectsBySemester, getSubjectsBySemester } from '~/controllers/semester'

const express = require('express')

const semesterRouter = express.Router()

semesterRouter.post('/create', createNewSemester)
semesterRouter.put('/edit/:id', editSemester)
semesterRouter.get('/allsemesters', getAllSemesters)
semesterRouter.delete('/delete/:id', deleteSemester)
semesterRouter.get('/subjectsbysemester', getSubjectsBySemester)
semesterRouter.get('/allsubjects/:hocKy', getAllSubjectsBySemester)
export default semesterRouter