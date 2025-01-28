import { AppointmentModel, RoleT } from "../@types";

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

export interface UpdateAppointmentI extends AppointmentModel {
  id: number;
}

export interface AddCartI {
  clientId: number;
  appointmentId: number;
}

export interface UpdateCartI {
  id: number;
  appointmentId: number;
  clientId: number;
}

export interface LoginI {
  email: string;
  password: string;
}

export interface CreateEmployeeI {
  username: string;
  password: string;
  cellphone: string;
  validationCode: string;
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

export interface UpdateCodeValidationToEmployeeI {
  characters: string;
  description: string;
  id: number;
}

export interface UpdateServiceI extends CreateServiceI {
  id: number;
}
export interface CreateCategoryI {
  name: string;
  description?: string;
  services: Omit<CreateServiceI, "categoryId">[];
}

export interface UpdateCategoryI {
  id: number;
  name: string;
  description?: string;
  servicesIds: number[];
}

export interface ClientUpdateI extends CreateClientI {
  id: number;
  bio: string;
  photo: PictureI;
}

export interface UpdateAcademicLevelI {
  id: number;
  name: string;
  description: string;
}
