import { createNewProgram, deleteProgram, editProgram, getAllPrograms } from '~/controllers/program'

const express = require('express')

const programRouter = express.Router()

programRouter.post('/create', createNewProgram)
programRouter.get('/allprograms', getAllPrograms)
programRouter.put('/edit/:id', editProgram)
programRouter.delete('/delete/:id', deleteProgram)
export default programRouter

