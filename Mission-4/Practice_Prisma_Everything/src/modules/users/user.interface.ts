export interface IuserPayload {
  name: string;
  email: string;
  password: string;
  profilePhoto: string;
}


export interface IUpdateProfilePayload {
  name?: string,
  profilePhoto?: string,
  bio?:string
}