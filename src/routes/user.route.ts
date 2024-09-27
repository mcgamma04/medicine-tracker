import express from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validationMiddleware.middleware";
import { CreateUserDto } from "../dtos/createUser.dto";
import isAdmin from "../middlewares/isAdmin.middleware";
const userRoutes = express.Router();

const userController = new UserController();
userRoutes.post("/", validationMiddleware(CreateUserDto),userController.createUser);
userRoutes.get("/",authenticateUser, isAdmin, userController.list);
userRoutes.get("/:id", authenticateUser, isAdmin,userController.findOne);
userRoutes.get("/q/:email",authenticateUser, isAdmin, userController.findOneByEMail);
userRoutes.delete("/:id", authenticateUser, isAdmin,userController.deleteUser);
userRoutes.patch("/:id", authenticateUser,userController.updateUser);
userRoutes.post("/profile", authenticateUser, userController.profile);
export default userRoutes;
