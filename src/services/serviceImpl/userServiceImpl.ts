import { User } from "@prisma/client";
import { CreateUserDto } from "../../dtos/createUser.dto";
import { userService } from "../user.service";
import { db } from "../../config/db";
import { UpdateUserDto } from "../../dtos/updateUser.dto";
import { hashPassword } from "../../utils/password.utl";
import { CustomError } from "../../exceptions/customError.error";
import { sendEmail } from "../../utils/EmailUtils";

export class UserServiceImpl implements userService {
  async createUser(data: CreateUserDto): Promise<CreateUserDto> {
    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new CustomError(409, `user with ${user.email} already exists`);
    }

    const newUser = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: await hashPassword(data.password),
      },
    });
    await sendEmail(
      newUser.email,
      "Welcome to Sosils",
      { name: newUser.name  },
      "../template/welcome.handlebars"
    );
    // const {password, ...userObj} = newUser;
    // return   {password, ...userObj} = newUser;s
    return newUser;
  }
  async findAll(): Promise<User[]> {
    return await db.user.findMany();
    // throw new Error("Method not implemented.");
  }
  async findOne(id: number): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new CustomError(404, `user does not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new CustomError(404, `user does not found`);
    }
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new CustomError(404, `user does not found`);
    }
    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  }
  async updateUser(
    data: UpdateUserDto,
    id: number
  ): Promise<Partial<User | null>> {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new CustomError(404, `user does not found`);
    }
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...data,
      },
    });
    return updatedUser;
  }

  async profile(id: number): Promise<User | null> {
    // console.log(id);

    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new CustomError(404, `user does not found`);
    }
    return user;
  }
}
