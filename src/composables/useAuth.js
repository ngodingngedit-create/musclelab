import { ref, readonly } from 'vue'
import { useNavigation } from './useNavigation'

// Shared global state
const isLoggedIn = ref(true) // Initialized to true to support the existing mocked profile by default
const user = ref({
  name: 'Marcus Thorne',
  email: 'marcus.thorne@gmail.com',
  tier: 'PRO ELITE',
  avatar: '/athlete_avatar.png',
  provider: 'local'
})

export function useAuth() {
  const { navigateTo } = useNavigation()

  function login(email, password) {
    if (!email || !password) return { success: false, error: 'Email and password are required' }
    
    const extractedName = email.split('@')[0].toUpperCase().replace('.', ' ')
    user.value = {
      name: extractedName || 'ATHLETE',
      email: email,
      tier: 'STARTER',
      avatar: '',
      provider: 'local'
    }
    isLoggedIn.value = true
    return { success: true }
  }

  function signUp(name, email, password) {
    if (!name || !email || !password) return { success: false, error: 'All fields are required' }
    
    user.value = {
      name: name.toUpperCase(),
      email: email,
      tier: 'STARTER',
      avatar: '',
      provider: 'local'
    }
    isLoggedIn.value = true
    return { success: true }
  }

  function loginWithGoogle() {
    user.value = {
      name: 'GOOGLE ATHLETE',
      email: 'athlete.google@gmail.com',
      tier: 'ACTIVE',
      avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      provider: 'google'
    }
    isLoggedIn.value = true
    return { success: true }
  }

  function logout() {
    isLoggedIn.value = false
    user.value = {
      name: '',
      email: '',
      tier: 'STARTER',
      avatar: '',
      provider: ''
    }
    navigateTo('landing')
  }

  return {
    isLoggedIn: readonly(isLoggedIn),
    user: readonly(user),
    login,
    signUp,
    loginWithGoogle,
    logout
  }
}
