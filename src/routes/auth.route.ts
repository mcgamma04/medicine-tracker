import express from "express";
import { UserAuthController } from "../controllers/userAuth.comtroller";
const authRouter = express.Router();

const userAuthController = new UserAuthController();
authRouter.post("/login", userAuthController.login);
authRouter.post("/refresh-token", userAuthController.refreshTokenAccess);

export default authRouter;
