import { ClientModel, ClientUpdateT } from "../@types";
import { prismaService } from "./prisma.service";
import bcrypt from "bcrypt";
import { LoginI } from "../interfaces";

const DEFAULT_SELECT = {
  username: true,
  email: true,
};

export class ClientService {
  async createClient(clientInfo: ClientModel) {
    const { email, password, phone, username, cellphone } = clientInfo;
    const client = await prismaService.prisma.client.findFirst({
      where: { email },
    });
    if (client) return;

    const hashPassword = await bcrypt.hash(password, 10);
    const newClient = await prismaService.prisma.client.create({
      data: { email, password: hashPassword, phone, username, cellphone },
      select: DEFAULT_SELECT,
    });
    return newClient;
  }
  async login(loginInfo: LoginI) {
    const { email, password } = loginInfo;

    const client = await prismaService.prisma.client.findFirst({
      where: { email },
    });

    if (!client) return;

    const isvalid = await bcrypt.compare(password, client.password);

    if (isvalid) {
      const { password, ...newUser } = client;
      return newUser;
    }
    return;
  }

  async deleteClient(clientId: number) {
    const client = await prismaService.prisma.client.findFirst({
      where: { id: clientId },
    });

    if (!client) return;

    const userDeleted = await prismaService.prisma.client.delete({
      where: { id: clientId },
      select: DEFAULT_SELECT,
    });

    return userDeleted;
  }

  async updateClient(clientInfo: ClientUpdateT) {
    const { email, password, phone, username, photo, id, bio } = clientInfo;

    const hashPassword = await bcrypt.hash(password, 10);

    const client = await prismaService.prisma.client.findFirst({
      where: { id },
    });

    if (!client) return;

    const updatedClient = await prismaService.prisma.client.update({
      where: { id },
      data: {
        email,
        password: hashPassword,
        phone,
        username,
        profile: {
          update: {
            bio,
            photo: {
              update: {
                url: photo.url,
                name: photo.name,
              },
            },
          },
        },
      },
      select: DEFAULT_SELECT,
    });

    return updatedClient;
  }
}
