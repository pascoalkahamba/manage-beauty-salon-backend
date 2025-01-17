import { CodeValidationToEmployeeModel } from "../@types";
import { prismaService } from "./prisma.service";

export default class CodeValidationToEmployeeService {
  async addCode(codeInfo: CodeValidationToEmployeeModel) {
    const { characters, description } = codeInfo;

    const code = await prismaService.prisma.codeValidationToEmployee.findFirst({
      where: {
        characters,
      },
    });
    if (code) return;
    const newCode = await prismaService.prisma.codeValidationToEmployee.create({
      data: {
        characters,
        description,
      },
    });
    return newCode;
  }

  async getAllCodes() {
    const codes =
      await prismaService.prisma.codeValidationToEmployee.findMany();
    return codes;
  }

  async getCodeByCharacters(characters: string) {
    const code = await prismaService.prisma.codeValidationToEmployee.findFirst({
      where: {
        characters,
      },
    });
    if (!code) return;
    return code;
  }

  async deleteCode(characters: string) {
    const code = await prismaService.prisma.codeValidationToEmployee.delete({
      where: {
        characters,
      },
    });
    return code;
  }

  async updateCode(codeInfo: CodeValidationToEmployeeModel) {
    const { characters, description } = codeInfo;
    const code = await prismaService.prisma.codeValidationToEmployee.findFirst({
      where: {
        characters,
      },
    });
    if (!code) return;
    const updatedCode =
      await prismaService.prisma.codeValidationToEmployee.update({
        where: {
          characters,
        },
        data: {
          description,
          characters,
        },
      });
    return updatedCode;
  }
}
