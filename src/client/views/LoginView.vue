<template>
<main class="bg-login-background bg-cover">
    <div class="flex-grow p-8 bg-gray-800 bg-opacity-90 h-screen">
    <div class="p-8 bg-slate-200 bg-opacity-50 mx-[500px] rounded-xl">
        <p class="text-3xl text-center font-bold pb-8">Iniciar Sesión</p>
        <form class="max-w-sm mx-auto" @submit.prevent="login">
        <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" id="email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input type="password" id="password" v-model="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
    <div class="flex flex-col space-y-4">
        <RouterLink class="hover:text-blue-800 underline" to="/register">No tengo cuenta</RouterLink>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar Sesión</button>
    </div>
        </form>
    </div>
</div>
</main>
</template>

<script>
import axios from 'axios';
export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:3000/auth/login', {
                    email: this.email,
                    password: this.password
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }
}
</script>