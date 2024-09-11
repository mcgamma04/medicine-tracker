import express from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
const userRoutes = express.Router();

const userController = new UserController();
userRoutes.post("/", userController.createUser);
userRoutes.get("/", userController.list);
userRoutes.get("/:id", userController.findOne);
userRoutes.get("/q/:email", userController.findOneByEMail);
userRoutes.delete("/:id", userController.deleteUser);
userRoutes.patch("/:id", userController.updateUser);
userRoutes.post("/profile", authenticateUser, userController.profile);
export default userRoutes;
