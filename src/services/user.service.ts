import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUser.dto";

export interface userService {
  createUser(data: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
}
