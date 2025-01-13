import { UserModel } from "../@types";
import { prismaService } from "./prisma.service";
import bcrypt from "bcrypt";

export class UserService {
  async add(user: UserModel) {
    const hashPassword = await bcrypt.hash(user.password, 10);
    let data = await prismaService.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
      },
    });

    return data;
  }
  async login(email: string, password: string) {
    const userExists = await prismaService.prisma.user.findFirst({
      where: { email },
    });

    if (!userExists) {
      return;
    }
    const isvalid = await bcrypt.compare(password, userExists.password);

    if (isvalid) {
      const { password, ...newUser } = userExists;
      return newUser;
    }
  }

  async remove(id: number) {
    try {
      const userDeleted = await prismaService.prisma.user.delete({
        where: { id },
      });

      return userDeleted;
    } catch (e) {
      return false;
    }
  }
}
