<template>
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-600">
              {{ name }}
              <span class="material-symbols-outlined">keyboard_arrow_down</span>
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <button @click="logout" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">
                    Sign out
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useAuthStore } from '@/client/stores/authStore';
import authService from '@/client/services/authService.js';

const store = useAuthStore();

const name = store.getName;

const logout = () => {
  console.log('Cerrando sesión...');
  authService.logout();
}

</script>
