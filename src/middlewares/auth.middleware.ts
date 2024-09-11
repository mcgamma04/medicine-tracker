import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  userAuth?: string;
}

export const authenticateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req?.headers["authorization"];
  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET || "", (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "invalid or expired token" });
    } else 
      req.userAuth = user.id;
    
    next();
  });
};
