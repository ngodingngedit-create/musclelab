<template>
  <div class="app">
    <Navbar />
    <main>
      <Transition name="fade-view" mode="out-in">
        <div v-if="currentView === 'landing'" key="landing">
          <HeroSection />
          <MembershipSection />
          <ClassesSection />
          <PersonalTrainerSection />
        </div>
        <div v-else-if="currentView === 'transaction'" key="transaction">
          <TransactionMembership />
        </div>
        <div v-else-if="currentView === 'profile'" key="profile">
          <UserProfile />
        </div>
        <div v-else-if="currentView === 'classes-catalog'" key="classes-catalog">
          <ClassesCatalog />
        </div>
        <div v-else-if="currentView === 'class-register'" key="class-register">
          <ClassRegistration />
        </div>
        <div v-else-if="currentView === 'trainer-catalog'" key="trainer-catalog">
          <TrainerCatalog />
        </div>
        <div v-else-if="currentView === 'trainer-order'" key="trainer-order">
          <TrainerOrder />
        </div>
        <div v-else-if="currentView === 'chatbot'" key="chatbot">
          <ChatBot />
        </div>
        <div v-else-if="currentView === 'login'" key="login">
          <LoginView />
        </div>
        <div v-else-if="currentView === 'signup'" key="signup">
          <SignUpView />
        </div>
      </Transition>
    </main>
    <FooterSection v-if="currentView === 'landing'" />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import MembershipSection from './components/MembershipSection.vue'
import ClassesSection from './components/ClassesSection.vue'
import PersonalTrainerSection from './components/PersonalTrainerSection.vue'
import TransactionMembership from './components/TransactionMembership.vue'
import UserProfile from './components/UserProfile.vue'
import FooterSection from './components/FooterSection.vue'
import ClassesCatalog from './components/ClassesCatalog.vue'
import ClassRegistration from './components/ClassRegistration.vue'
import TrainerCatalog from './components/TrainerCatalog.vue'
import TrainerOrder from './components/TrainerOrder.vue'
import ChatBot from './components/ChatBot.vue'
import LoginView from './components/LoginView.vue'
import SignUpView from './components/SignUpView.vue'
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
