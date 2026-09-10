import { Response } from "express";

type Tmeta = {
  page: number;
  limit: number;
  total: number;
};
type TResponseData<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  //generic data type user dynamic response
  data: T;
  //meta is optional data type
  meta?: Tmeta;
};
//sendResponse will be a generic because sometimes will come post data, comment data , user data
export const sendResponse =<T> ( res: Response, data:TResponseData<T>)=> {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode:data.statusCode,
        message:data.message,
        data:data.data,
        meta:data.meta

    })
};


