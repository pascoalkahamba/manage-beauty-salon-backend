import { AcademicLevelModel } from "../@types";
import { UpdateAcademicLevelI } from "../interfaces";
import { prismaService } from "./prisma.service";

export default class AcademicLevelService {
  async getAllAcademicLevels() {
    const academicLevels = await prismaService.prisma.academicLevel.findMany();
    return academicLevels;
  }

  async addAcademicLevel(academicLevelInfo: AcademicLevelModel) {
    const { description, name } = academicLevelInfo;
    const academicLevel = await prismaService.prisma.academicLevel.findFirst({
      where: {
        name,
      },
    });

    if (academicLevel) return;

    const newAcademicLevel = await prismaService.prisma.academicLevel.create({
      data: {
        description,
        name,
      },
    });
    return newAcademicLevel;
  }

  async deleteAcademicLevel(academicLevelId: number) {
    const academicLevel = await prismaService.prisma.academicLevel.findFirst({
      where: {
        id: academicLevelId,
      },
    });
    if (!academicLevel) return;
    await prismaService.prisma.academicLevel.delete({
      where: {
        id: academicLevelId,
      },
    });
    return academicLevel;
  }

  async updateAcademicLevel(academicLevelInfo: UpdateAcademicLevelI) {
    const { description, name, id } = academicLevelInfo;
    const academicLevel = await prismaService.prisma.academicLevel.findFirst({
      where: {
        id,
      },
    });
    if (!academicLevel) return;
    const updatedAcademicLevel =
      await prismaService.prisma.academicLevel.update({
        where: {
          id,
        },
        data: {
          description,
          name,
        },
      });
    return updatedAcademicLevel;
  }
}
