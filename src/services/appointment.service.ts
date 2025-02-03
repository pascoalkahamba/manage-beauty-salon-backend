import { deleteApp } from "firebase/app";
import { AppointmentModel } from "../@types";
import { prismaService } from "./prisma.service";
import { UpdateAppointmentI, UpdateStatusAppointmentI } from "../interfaces";

export default class AppointmentService {
  async addAppointment(appointmentInfo: AppointmentModel) {
    const { date, clientId, employeeId, serviceId, status, hour } =
      appointmentInfo;

    const newAppointment = await prismaService.prisma.appointment.create({
      data: {
        date,
        status,
        hour,
        client: {
          connect: {
            id: clientId,
          },
        },
        employee: {
          connect: {
            id: employeeId,
          },
        },
        service: {
          connect: {
            id: serviceId,
          },
        },
      },
    });

    return newAppointment;
  }

  async getAllAppointments() {
    const appointments = await prismaService.prisma.appointment.findMany({
      select: {
        id: true,
        date: true,
        status: true,
        hour: true,
        client: {
          select: {
            id: true,
            username: true,
          },
        },
        employee: {
          select: {
            id: true,
            username: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return appointments;
  }

  async getAppointmentById(appointmentId: number) {
    const appointment = await prismaService.prisma.appointment.findFirst({
      where: { id: appointmentId },
      select: {
        id: true,
        date: true,
        status: true,
        hour: true,
        client: {
          select: {
            id: true,
            username: true,
          },
        },
        employee: {
          select: {
            id: true,
            username: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!appointment) return;
    return appointment;
  }

  async updateStatusAppointment(appointmentInfo: UpdateStatusAppointmentI) {
    const { status, id, reason } = appointmentInfo;
    const appointment = await prismaService.prisma.appointment.findFirst({
      where: { id },
    });
    if (!appointment) return;
    const updatedAppointment = await prismaService.prisma.appointment.update({
      where: { id },
      data: { status, reason },
    });
    return updatedAppointment;
  }

  async updateAppointment(appointmentInfo: UpdateAppointmentI) {
    const { date, clientId, employeeId, serviceId, status, hour, id } =
      appointmentInfo;
    const appointment = await prismaService.prisma.appointment.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        date: true,
        status: true,
        hour: true,
        client: {
          select: {
            id: true,
            username: true,
          },
        },
        employee: {
          select: {
            id: true,
            username: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!appointment) return;

    const updatedAppointment = await prismaService.prisma.appointment.update({
      where: { id },
      data: {
        date,
        status,
        hour,
        client: {
          connect: {
            id: clientId,
          },
        },
        employee: {
          connect: {
            id: employeeId,
          },
        },
        service: {
          connect: {
            id: serviceId,
          },
        },
      },
    });
    return updatedAppointment;
  }

  async deleteAppointment(appointmentId: number) {
    const appointment = await prismaService.prisma.appointment.findFirst({
      where: {
        id: appointmentId,
      },
    });
    if (!appointment) return;
    await prismaService.prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });
    return appointment;
  }
}
