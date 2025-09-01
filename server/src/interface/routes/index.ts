import { Router } from "express";
// import * as swaggerUi from "swagger-ui-express";
// import swaggerDocs from "../docs/swagger.json" with { type: "json" };
import { usersRouter } from "./users-routes.js";

const routes = Router();

// routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

routes.use("/users", usersRouter);

export default routes;
