import { Request, Response, NextFunction } from "express";
import { UserAuthService } from "../services/serviceImpl/userAuthServiceImpl";
import { LoginDto } from "../dtos/login.dto";

export class UserAuthController {
  private userAuthService: UserAuthService;

  constructor() {
    this.userAuthService = new UserAuthService();
  }

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userLogin = req.body as LoginDto;
      const { accessToken, refreshToken } = await this.userAuthService.login(
        userLogin
      );
      res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  };

  public refreshTokenAccess = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
      }
      const { accessToken } = await this.userAuthService.refreshAccessToken(
        refreshToken
      );
      return res.status(201).json({ accessToken });
    } catch (error) {
      next(error);
    }
  };
}
