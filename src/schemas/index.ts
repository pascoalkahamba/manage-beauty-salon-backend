import { z as zod } from "zod";
import { RoleT, TStatus } from "../@types";
import { EMPLOYEE_CODE_REGEX } from "../utils";

const createEmployeeSchema = zod.object({
  username: zod.string().min(6),
  password: zod.string().min(6),
  email: zod.string().email(),
  validationCode: zod.string().regex(EMPLOYEE_CODE_REGEX),
  servicesIds: zod.number().array(),
  academicLevelId: zod.string(),
  cellphone: zod.string().min(9).max(9),
  role: zod.string() as zod.ZodType<RoleT>,
});

const createServiceSchema = zod.object({
  name: zod.string().min(6),
  description: zod.string().min(10),
  price: zod.number(),
  duration: zod.number(),
  categoryId: zod.number(),
});
const createCategorySchema = zod.object({
  name: zod.string().min(6),
  description: zod.string().min(10),
  services: createServiceSchema
    .omit({
      categoryId: true,
    })
    .array(),
});

const updateStatusAppointmentSchema = zod.object({
  status: zod.string() as zod.ZodType<TStatus>,
  reason: zod.string().min(10).optional(),
});

const appointmentSchema = zod.object({
  serviceId: zod.number(),
  employeeId: zod.number(),
  clientId: zod.number(),
  status: zod.string() as zod.ZodType<TStatus>,
  date: zod.string() as unknown as zod.ZodType<Date>,
  hour: zod.string(),
});

const createAcademicLevelSchema = zod.object({
  name: zod.string().min(6),
  description: zod.string().min(10),
});

const updateCategorySchema = createCategorySchema
  .omit({
    services: true,
  })
  .extend({
    servicesIds: zod.number().array(),
  });

const codeValidationSchema = zod.object({
  characters: zod.string().regex(EMPLOYEE_CODE_REGEX),
  description: zod.string().min(10),
});

const findOneCodeValidationSchema = codeValidationSchema.omit({
  description: true,
});

const updateServiceSchema = createServiceSchema;

const createClientSchema = zod.object({
  password: zod.string().min(6),
  username: zod.string().min(6),
  email: zod.string().email(),
  cellphone: zod.string().min(9).max(9),
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
    validationCode: true,
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
  createAcademicLevelSchema,
  appointmentSchema,
  createServiceSchema,
  codeValidationSchema,
  updateCategorySchema,
  updateStatusAppointmentSchema,
  updateServiceSchema,
};
