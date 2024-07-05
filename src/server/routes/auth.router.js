import express from "express";
import multer from "multer";
import { login, register } from "../controllers/auth.controller.js";

const authRouter = express.Router();
const storage = multer.memoryStorage(); // Almacenar en memoria
const upload = multer({ storage });

authRouter.post("/login", login);
authRouter.post("/register", upload.single("profileImage"), register);

export default authRouter;
