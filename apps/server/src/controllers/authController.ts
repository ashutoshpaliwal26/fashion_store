import { Request, response, Response } from "express";
import User from "../models/User";
import { IAuthenticationController } from "../types/appTypes";
import AuthService from "../service/AuthService";

class AuthControllers implements IAuthenticationController {
  async createUser(req: Request, res: Response): Promise<any> {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "Fill All the Input fields",
      });
    }
    try {
      const userPresent = await User.findOne({ email: email });

      if (userPresent) {
        return res.status(404).json({
          success: false,
          message: "User Already Exist",
        });
      }
      const hashPass = await AuthService.setPassword(password);
      const createUser = await User.create({ name, email, password: hashPass });

      const token = AuthService.setToken({
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
      });

      if (createUser) {
        return res.status(200).json({
          success: true,
          message: "Account Created Successfully",
          data: {
            _id: createUser._id,
            name: createUser.name,
            email: createUser.email,
          },
          token: token,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: (err as Error).message,
      });
    }
  }

  public async logInUser(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Fill All the Input Fields",
      });
    }

    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        const checkPass = await AuthService.checkPassword(
          checkUser.password,
          password
        );
        const token = AuthService.setToken({
          _id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
        });
        if (checkPass) {
          return res.status(200).json({
            success: true,
            message: "User Login Successfully",
            data: {
              _id: checkUser._id,
              name: checkUser.name,
              email: checkUser.email,
            },
            token: token,
          });
        }
        return res.status(400).json({
          success: false,
          message: "Invalid Password",
        });
      }
      return res.status(404).json({
        success : false,
        message : "User Not Found"
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: (err as Error).message,
      });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<any> {
    const { name, phoneNo, email, address } = req.body;
    const { userId } = req.params;

    if (!userId) {
      return res.json({
        success: false,
        message: "UserId is Not Given",
      });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name: name,
          email: email,
          phoneNo: phoneNo,
          address: address,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(400).json({
          success: false,
          message: "Error in Update",
        });
      }

      return res.status(200).json({
        success: false,
        message: "User Updated Successfully",
        data: {
          _id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          phoneNo: updatedUser.phoneNo,
          address: updatedUser.address,
        },
      });
    } catch (err) {
      return res.json({
        success: false,
        message: (err as Error).message,
      });
    }
  }

  public async deleteUser(req: Request, res: Response):Promise<any> {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(404).json({
          success: false,
          message: "Unautorized",
        });
      }

      const deleteUser = await User.findByIdAndDelete(userId);

      if (!deleteUser) {
        return res.status(400).json({
          success: false,
          message: "Account is Not Deleted",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Account Deleted Successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}

export default AuthControllers;
