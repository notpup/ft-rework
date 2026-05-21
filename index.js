import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import mongooseConnect from "./src/config/mongoose.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import verifyAuthorization from "./src/middlewares/authorization.js";
import api from "./src/routes/api.js";
import { PORT } from "./src/config/constants.js";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use("/api", api);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`FT:R running on port: ${PORT}`);
    console.log(`Local URL: http://localhost:${PORT}/`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error(
    "Mongoose detectó un error en la conexión activa:",
    err.message,
  );
});

mongoose.connection.on("disconnected", () => {
  console.warn(
    "Mongoose se ha desconectado. Intentando reconectar automáticamente...",
  );
});

mongooseConnect();
export default app;
