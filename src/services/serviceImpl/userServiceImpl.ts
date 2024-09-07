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

    if(user){
        throw new Error('User already exists');
    }

    const newUser = await db.user.create({
        data:{
            name: data.name,
            email: data.email,
            password: data.password,
            },   
    })

   return newUser;
  }
  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}