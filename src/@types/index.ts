import { Product, Employee, Client } from "@prisma/client";
import { EmployeeUpdateI } from "../interfaces";

export type DataBaseExtraValues = "createdAt" | "updatedAt" | "id" | "hiredAt";
export type RoleT = "MANAGER" | "EMPLOYEE";
export type ClientUpdateT = Omit<EmployeeUpdateI, "academicLevel">;
export type EmployeeModel = Omit<Employee, DataBaseExtraValues>;
export type ClientModel = Omit<Client, DataBaseExtraValues>;
export type TJsonWebTokenError = "jwt malformed" | "jwt must be provided";
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
  | "kindOfFile"
  | "like"
  | "departmentId"
  | "courseId"
  | "subjects"
  | "courses"
  | "statusLike"
  | "statusUnlike"
  | "unlike"
  | "title"
  | "nameOfDepartment"
  | "whoPosted"
  | "whoCreator"
  | "mimeType"
  | "name"
  | "postId"
  | "size"
  | "id"
  | "code"
  | "operation"
  | "width"
  | "height";
