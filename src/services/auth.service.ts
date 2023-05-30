import { UserModel } from "../models/user.model";
import { LoginUserRequest, RegisterUserReuqest, RegisteredUser } from "../types/auth.type";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authService = async (payload: RegisterUserReuqest) => {
    if ((payload.firstName === undefined) || (payload.lastName === undefined) || (payload.email === undefined) || (payload.password === undefined)) {
        return 'FirstName, LastName, Email, Password are required'
    }
    if (payload.password.length < 8) {
        return 'Paaaword length must be grated than 8'
    }
    const isEmailExist: RegisterUserReuqest | null = await UserModel.findOne({ where: { email: payload.email } })
    if (isEmailExist) {
        return 'Email is already exist please Login'
    }
    const saltRound: number = 12;
    const hashpassword: string = await bcrypt.hashSync(payload.password, saltRound)
    const registeredUser: RegisteredUser = await UserModel.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: hashpassword
    });
    return {
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email
    };
}

export const loginService = async (payload: LoginUserRequest) => {
    if (payload.email === undefined || payload.password === undefined) {
        return 'Email and Password are required'
    }
    const user = await UserModel.findOne({
        where: {
            email: payload.email
        }
    })
    if (user) {
        const isPasswordMatch = bcrypt.compareSync(payload.password, user.password)
        if (isPasswordMatch) {
            const token = jwt.sign({ id: user.id }, 'json_secret');
            return token;
        }
        return 'Please enter valid email and password'
    }
}