import express from "express";
import {
  getHistorial,
  createHistorial,
} from "../controllers/historial.controller.js";

const historialRouter = express.Router();

historialRouter.get("/:userId", getHistorial);
historialRouter.post("/:userId", createHistorial);

export default historialRouter;
