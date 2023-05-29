export type RegisterUserReuqest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type RegisteredUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type RegisteredUserResponse = {
    firstName: string;
    lastName: string;
    email: string;
}