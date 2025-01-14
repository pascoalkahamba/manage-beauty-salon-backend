export interface EmployeeUpdateI {
  id: number;
  username: string;
  password: string;
  cellphone: string;
  email: string;
  phone: string;
  academicLevel: string;
  bio: string;
  photo: PictureI;
}

export interface PictureI {
  url: string;
  name: string;
}

export interface LoginI {
  email: string;
  password: string;
}
