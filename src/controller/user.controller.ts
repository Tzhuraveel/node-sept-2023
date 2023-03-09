import { Request, Response } from "express";

import { userService } from "../service/user.service";
import { ICommonResponse, IDeleteResponse, IUser } from "../types/User.types";

class UserController {
  public async getAll(req: Request, res: Response): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();

      return res.json(users);
    } catch (e) {
      res.json({
        message: e.message,
      });
    }
  }
  public async getById(req: Request, res: Response): Promise<Response<IUser>> {
    const { user } = res.locals;

    return res.status(200).json({
      message: "User is found",
      user: user,
    });
  }
  public async create(req: Request, res: Response): Promise<Response<IUser>> {
    const body = req.body;
    await userService.create(body);

    return res.status(201).json({
      message: "User created!",
      data: body,
    });
  }
  public async update(
    req: Request,
    res: Response
  ): Promise<Response<ICommonResponse<IUser>>> {
    const { userId } = req.params;
    const user = await userService.update(userId, req.body);

    return res.status(201).json({
      message: "User is updated",
      user: user,
    });
  }
  public async delete(
    req: Request,
    res: Response
  ): Promise<Response<IDeleteResponse>> {
    const { userId } = req.params;
    await userService.delete(userId);

    return res.status(204).json({
      message: "User deleted",
    });
  }
}

export const userController = new UserController();
