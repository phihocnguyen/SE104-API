import { verifyToken } from '~/middlewares/verifyToken'

const express = require('express')
const { login, register, getUser, logout } = require('../controllers/auth')
const authRouter = express.Router()
authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.get('/logout', logout)
authRouter.get('/user', verifyToken, getUser)
export default authRouter