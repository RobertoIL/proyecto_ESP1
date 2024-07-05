import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: "",
    name: "",
    token: "",
    isAuthenticated: false,
    userId: "",
  }),
  actions: {
    setAuthenticated(value) {
      this.isAuthenticated = value;
      sessionStorage.setItem("isAuthenticated", value.toString());
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
    loginSuccess(name, token) {
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
      sessionStorage.clear(); // Simplified session storage cleanup
    },
    checkSession() {
      const isAuthenticated = sessionStorage.getItem("isAuthenticated");
      const token = sessionStorage.getItem("token");
      const email = sessionStorage.getItem("email");
      const name = sessionStorage.getItem("name");
      const userId = sessionStorage.getItem("userId");

      if (isAuthenticated && token && email && name && userId) {
        this.setAuthenticated(isAuthenticated === "true");
        this.setToken(token);
        this.setEmail(email);
        this.setName(name);
        this.setUserId(userId);
      }
    },
  },
  getters: {
    getAuthenticated: (state) => state.isAuthenticated,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getUserId: (state) => state.userId,
    getToken: (state) => state.token,
  },
});
