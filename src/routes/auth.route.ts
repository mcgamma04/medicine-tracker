import express from "express";
import { UserAuthController } from "../controllers/userAuth.comtroller";
const authRouter = express.Router();

const userAuthController = new UserAuthController();
authRouter.post("/auth/login", userAuthController.login);
authRouter.post("/auth/refresh-token", userAuthController.refreshTokenAccess);

export default authRouter;
