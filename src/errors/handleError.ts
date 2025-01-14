import { Response } from "express";
import { BaseError } from "./baseError";

export function handleError(error: BaseError, res: Response) {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    status: statusCode,
    message: error.message,
  });
}
