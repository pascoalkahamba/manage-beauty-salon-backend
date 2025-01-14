import { Product, Employee, Client } from "@prisma/client";
import { EmployeeUpdateI } from "../interfaces";

export type DataBaseExtraValues = "createdAt" | "updatedAt" | "id" | "hiredAt";
export type RoleT = "manager" | "employee" | "client";
export type ClientUpdateT = Omit<EmployeeUpdateI, "academicLevel">;
export type EmployeeModel = Omit<Employee, DataBaseExtraValues>;
export type ClientModel = Omit<Client, DataBaseExtraValues>;
export type ProductModel = Omit<Product, DataBaseExtraValues>;
export type TPathError =
  | "email"
  | "password"
  | "contact"
  | "username"
  | "bio"
  | "emailNotFound"
  | "emailAlreadyExist"
  | "registrationNumber"
  | "content"
  | "createrPostId"
  | "kindOfFile";
