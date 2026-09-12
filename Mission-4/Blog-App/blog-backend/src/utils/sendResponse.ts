import { Response } from "express";

type TMeta = {
    page: number;
    limit: number;
    total: number;
}

type TResponseData<T> = {
    success: boolean;
    statusCode: number;
    message: string;
    //generic data type and always will be dynamic
    data: T;
    meta?: TMeta
}

export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
        meta: data.meta
    })
}