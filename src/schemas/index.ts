import { z as zod } from "zod";
import { RoleT } from "../@types";

const createEmployeeSchema = zod.object({
  username: zod.string().min(6),
  password: zod.string().min(6),
  email: zod.string().email(),
  academicLevel: zod.string().min(6),
  cellphone: zod.string().min(9).max(9),
  role: zod.string() as zod.ZodType<RoleT>,
});

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

const envSchema = zod.object({
  MONGODBCONNECTION: zod.string(),
  PORT: zod.string(),
  DATABASE_URL: zod.string(),
  gsBucket: zod.string().min(6),
  apiKey: zod.string().min(5),
  authDomain: zod.string().min(5),
  projectId: zod.string().min(5),
  storageBucket: zod.string().min(5),
  messagingSenderId: zod.string().min(5),
  appId: zod.string().min(5),
  measurementId: zod.string().min(5),
  JWT_SECRET_KEY: zod.string(),
});

const updateEmployeeSchema = createEmployeeSchema
  .omit({
    role: true,
  })
  .extend({
    bio: zod.string().min(10),
  });

export { createEmployeeSchema, updateEmployeeSchema, loginSchema, envSchema };
