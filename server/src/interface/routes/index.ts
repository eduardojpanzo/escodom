import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";
import { usersRouter } from "./users-routes.js";
import { teachersRouter } from "./teachers-routes.js";
import { studentsRouter } from "./students-routes.js";
import { peopleRouter } from "./people-routes.js";
import { classesRouter } from "./classes-routes.js";
import { levelsRouter } from "./levels-routes.js";
import swaggerDocs from "../docs/swagger.json" with { type: "json" };


const routes = Router();

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

routes.use("/people", peopleRouter);
routes.use("/teachers", teachersRouter);
routes.use("/users", usersRouter);
routes.use("/students", studentsRouter);
routes.use("/levels", levelsRouter);
routes.use("/classes", classesRouter);

export default routes;
