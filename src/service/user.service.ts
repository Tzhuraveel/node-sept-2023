import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { IUser } from "../types/User.types";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public getById(userId: string): Promise<IUser> {
    try {
      return User.findById(userId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(user: IUser): Promise<void> {
    try {
      await User.create(user);
    } catch (e) {}
  }

  public async delete(userId: string): Promise<void> {
    try {
      await User.deleteOne({ _id: userId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(userId: string, user: IUser): Promise<void> {
    try {
      await User.updateOne({ _id: userId }, user);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
