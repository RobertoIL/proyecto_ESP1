import express from "express";
import upload from "../config/multerConfig.js";
import { login, register } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
