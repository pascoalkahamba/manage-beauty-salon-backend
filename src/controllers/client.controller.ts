import { Request, Response } from "express";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { TPathError } from "../@types";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import {
  createClientSchema,
  loginSchema,
  updateClientSchema,
} from "../schemas";
import { ClientService } from "../services/client.service";
import ClientValidator from "../validators/client.validator";
import { ClientErrors } from "../errors/client.errors";

const clientService = new ClientService();
const clientValidator = new ClientValidator();

export default class ClientController {
  async addClient(req: Request, res: Response) {
    try {
      const { cellphone, email, password, username, categoriesIds } =
        createClientSchema.parse(req.body);
      const client = await clientService.createClient({
        cellphone,
        email,
        categoriesIds,
        password,
        username,
      });

      if (!client) {
        throw ClientErrors.clientEmailExists();
      }

      return res.status(StatusCodes.CREATED).json(client);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        clientValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
  async deleteClient(req: Request, res: Response) {
    try {
      const clientId = req.params.clientId as unknown as number;

      const clientDeleted = await clientService.deleteClient(+clientId);
      if (!clientDeleted) {
        throw ClientErrors.clientNotFound();
      }

      return res.status(StatusCodes.OK).json(clientDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        clientValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
  async getAllClients(req: Request, res: Response) {
    try {
      const clients = await clientService.getAllClients();
      return res.status(StatusCodes.OK).json(clients);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        clientValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
  async getOneClient(req: Request, res: Response) {
    try {
      const clientId = req.params.clientId as unknown as number;
      const client = await clientService.getClientById(+clientId);
      if (!client) {
        throw ClientErrors.clientNotFound();
      }

      return res.status(StatusCodes.OK).json({ ...client, role: "CLIENT" });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        clientValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const logged = await clientService.login({ email, password });

      if (!logged) {
        throw ClientErrors.clientNotFound();
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
        clientValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async updateClient(req: Request, res: Response) {
    try {
      const clientId = req.params.clientId as unknown as number;
      const { cellphone, email, password, username, bio, categoriesIds } =
        updateClientSchema.parse(req.body);

      const client = await clientService.updateClient({
        cellphone,
        categoriesIds,
        bio,
        id: +clientId,
        email,
        password,
        username,
        photo: {
          name: req.fileName ?? "",
          url: req.fileUrl ?? "",
        },
      });
      if (!client) {
        throw ClientErrors.clientNotFound();
      }
      return res.status(StatusCodes.OK).json(client);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        clientValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const client = await clientService.forgotPassword({
        email,
        password,
      });

      if (!client) {
        throw ClientErrors.clientNotFound();
      }

      return res.status(StatusCodes.CREATED).json(client);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        clientValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
