import { Response } from "express";
type TMeta = {
  page: number;
  limit: number;
  total: number;
};
type TResponsePayload<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  //data ta dynamic hobe tai generic type use korchi
  data: T;
  meta?: TMeta;
};
export const sendResponse = <T>(res: Response, data: TResponsePayload<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta,
  });
};

