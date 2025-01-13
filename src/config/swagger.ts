import { Express } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "../swagger.json";

export function swaggerDocs(app: Express, port: number | string) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Docs available at http://localhost:${port}/docs`);
}
