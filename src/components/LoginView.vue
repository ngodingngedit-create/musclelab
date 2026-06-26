<template>
  <section class="auth-page" id="login-page">
    <div class="auth-container">
      
      <!-- LEFT PANEL: Form -->
      <div class="auth-panel auth-panel--form">
        <!-- <button class="auth-back" @click="navigateTo('landing')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          {{ currentLang === 'id' ? 'Kembali' : 'Back' }}
        </button> -->

        <div class="auth-card">
          <div class="auth-header">
            <h1 class="auth-title">{{ t.auth.loginTitle }}</h1>
            <p class="auth-desc">{{ t.auth.loginDesc }}</p>
          </div>

          <!-- Alert message -->
          <div v-if="errorMsg" class="auth-alert auth-alert--error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>{{ errorMsg }}</span>
          </div>
          <div v-if="successMsg" class="auth-alert auth-alert--success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span>{{ successMsg }}</span>
          </div>

          <form @submit.prevent="handleLogin" class="auth-form">
            <!-- Email Input -->
            <div class="form-group">
              <label for="email">{{ t.auth.emailLabel }}</label>
              <div class="input-wrapper">
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  :placeholder="t.auth.emailPlaceholder"
                  :class="{ 'input-error': errors.email }"
                  @input="clearError('email')"
                  required
                />
              </div>
              <span v-if="errors.email" class="error-hint">{{ errors.email }}</span>
            </div>

            <!-- Password Input -->
            <div class="form-group">
              <div class="label-row">
                <label for="password">{{ t.auth.passwordLabel }}</label>
                <a href="#" class="form-link" @click.prevent>{{ t.auth.forgotPassword }}</a>
              </div>
              <div class="input-wrapper">
                <input
                  v-model="form.password"
                  type="password"
                  id="password"
                  :placeholder="t.auth.passwordPlaceholder"
                  :class="{ 'input-error': errors.password }"
                  @input="clearError('password')"
                  required
                />
              </div>
              <span v-if="errors.password" class="error-hint">{{ errors.password }}</span>
            </div>

            <!-- Options (Remember me) -->
            <div class="form-options">
              <label class="checkbox-container">
                <input type="checkbox" v-model="form.rememberMe" />
                <span class="checkmark"></span>
                <span class="checkbox-label">{{ t.auth.rememberMe }}</span>
              </label>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="auth-submit-btn" :disabled="loading">
              <span v-if="!loading">{{ t.auth.signInBtn }}</span>
              <span v-else class="auth-spinner"></span>
            </button>
          </form>

          <div class="auth-divider">
            <span>{{ t.auth.orText }}</span>
          </div>

          <!-- Google Sign In -->
          <button class="google-auth-btn" @click="openGooglePopup" :disabled="loading">
            <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.137 4.2a5.992 5.992 0 0 1-6-6 5.992 5.992 0 0 1 6-6c1.633 0 3.125.614 4.254 1.623l3.15-3.15A10.156 10.156 0 0 0 12.24 2a9.992 9.992 0 0 0-10 10 9.992 9.992 0 0 0 10 10c5.782 0 9.8-4.064 9.8-9.9a9.07 9.07 0 0 0-.16-1.815H12.24z"/>
            </svg>
            <span>{{ t.auth.googleSignIn }}</span>
          </button>

          <!-- Toggle Link -->
          <p class="auth-switch">
            {{ t.auth.noAccount }}
            <a href="#" @click.prevent="navigateTo('signup')">{{ t.auth.registerNow }}</a>
          </p>
        </div>
      </div>

    </div>

    <!-- Google Accounts Mock Popup Overlay Modal -->
    <Transition name="popup-fade">
      <div v-if="googlePopupOpen" class="google-modal-overlay" @click.self="closeGooglePopup">
        <div class="google-modal">
          <div class="google-modal__header">
            <svg class="google-modal__logo" viewBox="0 0 24 24" width="24" height="24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <h3>Sign in with Google</h3>
            <p>to continue to <strong>Muscle Lab</strong></p>
          </div>

          <div class="google-modal__body">
            <!-- Account Options -->
            <div v-if="!googleSigningIn" class="google-accounts-list">
              <button class="google-account-item" @click="selectGoogleAccount('athlete.google@gmail.com', 'Google Athlete')">
                <div class="google-avatar">GA</div>
                <div class="google-account-info">
                  <p class="google-account-name">Google Athlete</p>
                  <p class="google-account-email">athlete.google@gmail.com</p>
                </div>
              </button>
              <button class="google-account-item" @click="selectGoogleAccount('guest.user@gmail.com', 'Guest User')">
                <div class="google-avatar google-avatar--guest">GU</div>
                <div class="google-account-info">
                  <p class="google-account-name">Guest User</p>
                  <p class="google-account-email">guest.user@gmail.com</p>
                </div>
              </button>
            </div>

            <!-- Loader status -->
            <div v-else class="google-loading-state">
              <div class="google-spinner"></div>
              <p>Connecting to Muscle Lab...</p>
            </div>
          </div>

          <div class="google-modal__footer">
            <span>To continue, Google will share your name, email address, language preference, and profile picture with Muscle Lab.</span>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useNavigation } from '../composables/useNavigation'
import { useAuth } from '../composables/useAuth'

const { t, currentLang } = useLanguage()
const { navigateTo } = useNavigation()
const { login, loginWithGoogle } = useAuth()

const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
})

// Google Modal Popup simulations
const googlePopupOpen = ref(false)
const googleSigningIn = ref(false)

function clearError(field) {
  errors[field] = ''
  errorMsg.value = ''
}

function validateForm() {
  let valid = true
  
  // Email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = t.value.auth.errorFields
    valid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = t.value.auth.errorEmail
    valid = false
  }

  // Password check
  if (!form.password) {
    errors.password = t.value.auth.errorFields
    valid = false
  } else if (form.password.length < 6) {
    errors.password = t.value.auth.errorPassword
    valid = false
  }

  return valid
}

function handleLogin() {
  if (!validateForm()) return
  
  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''

  setTimeout(() => {
    const res = login(form.email, form.password)
    loading.value = false
    if (res.success) {
      successMsg.value = t.value.auth.successLogin
      setTimeout(() => {
        navigateTo('profile')
      }, 1000)
    } else {
      errorMsg.value = res.error
    }
  }, 1200)
}

function openGooglePopup() {
  googlePopupOpen.value = true
}

function closeGooglePopup() {
  if (!googleSigningIn.value) {
    googlePopupOpen.value = false
  }
}

function selectGoogleAccount(email, name) {
  googleSigningIn.value = true
  
  setTimeout(() => {
    loginWithGoogle()
    googleSigningIn.value = false
    googlePopupOpen.value = false
    successMsg.value = t.value.auth.successLogin
    setTimeout(() => {
      navigateTo('profile')
    }, 1000)
  }, 1500)
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - var(--nav-height, 80px));
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 40px 20px;
}

/* Form Panel */
.auth-panel--form {
  width: 100%;
  max-width: 400px;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

/* Banner Panel */
.auth-panel--banner {
  flex: 1.2;
  position: relative;
  background: url('/banner_auth.png') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  padding: 80px;
}
.banner-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%);
}
.banner-content {
  position: relative;
  z-index: 2;
  max-width: 500px;
}
.banner-eyebrow {
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  color: var(--color-lime);
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 12px;
}
.banner-headline {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.1;
  color: #fff;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.banner-headline .highlight {
  color: var(--color-lime);
}
.banner-desc {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.6;
  color: #aaa;
}

/* Auth Card elements */
.auth-back {
  position: absolute;
  top: 40px; left: 40px;
  background: none; border: none; outline: none;
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
  cursor: pointer;
  display: flex; align-items: center; gap: 8px;
  transition: color 0.2s;
}
.auth-back:hover {
  color: var(--color-lime);
}

.auth-card {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  padding-top: 40px;
}

.auth-header {
  margin-bottom: 32px;
}
.auth-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
}
.auth-desc {
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: #666;
  line-height: 1.5;
}

/* Form groups */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group label {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #444;
}
.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-link {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-lime);
  text-decoration: none;
  letter-spacing: 0.05em;
}
.form-link:hover {
  text-decoration: underline;
}

.input-wrapper input {
  width: 100%;
  background: #080808;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
  padding: 14px 16px;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.88rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-wrapper input:focus {
  border-color: var(--color-lime);
  box-shadow: 0 0 0 2px rgba(200, 244, 0, 0.1);
}
.input-wrapper input.input-error {
  border-color: #ff3333;
}
.error-hint {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: #ff3333;
}

/* Alert styles */
.auth-alert {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-family: var(--font-body);
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  gap: 10px;
}
.auth-alert--error {
  background: rgba(255, 51, 51, 0.1);
  border: 1px solid rgba(255, 51, 51, 0.2);
  color: #ff5555;
}
.auth-alert--success {
  background: rgba(200, 244, 0, 0.1);
  border: 1px solid rgba(200, 244, 0, 0.2);
  color: var(--color-lime);
}

/* Custom Checkbox */
.form-options {
  margin: 4px 0;
}
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  user-select: none;
}
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0; width: 0;
}
.checkmark {
  position: absolute;
  top: 2px; left: 0;
  height: 16px; width: 16px;
  background-color: #080808;
  border: 1px solid #222;
  border-radius: 4px;
  transition: border-color 0.2s, background-color 0.2s;
}
.checkbox-container:hover input ~ .checkmark {
  border-color: #444;
}
.checkbox-container input:checked ~ .checkmark {
  background-color: var(--color-lime);
  border-color: var(--color-lime);
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}
.checkbox-container .checkmark:after {
  left: 5px; top: 1px;
  width: 4px; height: 8px;
  border: solid #000;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.checkbox-label {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: #888;
}

/* Buttons */
.auth-submit-btn {
  background: var(--color-lime);
  color: #000;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.88rem;
  letter-spacing: 0.05em;
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
  margin-top: 10px;
}
.auth-submit-btn:hover {
  background: #d4ff00;
  transform: translateY(-1px);
}
.auth-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.auth-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
}
.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #151515;
}
.auth-divider span {
  padding: 0 12px;
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #444;
}

.google-auth-btn {
  background: #0a0a0a;
  color: #fff;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
  padding: 14px;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: border-color 0.2s, background-color 0.2s, transform 0.2s;
}
.google-auth-btn:hover {
  background: #111;
  border-color: #333;
  transform: translateY(-1px);
}
.google-icon {
  flex-shrink: 0;
}

.auth-switch {
  margin-top: 32px;
  text-align: center;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: #666;
}
.auth-switch a {
  color: var(--color-lime);
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
}
.auth-switch a:hover {
  text-decoration: underline;
}

/* Spinner */
.auth-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0,0,0,0.1);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Google OAuth Mock Popup styles */
.google-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.google-modal {
  background: #ffffff;
  border-radius: 12px;
  max-width: 450px;
  width: 100%;
  padding: 36px 40px;
  color: #202124;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
}
.google-modal__header {
  text-align: center;
  margin-bottom: 24px;
}
.google-modal__logo {
  margin-bottom: 16px;
}
.google-modal__header h3 {
  font-family: 'Roboto', 'Arial', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 6px 0;
  color: #202124;
}
.google-modal__header p {
  font-family: 'Roboto', sans-serif;
  font-size: 0.95rem;
  color: #5f6368;
  margin: 0;
}
.google-modal__body {
  margin-bottom: 24px;
}

.google-accounts-list {
  display: flex;
  flex-direction: column;
  border: 1px solid #dadce0;
  border-radius: 8px;
  overflow: hidden;
}
.google-account-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  background: #fff;
  border: none;
  border-bottom: 1px solid #dadce0;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}
.google-account-item:last-child {
  border-bottom: none;
}
.google-account-item:hover {
  background: #f8f9fa;
}
.google-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #1a73e8;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.google-avatar--guest {
  background: #5f6368;
}
.google-account-info {
  display: flex;
  flex-direction: column;
}
.google-account-name {
  font-family: 'Roboto', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  color: #3c4043;
  margin: 0;
}
.google-account-email {
  font-family: 'Roboto', sans-serif;
  font-size: 0.78rem;
  color: #5f6368;
  margin: 0;
}

.google-loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  gap: 16px;
}
.google-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(26, 115, 232, 0.1);
  border-top-color: #1a73e8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
.google-loading-state p {
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  color: #5f6368;
  margin: 0;
}

.google-modal__footer {
  font-family: 'Roboto', sans-serif;
  font-size: 0.72rem;
  color: #5f6368;
  line-height: 1.4;
  border-top: 1px solid #f1f3f4;
  padding-top: 16px;
}

/* Modal Animations */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.25s ease;
}
.popup-fade-enter-active .google-modal {
  animation: modalScaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.popup-fade-leave-active .google-modal {
  animation: modalScaleOut 0.25s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}
@keyframes modalScaleIn {
  from { transform: scale(0.92); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes modalScaleOut {
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.92); opacity: 0; }
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 1024px) {
  .auth-panel--banner {
    display: none;
  }
  .auth-panel--form {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .auth-panel--form {
    padding: 24px 20px;
  }
  .auth-back {
    top: 24px; left: 20px;
  }
  .auth-card {
    padding-top: 60px;
  }
  .auth-title {
    font-size: 1.5rem;
  }
  .input-wrapper input {
    padding: 12px 14px;
    font-size: 0.85rem;
  }
}
</style>
