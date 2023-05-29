import { UserModel } from "../models/user.model";


export const dbInit = (isForce: boolean) => {
    UserModel.sync({ force: isForce })
}