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
      select: DEFAULT_SELECT,
    });
    return employees;
  }
  async getEmployeeById(id: number) {
    const employee = await prismaService.prisma.employee.findFirst({
      where: { id },
      select: DEFAULT_SELECT,
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
    const hashPassword = await bcrypt.hash(password, 10);

    const codeValidation =
      await codeValidationToEmployeeService.getCodeByCharacters(validationCode);

    if (!codeValidation) "codeNotFound";

    const employee = await prismaService.prisma.employee.findFirst({
      where: {
        email,
      },
    });

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

    if (employee) return;

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
    await codeValidationToEmployeeService.deleteCode(validationCode);
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
                url: photo.url,
                name: photo.name,
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
    });

    if (!employee) return;

    const deletedEmployee = await prismaService.prisma.employee.delete({
      where: { id: employeeId },
      select: DEFAULT_SELECT,
    });

    return deletedEmployee;
  }
}
