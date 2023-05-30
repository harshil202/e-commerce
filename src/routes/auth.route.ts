import express from 'express'
import { loginController, registerController } from '../controllers/auth.controller'
import passport from '../middlewares/passport.middleware'
const Authroute = express.Router()

Authroute.post('/register', registerController)
Authroute.post('/login', loginController)
Authroute.get('/me', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.send({ message: "hello", datA: req.user })
})

export default Authroute;