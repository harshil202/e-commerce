import { UserModel } from "../models/user.model";
import { RegisterUserReuqest, RegisteredUser } from "../types/auth.type";
import bcrypt from 'bcrypt';

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