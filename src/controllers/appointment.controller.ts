import { Request, Response } from "express";
import AppointmentService from "../services/appointment.service";
import { AppointmentValidator } from "../validators/appointment.validator";
import { handleError } from "../errors/handleError";
import { AppointmentErrors } from "../errors/appointment.errors";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import {
  appointmentSchema,
  updateAppointment,
  updateStatusAppointmentSchema,
} from "../schemas";
import { StatusCodes } from "http-status-codes";
import EmployeeError from "../errors/employee.error";

const appointmentService = new AppointmentService();
const appointmentValidator = new AppointmentValidator();

export default class AppointmentController {
  async addAppointment(req: Request, res: Response) {
    try {
      const { clientId, date, employeeId, hour, serviceId, status } =
        appointmentSchema.parse(req.body);

      const appointment = await appointmentService.addAppointment({
        clientId: +clientId,
        date,
        employeeId: +employeeId,
        reason: null,
        cartId: null,
        status,
        hour,
        serviceId: +serviceId,
      });
      return res.status(StatusCodes.CREATED).json(appointment);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        appointmentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAllAppointments(req: Request, res: Response) {
    try {
      const appointments = await appointmentService.getAllAppointments();
      return res.status(StatusCodes.OK).json(appointments);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        appointmentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getOneAppointment(req: Request, res: Response) {
    try {
      const { appointmentId } = req.params as unknown as {
        appointmentId: number;
      };
      const appointment = await appointmentService.getAppointmentById(
        +appointmentId
      );
      if (!appointment) throw AppointmentErrors.appointmentNotFound();
      res.status(StatusCodes.OK).json(appointment);
      return res.status(StatusCodes.OK).json(appointment);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        appointmentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async updateStatusAppointment(req: Request, res: Response) {
    try {
      const { appointmentId } = req.params as unknown as {
        appointmentId: number;
      };

      const { status, reason } = updateStatusAppointmentSchema.parse(req.body);
      const appointment = await appointmentService.updateStatusAppointment({
        id: +appointmentId,
        reason,
        status,
      });
      if (!appointment) throw AppointmentErrors.appointmentNotFound();
      return res.status(StatusCodes.ACCEPTED).json(appointment);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        appointmentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async updateAppointment(req: Request, res: Response) {
    try {
      const { appointmentId } = req.params as unknown as {
        appointmentId: number;
      };
      const { date, employeeId, hour } = updateAppointment.parse(req.body);
      const appointment = await appointmentService.updateAppointment({
        id: +appointmentId,
        date,
        employeeId,
        hour,
      });
      if (!appointment) throw AppointmentErrors.appointmentNotFound();
      if (appointment === "employeeNotFound") {
        throw EmployeeError.employeeNotFound();
      }
      return res.status(StatusCodes.ACCEPTED).json(appointment);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        appointmentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async deleteAppointment(req: Request, res: Response) {
    try {
      const { appointmentId } = req.params as unknown as {
        appointmentId: number;
      };
      const appointment = await appointmentService.deleteAppointment(
        +appointmentId
      );
      if (!appointment) throw AppointmentErrors.appointmentNotFound();
      return res.status(StatusCodes.ACCEPTED).json(appointment);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        appointmentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
