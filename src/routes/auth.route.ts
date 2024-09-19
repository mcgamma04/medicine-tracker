import express from "express";
import { UserAuthController } from "../controllers/userAuth.comtroller";
import { validationMiddleware } from "../middlewares/validationMiddleware.middleware";
import { LoginDto } from "../dtos/login.dto";
const authRouter = express.Router();

const userAuthController = new UserAuthController();
authRouter.post("/login", validationMiddleware(LoginDto),userAuthController.login);
authRouter.post("/refresh-token",userAuthController.refreshTokenAccess);

export default authRouter;
