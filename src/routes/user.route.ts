import express from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validationMiddleware.middleware";
import { CreateUserDto } from "../dtos/createUser.dto";
import isAdmin from "../middlewares/isAdmin.middleware";
const userRoutes = express.Router();

const userController = new UserController();
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows you to create a new user with a name, email, password, and role.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 role:
 *                   type: string
 *                   enum: [ADMIN, MANUFACTURER]
 *                   example: MANUFACTURER
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Internal server error
 */
userRoutes.post("/", validationMiddleware(CreateUserDto),userController.createUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: This endpoint returns a list of all registered users. Only accessible to admin users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Assuming you're using Bearer Token (JWT) for authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDto'  # Assuming a UserDto schema exists
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       403:
 *         description: Forbidden. User does not have access (not an admin).
 *       500:
 *         description: Internal server error.
 */
userRoutes.get("/",authenticateUser, isAdmin, userController.list);
userRoutes.get("/:id", authenticateUser, isAdmin,userController.findOne);
userRoutes.get("/q/:email",authenticateUser, isAdmin, userController.findOneByEMail);
userRoutes.delete("/:id", authenticateUser, isAdmin,userController.deleteUser);
userRoutes.patch("/:id", authenticateUser,userController.updateUser);
userRoutes.post("/profile", authenticateUser, userController.profile);
export default userRoutes;
