import express from "express";
import cors from "cors";
import connectDB from "./config/mongo.js";
import authRouter from "./routes/auth.router.js";
const app = express();
app.use(cors("http://localhost:5173"));
app.use(express.json());

app.use("/auth", authRouter);

async function startServer() {
  const isConnected = await connectDB();
  if (isConnected) {
    app.listen(3000, () => console.log("server running on port 3000"));
  }
}

startServer();
