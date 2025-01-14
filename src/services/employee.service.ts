import { Role } from "@prisma/client";
import { EmployeeModel } from "../@types";
import { prismaService } from "./prisma.service";
import bcrypt from "bcrypt";
import { EmployeeUpdateI, LoginI } from "../interfaces";
const DEFAULT_SELECT = {
  username: true,
  email: true,
  role: true,
};
export class EmployeeService {
  async getAllEmployees() {
    // get all employees
  }
  async getEmployeeById(id: number) {
    // get employee by id
  }
  async createEmployee(employeeInfo: EmployeeModel) {
    const { email, username, phone, role, academicLevel, password, cellphone } =
      employeeInfo;
    const hashPassword = await bcrypt.hash(password, 10);

    const employee = await prismaService.prisma.employee.findFirst({
      where: {
        email,
      },
    });

    if (employee) return;

    const newEmployee = await prismaService.prisma.employee.create({
      data: {
        email,
        username,
        cellphone,
        password: hashPassword,
        phone,
        role,
        academicLevel,
        profile: {
          create: {
            bio: "Fale um pouco sobre você",
            photo: {
              create: {
                url: "https://www.google.com",
                name: "name_default",
              },
            },
          },
        },
      },
      select: DEFAULT_SELECT,
    });
    return newEmployee;
  }
  async updateEmployee(employeeUpdate: EmployeeUpdateI) {
    const {
      academicLevel,
      email,
      phone,
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

    const updatedEmployee = await prismaService.prisma.employee.update({
      where: { id },
      data: {
        username,
        password: hashPassword,
        cellphone,
        email,
        phone,
        academicLevel,
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
    // delete employee
  }
}
