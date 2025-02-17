import { CodeValidationToEmployeeModel } from "../@types";
import { UpdateCodeValidationToEmployeeI } from "../interfaces";
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

  async deleteCode(characterId: number) {
    const code = await prismaService.prisma.codeValidationToEmployee.delete({
      where: {
        id: characterId,
      },
    });
    return code;
  }

  async updateCode(codeInfo: UpdateCodeValidationToEmployeeI) {
    const { characters, description, id } = codeInfo;
    const code = await prismaService.prisma.codeValidationToEmployee.findFirst({
      where: {
        id,
      },
    });
    if (!code) return;

    const codeExit =
      await prismaService.prisma.codeValidationToEmployee.findFirst({
        where: {
          characters,
        },
      });

    if (codeExit && codeExit.id !== id) return "codeAlreadyExists";
    const updatedCode =
      await prismaService.prisma.codeValidationToEmployee.update({
        where: {
          id,
        },
        data: {
          description,
          characters,
        },
      });
    return updatedCode;
  }
}
