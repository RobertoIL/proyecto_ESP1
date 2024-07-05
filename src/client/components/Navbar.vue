<template>
  <nav>
    <div class="bg-gray-800 text-slate-100">
      <div class="flex justify-between h-16 px-10 shadow items-center">
        <div class="flex items-center space-x-8">
          <RouterLink to="/" class="text-xl lg:text-2xl font-bold cursor-pointer hover:text-yellow-300">MiniJuegos</RouterLink>
          <div v-if="isAuthenticated" class="hidden md:flex justify-around space-x-4">
            <RouterLink to="/" class="hover:text-indigo-600">Home</RouterLink>
            <RouterLink to="/game" class="hover:text-indigo-600">Game</RouterLink>
            <RouterLink to="/historial" class="hover:text-indigo-600">Historial</RouterLink>
            <RouterLink to="/wiki" class="hover:text-indigo-600">Wiki</RouterLink>
          </div>
        </div>
        <div v-if="!isAuthenticated" class="flex space-x-4 items-center">
          <RouterLink to="/login" class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">Login</RouterLink>
        </div>
        <ProfileCard v-if="isAuthenticated" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import ProfileCard from "./miniComponents/ProfileCard.vue";
import { useAuthStore } from "../stores/authStore.js";

const store = useAuthStore();
const isAuthenticated = store.getAuthenticated;
</script>