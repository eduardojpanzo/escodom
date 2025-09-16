import { createServer } from "#infra/http/express.js";
import { errorHandler } from "./interface/middlewares/error_handler.js";
import routes from "./interface/routes/index.js";
import { env } from "#infra/config/env.js";

const app = createServer();
app.use("/v1", routes);

const PORT = env.port || 5000;

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server runing on port  ${PORT} 🚀`);
});
