import { NextFunction, Response } from "express";

import { ApiError } from "../errors/api.error";
import { userService } from "../service/user.service";
import { IReq } from "../types/common.types";

class UserMiddleware {
  public async getByIdHandlerError(
    req: IReq,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await userService.getById(userId);

      if (!user) {
        throw new ApiError("User not found", 404);
      }

      console.log(user);

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
  public async createHandlerError(
    req: IReq,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = await req.body;

      const { name, email, password, gender } = body;

      if (!name || name.length < 2) {
        throw new ApiError("Wrong name", 401);
      }
      if (!email || email.length < 8) {
        throw new ApiError("Wrong email", 401);
      }
      if (!password || password.lenght < 8) {
        throw new ApiError("Wrong password", 401);
      }
      if (!gender || (gender !== "male" && gender !== "female")) {
        throw new ApiError("Wrong gender", 401);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
  public async updateHandlerError(
    req: IReq,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body;
      const { name, email, password, gender } = body;

      const { userId } = req.params;

      if (!name || name.length < 2) {
        throw new ApiError("Wrong name", 401);
      }
      if (!email || email.length < 8) {
        throw new ApiError("Wrong email", 401);
      }
      if (!password || password.lenght < 8) {
        throw new ApiError("Wrong password", 401);
      }
      if (!gender || (gender !== "male" && gender !== "female")) {
        throw new ApiError("Wrong gender", 401);
      }

      const user = await userService.getById(userId);

      if (!user) {
        throw new ApiError("Not found user", 404);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async deleteHandlerError(
    req: IReq,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await userService.getById(userId);

      if (!user) {
        throw new ApiError("Not found user", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
