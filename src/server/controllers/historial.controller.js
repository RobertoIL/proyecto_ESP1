import Historial from "../models/historial.model.js";
import User from "../models/user.model.js";

async function createHistorial(req, res) {
  const { userId } = req.params;
  const { jugador1, jugador2, ganador } = req.body;

  try {
    const user = await User.findById(userId); // Asegúrate de usar await para esperar la respuesta de la búsqueda del usuario

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const historial = new Historial({
      jugador1,
      jugador2,
      ganador,
      User: user._id, // Asigna user._id en lugar de user
    });

    await historial.save();
    res.status(201).json(historial); // Devuelve el historial creado con estado 201 Created
  } catch (error) {
    console.error("Error creating historial:", error);
    res.status(500).json({ message: "Error creating historial" });
  }
}

async function getHistorial(req, res) {
  const { userId } = req.params;
  try {
    const historial = await Historial.find({ User: userId }).populate(
      "User",
      "name email"
    ); // Popula el usuario asociado al historial
    res.status(200).json(historial);
  } catch (error) {
    console.error("Error getting historial:", error);
    res.status(500).json({ message: "Error getting historial" });
  }
}

async function deleteHistorial(req, res) {
  const { userId } = req.params;
  try {
    await Historial.deleteMany({ User: userId });
    res.status(200).json({ message: "Historial deleted" });
  } catch (error) {
    console.error("Error deleting historial:", error);
    res.status(500).json({ message: "Error deleting historial" });
  }
}

export { createHistorial, getHistorial, deleteHistorial };
