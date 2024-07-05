import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import router from "../router";

const authService = {
  async login(user) {
    try {
      const authStore = useAuthStore();
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        user
      );
      if (response.status === 200) {
        const { userId, email, name, token } = response.data;
        authStore.loginSuccess(name, token);
        authStore.setEmail(email);
        authStore.setUserId(userId);
        router.push({ name: "home" });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  },

  logout() {
    const authStore = useAuthStore();
    authStore.logout();
    router.push({ name: "login" });
  },
  async register(formData) {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData
      );

      if (response.status === 200) {
        const { userId, email, name, token } = response.data;
        const authStore = useAuthStore();
        authStore.loginSuccess(name, token);
        authStore.setEmail(email);
        authStore.setUserId(userId);
        router.push({ name: "home" }); // Redirect to home after successful registration
      }
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
};

export default authService;
