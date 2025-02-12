import { Request, Response } from "express";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { EmployeeService } from "../services/employee.service";
import { TPathError } from "../@types";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import EmployeeValidator from "../validators/employee.validator";
import {
  createEmployeeSchema,
  loginSchema,
  updateEmployeeSchema,
} from "../schemas";
import EmployeeError from "../errors/employee.error";
import { CodeValidationToEmplyeeError } from "../errors/codeValidationToEmployee";
import { ServiceError } from "../errors/service.errors";
import { AcademicLevelErrors } from "../errors/academicLevel.errors";

const employeeService = new EmployeeService();
const employeeValidator = new EmployeeValidator();

export default class EmployeeController {
  async addEmployee(req: Request, res: Response) {
    try {
      const {
        academicLevelId,
        cellphone,
        email,
        password,
        role,
        username,
        validationCode,
        servicesIds,
      } = createEmployeeSchema.parse(req.body);
      const employee = await employeeService.addEmployee({
        academicLevelId: +academicLevelId,
        servicesIds,
        cellphone,
        validationCode,
        email,
        password,
        role,
        username,
      });

      if (employee === "codeNotFound")
        throw CodeValidationToEmplyeeError.codeDoesntExists();

      if (!employee) {
        throw EmployeeError.emailAlreadyExist();
      }

      if (employee === "servicesNotFound") {
        throw ServiceError.serviceNotFound();
      }
      if (employee === "academicLevelNotFound") {
        throw AcademicLevelErrors.academicLevelNotFound();
      }

      return res.status(StatusCodes.CREATED).json(employee);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        employeeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
  async deleteEmployee(req: Request, res: Response) {
    try {
      const employeeId = req.params.employeeId as unknown as number;

      const employeeDeleted = await employeeService.deleteEmployee(+employeeId);
      if (!employeeDeleted) {
        throw EmployeeError.employeeNotFound();
      }

      if (employeeDeleted === "adminCannotBeDeleted") {
        throw EmployeeError.managerCannotBeDeleted();
      }

      return res.status(StatusCodes.OK).json(employeeDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        employeeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
  async getAllEmployees(req: Request, res: Response) {
    try {
      const employees = await employeeService.getAllEmployees();
      return res.status(StatusCodes.OK).json(employees);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        employeeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
  async getOneEmployee(req: Request, res: Response) {
    try {
      const employeeId = req.params.employeeId as unknown as number;
      const employee = await employeeService.getEmployeeById(+employeeId);
      if (!employee) {
        throw EmployeeError.employeeNotFound();
      }

      return res.status(StatusCodes.OK).json(employee);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        employeeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const logged = await employeeService.login({ email, password });

      if (!logged) {
        throw EmployeeError.emailOrPasswordWrong();
      }

      const token = jwt.sign(
        { id: logged.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "8h" }
      );

      return res.status(StatusCodes.OK).json({
        user: logged,
        token,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        employeeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async updateEmployee(req: Request, res: Response) {
    try {
      const employeeId = req.params.employeeId as unknown as number;
      const {
        academicLevelId,
        cellphone,
        email,
        password,
        username,
        bio,
        servicesIds,
      } = updateEmployeeSchema.parse(req.body);

      const employee = await employeeService.updateEmployee({
        academicLevelId: +academicLevelId,
        cellphone,
        servicesIds,
        bio,
        id: +employeeId,
        email,
        password,
        username,
        photo: {
          name: req.fileName ?? "",
          url: req.fileUrl ?? "",
        },
      });
      if (!employee) {
        throw EmployeeError.employeeNotFound();
      }
      if (employee === "emailAlreadyExists") {
        throw EmployeeError.emailAlreadyExist();
      }
      return res.status(StatusCodes.OK).json(employee);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        employeeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const employee = await employeeService.forgotPassword({
        email,
        password,
      });

      if (!employee) {
        throw EmployeeError.emailNotFound();
      }

      return res.status(StatusCodes.CREATED).json(employee);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        employeeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
