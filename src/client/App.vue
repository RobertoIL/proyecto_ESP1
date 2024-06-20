<template>
  <Navbar v-if="isAuthenticated"/>
  <RouterView />
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  computed: {
    isAuthenticated() {
      return true;
    }
  }
}
</script>