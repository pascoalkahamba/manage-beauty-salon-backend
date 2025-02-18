import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { employeeRoutes } from "./routes/employee.routes";
import { clientRoutes } from "./routes/client.routes";
import { productRoutes } from "./routes/product.routes";
import { serviceRoutes } from "./routes/service.routes";
import { categoryRoutes } from "./routes/category.routes";
import { codeValidationToEmployeeRoutes } from "./routes/codeValidationToEmployee.routes";
import { academicLevelRoutes } from "./routes/academicLevel.routes";
import { appointmentRoutes } from "./routes/appointment.routes";
import { cartRoutes } from "./routes/cart.routes";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.options("*", cors(corsOptions));

const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/employee", employeeRoutes);
app.use("/client", clientRoutes);
app.use("/product", productRoutes);
app.use("/service", serviceRoutes);
app.use("/category", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/academicLevel", academicLevelRoutes);
app.use("/codeValidationToEmployee", codeValidationToEmployeeRoutes);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("server is running!");
});
