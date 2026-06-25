<template>
  <div class="app">
    <Navbar />
    <main>
      <Transition name="fade-view" mode="out-in">
        <div v-if="currentView === 'landing'" key="landing">
          <HeroSection />
          <MembershipSection />
          <ClassesSection />
        </div>
        <div v-else-if="currentView === 'transaction'" key="transaction">
          <TransactionMembership />
        </div>
        <div v-else-if="currentView === 'profile'" key="profile">
          <UserProfile />
        </div>
      </Transition>
    </main>
    <FooterSection v-if="currentView !== 'transaction' && currentView !== 'profile'" />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import MembershipSection from './components/MembershipSection.vue'
import ClassesSection from './components/ClassesSection.vue'
import TransactionMembership from './components/TransactionMembership.vue'
import UserProfile from './components/UserProfile.vue'
import FooterSection from './components/FooterSection.vue'
import { useNavigation } from './composables/useNavigation'

const { currentView } = useNavigation()
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

/* View transitions */
.fade-view-enter-active,
.fade-view-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-view-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-view-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
