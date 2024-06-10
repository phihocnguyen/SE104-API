import { createForm, getAllFormsBySemester, getFormBySerial } from '~/controllers/form'


const express = require('express')

const formRouter = express.Router()

formRouter.post('/create', createForm)
formRouter.get('/allformsbyserial/:serial', getFormBySerial)
formRouter.get('/allformsbysemester', getAllFormsBySemester)
export default formRouter