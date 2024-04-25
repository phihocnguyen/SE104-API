import { createNewSemester, deleteSemester, editSemester, getAllSemesters } from '~/controllers/semester'

const express = require('express')

const semesterRouter = express.Router()

semesterRouter.post('/create', createNewSemester)
semesterRouter.put('/edit/:id', editSemester)
semesterRouter.get('/allsemesters', getAllSemesters)
semesterRouter.delete('/delete/:id', deleteSemester)
export default semesterRouter