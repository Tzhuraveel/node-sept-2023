import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../error/api.error";
import { User } from "../model/User.model";
import { userService } from "../service/user.service";
import { IRequest } from "../types/password.types";
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

  public getDynamicallyAndThrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][dbField];
        const user = await User.findOne({ [dbField]: fieldValue });
        if (user) {
          next(new ApiError(`This ${fieldName} already exist`, 409));
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public getUserDynamicallyOrThrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][dbField];
        const user = await User.findOne({ [dbField]: fieldValue });

        if (!user) {
          next(new ApiError(`User not found`, 422));
        }

        req.res.locals = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async isValidLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.loginUser.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
