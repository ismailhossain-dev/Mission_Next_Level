export interface IUser {
    name: string,
    email: string,
    password: string,
    role?: "user" | "seller" | "admin",
    is_active:boolean

}