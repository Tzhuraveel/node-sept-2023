import * as jwt from "jsonwebtoken";

import { ITokenPair, ITokenPayload } from "../types/token.types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, "JWT_ACCESS_TOKEN", {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, "JWT_REFRESH_TOKEN", {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();
