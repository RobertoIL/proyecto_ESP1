import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const store = useAuthStore();

const historialService = {
  async getHistorial() {
    try {
      const response = await axios.get(
        `http://localhost:3000/historial/${store.getUserId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener historial:", error);
      throw error;
    }
  },

  async addHistorial(historial) {
    try {
      const response = await axios.post(
        `http://localhost:3000/historial/${store.getUserId}`,
        historial
      );
      return response.data;
    } catch (error) {
      console.error("Error al agregar historial:", error);
      throw error;
    }
  },
};

export default historialService;
