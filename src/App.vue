<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/navbar.vue';
import Footer from './components/Footer.vue';

</script>

<template>
<Navbar></Navbar>
  
<router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <Footer></Footer>
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0s lienar;
  opacity: 0;
}
</style>
