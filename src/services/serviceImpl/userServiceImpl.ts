import { User } from "@prisma/client";
import { CreateUserDto } from "../../dtos/createUser.dto";
import { userService } from "../user.service";
import { db } from "../../config/db";

export class UserServiceImpl implements userService {
  async createUser(data: CreateUserDto): Promise<CreateUserDto> {
    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new Error("User already exists");
    }

    const newUser = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return newUser;
  }
  async findAll(): Promise<User[]> {
    return await db.user.findMany();
    // throw new Error("Method not implemented.");
  }
  async findOne(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("user does not found");
    }
    return user;
    // throw new Error("Method not implemented.");
  }
}
