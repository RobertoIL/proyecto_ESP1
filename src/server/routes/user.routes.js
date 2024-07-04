import express from "express";
import {
  modifyProfile,
  deleteAccount,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.put("/:userId", modifyProfile);
userRouter.delete("/:userId", deleteAccount);

export default userRouter;
