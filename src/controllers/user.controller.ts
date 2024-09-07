import { NextFunction, Request, Response } from "express";
import { UserServiceImpl } from "../services/serviceImpl/userServiceImpl";
import { userService } from "../services/user.service";
import { CreateUserDto } from "../dtos/createUser.dto";

export class UserController {
  private userService: UserServiceImpl;

  constructor() {
    this.userService = new UserServiceImpl();
  }

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const createUserDto = req.body as CreateUserDto;
      const user = await this.userService.createUser(createUserDto);
      res.status(201).json({ data: user });
    } catch (error) {
      next(error);
    }
  };
}
