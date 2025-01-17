import { z as zod } from "zod";
import { RoleT } from "../@types";
import { EMPLOYEE_CODE_REGEX } from "../utils";

const createEmployeeSchema = zod.object({
  username: zod.string().min(6),
  password: zod.string().min(6),
  email: zod.string().email(),
  validationCode: zod.string().regex(EMPLOYEE_CODE_REGEX),
  servicesIds: zod.number().array(),
  academicLevelId: zod.number(),
  cellphone: zod.string().min(9).max(9),
  role: zod.string() as zod.ZodType<RoleT>,
});

const createCategorySchema = zod.object({
  name: zod.string().min(6),
  description: zod.string().min(10),
  servicesIds: zod.number().array(),
});

const updateCategorySchema = createCategorySchema;

const createServiceSchema = zod.object({
  name: zod.string().min(6),
  description: zod.string().min(10),
  price: zod.number(),
  duration: zod.number(),
  categoryId: zod.number(),
});

const codeValidationSchema = zod.object({
  characters: zod.string().min(6),
  description: zod.string().min(10),
});

const findOneCodeValidationSchema = codeValidationSchema.omit({
  description: true,
});

const updateServiceSchema = createServiceSchema;

const createClientSchema = createEmployeeSchema
  .omit({
    role: true,
    academicLevelId: true,
    servicesIds: true,
  })
  .extend({
    categoriesIds: zod.number().array(),
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
    servicesIds: true,
  })
  .extend({
    categoriesIds: zod.number().array(),
  });

export {
  createEmployeeSchema,
  updateEmployeeSchema,
  updateClientSchema,
  loginSchema,
  envSchema,
  productSchema,
  findOneCodeValidationSchema,
  createClientSchema,
  createCategorySchema,
  createServiceSchema,
  codeValidationSchema,
  updateCategorySchema,
  updateServiceSchema,
};
