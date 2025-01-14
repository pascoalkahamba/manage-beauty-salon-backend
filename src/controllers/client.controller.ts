import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserModel } from "../@types";
import { handleError } from "../errors/handleError";
import { UserValidator } from "../validators/user.validator";
import { BaseError } from "../errors/baseError";
import { UserErrors } from "../errors/user.errors";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const userValidator = new UserValidator();
const userService = new UserService();

export class UserController {
  async add(req: Request, res: Response) {
    try {
      const user = req.body as UserModel;

      await userValidator.validate(user);

      const data = await userService.add(user);

      res.status(StatusCodes.CREATED).json(data);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as Pick<User, "id">;

      const userDeleted = await userService.remove(Number(id));
      if (!userDeleted) throw UserErrors.userNotFound();
      res.send(userDeleted);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body as Pick<
      UserModel,
      "email" | "password"
    >;
    try {
      const user = await userService.login(email, password);
      if (!user) throw UserErrors.userOrPasswordWrong();

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "30d",
        }
      );
      res.status(StatusCodes.OK).json({
        token,
        user,
      });
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
}
