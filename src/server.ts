import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { employeeRoutes } from "./routes/employee.routes";
import { clientRoutes } from "./routes/client.routes";
import { productRoutes } from "./routes/product.routes";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/employee", employeeRoutes);
app.use("/client", clientRoutes);
app.use("/product", productRoutes);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("server is running!");
});
