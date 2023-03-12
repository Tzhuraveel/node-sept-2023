import { ApiError } from "../error/api.error";
import { Token } from "../model/Token.model";
import { User } from "../model/User.model";
import { ICredentials } from "../types/auth.types";
import { ITokenPair } from "../types/token.types";
import { IUser } from "../types/User.types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(user: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(user.password);
      await User.create({ ...user, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("Invalid email or password", 404);
      }

      const tokenPair = tokenService.generateTokenPair({
        name: user.name,
        id: user._id,
      });
      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
