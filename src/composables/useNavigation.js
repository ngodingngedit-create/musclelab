import { ref } from 'vue'

const currentView = ref('landing') // 'landing'|'transaction'|'profile'|'classes-catalog'|'class-register'|'trainer-catalog'|'trainer-order'
const selectedTier = ref('active') // 'starter', 'active', 'pro'
const profileSidebarOpen = ref(false) // controls the profile page sidebar on mobile
const selectedClass = ref(null)   // stores the class object chosen for registration
const selectedTrainer = ref(null) // stores the trainer object chosen for ordering

export function useNavigation() {
  function navigateTo(view, tier = 'active') {
    currentView.value = view
    selectedTier.value = tier
    profileSidebarOpen.value = false
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function navigateToClassRegister(cls) {
    selectedClass.value = cls
    currentView.value = 'class-register'
    profileSidebarOpen.value = false
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function navigateToTrainerOrder(trainer) {
    selectedTrainer.value = trainer
    currentView.value = 'trainer-order'
    profileSidebarOpen.value = false
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return {
    currentView,
    selectedTier,
    selectedClass,
    selectedTrainer,
    profileSidebarOpen,
    navigateTo,
    navigateToClassRegister,
    navigateToTrainerOrder,
  }
}

