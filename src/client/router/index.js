import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/game",
      name: "game",
      component: () => import("../views/GameView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/wiki",
      name: "wiki",
      component: () => import("../views/WikiView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/historial",
      name: "historial",
      component: () => import("../views/RecordView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
