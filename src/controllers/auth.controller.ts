import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { RegisterUserReuqest, RegisteredUserResponse } from "../types/auth.type";

export const registerController = async (request: Request, response: Response, next: NextFunction) => {
    const userDetails: RegisterUserReuqest = request.body;
    try {
        const registeredUser: string | RegisteredUserResponse = await authService(userDetails);
        response.send({ message: 'Success', data: registeredUser })
    } catch (error) {
        response.send({ message: 'Error', data: error })
    }
}