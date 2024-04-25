import { createNewSubject, deleteSubject, editSubject, getAllSubjects } from '~/controllers/subject'

const express = require('express')

const subjectRouter = express.Router()

subjectRouter.post('/create', createNewSubject)
subjectRouter.put('/edit/:mmh', editSubject)
subjectRouter.delete('/delete/:mmh', deleteSubject)
subjectRouter.get('/allsubjects', getAllSubjects)
export default subjectRouter