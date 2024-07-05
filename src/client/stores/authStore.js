import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
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
      localStorage.setItem("isAuthenticated", value.toString());
    },
    setName(name) {
      this.name = name;
      localStorage.setItem("name", name);
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setEmail(email) {
      this.email = email;
      localStorage.setItem("email", email);
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
      localStorage.clear();
    },
    checkSession() {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const name = localStorage.getItem("name");
      const userId = localStorage.getItem("userId");

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
