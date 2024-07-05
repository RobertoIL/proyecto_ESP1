import Historial from "../models/historial.model.js";

async function createHistorial(req, res) {
  const { userId } = req.params;
  const { jugador1, jugador2, ganador } = req.body;

  try {
    const historial = new Historial({
      jugador1,
      jugador2,
      ganador,
      User: userId,
    });
    await historial.save();
  } catch (error) {
    res.status(500).json({ message: "Error creating historial" });
  }
}

async function getHistorial(req, res) {
  const { userId } = req.params;
  try {
    const historial = await Historial.find({ User: userId });
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ message: "Error getting historial" });
  }
}

async function deleteHistorial(req, res) {
  const { userId } = req.params;
  try {
    await Historial.deleteMany({ User: userId });
    res.status(200).json({ message: "Historial deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting historial" });
  }
}

export { createHistorial, getHistorial, deleteHistorial };
