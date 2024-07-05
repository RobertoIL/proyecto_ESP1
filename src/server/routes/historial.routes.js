import express from "express";
import {
  getHistorial,
  createHistorial,
  deleteHistorial,
} from "../controllers/historial.controller.js";

const historialRouter = express.Router();

historialRouter.get("/:userId", getHistorial);
historialRouter.post("/:userId", createHistorial);
historialRouter.delete("/:userId", deleteHistorial);

export default historialRouter;
