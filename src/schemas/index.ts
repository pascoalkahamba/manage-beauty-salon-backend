import { z as zod } from "zod";
import { RoleT } from "../@types";

const createEmployeeSchema = zod.object({
  username: zod.string().min(6),
  password: zod.string().min(6),
  email: zod.string().email(),
  services: zod.number().array(),
  academicLevelId: zod.number(),
  cellphone: zod.string().min(9).max(9),
  role: zod.string() as zod.ZodType<RoleT>,
});

const createClientSchema = createEmployeeSchema
  .omit({
    role: true,
    academicLevelId: true,
    services: true,
  })
  .extend({
    categories: zod.number().array(),
  });

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

const productSchema = zod.object({
  name: zod.string().min(6),
  description: zod.string().min(10),
  categoryId: zod.number(),
  price: zod.number(),
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

const updateClientSchema = updateEmployeeSchema
  .omit({
    academicLevelId: true,
    services: true,
  })
  .extend({
    categories: zod.number().array(),
  });

export {
  createEmployeeSchema,
  updateEmployeeSchema,
  updateClientSchema,
  loginSchema,
  envSchema,
  productSchema,
  createClientSchema,
};
