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
        const { userId, email, name, token, profileImage } = response.data;
        authStore.loginSucces(name, token);
        authStore.setEmail(email);
        authStore.setUserId(userId);
        authStore.setProfileImage(profileImage);
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
};

export default authService;
