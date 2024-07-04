import mongoose from "mongoose";

const historialSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  jugador1: {
    type: String,
    required: true,
  },
  jugador2: {
    type: String,
    required: true,
  },
  ganador: {
    type: String,
    required: true,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Historial = mongoose.model("Historial", historialSchema);
export default Historial;
