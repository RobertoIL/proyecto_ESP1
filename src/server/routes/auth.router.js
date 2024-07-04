import express from "express";
import multer from "multer";
import { login, register } from "../controllers/auth.controller.js";

const authRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

authRouter.post("/login", login);
authRouter.post("/register", upload.single("profileImage"), register);

export default authRouter;
