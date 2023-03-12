import { NextFunction, Request, Response } from "express";

import { ApiError } from "../error/api.error";
import { authService } from "../service/auth.service";
import { ITokenPair } from "../types/token.types";
import { IUser } from "../types/User.types";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(req.body);

      res.sendStatus(201);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokenPair>> {
    try {
      const { email, password } = req.body;
      const user = req.res.locals;
      const tokenPair = await authService.login(
        { email, password },
        user as IUser
      );

      return res.status(200).json(tokenPair);
    } catch (e) {
      next(new ApiError(e.message, e.status));
    }
  }
}

export const authController = new AuthController();
