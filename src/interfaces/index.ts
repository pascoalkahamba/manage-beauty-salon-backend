import { RoleT } from "../@types";

export interface EmployeeUpdateI {
  id: number;
  username: string;
  password: string;
  cellphone: string;
  email: string;
  academicLevelId: number;
  bio: string;
  photo: PictureI;
  servicesIds: number[];
}

export interface PictureI {
  url: string;
  name: string;
}

export interface LoginI {
  email: string;
  password: string;
}

export interface CreateEmployeeI {
  username: string;
  password: string;
  cellphone: string;
  email: string;
  academicLevelId: number;
  servicesIds: number[];
  role: RoleT;
}
export interface CreateClientI {
  username: string;
  password: string;
  cellphone: string;
  email: string;
  categoriesIds: number[];
}

export interface CreateServiceI {
  name: string;
  description: string;
  duration: number;
  categoryId: number;
  price: number;
  photo: PictureI;
}

export interface UpdateServiceI extends CreateServiceI {
  id: number;
}
export interface CreateCategoryI {
  name: string;
  description?: string;
  servicesIds: number[];
}

export interface UpdateCategoryI extends CreateCategoryI {
  id: number;
}

export interface ClientUpdateI extends CreateClientI {
  id: number;
  bio: string;
  photo: PictureI;
}
