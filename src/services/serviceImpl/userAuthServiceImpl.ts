import { db } from "../../config/db";
import { LoginDto } from "../../dtos/login.dto";
import { comparePassword } from "../../utils/password.utl";
import { AuthService } from "../auth.service";
import jwt from "jsonwebtoken";

export class UserAuthService implements AuthService {
  
  async login(
    LoginDto: LoginDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await db.user.findUnique({
      where: {
        email: LoginDto.email,
      },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    //check if password is valid
    const isPasswordValid = await comparePassword(
      LoginDto.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    //generate token
    const accessToken = this.generateAccessToken(user.id, user.role);
    //generate refresh token
    const refreshToken = this.generateRefreshToken(user.id, user.role);

    return { accessToken, refreshToken };
  }

  //generate access token
  generateAccessToken(userId: number, role: string): string {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET || "", {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "1h",
    });
  }

  generateRefreshToken(userId: number, role: string): string {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET || "", {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
    });
  }
  //verify refresh token
  async refreshAccessToken(
    refreshToken: string
  ): Promise<{ accessToken: string }> {
    try {
      //verify
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET || ""
      ) as any;
      //if valid, generate access token
      const newAccessToken = this.generateAccessToken(decoded.id, decoded.role);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }
}
