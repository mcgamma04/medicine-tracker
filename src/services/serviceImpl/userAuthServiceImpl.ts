import { db } from "../../config/db";
import { LoginDto } from "../../dtos/login.dto";
import { AuthService } from "../auth.service";
import jwt from "jsonwebtoken";

export class UserAuthService implements AuthService {
  async login(LoginDto: LoginDto): Promise<{ token: string }> {
    const user = await db.user.findUnique({
      where: {
        email: LoginDto.email,
      },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    throw new Error("Method not implemented.");
  }

  //generate access token
  generateAccessToken(userId: number, role: string): string {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET || "", {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "1h",
    });
  }
}
