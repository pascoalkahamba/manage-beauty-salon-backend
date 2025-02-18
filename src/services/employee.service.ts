import { prismaService } from "./prisma.service";
import bcrypt from "bcrypt";
import { CreateEmployeeI, EmployeeUpdateI, LoginI } from "../interfaces";
import CodeValidationToEmployeeService from "./codeValidationToEmployee.service";
const DEFAULT_SELECT = {
  username: true,
  email: true,
  role: true,
};

const codeValidationToEmployeeService = new CodeValidationToEmployeeService();
export class EmployeeService {
  async getAllEmployees() {
    const employees = await prismaService.prisma.employee.findMany({
      select: { ...DEFAULT_SELECT, id: true, academicLevel: true },
    });
    return employees;
  }
  async getEmployeeById(id: number) {
    const employee = await prismaService.prisma.employee.findFirst({
      where: { id },
      select: {
        ...DEFAULT_SELECT,
        services: true,
        appointments: {
          select: {
            id: true,
            date: true,
            client: {
              select: { username: true, email: true, cellphone: true },
            },
            employee: {
              select: { username: true, email: true, cellphone: true },
            },
            service: true,
            status: true,
            hour: true,
            clientId: true,
            employeeId: true,
            serviceId: true,
          },
        },
        academicLevel: true,
        cellphone: true,
        availability: true,
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
    if (!employee) return;
    return employee;
  }
  async addEmployee(employeeInfo: CreateEmployeeI) {
    const {
      email,
      username,
      role,
      academicLevelId,
      password,
      validationCode,
      cellphone,
      servicesIds,
    } = employeeInfo;

    const employee = await prismaService.prisma.employee.findFirst({
      where: {
        email,
      },
    });

    if (employee) return;

    const hashPassword = await bcrypt.hash(password, 10);

    if (role === "MANAGER") {
      const manager = await prismaService.prisma.employee.create({
        data: {
          email,
          password: hashPassword,
          username,
          academicLevel: {
            create: {
              description: "Conta especifica para o gerente do salão de beleza",
              name: "Licenciado em Administração de Empresas",
            },
          },
          profile: {
            create: {
              bio: "Fale um pouco sobre você senhor(a) gerente",
              photo: {
                create: {
                  url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
                  name: "Default_Name_Of_Photo",
                },
              },
            },
          },
          role,
          cellphone,
        },
        select: DEFAULT_SELECT,
      });

      return manager;
    }

    const codeValidation =
      await codeValidationToEmployeeService.getCodeByCharacters(validationCode);

    if (!codeValidation) return "codeNotFound";

    const academicLevel = await prismaService.prisma.academicLevel.findFirst({
      where: {
        id: academicLevelId,
      },
    });
    if (!academicLevel) return "academicLevelNotFound";

    const services = await prismaService.prisma.service.findMany({
      where: {
        id: {
          in: servicesIds,
        },
      },
    });

    if (services.length === 0) return "servicesNotFound";

    const newEmployee = await prismaService.prisma.employee.create({
      data: {
        email,
        username,
        cellphone,
        academicLevel: {
          connect: {
            id: academicLevelId,
          },
        },
        password: hashPassword,
        services: {
          connect: servicesIds.map((id) => ({ id })),
        },
        role,
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
    await codeValidationToEmployeeService.deleteCode(codeValidation.id);
    return newEmployee;
  }
  async updateEmployee(employeeUpdate: EmployeeUpdateI) {
    const {
      academicLevelId,
      servicesIds,
      email,
      username,
      password,
      id,
      photo,
      bio,
      cellphone,
    } = employeeUpdate;
    const hashPassword = await bcrypt.hash(password, 10);
    const employee = await prismaService.prisma.employee.findFirst({
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

    if (!employee) return;

    const academicLevel = await prismaService.prisma.academicLevel.findFirst({
      where: {
        id: academicLevelId,
      },
    });

    if (!academicLevel) return;
    const services = await prismaService.prisma.service.findMany({
      where: {
        id: {
          in: servicesIds,
        },
      },
    });
    if (services.length === 0) return;

    const employeeWithEmail = await prismaService.prisma.employee.findFirst({
      where: {
        email,
      },
    });
    if (employeeWithEmail && employeeWithEmail.id !== id)
      return "emailAlreadyExists";

    const updatedEmployee = await prismaService.prisma.employee.update({
      where: { id },
      data: {
        username,
        password: hashPassword,
        cellphone,
        email,
        academicLevel: {
          connect: {
            id: academicLevelId,
          },
        },
        services: {
          set: servicesIds.map((id) => ({ id })),
        },
        profile: {
          update: {
            bio,
            photo: {
              update: {
                url: !photo.url ? employee?.profile?.photo?.url : photo.url,
                name: !photo.name ? employee?.profile?.photo?.name : photo.name,
              },
            },
          },
        },
      },
      select: DEFAULT_SELECT,
    });

    return updatedEmployee;
  }

  async login(loginInfo: LoginI) {
    const { email, password } = loginInfo;

    const employee = await prismaService.prisma.employee.findFirst({
      where: { email },
    });

    if (!employee) return;

    const isvalid = await bcrypt.compare(password, employee.password);

    if (isvalid) {
      const { password, ...newEmployee } = employee;
      return newEmployee;
    }

    return;
  }

  async forgotPassword(employeeInfo: LoginI) {
    const { email, password } = employeeInfo;
    const hashPassword = await bcrypt.hash(password, 10);

    const employee = await prismaService.prisma.employee.findFirst({
      where: { email },
    });

    if (!employee) {
      return;
    }

    const passwordUpdated = await prismaService.prisma.employee.update({
      where: { email },
      data: {
        password: hashPassword,
      },
      select: DEFAULT_SELECT,
    });

    return passwordUpdated;
  }

  async deleteEmployee(employeeId: number) {
    const employee = await prismaService.prisma.employee.findFirst({
      where: { id: employeeId },
      select: { role: true },
    });

    if (!employee) return;

    if (employee.role === "MANAGER") return "adminCannotBeDeleted";

    const deletedEmployee = await prismaService.prisma.employee.delete({
      where: { id: employeeId },
      select: DEFAULT_SELECT,
    });

    return deletedEmployee;
  }
}
