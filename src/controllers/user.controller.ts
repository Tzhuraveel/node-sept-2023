import { Request, Response } from "express";

import { userService } from "../service/user.service";
import { IReq } from "../types/common.types";
import { ICommonResponse, IDeleteResponse, IUser } from "../types/User.types";

class UserController {
  public async getAll(req: Request, res: Response): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  public async getById(req: IReq, res: Response): Promise<Response<IUser>> {
    try {
      const user = req.user;
      return res.status(201).json(user);
    } catch (e) {
      console.log(e);
    }
  }

  public async create(
    req: IReq,
    res: Response
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const user = req.body;

      await userService.create(user);

      return res.status(201).json({
        message: 1,
        data: user,
      });
    } catch (e) {
      console.log(e);
    }
  }

  public async update(
    req: IReq,
    res: Response
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const { userId } = req.params;
      const body = req.body;

      console.log(userId);
      console.log(body);

      await userService.update(userId, body);

      return res.status(201).json({
        message: "User updated",
        data: body,
      });
    } catch (e) {
      console.log(e);
    }
  }

  public async delete(
    req: IReq,
    res: Response
  ): Promise<Response<IDeleteResponse>> {
    try {
      const { userId } = req.params;
      await userService.delete(userId);

      console.log("end");
      return res.status(204).json({
        message: "User deleted",
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export const userController = new UserController();
