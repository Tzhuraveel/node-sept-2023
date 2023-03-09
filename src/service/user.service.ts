import { ApiError } from "../error/api.error";
import { User } from "../model/User.model";
import { IUser } from "../types/User.types";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getById(userId: string): Promise<IUser> {
    try {
      return User.findById(userId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(user: IUser): Promise<void> {
    try {
      await User.create(user);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async update(userId: string, user: IUser): Promise<IUser> {
    try {
      return User.findByIdAndUpdate(userId, { ...user }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async delete(userId: string): Promise<void> {
    try {
      await User.deleteOne({ _id: userId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
