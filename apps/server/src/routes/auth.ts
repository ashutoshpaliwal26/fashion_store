import express, { Router } from "express";
import AuthControllers from "../controllers/authController";

const SEC = process.env.JWT_SEC as string;
const authRouter = express.Router();
const Auth = new AuthControllers();

authRouter.route("/login").post(Auth.logInUser);
authRouter.route("/signup").post(Auth.createUser);
authRouter.route("/update/:userId").post(()=>{});
authRouter.route("/delete").post(()=>{});


export default authRouter;