import mongoose from "mongoose";
import { MONGO_URI } from "../config/constants.js";

const connectDatabase = async () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Base de datos conectada");
    })
    .catch((err) => {
      console.log("Error al levantar la base de datos:", err);
    });
};

export default connectDatabase;
