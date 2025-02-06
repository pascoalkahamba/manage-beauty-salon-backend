import { ClientUpdateT } from "../@types";
import { prismaService } from "./prisma.service";
import bcrypt from "bcrypt";
import { ClientUpdateI, CreateClientI, LoginI } from "../interfaces";

const DEFAULT_SELECT = {
  username: true,
  email: true,
};

export class ClientService {
  async getAllClients() {
    const clients = await prismaService.prisma.client.findMany({
      select: DEFAULT_SELECT,
    });
    return clients;
  }
  async getClientById(id: number) {
    const client = await prismaService.prisma.client.findFirst({
      where: { id },
      select: {
        ...DEFAULT_SELECT,
        categories: true,
        cart: {
          select: {
            appointment: true,
            id: true,
            clientId: true,
          },
        },
        appointments: {
          select: {
            id: true,
            date: true,
            hour: true,
            status: true,
            service: true,
            client: {
              select: {
                username: true,
                email: true,
                cellphone: true,
                id: true,
              },
            },
            employee: {
              select: {
                username: true,
                email: true,
                cellphone: true,
                id: true,
                role: true,
              },
            },
          },
        },

        cellphone: true,
        profile: {
          select: {
            photo: true,
            bio: true,
            id: true,
            clientId: true,
            employeeId: true,
          },
        },
      },
    });
    if (!client) return;
    return client;
  }

  async createClient(clientInfo: CreateClientI) {
    const { email, password, username, cellphone, categoriesIds } = clientInfo;
    const client = await prismaService.prisma.client.findFirst({
      where: { email },
    });
    if (client) return;

    const categories = await prismaService.prisma.category.findMany({
      where: {
        id: {
          in: categoriesIds,
        },
      },
    });

    if (categories.length === 0) return;

    const hashPassword = await bcrypt.hash(password, 10);
    const newClient = await prismaService.prisma.client.create({
      data: {
        email,
        password: hashPassword,
        username,
        cellphone,
        categories: {
          connect: categories.map((category) => ({ id: category.id })),
        },
        profile: {
          create: {
            bio: "Fale um pouco sobre você",
            photo: {
              create: {
                url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
                name: "Default_Name_Of_Photo",
              },
            },
          },
        },
      },
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
      return { ...newUser, role: "CLIENT" };
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

  async updateClient(clientInfo: ClientUpdateI) {
    const {
      email,
      password,
      username,
      photo,
      id,
      bio,
      cellphone,
      categoriesIds,
    } = clientInfo;

    const hashPassword = await bcrypt.hash(password, 10);

    const client = await prismaService.prisma.client.findFirst({
      where: { id },
      select: {
        profile: {
          select: {
            photo: {
              select: {
                url: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!client) return;

    const categories = await prismaService.prisma.category.findMany({
      where: {
        id: {
          in: categoriesIds,
        },
      },
    });
    if (categories.length === 0) return;

    const clientWithEmail = await prismaService.prisma.client.findFirst({
      where: { email },
    });
    if (clientWithEmail && clientWithEmail.id !== id)
      return "emailAlreadyExists";

    const updatedClient = await prismaService.prisma.client.update({
      where: { id },
      data: {
        email,
        password: hashPassword,
        cellphone,
        username,
        categories: {
          set: categories.map((category) => ({ id: category.id })),
        },
        profile: {
          update: {
            bio,
            photo: {
              update: {
                url: !photo.url ? client?.profile?.photo?.url : photo.url,
                name: !photo.name ? client?.profile?.photo?.name : photo.name,
              },
            },
          },
        },
      },
      select: DEFAULT_SELECT,
    });

    return updatedClient;
  }

  async forgotPassword(clientInfo: LoginI) {
    const { email, password } = clientInfo;
    const hashPassword = await bcrypt.hash(password, 10);

    const client = await prismaService.prisma.client.findFirst({
      where: { email },
    });

    if (!client) {
      return;
    }

    const passwordUpdated = await prismaService.prisma.client.update({
      where: { email },
      data: {
        password: hashPassword,
      },
      select: DEFAULT_SELECT,
    });

    return passwordUpdated;
  }
}
