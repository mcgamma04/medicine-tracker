import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUser.dto";

export interface userService {
  createUser(data: CreateUserDto): Promise<CreateUserDto>;
  findAll(): Promise<User[]>;
  findOne(email: string): Promise<User | null>;
}
