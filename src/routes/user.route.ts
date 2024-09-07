import express from "express";
import { UserController } from "../controllers/user.controller";
const userRoutes = express.Router();

const userController = new UserController();
userRoutes.post("/users", userController.createUser);

export default userRoutes;
