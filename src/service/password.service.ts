import bcrypt from "bcrypt";

class PasswordService {
  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  public async compare(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}

export const passwordService = new PasswordService();
