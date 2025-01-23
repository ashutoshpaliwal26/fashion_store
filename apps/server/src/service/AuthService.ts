import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IAuthService } from "../types/appTypes";

class AuthService implements IAuthService {
  private secrete: string;
  private salt: number = 10;

  constructor(secret: string) {
    this.secrete = secret;
  }

  public setToken(payload: any): string | null {
    if (!payload) {
      return null;
    }

    return jwt.sign(payload, this.secrete);
  }

  public getToken(token: string): any | null {
    if (!token) {
      return null;
    }
    return jwt.verify(token, this.secrete);
  }

  public async setPassword(password: string): Promise<string | null> {
    if (!password) {
      return null;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, this.salt);
      return hashedPassword;
    } catch (error) {
      console.error("Bcrypt Error:", error);
      throw new Error("Failed to hash password"); // Throw a specific error
    }
  }

  public async checkPassword(encrypted: string, password: string) {
    if (!encrypted && !password) {
      return false;
    }
    try {
        console.log({password, encrypted});
      if (await bcrypt.compare(password as string, encrypted as string))
        return true;
      else false;
    } catch (err) {
      console.log("Bcrypt Error : ", (err as Error).message);
    }
  }
}

export default new AuthService(process.env.JWT_SEC as string);
