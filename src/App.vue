<template>
  <div class="app">
    <Navbar />
    <main>
      <HeroSection />
      <ClassesSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import ClassesSection from './components/ClassesSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<style scoped>
.app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #000;
}
main {
  flex: 1;
}
</style>
