import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../error/api.error";
import { userService } from "../service/user.service";
import { UserValidator } from "../validator";

class UserMiddleware {
  public async getByIdHandlerError(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await userService.getById(userId);

      if (!user) {
        throw new ApiError("User not found", 422);
      }

      res.locals.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserIdValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.userId)) {
        throw new ApiError("ID not valid", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserValidatorCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.createUser.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      req.body = value;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.updateUser.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      req.body = value;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async updateHandlerError(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password, gender } = req.body;

      const { userId } = req.params;

      if (!name) {
        throw new ApiError("Wrong name", 422);
      }
      if (!email) {
        throw new ApiError("Wrong email", 422);
      }
      if (!password) {
        throw new ApiError("Wrong password", 422);
      }
      if (!gender) {
        throw new ApiError("Wrong gender", 422);
      }

      const user = await userService.getById(userId);

      if (!user) {
        throw new ApiError("User not found", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
