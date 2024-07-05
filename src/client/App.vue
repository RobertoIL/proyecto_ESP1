<template>
  <Navbar v-if="!isLoginOrRegister"/>
  <RouterView class="min-h-screen" />
  <Footer v-if="!isLoginOrRegister" />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    isAuthenticated() {
      return true;
    },
    isLoginOrRegister() {
      return this.$route.path === '/login' || this.$route.path === '/register';
    }
  }
}
</script>