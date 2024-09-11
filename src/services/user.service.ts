import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUser.dto";
import { UpdateUserDto } from "../dtos/updateUser.dto";

export interface userService {
  createUser(data: CreateUserDto): Promise<CreateUserDto>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  deleteUser(id: number): Promise<void>;
  updateUser(data: UpdateUserDto, id: number): Promise<Partial<User | null>>;
  profile(id: number): Promise<User | null>;
}
