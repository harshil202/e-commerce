import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";

export const registerController = async (request: Request, response: Response, next: NextFunction) => {
    const userDetails = request.body;
    const registeredUser = await authService(userDetails);
    response.send({ message: 'Success', data: registeredUser })
}