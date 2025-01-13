import { NextFunction, Request, Response } from "express";
import { handleError } from "../errors/handleError";

import jwt from "jsonwebtoken";
import { AuthError } from "../errors/auth.errors";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    handleError(AuthError.noTokenProvided(), req, res);
    return;
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    handleError(AuthError.invalidToken(), req, res);
    return;
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
    id: number;
  };

  req.id = id;

  next();
}
