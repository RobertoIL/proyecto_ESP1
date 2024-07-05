import Historial from "../models/historial.model.js";

async function createHistorial(req, res) {
  const { jugador1, jugador2, ganador } = req.body;
  const userId = req.params.userId;

  try {
    const historial = new Historial({
      jugador1,
      jugador2,
      ganador,
      user: userId, // Asignar el ID del usuario al campo 'user'
    });
    await historial.save();
    res.status(201).json({ message: "Historial creado exitosamente" });
  } catch (error) {
    console.error("Error al crear historial:", error);
    res
      .status(500)
      .json({ message: "Error al crear historial", error: error.message });
  }
}

async function getHistorial(req, res) {
  const userId = req.params.userId;

  try {
    const historiales = await Historial.find({ user: userId });
    res.status(200).json(historiales);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res
      .status(500)
      .json({ message: "Error al obtener historial", error: error.message });
  }
}

async function deleteHistorial(req, res) {
  const { userId } = req.params;
  try {
    await Historial.deleteMany({ user: userId });
    res.status(200).json({ message: "Historial deleted" });
  } catch (error) {
    console.error("Error deleting historial:", error);
    res.status(500).json({ message: "Error deleting historial" });
  }
}

export { createHistorial, getHistorial, deleteHistorial };
