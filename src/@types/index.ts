import {
  Product,
  Employee,
  Client,
  Service,
  Category,
  CodeValidationToEmployee,
} from "@prisma/client";
import { EmployeeUpdateI } from "../interfaces";

export type DataBaseExtraValues = "createdAt" | "updatedAt" | "id" | "hiredAt";
export type RoleT = "MANAGER" | "EMPLOYEE";
export type ServiceModel = Omit<Service, DataBaseExtraValues>;
export type CategoryModel = Omit<Category, DataBaseExtraValues>;
export type CodeValidationToEmployeeModel = Omit<
  CodeValidationToEmployee,
  DataBaseExtraValues
>;
export type ClientUpdateT = Omit<EmployeeUpdateI, "academicLevel">;
export type EmployeeModel = Omit<Employee, DataBaseExtraValues>;
export type ClientModel = Omit<Client, DataBaseExtraValues>;
export type TJsonWebTokenError = "jwt malformed" | "jwt must be provided";
export type ProductModel = Omit<Product, DataBaseExtraValues>;
export type TPathError =
  | "email"
  | "password"
  | "characters"
  | "contact"
  | "username"
  | "role"
  | "description"
  | "academicLevelId"
  | "categoriesIds"
  | "servicesIds"
  | "photo"
  | "categoryId"
  | "cellphone"
  | "price"
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
