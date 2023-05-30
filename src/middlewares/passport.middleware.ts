import passport from 'passport';
import passportJWT from 'passport-jwt';
import { UserModel } from '../models/user.model';
import { request } from 'express';
const JwtStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'json_secret'
}
passport.use(new JwtStrategy(opts, async function (jwt_payload, next) {
    const user = await UserModel.findOne({ where: { id: jwt_payload.id } });
    if (user) {
        request.user = user;
        return next(null, user)
    }
    else {
        return next(null, false)
    }
}))

export default passport;