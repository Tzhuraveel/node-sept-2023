import { Request } from "express";

export interface IReq extends Request {
  user: object;
}

export interface IError extends Error {
  status: number;
}
