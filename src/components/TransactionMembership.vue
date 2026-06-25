<template>
  <section class="checkout-gform" id="checkout-gform-section">
    <div class="checkout-gform__inner">
      
      <!-- Top Title Header -->
      <div class="checkout-gform__header">
        <h2 class="checkout-gform__title">
          <span class="checkout-gform__title-line1">{{ t.transaction.title1 }}</span>
          <span class="checkout-gform__title-line2">{{ t.transaction.title2 }}</span>
        </h2>
        <p class="checkout-gform__desc">
          {{ t.transaction.desc }}
        </p>
      </div>

      <!-- Content columns -->
      <div class="checkout-gform__grid">
        
        <!-- LEFT COLUMN: Form Cards -->
        <div class="checkout-gform__form-column">
          <!-- Card: Data Pemesan -->
          <div class="gcard" id="card-data-pemesan">
            <div class="gcard__header" @click="toggleSection('pemesan')">
              <h3 class="gcard__title">{{ t.transaction.ordererTitle }}</h3>
              <span class="gcard__toggle-arrow" :class="{ 'gcard__toggle-arrow--closed': !sectionsOpen.pemesan }">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
              </span>
            </div>

            <Transition name="expand">
              <div v-show="sectionsOpen.pemesan" class="gcard__body">
                <!-- NAMA LENGKAP -->
                <div class="form-item">
                  <label for="orderer-fullname" class="form-item__label">{{ t.transaction.fullName }}</label>
                  <input
                    type="text"
                    id="orderer-fullname"
                    v-model="form.name"
                    :placeholder="t.transaction.fullNamePlaceholder"
                    class="form-item__input"
                    :class="{ 'form-item__input--error': errors.name && formTouched.name }"
                    @blur="formTouched.name = true"
                    required
                  />
                  <span v-if="errors.name && formTouched.name" class="form-error-msg">
                    {{ errors.name }}
                  </span>
                </div>

                <!-- EMAIL -->
                <div class="form-item">
                  <label for="orderer-email" class="form-item__label">{{ t.transaction.email }}</label>
                  <input
                    type="email"
                    id="orderer-email"
                    v-model="form.email"
                    :placeholder="t.transaction.emailPlaceholder"
                    class="form-item__input"
                    :class="{ 'form-item__input--error': errors.email && formTouched.email }"
                    @blur="formTouched.email = true"
                    @input="formTouched.email = true"
                    required
                  />
                  <span v-if="errors.email && formTouched.email" class="form-error-msg">
                    {{ errors.email }}
                  </span>
                </div>

                <!-- NO TELEPON -->
                <div class="form-item">
                  <label for="orderer-phone" class="form-item__label">{{ t.transaction.phone }}</label>
                  <div class="phone-input-group" :class="{ 'phone-input-group--error': errors.phone && formTouched.phone }">
                    <div class="phone-prefix" @click="togglePhoneDropdown">
                      <span>+62</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                    <input
                      type="tel"
                      id="orderer-phone"
                      v-model="form.phone"
                      :placeholder="t.transaction.phonePlaceholder"
                      class="phone-field"
                      @blur="formTouched.phone = true"
                      @input="formTouched.phone = true"
                      required
                    />
                  </div>
                  <span v-if="errors.phone && formTouched.phone" class="form-error-msg">
                    {{ errors.phone }}
                  </span>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Card: Detail Pembayaran -->
          <div class="gcard" id="card-payment-details">
            <div class="gcard__header" @click="toggleSection('payment')">
              <h3 class="gcard__title">{{ t.transaction.paymentDetails }}</h3>
              <span class="gcard__toggle-arrow" :class="{ 'gcard__toggle-arrow--closed': !sectionsOpen.payment }">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
              </span>
            </div>

            <Transition name="expand">
              <div v-show="sectionsOpen.payment" class="gcard__body">
                <!-- Tabs Selector -->
                <div class="payment-tabs">
                  <button
                    type="button"
                    class="payment-tab-btn"
                    :class="{ 'payment-tab-btn--active': paymentMethod === 'va' }"
                    @click="paymentMethod = 'va'"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    <span>{{ t.transaction.vaLabel }}</span>
                  </button>
                  <button
                    type="button"
                    class="payment-tab-btn"
                    :class="{ 'payment-tab-btn--active': paymentMethod === 'qris' }"
                    @click="paymentMethod = 'qris'"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>
                    <span>{{ t.transaction.qrisLabel }}</span>
                  </button>
                </div>

                <!-- Tabs Content -->
                <div class="payment-tab-content">
                  <!-- VA Options -->
                  <div v-if="paymentMethod === 'va'" class="payment-method-panel">
                    <label class="form-item__label">{{ t.transaction.selectBank }}</label>
                    <div class="payment-accordion-group">
                      <!-- BCA Accordion Item -->
                      <div class="p-accordion-item" :class="{ 'p-accordion-item--active': selectedBank === 'bca' }">
                        <div class="p-accordion-header" @click="selectedBank = 'bca'">
                          <div class="p-accordion-header__logo-wrap">
                            <span class="bank-logo-text bank-logo-text--bca">BCA</span>
                          </div>
                          <span class="p-accordion-header__title">{{ t.transaction.bcaVa }}</span>
                          <span class="p-accordion-header__arrow">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                          </span>
                        </div>
                        <Transition name="expand">
                          <div v-show="selectedBank === 'bca'" class="p-accordion-body">
                            <div class="p-accordion-body__content">
                              <div class="va-display-box">
                                <div class="va-display-box__info">
                                  <span class="va-display-box__label">BCA Virtual Account</span>
                                  <span class="va-display-box__number">80012{{ form.phone ? form.phone : 'XXXXXXXXXX' }}</span>
                                </div>
                                <button type="button" class="va-copy-btn" @click.stop="copyText('80012' + (form.phone ? form.phone : 'XXXXXXXXXX'))">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                  <span>{{ currentLang === 'id' ? 'Salin' : 'Copy' }}</span>
                                </button>
                              </div>
                              <ol class="payment-steps-list">
                                <li v-for="(step, idx) in t.transaction.bcaSteps" :key="idx">{{ step }}</li>
                              </ol>
                            </div>
                          </div>
                        </Transition>
                      </div>

                      <!-- Mandiri Accordion Item -->
                      <div class="p-accordion-item" :class="{ 'p-accordion-item--active': selectedBank === 'mandiri' }">
                        <div class="p-accordion-header" @click="selectedBank = 'mandiri'">
                          <div class="p-accordion-header__logo-wrap">
                            <span class="bank-logo-text bank-logo-text--mandiri">Mandiri</span>
                          </div>
                          <span class="p-accordion-header__title">{{ t.transaction.mandiriVa }}</span>
                          <span class="p-accordion-header__arrow">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                          </span>
                        </div>
                        <Transition name="expand">
                          <div v-show="selectedBank === 'mandiri'" class="p-accordion-body">
                            <div class="p-accordion-body__content">
                              <div class="va-display-box">
                                <div class="va-display-box__info">
                                  <span class="va-display-box__label">Mandiri Virtual Account</span>
                                  <span class="va-display-box__number">80012{{ form.phone ? form.phone : 'XXXXXXXXXX' }}</span>
                                </div>
                                <button type="button" class="va-copy-btn" @click.stop="copyText('80012' + (form.phone ? form.phone : 'XXXXXXXXXX'))">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                  <span>{{ currentLang === 'id' ? 'Salin' : 'Copy' }}</span>
                                </button>
                              </div>
                              <ol class="payment-steps-list">
                                <li v-for="(step, idx) in t.transaction.mandiriSteps" :key="idx">{{ step }}</li>
                              </ol>
                            </div>
                          </div>
                        </Transition>
                      </div>

                      <!-- BNI Accordion Item -->
                      <div class="p-accordion-item" :class="{ 'p-accordion-item--active': selectedBank === 'bni' }">
                        <div class="p-accordion-header" @click="selectedBank = 'bni'">
                          <div class="p-accordion-header__logo-wrap">
                            <span class="bank-logo-text bank-logo-text--bni">BNI</span>
                          </div>
                          <span class="p-accordion-header__title">{{ t.transaction.bniVa }}</span>
                          <span class="p-accordion-header__arrow">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                          </span>
                        </div>
                        <Transition name="expand">
                          <div v-show="selectedBank === 'bni'" class="p-accordion-body">
                            <div class="p-accordion-body__content">
                              <div class="va-display-box">
                                <div class="va-display-box__info">
                                  <span class="va-display-box__label">BNI Virtual Account</span>
                                  <span class="va-display-box__number">80012{{ form.phone ? form.phone : 'XXXXXXXXXX' }}</span>
                                </div>
                                <button type="button" class="va-copy-btn" @click.stop="copyText('80012' + (form.phone ? form.phone : 'XXXXXXXXXX'))">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                  <span>{{ currentLang === 'id' ? 'Salin' : 'Copy' }}</span>
                                </button>
                              </div>
                              <ol class="payment-steps-list">
                                <li v-for="(step, idx) in t.transaction.bniSteps" :key="idx">{{ step }}</li>
                              </ol>
                            </div>
                          </div>
                        </Transition>
                      </div>
                    </div>
                  </div>

                  <!-- QRIS Mock -->
                  <div v-else-if="paymentMethod === 'qris'" class="payment-method-panel payment-method-panel--center">
                    <div class="qris-mock-container">
                      <div class="qris-header-logo">
                        <span class="qris-brand-text">QRIS</span>
                        <span class="qris-brand-sub">GPN / LINK</span>
                      </div>
                      
                      <svg class="qris-qrcode-svg" viewBox="0 0 100 100" width="130" height="130">
                        <rect width="100" height="100" fill="#ffffff" rx="4" />
                        <!-- QR corners -->
                        <rect x="8" y="8" width="20" height="20" fill="#000000" />
                        <rect x="11" y="11" width="14" height="14" fill="#ffffff" />
                        <rect x="14" y="14" width="8" height="8" fill="#000000" />

                        <rect x="72" y="8" width="20" height="20" fill="#000000" />
                        <rect x="75" y="11" width="14" height="14" fill="#ffffff" />
                        <rect x="78" y="14" width="8" height="8" fill="#000000" />

                        <rect x="8" y="72" width="20" height="20" fill="#000000" />
                        <rect x="11" y="75" width="14" height="14" fill="#ffffff" />
                        <rect x="14" y="78" width="8" height="8" fill="#000000" />

                        <rect x="42" y="42" width="16" height="16" fill="#c8f400" rx="1.5" />
                        <circle cx="50" cy="50" r="3.5" fill="#000000" />

                        <!-- Dots pattern -->
                        <rect x="34" y="10" width="4" height="8" fill="#000000" />
                        <rect x="48" y="8" width="8" height="4" fill="#000000" />
                        <rect x="60" y="16" width="4" height="10" fill="#000000" />
                        <rect x="10" y="34" width="8" height="4" fill="#000000" />
                        <rect x="8" y="44" width="4" height="12" fill="#000000" />
                        <rect x="24" y="52" width="12" height="4" fill="#000000" />
                        <rect x="36" y="32" width="4" height="4" fill="#000000" />
                        <rect x="64" y="34" width="8" height="8" fill="#000000" />
                        <rect x="80" y="34" width="10" height="4" fill="#000000" />
                        <rect x="88" y="44" width="4" height="12" fill="#000000" />
                        <rect x="76" y="52" width="4" height="16" fill="#000000" />
                        <rect x="36" y="64" width="8" height="4" fill="#000000" />
                        <rect x="48" y="76" width="16" height="4" fill="#000000" />
                        <rect x="68" y="76" width="4" height="16" fill="#000000" />
                        <rect x="36" y="84" width="20" height="4" fill="#000000" />
                        <rect x="80" y="80" width="10" height="10" fill="#000000" />
                        
                        <rect x="27" y="27" width="2" height="2" fill="#000000" />
                        <rect x="71" y="27" width="2" height="2" fill="#000000" />
                        <rect x="27" y="71" width="2" height="2" fill="#000000" />
                      </svg>

                      <p class="qris-merchant-title">MUSCLE LAB GYM</p>
                      <p class="qris-merchant-id">NMID: ID1020304050607</p>
                    </div>
                    <p class="payment-instruction-text payment-instruction-text--center">
                      {{ t.transaction.qrisInstruction }}
                    </p>
                  </div>

                  </div>

                <!-- FINEPRINT -->
                <p class="payment-card__fineprint">
                  {{ t.transaction.finePrint }}
                </p>
              </div>
            </Transition>
          </div>
        </div>

        <!-- RIGHT COLUMN: Side Cards -->
        <div class="checkout-gform__sidebar-column">
          
          <!-- Card 1: Selected Item Header -->
          <div class="mini-item-card">
            <div class="mini-item-card__avatar">
              <!-- Inline gym graphic -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2">
                <path d="M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
            </div>
            <div class="mini-item-card__details">
              <h4 class="mini-item-card__title">{{ currentTierData.name }} {{ t.nav.membership }}</h4>
              <p class="mini-item-card__subtitle">{{ t.transaction.accessStartsToday }}</p>
            </div>
          </div>

          <!-- Card 2: Voucher -->
          <div class="gcard gcard--sidebar" id="card-voucher">
            <div class="gcard__header" @click="toggleSection('voucher')">
              <h3 class="gcard__title">{{ t.transaction.voucherTitle }}</h3>
              <span class="gcard__toggle-arrow" :class="{ 'gcard__toggle-arrow--closed': !sectionsOpen.voucher }">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
              </span>
            </div>

            <Transition name="expand">
              <div v-show="sectionsOpen.voucher" class="gcard__body">
                <div class="voucher-input-row">
                  <input
                    type="text"
                    v-model="voucherCode"
                    :placeholder="t.transaction.voucherPlaceholder"
                    class="voucher-input"
                  />
                  <button
                    type="button"
                    class="voucher-submit-btn"
                    :disabled="!voucherCode"
                    @click="applyVoucher"
                  >
                    {{ t.transaction.submitBtn }}
                  </button>
                </div>
                <button type="button" class="add-voucher-btn">
                  {{ t.transaction.addVoucher }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Card 3: Ringkasan Pesanan -->
          <div class="gcard gcard--sidebar" id="card-ringkasan">
            <div class="gcard__header" @click="toggleSection('ringkasan')">
              <h3 class="gcard__title">{{ t.transaction.summaryTitle }}</h3>
              <span class="gcard__toggle-arrow" :class="{ 'gcard__toggle-arrow--closed': !sectionsOpen.ringkasan }">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
              </span>
            </div>

            <Transition name="expand">
              <div v-show="sectionsOpen.ringkasan" class="gcard__body">
                
                <!-- Ticket details block -->
                <div class="summary-details">
                  <div class="details-item">
                    <span class="details-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </span>
                    <div class="details-text">
                      <h5 class="details-text__title">{{ currentTierData.name }} {{ t.transaction.itemLabel }}</h5>
                      <p class="details-text__sub">1 {{ t.transaction.ticketLabel }} x {{ t.membership.currency }} {{ currentTierData.price }}</p>
                    </div>
                  </div>

                  <!-- Details labels list -->
                  <div class="details-list">
                    <div class="details-row">
                      <span class="row-label">{{ t.transaction.buyerLabel }}</span>
                      <span class="row-value">{{ form.name ? form.name : t.transaction.buyerPlaceholder }}</span>
                    </div>
                  </div>
                </div>

                <div class="summary-divider"></div>

                <!-- Price breakdown calculations -->
                <div class="summary-breakdown">
                  <div class="breakdown-item">
                    <span>Jumlah (1 {{ t.transaction.ticketLabel }})</span>
                    <span>{{ t.membership.currency }} {{ currentTierData.price }}</span>
                  </div>
                  <div class="breakdown-item">
                    <span>{{ t.transaction.subtotal }}</span>
                    <span>{{ t.membership.currency }} {{ currentTierData.price }}</span>
                  </div>
                  <div class="breakdown-item">
                    <span>{{ t.transaction.adminFee }}</span>
                    <span>{{ t.membership.currency }} {{ adminFeeFormatted }}</span>
                  </div>
                </div>

                <div class="summary-divider"></div>

                <!-- Final Payment row inside the summary card -->
                <div class="payment-row">
                  <span class="payment-label">{{ t.transaction.totalPayment }}</span>
                  <span class="payment-value">{{ t.membership.currency }} {{ totalPaymentFormatted }}</span>
                </div>

              </div>
            </Transition>
          </div>

        </div>

      </div>
    </div>

    <!-- SUCCESS PAY MODAL OVERLAY -->
    <Transition name="success-modal">
      <div class="success-overlay" v-if="showSuccess">
        <div class="success-card">
          <!-- Animated Check -->
          <div class="success-icon-wrap">
            <svg class="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle class="success-checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
              <path class="success-checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>

          <h3 class="success-title">{{ t.transaction.successTitle }}</h3>
          <p class="success-desc">
            {{ t.transaction.successDesc }}
          </p>
          <p class="success-details">
            {{ t.transaction.successDetails }}
          </p>

          <div class="success-info-box">
            <span class="info-lbl">{{ t.transaction.buyerLabel }}</span>
            <span class="info-val">{{ form.name }}</span>
            
            <span class="info-lbl">{{ t.transaction.membershipLabel }}</span>
            <span class="info-val text-lime">{{ currentTierData.name }}</span>

            <span class="info-lbl">{{ t.transaction.paymentDetails }}</span>
            <span class="info-val">{{ paymentMethodName }}</span>
            
            <span class="info-lbl">{{ t.transaction.totalPaidLabel }}</span>
            <span class="info-val">{{ t.membership.currency }} {{ totalPaymentFormatted }}</span>
          </div>

          <div class="success-footer">
            <p class="countdown-txt">{{ t.transaction.redirectText.replace('{seconds}', countdown) }}</p>
            <button @click="closeAndGoHome" class="success-home-btn" id="btn-success-gform-home">
              {{ t.transaction.backHomeBtn }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- FIXED BOTTOM BAR: TIMER & PAY NOW BUTTON -->
    <div class="checkout-bottom-bar">
      <div class="checkout-bottom-bar__inner">
        <!-- Left Column: Countdown Timer -->
        <div class="checkout-countdown">
          <span class="checkout-countdown__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-lime)" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </span>
          <div class="checkout-countdown__info">
            <span class="checkout-countdown__label">{{ t.transaction.timerLabel }}</span>
            <span class="checkout-countdown__value" :class="{ 'checkout-countdown__value--alert': timeLeft < 60 }">
              {{ formattedTimeLeft }}
            </span>
          </div>
        </div>

        <!-- Right Column: Pay Button -->
        <div class="checkout-bottom-bar__actions">
          <button
            type="button"
            class="pay-now-btn pay-now-btn--bottom"
            :disabled="!isFormValid || isSubmitting"
            @click="submitPurchase"
            id="btn-bayar-sekarang"
          >
            <span v-if="!isSubmitting">{{ t.transaction.payNowBtn }}</span>
            <span v-else class="pay-loader"></span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useNavigation } from '../composables/useNavigation'

const { t, currentLang } = useLanguage()
const { selectedTier, navigateTo } = useNavigation()

const sectionsOpen = reactive({
  pemesan: true,
  payment: true,
  voucher: true,
  ringkasan: true
})

const form = reactive({
  name: '',
  email: '',
  phone: ''
})

const formTouched = reactive({
  name: false,
  email: false,
  phone: false
})

const paymentMethod = ref('va') // 'va', 'qris'
const selectedBank = ref('bca') // 'bca', 'mandiri', 'bni'

const voucherCode = ref('')
const isSubmitting = ref(false)
const showSuccess = ref(false)
const countdown = ref(4)
let timer = null

// 15 Minutes Countdown Timer Logic
const timeLeft = ref(900) // 15 minutes in seconds
let timeLeftTimer = null

const formattedTimeLeft = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

// Error validations computed property
const errors = computed(() => {
  const errs = {
    name: '',
    email: '',
    phone: ''
  }

  // Name Validation
  const trimmedName = form.name.trim()
  if (formTouched.name) {
    if (trimmedName === '') {
      errs.name = currentLang.value === 'id' ? 'Nama lengkap tidak boleh kosong' : 'Full name is required'
    } else if (trimmedName.length < 3) {
      errs.name = currentLang.value === 'id' ? 'Nama lengkap minimal 3 karakter' : 'Full name must be at least 3 characters'
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      errs.name = currentLang.value === 'id' ? 'Nama lengkap hanya boleh berisi huruf' : 'Full name can only contain letters'
    }
  }

  // Email Validation
  const trimmedEmail = form.email.trim()
  if (formTouched.email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (trimmedEmail === '') {
      errs.email = currentLang.value === 'id' ? 'Email tidak boleh kosong' : 'Email is required'
    } else if (!emailRegex.test(trimmedEmail)) {
      errs.email = currentLang.value === 'id' ? 'Format email tidak valid (Contoh: nama@domain.com)' : 'Invalid email format (Example: name@domain.com)'
    }
  }

  // Phone Validation
  const trimmedPhone = form.phone.trim()
  if (formTouched.phone) {
    if (trimmedPhone === '') {
      errs.phone = currentLang.value === 'id' ? 'No telepon tidak boleh kosong' : 'Phone number is required'
    } else if (trimmedPhone.startsWith('0')) {
      errs.phone = t.value.transaction.phoneZeroWarning
    } else if (!/^\d+$/.test(trimmedPhone)) {
      errs.phone = currentLang.value === 'id' ? 'No telepon hanya boleh berisi angka' : 'Phone number can only contain numbers'
    } else if (trimmedPhone.length < 8 || trimmedPhone.length > 13) {
      errs.phone = currentLang.value === 'id' ? 'No telepon harus terdiri dari 8-13 angka' : 'Phone number must be between 8-13 digits'
    }
  }

  return errs
})

// Check if form is properly filled before enabling the BAYAR button
const isFormValid = computed(() => {
  // Check empty
  const baseNotEmpty = form.name.trim() !== '' &&
                       form.email.trim() !== '' &&
                       form.phone.trim() !== ''
  
  if (!baseNotEmpty) return false

  // Regex rules
  const nameRegex = /^[a-zA-Z\s]+$/
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  const phoneRegex = /^\d+$/
  
  const nameValid = form.name.trim().length >= 3 && nameRegex.test(form.name.trim())
  const emailValid = emailRegex.test(form.email.trim())
  const phoneValid = !form.phone.trim().startsWith('0') && phoneRegex.test(form.phone.trim()) && form.phone.trim().length >= 8 && form.phone.trim().length <= 13

  return nameValid && emailValid && phoneValid
})

// Displayed payment method name in success popup
const paymentMethodName = computed(() => {
  if (paymentMethod.value === 'va') {
    const bankName = selectedBank.value === 'bca' ? t.value.transaction.bcaVa : selectedBank.value === 'mandiri' ? t.value.transaction.mandiriVa : t.value.transaction.bniVa
    return bankName
  } else if (paymentMethod.value === 'qris') {
    return t.value.transaction.qrisLabel
  }
  return ''
})

// Retrieve features dynamically based on tier selection
const currentTierData = computed(() => {
  const tierKey = selectedTier.value // 'starter', 'active', 'pro'
  return t.value.membership.tiers[tierKey] || t.value.membership.tiers.active
})

// Set admin fee to constant value (Rp 8.000)
const adminFeeFormatted = computed(() => {
  return '8.000'
})

// Calculate total payment
const totalPaymentFormatted = computed(() => {
  const priceStr = currentTierData.value.price.replace(/\./g, '').replace(/,/g, '') // Strips decimals/periods
  const basePrice = parseInt(priceStr, 10) || 0
  const adminFeeVal = 8000
  const totalVal = basePrice + adminFeeVal
  
  // Return formatted price back in Indonesian locale dot-format
  return totalVal.toLocaleString('id-ID')
})

function toggleSection(key) {
  sectionsOpen[key] = !sectionsOpen[key]
}

function togglePhoneDropdown() {
  // Static code selector dropdown, can be expanded if needed
}

function applyVoucher() {
  // Mock voucher code apply action
  alert('Voucher Code applied: ' + voucherCode.value)
}

function copyText(val) {
  navigator.clipboard.writeText(val).then(() => {
    alert(currentLang.value === 'id' ? 'Nomor Virtual Account disalin ke clipboard!' : 'Virtual Account number copied to clipboard!')
  }).catch(err => {
    console.error('Could not copy text: ', err)
  })
}

function submitPurchase() {
  isSubmitting.value = true
  
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
  if (timeLeftTimer) clearInterval(timeLeftTimer)
  showSuccess.value = false
  navigateTo('landing')
}

onMounted(() => {
  timeLeftTimer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      closeAndGoHome()
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (timeLeftTimer) clearInterval(timeLeftTimer)
})
</script>

<style scoped>
/* =========================================================
   GOOGLE FORM STYLED TRANSACTION PAGE
   ========================================================= */
.checkout-gform {
  padding: clamp(90px, 11vw, 130px) 0 calc(var(--section-pad) + 90px);
  background-color: var(--color-black);
  position: relative;
  min-height: 100dvh;
}

.checkout-gform__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 48px);
}

/* Header */
.checkout-gform__header {
  max-width: 800px;
  margin-bottom: clamp(32px, 5vw, 48px);
}

.checkout-gform__title {
  display: flex;
  flex-direction: column;
  line-height: 0.95;
  margin-bottom: 16px;
}

.checkout-gform__title-line1,
.checkout-gform__title-line2 {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5.5vw, 4.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.checkout-gform__title-line1 {
  color: var(--color-white);
}

.checkout-gform__title-line2 {
  color: var(--color-lime);
  text-shadow: 0 0 60px rgba(200, 244, 0, 0.15);
}

.checkout-gform__desc {
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--color-gray-400);
  line-height: 1.6;
  max-width: 500px;
}

/* 2-Column Grid Layout */
.checkout-gform__grid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 24px;
  align-items: start;
}

/* Left Form Columns */
.checkout-gform__form-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Right Sidebar Columns */
.checkout-gform__sidebar-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 90px;
}

/* =========================================================
   GCARD (Google Form-Style Cards)
   ========================================================= */
.gcard {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.3s;
}

.gcard:hover {
  border-color: rgba(255, 255, 255, 0.08);
}

.gcard__header {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.01);
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  user-select: none;
}

.gcard__title {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-white);
}

.gcard__toggle-arrow {
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  transition: transform 0.3s var(--ease);
}

.gcard__toggle-arrow--closed {
  transform: rotate(180deg);
}

.gcard__body {
  padding: 24px;
}

/* Form Item Styles */
.form-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-item__label {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--color-gray-400);
  text-transform: uppercase;
}

.form-item__input {
  background: #050505;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px 18px;
  color: var(--color-white);
  font-size: 0.88rem;
  outline: none;
  font-family: var(--font-body);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.form-item__input:focus {
  border-color: rgba(200, 244, 0, 0.35);
  box-shadow: 0 0 12px rgba(200, 244, 0, 0.06);
}

.form-item__input::placeholder {
  color: var(--color-gray-600);
}

/* Phone Number Field with country prefix selector */
.phone-input-group {
  display: flex;
  background: #050505;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.phone-input-group:focus-within {
  border-color: rgba(200, 244, 0, 0.35);
  box-shadow: 0 0 12px rgba(200, 244, 0, 0.06);
}

.phone-prefix {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 18px;
  background: rgba(255, 255, 255, 0.02);
  border-right: 1px solid var(--color-border);
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-white);
  user-select: none;
}

.phone-prefix svg {
  color: var(--color-gray-600);
}

.phone-field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 14px 18px;
  color: var(--color-white);
  font-size: 0.88rem;
  font-family: var(--font-body);
}

.phone-field::placeholder {
  color: var(--color-gray-600);
}

/* =========================================================
   SIDEBAR COMPONENT ELEMENTS
   ========================================================= */

/* Mini Item Header Card */
.mini-item-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.mini-item-card__avatar {
  background: rgba(200, 244, 0, 0.05);
  border: 1px solid rgba(200, 244, 0, 0.1);
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mini-item-card__details {
  display: flex;
  flex-direction: column;
}

.mini-item-card__title {
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-white);
  text-transform: capitalize;
}

.mini-item-card__subtitle {
  font-size: 0.72rem;
  color: var(--color-gray-600);
}

/* Voucher Card Body */
.voucher-input-row {
  display: flex;
  gap: 10px;
}

.voucher-input {
  flex: 1;
  background: #050505;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px 14px;
  color: var(--color-white);
  font-size: 0.78rem;
  font-family: var(--font-body);
  outline: none;
}

.voucher-input:focus {
  border-color: rgba(200, 244, 0, 0.25);
}

.voucher-input::placeholder {
  color: var(--color-gray-600);
}

.voucher-submit-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-gray-400);
  border-radius: 8px;
  padding: 0 16px;
  font-size: 0.78rem;
  font-weight: 700;
  transition: all 0.2s;
}

.voucher-submit-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
}

.voucher-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-voucher-btn {
  width: 100%;
  margin-top: 14px;
  background: transparent;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  color: var(--color-gray-400);
  padding: 10px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  transition: border-color 0.2s, color 0.2s;
}

.add-voucher-btn:hover {
  border-color: var(--color-lime);
  color: var(--color-lime);
}

/* Ringkasan Card Body */
.summary-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.details-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.details-icon {
  color: var(--color-gray-400);
  display: flex;
  align-items: center;
  padding-top: 2px;
}

.details-text__title {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 2px;
}

.details-text__sub {
  font-size: 0.72rem;
  color: var(--color-gray-600);
}

.details-list {
  background: rgba(255, 255, 255, 0.01);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.details-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
}

.summary-divider {
  height: 1px;
  background: var(--color-border);
  margin: 18px 0;
}

.summary-breakdown {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.8rem;
  color: var(--color-gray-400);
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
}

/* Payment Row (Final Total) */
.payment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.payment-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-white);
}

.payment-value {
  font-family: var(--font-body);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-lime);
}

/* Pay Now CTA button */
.pay-now-btn {
  width: 100%;
  background: var(--color-lime);
  color: var(--color-black);
  padding: 16px;
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
}

.pay-now-btn:hover:not(:disabled) {
  background: #d4ff00;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(200, 244, 0, 0.25);
}

.pay-now-btn:active:not(:disabled) {
  transform: translateY(0);
}

.pay-now-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.pay-loader {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-black);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

/* =========================================================
   SUCCESS POPUP MODAL
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
  border: 1px solid rgba(200, 244, 0, 0.25);
  border-radius: 28px;
  padding: clamp(32px, 5vw, 48px);
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), 0 0 80px rgba(200, 244, 0, 0.08);
}

.success-icon-wrap {
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

.success-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--color-white);
  margin-bottom: 14px;
}

.success-desc {
  font-size: 0.92rem;
  color: var(--color-gray-100);
  line-height: 1.6;
  margin-bottom: 8px;
}

.success-details {
  font-size: 0.78rem;
  color: var(--color-gray-600);
  line-height: 1.6;
  margin-bottom: 30px;
}

.success-info-box {
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

.info-lbl {
  font-weight: 700;
  color: var(--color-gray-600);
  text-transform: uppercase;
}

.info-val {
  font-weight: 900;
  color: var(--color-white);
  text-align: right;
}

.success-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.countdown-txt {
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

/* =========================================================
   ACCORDION EXPAND TRANSITIONS
   ========================================================= */
.expand-enter-active,
.expand-leave-active {
  transition: grid-template-rows 0.3s ease, opacity 0.3s ease;
  display: grid;
  grid-template-rows: 1fr;
}

.expand-enter-from,
.expand-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}

/* =========================================================
   RESPONSIVE DESIGN (DESKTOP / MOBILE / TABLET)
   ========================================================= */
@media (max-width: 991px) {
  .checkout-gform__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .checkout-gform__sidebar-column {
    position: static;
  }
}

@media (max-width: 640px) {
  .voucher-input-row {
    flex-direction: column;
  }
  .voucher-submit-btn {
    padding: 12px;
  }
  .phone-input-group {
    flex-direction: column;
  }
  .phone-prefix {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding: 12px 18px;
    justify-content: space-between;
  }
}

/* =========================================================
   ADDITIONAL PAYMENT DETAILS FORM STYLES
   ========================================================= */
.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.col-6 {
  flex: 1;
}

.input-with-icon {
  position: relative;
  display: flex;
  width: 100%;
}

.form-item__input--icon {
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

/* Checkbox */
.form-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  margin: 28px 0 24px;
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

.payment-card__fineprint {
  font-size: 0.72rem;
  color: var(--color-gray-600);
  line-height: 1.6;
  text-align: center;
  margin-top: 18px;
}

/* =========================================================
   DYNAMIC PAYMENT STYLES
   ========================================================= */
.payment-tabs {
  display: flex;
  background: #050505;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
  gap: 4px;
}

.payment-tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--color-gray-400);
  padding: 10px 14px;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s var(--ease);
}

.payment-tab-btn:hover {
  color: var(--color-white);
  background: rgba(255, 255, 255, 0.02);
}

.payment-tab-btn--active {
  background: rgba(200, 244, 0, 0.08);
  border-color: rgba(200, 244, 0, 0.2);
  color: var(--color-lime);
}

.payment-tab-btn--active:hover {
  color: var(--color-lime);
  background: rgba(200, 244, 0, 0.08);
}

.payment-tab-content {
  min-height: 180px;
}

.payment-method-panel {
  display: flex;
  flex-direction: column;
}

.payment-method-panel--center {
  align-items: center;
}

.payment-options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.payment-option-card {
  background: #050505;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
  transition: border-color 0.25s var(--ease), background-color 0.25s var(--ease), transform 0.2s var(--ease);
  user-select: none;
}

.payment-option-card:hover {
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.payment-option-card--active {
  border-color: var(--color-lime);
  background: rgba(200, 244, 0, 0.02);
}

.payment-option-card__logo-wrap {
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 6px;
  padding: 4px;
}

.bank-logo-text {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 0.95rem;
  letter-spacing: -0.01em;
}

.bank-logo-text--bca {
  color: #0056a3;
  font-style: italic;
}

.bank-logo-text--mandiri {
  color: #ff9900;
}

.bank-logo-text--bni {
  color: #008080;
}

.bank-logo-text--dana {
  color: #108ee9;
}

.bank-logo-text--gopay {
  color: #00aeb7;
}

.bank-logo-text--ovo {
  color: #4c2a86;
}

.payment-option-card__name {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-gray-600);
  transition: color 0.25s;
  text-align: center;
}

.payment-option-card--active .payment-option-card__name {
  color: var(--color-white);
}

.payment-option-card__check {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--color-lime);
  color: var(--color-black);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.2s var(--ease);
}

.payment-option-card__check--visible {
  opacity: 1;
  transform: scale(1);
}

.payment-instruction-text {
  font-size: 0.76rem;
  color: var(--color-gray-400);
  line-height: 1.6;
  margin-top: 18px;
}

.payment-instruction-text--center {
  text-align: center;
}

/* QRIS Mock Layout */
.qris-mock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding: 16px;
  border-radius: 16px;
  width: 170px;
  margin: 10px auto 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.qris-header-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

.qris-brand-text {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.15rem;
  color: #0f2c59;
  letter-spacing: -0.02em;
  line-height: 1;
}

.qris-brand-sub {
  font-size: 0.5rem;
  font-weight: 800;
  color: #ff0000;
  letter-spacing: 0.08em;
}

.qris-qrcode-svg {
  background: #ffffff;
}

.qris-merchant-title {
  color: #000000;
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 800;
  margin: 8px 0 2px;
  text-align: center;
}

.qris-merchant-id {
  color: #666666;
  font-size: 0.5rem;
  text-align: center;
}

/* =========================================================
   RESPONSIVE OVERRIDES
   ========================================================= */
@media (max-width: 640px) {
  .payment-tabs {
    flex-direction: column;
    background: transparent;
    border: none;
    padding: 0;
    gap: 8px;
  }

  .payment-tab-btn {
    border: 1px solid var(--color-border);
  }

  .payment-options-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .payment-option-card {
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px 16px;
    gap: 16px;
  }

  .payment-option-card__logo-wrap {
    width: 64px;
    height: 30px;
    flex-shrink: 0;
  }

  .payment-option-card__name {
    text-align: left;
    font-size: 0.75rem;
  }
}

/* =========================================================
   BOTTOM TIMER & ACTION BAR
   ========================================================= */
.checkout-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(5, 5, 5, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--color-border);
  padding: 18px 0;
  z-index: 1000;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);
}

.checkout-bottom-bar__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 48px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkout-countdown {
  display: flex;
  align-items: center;
  gap: 12px;
}

.checkout-countdown__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse-icon 2s infinite;
}

@keyframes pulse-icon {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.95); }
}

.checkout-countdown__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.checkout-countdown__label {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--color-gray-500);
}

.checkout-countdown__value {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--color-lime);
  line-height: 1;
  text-shadow: 0 0 20px rgba(200, 244, 0, 0.2);
  transition: color 0.3s;
}

.checkout-countdown__value--alert {
  color: #ff3e3e;
  text-shadow: 0 0 20px rgba(255, 62, 62, 0.3);
  animation: blink-red 1s step-end infinite;
}

@keyframes blink-red {
  from, to { opacity: 1; }
  50% { opacity: 0.5; }
}

.pay-now-btn--bottom {
  width: auto;
  min-width: 180px;
  padding: 14px 32px;
  font-size: 0.88rem;
}

@media (max-width: 480px) {
  .checkout-bottom-bar {
    padding: 14px 0;
  }
  .checkout-countdown__label {
    display: none;
  }
  .checkout-countdown__value {
    font-size: 1.25rem;
  }
  .pay-now-btn--bottom {
    min-width: 130px;
    padding: 12px 20px;
    font-size: 0.8rem;
  }
}

/* =========================================================
   VALIDATION WARNING NOTIFICATIONS
   ========================================================= */
.form-item__input--error {
  border-color: rgba(255, 62, 62, 0.4) !important;
  background: rgba(255, 62, 62, 0.01) !important;
}

.form-item__input--error:focus {
  border-color: #ff3e3e !important;
  box-shadow: 0 0 12px rgba(255, 62, 62, 0.15) !important;
}

.phone-input-group--error {
  border-color: rgba(255, 62, 62, 0.4) !important;
  background: rgba(255, 62, 62, 0.01) !important;
}

.phone-input-group--error:focus-within {
  border-color: #ff3e3e !important;
  box-shadow: 0 0 12px rgba(255, 62, 62, 0.15) !important;
}

.form-error-msg {
  font-size: 0.72rem;
  color: #ff4d4d;
  display: block;
  margin-top: 6px;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.4;
  animation: slide-error 0.25s var(--ease) forwards;
  transform-origin: top;
}

@keyframes slide-error {
  from {
    opacity: 0;
    transform: translateY(-4px) scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

/* =========================================================
   PREMIUM PAYMENT ACCORDION SYSTEM
   ========================================================= */
.payment-accordion-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
}

.p-accordion-item {
  background: #050505;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
}

.p-accordion-item--active {
  border-color: var(--color-lime);
  box-shadow: 0 0 16px rgba(200, 244, 0, 0.03);
}

.p-accordion-header {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  user-select: none;
  background: rgba(255, 255, 255, 0.01);
  transition: background-color 0.25s var(--ease);
}

.p-accordion-header:hover {
  background: rgba(255, 255, 255, 0.03);
}

.p-accordion-item--active .p-accordion-header {
  background: rgba(200, 244, 0, 0.02);
}

.p-accordion-header__logo-wrap {
  width: 72px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 4px;
  flex-shrink: 0;
}

.p-accordion-header__title {
  flex: 1;
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-white);
  text-align: left;
}

.p-accordion-header__arrow {
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  transition: transform 0.3s var(--ease), color 0.3s;
}

.p-accordion-item--active .p-accordion-header__arrow {
  transform: rotate(180deg);
  color: var(--color-lime);
}

.p-accordion-body {
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.p-accordion-body__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* Virtual Account Display Box */
.va-display-box {
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.va-display-box__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.va-display-box__label {
  font-size: 0.65rem;
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--color-gray-500);
  text-transform: uppercase;
}

.va-display-box__number {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: 0.05em;
  text-shadow: none;
}

.va-copy-btn {
  background: rgba(200, 244, 0, 0.08);
  border: 1px solid rgba(200, 244, 0, 0.2);
  color: var(--color-lime);
  border-radius: 8px;
  padding: 8px 14px;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.25s var(--ease);
}

.va-copy-btn:hover {
  background: var(--color-lime);
  color: var(--color-black);
  border-color: var(--color-lime);
  box-shadow: 0 4px 12px rgba(200, 244, 0, 0.2);
}

/* Payment Instructions Ordered List */
.payment-steps-list {
  padding-left: 18px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.payment-steps-list li {
  font-size: 0.78rem;
  color: var(--color-gray-400);
  line-height: 1.5;
  text-align: left;
}

.payment-steps-list li::marker {
  color: var(--color-lime);
  font-weight: 800;
  font-size: 0.75rem;
}
</style>
