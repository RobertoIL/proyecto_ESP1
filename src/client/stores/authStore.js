import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: "",
    name: "",
    token: "",
    profileImage: "", // Añadir imagen de perfil
    isAuthenticated: false,
    userId: "",
  }),
  actions: {
    setAuthenticated(value) {
      this.isAuthenticated = value;
      sessionStorage.setItem("isAuthenticated", value);
    },
    setName(name) {
      this.name = name;
      sessionStorage.setItem("name", name);
    },
    setToken(token) {
      this.token = token;
      sessionStorage.setItem("token", token);
    },
    setEmail(email) {
      this.email = email;
      sessionStorage.setItem("email", email);
    },
    setUserId(userId) {
      this.userId = userId;
      sessionStorage.setItem("userId", userId);
    },
    setProfileImage(profileImage) {
      this.profileImage = profileImage;
      sessionStorage.setItem("profileImage", profileImage);
    },
    loginSucces(name, token, role) {
      this.setAuthenticated(true);
      this.setName(name);
      this.setToken(token);
    },
    logout() {
      this.setAuthenticated(false);
      this.setToken("");
      this.setEmail("");
      this.setName("");
      this.setUserId("");
      this.setProfileImage(""); // Limpiar imagen de perfil
      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("profileImage");
    },
    checkSession() {
      const isAuthenticated = sessionStorage.getItem("isAuthenticated");
      const token = sessionStorage.getItem("token");
      const email = sessionStorage.getItem("email");
      const name = sessionStorage.getItem("name");
      const userId = sessionStorage.getItem("userId");
      const profileImage = sessionStorage.getItem("profileImage");

      if (isAuthenticated && token && email && name && userId) {
        this.setAuthenticated(isAuthenticated === "true");
        this.setToken(token);
        this.setEmail(email);
        this.setName(name);
        this.setUserId(userId);
        this.setProfileImage(profileImage);
      }
    },
  },
  getters: {
    getAuthenticated: (state) => state.isAuthenticated,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getUserId: (state) => state.userId,
    getToken: (state) => state.token,
    getProfileImage: (state) => state.profileImage,
  },
});
