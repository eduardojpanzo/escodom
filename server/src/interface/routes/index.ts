import { Router } from "express";
// import * as swaggerUi from "swagger-ui-express";
// import swaggerDocs from "../docs/swagger.json" with { type: "json" };
import { usersRouter } from "./users-routes.js";
import { teachersRouter } from "./teachers-routes.js";
import { studentsRouter } from "./students-routes.js";
import { peopleRouter } from "./people-routes.js";

const routes = Router();

// routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

routes.use("/people", peopleRouter);
routes.use("/teachers", teachersRouter);
routes.use("/users", usersRouter);
routes.use("/students", studentsRouter);

export default routes;
