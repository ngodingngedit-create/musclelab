import { ref } from 'vue'

const currentView = ref('landing') // 'landing', 'transaction', or 'profile'
const selectedTier = ref('active') // 'starter', 'active', 'pro'
const profileSidebarOpen = ref(false) // controls the profile page sidebar on mobile

export function useNavigation() {
  function navigateTo(view, tier = 'active') {
    currentView.value = view
    selectedTier.value = tier
    profileSidebarOpen.value = false // reset sidebar when navigating away
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return {
    currentView,
    selectedTier,
    profileSidebarOpen,
    navigateTo
  }
}
