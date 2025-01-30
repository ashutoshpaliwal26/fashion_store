import { NextFunction, Request, Response } from "express";
import AuthService from "../service/AuthService";
import User from "../models/User";

export async function protect(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const header = req.headers.authorization;

  if (header && !header.startsWith("Bearear")) {
    return res.status(404).json({
      success: false,
      message: "You are not Authorized",
    });
  }
  const token = header?.startsWith("Bearear") && header?.split(" ")[1];
  const payload = AuthService.getToken(token as string);
  const user = await User.findOne({ email: payload?.email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "You are Not Authorized",
    });
  }
  next();
}

export const isCheck = (req:Request, res:Response): any=> {
    return res.status(200).json({
        success : true,
        message : "Authorized"
    })
}
