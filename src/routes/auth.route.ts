import express from 'express'
import { registerController } from '../controllers/auth.controller'

const Authroute = express.Router()

Authroute.post('/register', registerController)

export default Authroute;