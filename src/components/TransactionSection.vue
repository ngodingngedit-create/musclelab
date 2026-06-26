<template>
  <section class="checkout" id="checkout-section">
    <div class="checkout__inner">
      <!-- Title Header -->
      <div class="checkout__header">
        <h2 class="checkout__title">
          <span class="checkout__title-line1">{{ t.transaction.title1 }}</span>
          <span class="checkout__title-line2">{{ t.transaction.title2 }}</span>
        </h2>
        <p class="checkout__desc">
          {{ t.transaction.desc }}
        </p>
      </div>

      <!-- Main Columns Grid -->
      <div class="checkout__grid">
        <!-- LEFT PANEL: Selected Tier Summary -->
        <div class="checkout__summary-panel">
          <div class="summary-card">
            <span class="summary-card__label">{{ t.transaction.selectedTier }}</span>
            <div class="summary-card__header">
              <h3 class="summary-card__name">{{ currentTierData.name }} {{ t.nav.membership }}</h3>
              <div class="summary-card__price-group">
                <span class="summary-card__currency">{{ t.membership.currency }}</span>
                <span class="summary-card__price">{{ currentTierData.price }}</span>
                <span class="summary-card__period">{{ t.membership.perMonth }}</span>
              </div>
            </div>

            <div class="summary-card__divider"></div>

            <!-- Benefits included -->
            <div class="summary-card__benefits">
              <h4 class="benefits__title">{{ t.transaction.benefitsTitle }}</h4>
              <ul class="benefits__list">
                <li v-for="(feat, idx) in currentTierData.features" :key="idx">
                  <span class="feat-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

            <div class="summary-card__divider"></div>

            <!-- Pricing Breakdown -->
            <div class="summary-card__breakdown">
              <div class="breakdown-row">
                <span>{{ t.transaction.subtotal }}</span>
                <span>{{ t.membership.currency }} {{ currentTierData.price }}</span>
              </div>
              <div class="breakdown-row">
                <span>{{ t.transaction.regFee }}</span>
                <span class="text-lime">{{ t.transaction.waived }}</span>
              </div>
            </div>

            <!-- Total Box -->
            <div class="summary-card__total-box">
              <span class="total-label">{{ t.transaction.totalDue }}</span>
              <span class="total-price">{{ t.membership.currency }} {{ currentTierData.price }}</span>
            </div>
          </div>

          <!-- Secure Payment Badges -->
          <div class="checkout__badges">
            <!-- Shield check icon -->
            <span class="badge-icon" aria-label="Secure payments">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 11 11 13 15 9"/>
              </svg>
            </span>
            <!-- Lock icon -->
            <span class="badge-icon" aria-label="SSL Encrypted connection">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <!-- Verified icon -->
            <span class="badge-icon" aria-label="Verified merchant">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12l3 3 5-5"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- RIGHT PANEL: Payment Form -->
        <div class="checkout__form-panel">
          <form @submit.prevent="handleCompletePurchase" class="payment-form">
            <h3 class="payment-form__title">{{ t.transaction.paymentDetails }}</h3>

            <!-- Cardholder Name -->
            <div class="form-group">
              <label for="cardholder-name" class="form-label">{{ t.transaction.cardholder }}</label>
              <input
                type="text"
                id="cardholder-name"
                v-model="form.name"
                :placeholder="t.transaction.cardholderPlaceholder"
                class="form-input"
                required
              />
            </div>

            <!-- Card Number -->
            <div class="form-group">
              <label for="card-number" class="form-label">{{ t.transaction.cardNumber }}</label>
              <div class="input-with-icon">
                <input
                  type="text"
                  id="card-number"
                  v-model="form.cardNumber"
                  :placeholder="t.transaction.cardNumberPlaceholder"
                  class="form-input form-input--icon"
                  maxlength="19"
                  @input="formatCardNumber"
                  required
                />
                <span class="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                </span>
              </div>
            </div>

            <!-- Expiry & CVC Row -->
            <div class="form-row">
              <div class="form-group col-6">
                <label for="expiry-date" class="form-label">{{ t.transaction.expiry }}</label>
                <input
                  type="text"
                  id="expiry-date"
                  v-model="form.expiry"
                  :placeholder="t.transaction.expiryPlaceholder"
                  class="form-input"
                  maxlength="5"
                  @input="formatExpiryDate"
                  required
                />
              </div>
              <div class="form-group col-6">
                <label for="cvc-number" class="form-label">{{ t.transaction.cvc }}</label>
                <div class="input-with-icon">
                  <input
                    type="password"
                    id="cvc-number"
                    v-model="form.cvc"
                    :placeholder="t.transaction.cvcPlaceholder"
                    class="form-input form-input--icon"
                    maxlength="4"
                    required
                  />
                  <span class="input-icon input-icon--help" aria-label="3 or 4 digit code on the back of your card">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <!-- Save Card checkbox -->
            <label class="form-checkbox">
              <input type="checkbox" v-model="form.save" class="checkbox-box" />
              <span class="checkbox-text">{{ t.transaction.saveCard }}</span>
            </label>

            <!-- Complete Purchase CTA -->
            <button type="submit" class="checkout-btn" :disabled="isSubmitting" id="btn-complete-checkout">
              <span v-if="!isSubmitting">{{ t.transaction.completeBtn }}</span>
              <span v-else class="loader"></span>
            </button>

            <p class="payment-form__fineprint">
              {{ t.transaction.finePrint }}
            </p>
          </form>
        </div>
      </div>
    </div>

    <!-- SUCCESS CHECKOUT OVERLAY -->
    <Transition name="success-modal">
      <div class="success-overlay" v-if="showSuccess">
        <div class="success-card">
          <!-- Animated checkmark ring -->
          <div class="success-card__icon-wrap">
            <svg class="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle class="success-checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
              <path class="success-checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>

          <h3 class="success-card__title">{{ t.transaction.successTitle }}</h3>
          <p class="success-card__desc">
            {{ t.transaction.successDesc }}
          </p>
          <p class="success-card__details">
            {{ t.transaction.successDetails }}
          </p>

          <div class="success-card__info-box">
            <span class="info-label">{{ t.transaction.selectedTier }}</span>
            <span class="info-value text-lime">{{ currentTierData.name }}</span>
            
            <span class="info-label">TOTAL PAID</span>
            <span class="info-value">{{ t.membership.currency }} {{ currentTierData.price }}</span>
          </div>

          <div class="success-card__footer">
            <p class="countdown-text">{{ t.transaction.redirectText.replace('{seconds}', countdown) }}</p>
            <button @click="closeAndGoHome" class="success-home-btn" id="btn-success-home">
              {{ t.transaction.backHomeBtn }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onUnmounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useNavigation } from '../composables/useNavigation'

const { t } = useLanguage()
const { selectedTier, navigateTo } = useNavigation()

const form = reactive({
  name: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
  save: false
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const countdown = ref(4)
let timer = null

// Fetch data dynamically based on the active selected tier from navigation
const currentTierData = computed(() => {
  const tierKey = selectedTier.value // 'starter', 'active', 'pro'
  return t.value.membership.tiers[tierKey] || t.value.membership.tiers.active
})

// Auto format card number spaces
function formatCardNumber(e) {
  let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let matches = value.match(/\d{4,16}/g)
  let match = (matches && matches[0]) || ''
  let parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length > 0) {
    form.cardNumber = parts.join(' ')
  } else {
    form.cardNumber = value
  }
}

// Auto format expiry date backslash
function formatExpiryDate(e) {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length > 2) {
    form.expiry = value.substring(0, 2) + ' / ' + value.substring(2, 4)
  } else {
    form.expiry = value
  }
}

// Process payment submission
function handleCompletePurchase() {
  isSubmitting.value = true
  
  // Mock API request network delay
  setTimeout(() => {
    isSubmitting.value = false
    showSuccess.value = true
    startCountdown()
  }, 1200)
}

function startCountdown() {
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      closeAndGoHome()
    }
  }, 1000)
}

function closeAndGoHome() {
  if (timer) clearInterval(timer)
  showSuccess.value = false
  navigateTo('landing')
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
/* =========================================================
   CHECKOUT PAGE
   ========================================================= */
.checkout {
  padding: clamp(100px, 12vw, 150px) 0 var(--section-pad);
  background-color: var(--color-black);
  position: relative;
  min-height: 100dvh;
}

.checkout__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 64px);
}

/* Header */
.checkout__header {
  max-width: 800px;
  margin-bottom: clamp(40px, 6vw, 60px);
}

.checkout__title {
  display: flex;
  flex-direction: column;
  line-height: 0.95;
  margin-bottom: 20px;
}

.checkout__title-line1,
.checkout__title-line2 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6.5vw, 5.2rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.checkout__title-line1 {
  color: var(--color-white);
}

.checkout__title-line2 {
  color: var(--color-lime);
  text-shadow: 0 0 60px rgba(200, 244, 0, 0.15);
}

.checkout__desc {
  font-family: var(--font-body);
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  color: var(--color-gray-400);
  line-height: 1.6;
  max-width: 480px;
}

/* Columns Grid */
.checkout__grid {
  display: grid;
  grid-template-columns: 4.5fr 7.5fr;
  gap: clamp(24px, 5vw, 64px);
  align-items: start;
}

/* LEFT PANEL: Summary */
.checkout__summary-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary-card {
  background: linear-gradient(135deg, rgba(15, 15, 15, 0.8), rgba(5, 5, 5, 0.95));
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 32px;
}

.summary-card__label {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  color: var(--color-gray-600);
  text-transform: uppercase;
  display: block;
  margin-bottom: 14px;
}

.summary-card__header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-card__name {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.01em;
}

.summary-card__price-group {
  display: flex;
  align-items: baseline;
}

.summary-card__currency {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-white);
  margin-right: 3px;
}

.summary-card__price {
  font-family: var(--font-display);
  font-size: 2.8rem;
  font-weight: 900;
  color: var(--color-white);
  line-height: 1;
}

.summary-card__period {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-gray-600);
  text-transform: uppercase;
  margin-left: 6px;
}

.summary-card__divider {
  height: 1px;
  background: var(--color-border);
  margin: 28px 0;
}


.benefits__title {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--color-gray-400);
  text-transform: uppercase;
  margin-bottom: 18px;
}

.benefits__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.benefits__list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.82rem;
  color: var(--color-gray-100);
  line-height: 1.4;
}

.feat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-lime);
  flex-shrink: 0;
}

.summary-card__breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 0.85rem;
  color: var(--color-gray-400);
  margin-bottom: 28px;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-card__total-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--color-white);
}

.total-price {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--color-lime);
}

/* Secure Badges */
.checkout__badges {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 8px 0;
}

.badge-icon {
  color: var(--color-gray-600);
  transition: color 0.3s;
}

.badge-icon:hover {
  color: var(--color-lime);
}

/* RIGHT PANEL: Checkout Form */
.checkout__form-panel {
  background: rgba(10, 10, 10, 0.6);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: clamp(24px, 4vw, 48px);
}

.payment-form__title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--color-white);
  margin-bottom: 32px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  position: relative;
}

.form-label {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--color-gray-400);
  text-transform: uppercase;
}

.form-input {
  background: #050505;
  border: 1px solid var(--color-border);
  color: var(--color-white);
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 0.88rem;
  font-family: var(--font-body);
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.form-input::placeholder {
  color: var(--color-gray-600);
}

.form-input:focus {
  border-color: rgba(200, 244, 0, 0.4);
  box-shadow: 0 0 16px rgba(200, 244, 0, 0.08);
}

.input-with-icon {
  position: relative;
  display: flex;
  width: 100%;
}

.form-input--icon {
  width: 100%;
  padding-right: 50px;
}

.input-icon {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.input-icon--help {
  pointer-events: auto;
  cursor: help;
}

.form-row {
  display: flex;
  gap: 16px;
}

.col-6 {
  flex: 1;
}

/* Checkbox */
.form-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  margin: 32px 0 36px;
}

.checkbox-box {
  appearance: none;
  background: #050505;
  border: 1px solid var(--color-border);
  width: 18px;
  height: 18px;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: background 0.2s, border-color 0.2s;
}

.checkbox-box:checked {
  background: var(--color-lime);
  border-color: var(--color-lime);
}

.checkbox-box:checked::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 6px;
  width: 4px;
  height: 8px;
  border: solid var(--color-black);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-text {
  font-size: 0.8rem;
  color: var(--color-gray-400);
  line-height: 1.4;
}

/* Button & Loader */
.checkout-btn {
  background: var(--color-lime);
  color: var(--color-black);
  width: 100%;
  padding: 18px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
  margin-bottom: 24px;
}

.checkout-btn:hover:not(:disabled) {
  background: #d4ff00;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(200, 244, 0, 0.35);
}

.checkout-btn:active:not(:disabled) {
  transform: translateY(0);
}

.checkout-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-black);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.payment-form__fineprint {
  font-size: 0.72rem;
  color: var(--color-gray-600);
  line-height: 1.6;
  text-align: center;
}

/* =========================================================
   SUCCESS OVERLAY
   ========================================================= */
.success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.success-card {
  background: linear-gradient(135deg, #0d0d0d, #050505);
  border: 1px solid rgba(200, 244, 0, 0.2);
  border-radius: 28px;
  padding: clamp(32px, 5vw, 48px);
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), 0 0 80px rgba(200, 244, 0, 0.08);
}

/* Success Checkmark Animation */
.success-card__icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 28px;
}

.success-checkmark {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  stroke-width: 2.5;
  stroke: var(--color-lime);
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px var(--color-lime);
  animation: fillCheckmark .4s ease-in-out .4s forwards, scaleCheckmark .3s ease-in-out .9s both;
}

.success-checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2.5;
  stroke-miterlimit: 10;
  stroke: var(--color-lime);
  fill: none;
  animation: strokeCheckmark 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.success-checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: strokeCheckmark 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards;
}

@keyframes strokeCheckmark {
  100% { stroke-dashoffset: 0; }
}

@keyframes fillCheckmark {
  100% { box-shadow: inset 0px 0px 0px 40px rgba(200, 244, 0, 0.06); }
}

@keyframes scaleCheckmark {
  0%, 100% { transform: none; }
  50% { transform: scale3d(1.1, 1.1, 1); }
}

.success-card__title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--color-white);
  margin-bottom: 14px;
}

.success-card__desc {
  font-size: 0.92rem;
  color: var(--color-gray-100);
  line-height: 1.6;
  margin-bottom: 8px;
}

.success-card__details {
  font-size: 0.78rem;
  color: var(--color-gray-600);
  line-height: 1.6;
  margin-bottom: 30px;
}

/* Info Box inside success screen */
.success-card__info-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 20px 24px;
  display: grid;
  grid-template-columns: 1.2fr 1.8fr;
  gap: 12px;
  align-items: center;
  text-align: left;
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  margin-bottom: 36px;
}

.info-label {
  font-weight: 700;
  color: var(--color-gray-600);
  text-transform: uppercase;
}

.info-value {
  font-weight: 900;
  color: var(--color-white);
  text-align: right;
}

.success-card__footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.countdown-text {
  font-size: 0.78rem;
  color: var(--color-gray-600);
}

.success-home-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-white);
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: background 0.3s, border-color 0.3s;
}

.success-home-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}

/* SUCCESS MODAL TRANSITION */
.success-modal-enter-active,
.success-modal-leave-active {
  transition: opacity 0.4s ease;
}

.success-modal-enter-from,
.success-modal-leave-to {
  opacity: 0;
}

.success-modal-enter-active .success-card {
  animation: successCardScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes successCardScale {
  from { transform: scale(0.9) translateY(20px); opacity: 0; }
  to   { transform: scale(1) translateY(0); opacity: 1; }
}

/* =========================================================
   RESPONSIVE DESIGN
   ========================================================= */
@media (max-width: 1024px) {
  .checkout__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  .success-card__info-box {
    grid-template-columns: 1fr;
    gap: 6px;
    text-align: center;
  }
  .info-value {
    text-align: center;
    margin-bottom: 8px;
  }
  .info-value:last-child {
    margin-bottom: 0;
  }
}
</style>
