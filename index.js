import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cors());
app.use("/api", apiRouter);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`FT3 running on port: ${PORT}`);
    console.log(`Local URL: http://localhost:${PORT}/`);
  });
});