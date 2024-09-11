import { UserRole } from "@prisma/client";
import { db } from "../config/db";
import { CustomRequest } from "./auth.middleware";
import { Response, NextFunction } from "express";

const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Assuming req.userAuth contains the ID of the logged-in user
    const user = await db.user.findUnique({
      where: {
        id: Number(req.userAuth),
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role === UserRole.ADMIN) {
      next();
    } else {
      throw new Error("Access denied");
    }
  } catch (error) {
    next(error);
  }
};
