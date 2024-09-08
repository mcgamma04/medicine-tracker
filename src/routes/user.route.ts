import express from "express";
import { UserController } from "../controllers/user.controller";
const userRoutes = express.Router();

const userController = new UserController();
userRoutes.post("/users", userController.createUser);
userRoutes.get("/users", userController.list);
userRoutes.get("/users/:id", userController.findOne);
userRoutes.get("/users/q/:email", userController.findOneByEMail);
userRoutes.delete("/users/:id", userController.deleteUser);
userRoutes.patch("/users/:id", userController.updateUser);
export default userRoutes;
