import mongoose from "mongoose";
import { MONGO_URI } from "./environment.js";

async function connectDB() {
  console.log("Trying to connect to database...");
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log("Connected to database");
    return connection.connection.db; // Retornar la referencia de la base de datos
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(-1);
  }
}

export default connectDB;
