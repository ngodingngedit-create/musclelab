<template>
  <section class="reg" id="class-registration">
    <!-- Success State -->
    <Transition name="success-fade">
      <div v-if="submitted" class="reg__success">
        <div class="reg__success-inner">
          <div class="reg__success-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 class="reg__success-title">{{ tr.successTitle }}</h2>
          <p class="reg__success-desc">{{ tr.successDesc }}</p>
          <div class="reg__success-summary" v-if="selectedClass">
            <span class="reg__success-class">{{ selectedClass.name }}</span>
            <span class="reg__success-trainer">{{ selectedClass.trainer }}</span>
          </div>
          <div class="reg__success-actions">
            <button class="reg__success-btn reg__success-btn--lime" @click="navigateTo('classes-catalog')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              {{ tr.backBtn }}
            </button>
            <button class="reg__success-btn reg__success-btn--outline" @click="navigateTo('landing')" id="reg-success-home">
              {{ tr.backHomeBtn }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Form State -->
    <div v-if="!submitted" class="reg__page">
      <!-- Header -->
      <div class="reg__hero">
        <div class="reg__hero-bg" aria-hidden="true"></div>
        <div class="reg__hero-inner">
          <!-- <button class="reg__back-btn" id="reg-back-catalog" @click="navigateTo('classes-catalog')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            {{ tr.backBtn }}
          </button> -->

          <p class="reg__eyebrow section-label">MUSCLE LAB GYM</p>
          <h1 class="reg__title">
            {{ tr.pageTitle }}
            <span class="reg__title-lime">{{ tr.pageTitleLime }}</span>
          </h1>
          <p class="reg__desc">{{ tr.pageDesc }}</p>
        </div>
      </div>

      <!-- Form Body -->
      <div class="reg__body">
        <div class="reg__body-inner">

          <!-- Form -->
          <form class="reg__form" @submit.prevent="handleSubmit" id="reg-form" novalidate>
            <div class="checkout-gform__grid">
              
              <!-- LEFT COLUMN: Form Cards -->
              <div class="checkout-gform__form-column">
                
                <!-- Card 1: Data Pemesan & Pendaftaran -->
                <div class="gcard" id="card-data-pemesan">
                  <div class="gcard__header" @click="sectionsOpen.pemesan = !sectionsOpen.pemesan">
                    <h3 class="gcard__title">{{ t.transaction.ordererTitle }}</h3>
                    <span class="gcard__toggle-arrow" :class="{ 'gcard__toggle-arrow--closed': !sectionsOpen.pemesan }">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                    </span>
                  </div>
                  
                  <Transition name="expand">
                    <div v-show="sectionsOpen.pemesan" class="gcard__body" style="text-align: left;">
                      <!-- Full Name -->
                      <div class="form-item" :class="{ 'form-item--error': errors.fullName }">
                        <label class="form-item__label" for="reg-fullname">{{ tr.fullName }}</label>
                        <input
                          id="reg-fullname"
                          v-model="form.fullName"
                          type="text"
                          class="form-item__input"
                          :placeholder="tr.fullNamePlaceholder"
                          @blur="validateField('fullName')"
                        />
                        <span class="form-error-msg" v-if="errors.fullName">{{ errors.fullName }}</span>
                      </div>

                      <!-- Email -->
                      <div class="form-item" :class="{ 'form-item--error': errors.email }">
                        <label class="form-item__label" for="reg-email">{{ tr.email }}</label>
                        <input
                          id="reg-email"
                          v-model="form.email"
                          type="email"
                          class="form-item__input"
                          :placeholder="tr.emailPlaceholder"
                          @blur="validateField('email')"
                        />
                        <span class="form-error-msg" v-if="errors.email">{{ errors.email }}</span>
                      </div>

                      <!-- Phone -->
                      <div class="form-item" :class="{ 'form-item--error': errors.phone }">
                        <label class="form-item__label" for="reg-phone">{{ tr.phone }}</label>
                        <div class="phone-input-group" :class="{ 'phone-input-group--error': errors.phone }">
                          <div class="phone-prefix">
                            <span>+62</span>
                          </div>
                          <input
                            id="reg-phone"
                            v-model="form.phone"
                            type="tel"
                            class="phone-field"
                            :placeholder="tr.phonePlaceholder"
                            @blur="validateField('phone')"
                            inputmode="numeric"
                          />
                        </div>
                        <span class="form-error-msg" v-if="errors.phone">{{ errors.phone }}</span>
                      </div>

                      <!-- Preferred Session (dropdown) -->
                      <div class="form-item" :class="{ 'form-item--error': errors.schedule }">
                        <label class="form-item__label" for="reg-schedule">{{ tr.schedule }}</label>
                        <div class="reg__select-wrap">
                          <select
                            id="reg-schedule"
                            v-model="form.schedule"
                            class="reg__select"
                            @blur="validateField('schedule')"
                          >
                            <option value="" disabled>{{ tr.schedulePlaceholder }}</option>
                            <option v-for="opt in tr.scheduleOptions" :key="opt" :value="opt">{{ opt }}</option>
                          </select>
                          <svg class="reg__select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <span class="form-error-msg" v-if="errors.schedule">{{ errors.schedule }}</span>
                      </div>

                      <!-- Fitness Level -->
                      <div class="form-item">
                        <label class="form-item__label">{{ tr.level }}</label>
                        <div class="reg__radio-group" id="reg-level-group">
                          <label class="reg__radio-card" :class="{ 'reg__radio-card--active': form.level === 'beginner' }">
                            <input type="radio" v-model="form.level" value="beginner" id="reg-level-beginner" />
                            <span class="reg__radio-dot"></span>
                            <div class="reg__radio-info">
                              <span class="reg__radio-title">{{ tr.levelBeginner }}</span>
                              <span class="reg__radio-sub">0 – 6 {{ currentLang === 'id' ? 'bulan' : 'months' }}</span>
                            </div>
                            <span class="reg__radio-badge reg__radio-badge--green">●</span>
                          </label>
                          <label class="reg__radio-card" :class="{ 'reg__radio-card--active': form.level === 'intermediate' }">
                            <input type="radio" v-model="form.level" value="intermediate" id="reg-level-intermediate" />
                            <span class="reg__radio-dot"></span>
                            <div class="reg__radio-info">
                              <span class="reg__radio-title">{{ tr.levelIntermediate }}</span>
                              <span class="reg__radio-sub">6 – 24 {{ currentLang === 'id' ? 'bulan' : 'months' }}</span>
                            </div>
                            <span class="reg__radio-badge reg__radio-badge--orange">●</span>
                          </label>
                          <label class="reg__radio-card" :class="{ 'reg__radio-card--active': form.level === 'advanced' }">
                            <input type="radio" v-model="form.level" value="advanced" id="reg-level-advanced" />
                            <span class="reg__radio-dot"></span>
                            <div class="reg__radio-info">
                              <span class="reg__radio-title">{{ tr.levelAdvanced }}</span>
                              <span class="reg__radio-sub">2+ {{ currentLang === 'id' ? 'tahun' : 'years' }}</span>
                            </div>
                            <span class="reg__radio-badge reg__radio-badge--red">●</span>
                          </label>
                        </div>
                      </div>

                      <!-- Notes -->
                      <div class="form-item">
                        <label class="form-item__label" for="reg-notes">{{ tr.notes }}</label>
                        <textarea
                          id="reg-notes"
                          v-model="form.notes"
                          class="reg__textarea"
                          :placeholder="tr.notesPlaceholder"
                          rows="4"
                        ></textarea>
                      </div>

                      <!-- Agreement -->
                      <div class="form-item" :class="{ 'form-item--error': errors.agree }">
                        <label class="reg__checkbox-wrap" id="reg-agree-label">
                          <input type="checkbox" v-model="form.agree" id="reg-agree" @change="validateField('agree')" />
                          <span class="reg__checkbox-box">
                            <svg v-if="form.agree" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
                          </span>
                          <span class="reg__agree-text">{{ tr.agree }}</span>
                        </label>
                        <span class="form-error-msg" v-if="errors.agree">{{ errors.agree }}</span>
                      </div>

                    </div>
                  </Transition>
                </div>

                <!-- Card 2: Detail Pembayaran -->
                <div class="gcard" id="card-payment-details" style="text-align: left;">
                  <div class="gcard__header" @click="sectionsOpen.payment = !sectionsOpen.payment">
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
                          <label class="form-item__label" style="font-family: var(--font-display); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; color: #444; margin-bottom: 8px;">{{ t.transaction.selectBank }}</label>
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
                
                <!-- Card 1: Selected Class Info -->
                <div class="mini-item-card" v-if="selectedClass">
                  <div class="mini-item-card__avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="12" cy="12" r="4"/>
                    </svg>
                  </div>
                  <div class="mini-item-card__details" style="text-align: left;">
                    <h4 class="mini-item-card__title">{{ selectedClass.name }} KELAS</h4>
                    <p class="mini-item-card__subtitle">{{ currentLang === 'id' ? 'Akses kelas dimulai pada sesi pilihan' : 'Class access starts on selected session' }}</p>
                  </div>
                </div>

                <!-- Card 2: Voucher -->
                <div class="gcard gcard--sidebar" id="card-voucher">
                  <div class="gcard__header" @click="sectionsOpen.voucher = !sectionsOpen.voucher">
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
                  <div class="gcard__header" @click="sectionsOpen.ringkasan = !sectionsOpen.ringkasan">
                    <h3 class="gcard__title">{{ t.transaction.summaryTitle }}</h3>
                    <span class="gcard__toggle-arrow" :class="{ 'gcard__toggle-arrow--closed': !sectionsOpen.ringkasan }">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                    </span>
                  </div>

                  <Transition name="expand">
                    <div v-show="sectionsOpen.ringkasan" class="gcard__body" style="text-align: left;">
                      <div class="summary-details">
                        <div class="details-item">
                          <span class="details-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          </span>
                          <div class="details-text">
                            <h5 class="details-text__title">{{ selectedClass.name }} {{ currentLang === 'id' ? 'Sesi Kelas' : 'Class Session' }}</h5>
                            <p class="details-text__sub">1 {{ t.transaction.ticketLabel }} x Rp 150.000</p>
                          </div>
                        </div>

                        <div class="details-list">
                          <div class="details-row">
                            <span class="row-label">{{ currentLang === 'id' ? 'PEMESAN' : 'ORDERER' }}</span>
                            <span class="row-value">{{ form.fullName ? form.fullName : '-' }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="summary-divider"></div>

                      <!-- Price breakdown calculations -->
                      <div class="summary-breakdown">
                        <div class="breakdown-item">
                          <span>Jumlah (1 {{ t.transaction.ticketLabel }})</span>
                          <span>Rp 150.000</span>
                        </div>
                        <div class="breakdown-item">
                          <span>{{ t.transaction.subtotal }}</span>
                          <span>Rp 150.000</span>
                        </div>
                        <div class="breakdown-item">
                          <span>{{ t.transaction.adminFee }}</span>
                          <span>Rp 8.000</span>
                        </div>
                      </div>

                      <div class="summary-divider"></div>

                      <div class="payment-row">
                        <span class="payment-label">{{ t.transaction.totalPayment }}</span>
                        <span class="payment-value">Rp 158.000</span>
                      </div>
                    </div>
                  </Transition>
                </div>
                
              </div>
              
            </div>
          </form>

        </div>
      </div>
    </div>

    <!-- FIXED BOTTOM BAR: TIMER & PAY NOW BUTTON -->
    <div v-if="!submitted" class="checkout-bottom-bar">
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
            @click="handleSubmit"
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
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useNavigation } from '../composables/useNavigation'

const { t, currentLang } = useLanguage()
const { navigateTo, selectedClass } = useNavigation()

const tr = computed(() => t.value.classRegister)
const submitted = ref(false)

const paymentMethod = ref('va') // 'va', 'qris'
const selectedBank = ref('bca') // 'bca', 'mandiri', 'bni'
const isSubmitting = ref(false)
const timeLeft = ref(900) // 15 minutes in seconds
let timeLeftTimer = null

const formattedTimeLeft = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const sectionsOpen = reactive({
  pemesan: true,
  payment: true,
  voucher: true,
  ringkasan: true
})

const voucherCode = ref('')

function applyVoucher() {
  alert(currentLang.value === 'id' ? 'Kode Voucher diterapkan: ' + voucherCode.value : 'Voucher Code applied: ' + voucherCode.value)
}

function copyText(val) {
  navigator.clipboard.writeText(val).then(() => {
    alert(currentLang.value === 'id' ? 'Nomor Virtual Account disalin ke clipboard!' : 'Virtual Account number copied to clipboard!')
  }).catch(err => {
    console.error('Could not copy text: ', err)
  })
}

onMounted(() => {
  timeLeftTimer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      if (timeLeftTimer) clearInterval(timeLeftTimer)
      navigateTo('landing')
    }
  }, 1000)
})

onUnmounted(() => {
  if (timeLeftTimer) clearInterval(timeLeftTimer)
})

const classImages = {
  yoga:     '/class_yoga.png',
  hiit:     '/class_hiit.png',
  weights:  '/class_weights.png',
  boxing:   '/class_boxing.png',
  pilates:  '/class_yoga.png',
  crossfit: '/class_weights.png',
  cycling:  '/class_hiit.png',
  muaythai: '/class_boxing.png',
}

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  schedule: '',
  level: 'beginner',
  notes: '',
  agree: false,
})

const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
  schedule: '',
  agree: '',
})

const isId = computed(() => currentLang.value === 'id')

function validateField(field) {
  const requiredMsg = isId.value ? 'Field ini wajib diisi.' : 'This field is required.'
  switch (field) {
    case 'fullName':
      errors.fullName = form.fullName.trim() ? '' : requiredMsg
      break
    case 'email':
      if (!form.email.trim()) { errors.email = requiredMsg; break }
      errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? '' : (isId.value ? 'Format email tidak valid.' : 'Invalid email format.')
      break
    case 'phone':
      if (!form.phone.trim()) { errors.phone = requiredMsg; break }
      if (form.phone.startsWith('0')) {
        errors.phone = isId.value ? 'No. telepon tidak boleh diawali 0.' : 'Phone number cannot start with 0.'
        break
      }
      errors.phone = /^\d{8,14}$/.test(form.phone.replace(/\s/g, ''))
        ? '' : (isId.value ? 'Format nomor tidak valid.' : 'Invalid phone number.')
      break
    case 'schedule':
      errors.schedule = form.schedule ? '' : requiredMsg
      break
    case 'agree':
      errors.agree = form.agree ? '' : (isId.value ? 'Anda harus menyetujui syarat & ketentuan.' : 'You must agree to the terms.')
      break
  }
}

const isFormValid = computed(() => {
  const baseNotEmpty = form.fullName.trim() !== '' &&
                       form.email.trim() !== '' &&
                       form.phone.trim() !== '' &&
                       form.schedule !== '' &&
                       form.agree === true
  
  if (!baseNotEmpty) return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^\d+$/
  
  const nameValid = form.fullName.trim().length >= 3
  const emailValid = emailRegex.test(form.email.trim())
  const phoneValid = !form.phone.trim().startsWith('0') && phoneRegex.test(form.phone.trim()) && form.phone.trim().length >= 8 && form.phone.trim().length <= 13
  const scheduleValid = form.schedule !== ''
  
  return nameValid && emailValid && phoneValid && scheduleValid && form.agree
})

function handleSubmit() {
  ['fullName', 'email', 'phone', 'schedule', 'agree'].forEach(validateField)
  const hasError = Object.values(errors).some(e => e !== '')
  if (hasError) return
  
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    submitted.value = true
    if (timeLeftTimer) clearInterval(timeLeftTimer)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 1200)
}
</script>

<style scoped>
/* =========================================================
   PAGE WRAPPER
   ========================================================= */
.reg {
  min-height: 100dvh;
  background: var(--color-black);
}

/* =========================================================
   HERO HEADER
   ========================================================= */
.reg__hero {
  position: relative;
  padding: clamp(100px, 14vw, 160px) 0 clamp(40px, 5vw, 60px);
  overflow: hidden;
}

.reg__hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 30% 0%, rgba(200,244,0,0.05) 0%, transparent 70%),
    linear-gradient(to bottom, #050505 0%, var(--color-black) 100%);
  pointer-events: none;
}

.reg__hero-inner {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 64px);
}

.reg__back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #666;
  border: 1px solid #1e1e1e;
  background: transparent;
  padding: 9px 18px;
  border-radius: 50px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  margin-bottom: clamp(24px, 4vw, 40px);
}
.reg__back-btn:hover { color: var(--color-lime); border-color: rgba(200,244,0,0.3); }

.reg__eyebrow { margin-bottom: 12px; }

.reg__title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  line-height: 0.9;
  letter-spacing: 0.02em;
  margin-bottom: clamp(12px, 2vw, 18px);
}
.reg__title-lime { color: var(--color-lime); }

.reg__desc {
  font-size: clamp(0.82rem, 1.4vw, 0.93rem);
  color: #555;
  line-height: 1.7;
}

/* =========================================================
   BODY
   ========================================================= */
.reg__body {
  padding: 0 clamp(20px, 5vw, 64px) clamp(60px, 8vw, 100px);
}

.reg__body-inner {
  max-width: 900px;
  margin: 0 auto;
}

/* =========================================================
   SELECTED CLASS CARD
   ========================================================= */
.reg__selected-class {
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 36px;
}

.reg__selected-img-wrap {
  position: relative;
  width: clamp(100px, 18vw, 160px);
  flex-shrink: 0;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.reg__selected-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7) contrast(1.1);
}
.reg__selected-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent 40%, rgba(15,15,15,0.9) 100%);
}

.reg__selected-info {
  padding: 20px 20px 20px 0;
  flex: 1;
}

.reg__selected-label {
  display: block;
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-lime);
  margin-bottom: 6px;
}

.reg__selected-name {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  line-height: 1;
  margin-bottom: 10px;
}

.reg__selected-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.reg__selected-meta span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #555;
}

/* =========================================================
   FORM
   ========================================================= */
.reg__form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.reg__form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.reg__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}
.reg__field--full { grid-column: 1 / -1; margin-bottom: 0; }
.reg__field--agree { margin-top: 4px; margin-bottom: 0; }
.reg__field--submit { margin-top: 8px; }

.reg__label {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #666;
}

.reg__input {
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 10px;
  padding: 14px 18px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: #fff;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
}
.reg__input::placeholder { color: #333; }
.reg__input:focus { border-color: rgba(200,244,0,0.4); }
.reg__field--error .reg__input { border-color: rgba(220,60,60,0.5); }

/* Phone prefix */
.reg__input-prefix-wrap {
  display: flex;
  align-items: stretch;
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.2s;
}
.reg__input-prefix-wrap:focus-within { border-color: rgba(200,244,0,0.4); }
.reg__field--error .reg__input-prefix-wrap { border-color: rgba(220,60,60,0.5); }

.reg__input-prefix {
  padding: 14px 14px;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #555;
  border-right: 1px solid #1e1e1e;
  flex-shrink: 0;
}

.reg__input--prefixed {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 14px 16px;
  flex: 1;
}
.reg__input--prefixed:focus { border-color: transparent; }

/* Select */
.reg__select-wrap {
  position: relative;
}
.reg__select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 10px;
  padding: 14px 44px 14px 18px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: #fff;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}
.reg__select:focus { border-color: rgba(200,244,0,0.4); }
.reg__field--error .reg__select { border-color: rgba(220,60,60,0.5); }
.reg__select option { background: #111; }

.reg__select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

/* Textarea */
.reg__textarea {
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 10px;
  padding: 14px 18px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: #fff;
  outline: none;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;
  width: 100%;
}
.reg__textarea::placeholder { color: #333; }
.reg__textarea:focus { border-color: rgba(200,244,0,0.4); }

/* Radio Cards */
.reg__radio-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.reg__radio-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  position: relative;
}
.reg__radio-card input[type="radio"] { display: none; }
.reg__radio-card--active {
  border-color: rgba(200,244,0,0.35);
  background: rgba(200,244,0,0.04);
}

.reg__radio-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #2a2a2a;
  flex-shrink: 0;
  transition: border-color 0.2s;
  position: relative;
}
.reg__radio-card--active .reg__radio-dot {
  border-color: var(--color-lime);
  background: var(--color-lime);
  box-shadow: 0 0 8px rgba(200,244,0,0.4);
}
.reg__radio-card--active .reg__radio-dot::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: #000;
}

.reg__radio-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}
.reg__radio-title {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
}
.reg__radio-sub {
  font-size: 0.68rem;
  color: #444;
}

.reg__radio-badge { font-size: 0.6rem; }
.reg__radio-badge--green  { color: #00c864; }
.reg__radio-badge--orange { color: #f5a623; }
.reg__radio-badge--red    { color: #e05252; }

/* Agree Checkbox */
.reg__checkbox-wrap {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.reg__checkbox-box {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 1.5px solid #2a2a2a;
  background: #0d0d0d;
  flex-shrink: 0;
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, border-color 0.2s;
}

input[type="checkbox"]:checked + .reg__checkbox-box {
  background: var(--color-lime);
  border-color: var(--color-lime);
}

.reg__agree-text {
  font-size: 0.8rem;
  color: #555;
  line-height: 1.5;
}

input[type="checkbox"] { display: none; }

/* Error */
.reg__error-msg {
  font-size: 0.7rem;
  color: #e05252;
  font-family: var(--font-display);
  letter-spacing: 0.08em;
}

/* Submit */
.reg__submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 32px;
  background: var(--color-lime);
  color: #000;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
}
.reg__submit-btn:hover {
  background: #d4ff00;
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(200,244,0,0.3);
}
.reg__submit-btn:active { transform: translateY(0); }

/* =========================================================
   SUCCESS STATE
   ========================================================= */
.reg__success {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(40px, 8vw, 80px) clamp(20px, 5vw, 64px);
}

.reg__success-inner {
  max-width: 520px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.reg__success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(200,244,0,0.1);
  border: 1px solid rgba(200,244,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulseGlow 2s ease-in-out infinite;
}

.reg__success-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  line-height: 1;
}

.reg__success-desc {
  font-size: 0.88rem;
  color: #555;
  line-height: 1.7;
  max-width: 380px;
}

.reg__success-summary {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}
.reg__success-class {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--color-lime);
}
.reg__success-trainer {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #555;
}

.reg__success-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  width: 100%;
}

.reg__success-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  justify-content: center;
  min-width: 160px;
}
.reg__success-btn--lime {
  background: var(--color-lime);
  color: #000;
  border: none;
}
.reg__success-btn--lime:hover { background: #d4ff00; transform: translateY(-2px); }
.reg__success-btn--outline {
  background: transparent;
  color: #fff;
  border: 1.5px solid rgba(255,255,255,0.2);
}
.reg__success-btn--outline:hover { border-color: var(--color-lime); color: var(--color-lime); }

/* Transitions */
.success-fade-enter-active, .success-fade-leave-active { transition: opacity 0.4s ease; }
.success-fade-enter-from, .success-fade-leave-to { opacity: 0; }

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 768px) {
  .reg__form-grid { grid-template-columns: 1fr; gap: 0; }
  .reg__form-grid .reg__field { margin-bottom: 20px; }
  .reg__radio-group { grid-template-columns: 1fr; gap: 10px; }
  .reg__selected-class { flex-direction: column; align-items: flex-start; }
  .reg__selected-img-wrap { width: 100%; aspect-ratio: 16 / 5; }
  .reg__selected-img-overlay { background: linear-gradient(to bottom, transparent 40%, rgba(15,15,15,0.9) 100%); }
  .reg__selected-info { padding: 16px 20px 20px; }
}

@media (max-width: 480px) {
  .reg__hero { padding-top: 90px; }
  .reg__title { line-height: 0.95; }
  .reg__success-actions { flex-direction: column; }
  .reg__success-btn { min-width: unset; width: 100%; }
  .reg__radio-card { padding: 12px 14px; }
}

/* =========================================================
   DYNAMIC CHECKOUT STYLES (Copied & adapted from TransactionMembership.vue)
   ========================================================= */
.checkout-gform__grid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 24px;
  align-items: start;
}

.checkout-gform__form-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.checkout-gform__sidebar-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 90px;
}

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
  width: 100%;
}
.form-item__input:focus {
  border-color: rgba(200, 244, 0, 0.35);
  box-shadow: 0 0 12px rgba(200, 244, 0, 0.06);
}
.form-item__input::placeholder {
  color: var(--color-gray-600);
}

.form-error-msg {
  font-size: 0.7rem;
  color: #e05252;
  font-family: var(--font-display);
  letter-spacing: 0.08em;
  margin-top: 4px;
  display: block;
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
.phone-field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 14px 18px;
  color: var(--color-white);
  font-size: 0.88rem;
  font-family: var(--font-body);
  width: 100%;
}
.phone-field::placeholder {
  color: var(--color-gray-600);
}

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
  cursor: pointer;
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
  cursor: pointer;
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

.payment-card__fineprint {
  font-size: 0.72rem;
  color: var(--color-gray-600);
  line-height: 1.6;
  text-align: center;
  margin-top: 18px;
}

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

/* QRIS layout */
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
.payment-instruction-text {
  font-size: 0.76rem;
  color: var(--color-gray-400);
  line-height: 1.6;
  margin-top: 18px;
}
.payment-instruction-text--center {
  text-align: center;
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
  border: none;
  cursor: pointer;
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
.pay-now-btn--bottom {
  width: auto;
  min-width: 180px;
  padding: 14px 32px;
  font-size: 0.88rem;
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
@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

/* Responsive Overrides */
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
  .voucher-input-row {
    flex-direction: column;
  }
  .voucher-submit-btn {
    padding: 12px;
  }
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
  /* Payment card responsive details */
  .gcard__header {
    padding: 16px 20px;
  }
  .gcard__body {
    padding: 16px;
  }
  .p-accordion-header {
    padding: 12px 14px;
    gap: 10px;
  }
  .p-accordion-body__content {
    padding: 14px;
    gap: 12px;
  }
  .va-display-box {
    padding: 12px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  .va-display-box__number {
    font-size: 1.1rem;
    text-align: center;
  }
  .va-copy-btn {
    justify-content: center;
    width: 100%;
  }
}

/* Space out reg body bottom so bottom bar doesn't overlay input contents */
.reg__body {
  padding-bottom: 120px !important;
}
</style>
