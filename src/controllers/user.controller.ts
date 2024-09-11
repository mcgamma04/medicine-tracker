import { NextFunction, Request, Response } from "express";
import { UserServiceImpl } from "../services/serviceImpl/userServiceImpl";
import { userService } from "../services/user.service";
import { CreateUserDto } from "../dtos/createUser.dto";
import { promises } from "dns";
import { UpdateUserDto } from "../dtos/updateUser.dto";
import { CustomRequest } from "../middlewares/auth.middleware";

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

  public list = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.userService.findAll();
      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const user = await this.userService.findOne(Number(id));
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };
  public findOneByEMail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.params;

      const user = await this.userService.findByEmail(email);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(Number(id));
      res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data: UpdateUserDto = req.body;
      const user = await this.userService.updateUser(data, Number(id));
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  public profile = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.userAuth;
      const user = await this.userService.profile(Number(id));
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  };
}
