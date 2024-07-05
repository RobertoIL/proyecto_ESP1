import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const store = useAuthStore();

const historialService = {
  async getHistorial() {
    try {
      const userId = store.getUserId;
      const response = await axios.get(
        `http://localhost:3000/historial/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching historial:", error);
      throw error;
    }
  },
};

export default historialService;
