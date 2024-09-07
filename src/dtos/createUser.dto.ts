import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name?: string;
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(4)
  password?: string;
  @IsEnum(UserRole)
  role?: UserRole;
}
