import express from "express";
import AuthControllers from "../controllers/authController";
import { isCheck, protect } from "../middleware/protect";

const authRouter = express.Router();
const Auth = new AuthControllers();

authRouter.route("/").get(protect, isCheck);
authRouter.route("/login").post(Auth.logInUser);
authRouter.route("/signup").post(Auth.createUser);
authRouter.route("/update/:userId").put(protect, Auth.updateUser);
authRouter.route("/delete/:userId").delete(protect, Auth.deleteUser);

export default authRouter;