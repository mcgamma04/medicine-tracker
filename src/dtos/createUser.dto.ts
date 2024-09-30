import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
  @IsEnum(UserRole)
  role: UserRole;

 

  constructor(email: string, name: string, password: string, role: UserRole) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.role = role;
    // this.status = status;
  }
}
