<template>
   <main class="flex items-center justify-center bg-gray-900">
    <Game />
   </main>
</template>

<script>
import Game from "../components/Game.vue";
export default {
    components: {
        Game
    },
    beforeRouteEnter(to, from, next) {
    next(vm => {
      const hasReloaded = sessionStorage.getItem('hasReloaded');
      if (!hasReloaded) {
        sessionStorage.setItem('hasReloaded', 'true');
        location.reload();
      } else {
        sessionStorage.removeItem('hasReloaded');
      }
    });
}
};
</script>