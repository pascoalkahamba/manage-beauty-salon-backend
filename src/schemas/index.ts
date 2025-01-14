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
