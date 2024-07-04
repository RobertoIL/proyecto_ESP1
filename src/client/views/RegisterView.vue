<template>
  <main class="bg-login-background bg-cover">
    <div class="flex-grow p-8 bg-gray-800 bg-opacity-90 h-screen">
      <div class="p-8 bg-slate-200 bg-opacity-50 mx-[500px] rounded-xl">
          <p class="text-2xl font-bold text-center pb-4">Registrase</p>
          <form class="max-w-sm mx-auto" @submit.prevent="register">
          <div class="mb-5">
            <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
            <input type="text" id="website-admin" v-model="name" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jonh Doe">
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" id="email" v-model="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
          </div>
          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input type="password" id="password" v-model="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <div class="mb-5">
            <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar Contraseña</label>
            <input type="password" id="repeat-password" v-model="repeatPassword" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Subir imagen perfil</label>
          <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" @change="handleFileUpload">
          <div class="flex flex-col space-y-4 py-4">
            <RouterLink class="hover:text-blue-800 underline" to="/login">Ya tengo cuenta</RouterLink>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar</button>
          </div>
          
        </form>
      </div>
    
    </div>
  </main>  
</template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'RegisterView',
    data()  { 
      return {
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        imagenPerfil: null,
      }
    },
    methods: {
      handleFileUpload(event) {
        this.imagenPerfil = event.target.files[0];
      },
      async register() {
        try {
          const formData = new FormData();
          formData.append('name', this.name);
          formData.append('email', this.email);
          formData.append('password', this.password);
          formData.append('repeatPassword', this.repeatPassword);
          if (this.imagenPerfil) {
            formData.append('imagenPerfil', this.imagenPerfil);
          }
  
          const response = await axios.post('http://localhost:3000/auth/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          // Manejar la respuesta, como redirigir al usuario o mostrar un mensaje de éxito
        }
        catch (error) {
          console.error(error);
          // Manejar errores, como mostrar un mensaje al usuario
        }
      }
    }
  }
  </script>