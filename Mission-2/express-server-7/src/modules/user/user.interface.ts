//ekane amra  user.service.ts er payload er type ta define korbo 

export interface IUser {
    name: string, 
    email: string,
    password: string,
    age: number,
    role: "admin" | "agent" |"user",
    is_active?: boolean

}