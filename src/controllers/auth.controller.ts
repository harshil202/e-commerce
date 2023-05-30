import { NextFunction, Request, Response, request } from "express";
import { authService, loginService } from "../services/auth.service";
import { LoginUserRequest, RegisterUserReuqest, RegisteredUserResponse } from "../types/auth.type";

export const registerController = async (request: Request, response: Response, next: NextFunction) => {
    const userDetails: RegisterUserReuqest = request.body;
    try {
        const registeredUser: string | RegisteredUserResponse = await authService(userDetails);
        response.send({ message: 'Success', data: registeredUser })
    } catch (error) {
        response.send({ message: 'Error', data: error })
    }
}

export const loginController = async (request: Request, response: Response, next: NextFunction) => {
    const loginDetails: LoginUserRequest = request.body;
    try {
        const LoggedInUser = await loginService(loginDetails);
        response.send({ message: 'Success', data: LoggedInUser })
    } catch (error) {
        response.send({ message: 'Error', data: error })
    }
}