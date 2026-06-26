<template>
  <section class="to" id="trainer-order">

    <!-- Success State -->
    <Transition name="success-fade">
      <div v-if="submitted" class="to__success">
        <div class="to__success-inner">
          <div class="to__success-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 class="to__success-title">{{ tr.successTitle }}</h2>
          <p class="to__success-desc">{{ tr.successDesc }}</p>
          <div class="to__success-card" v-if="selectedTrainer">
            <span class="to__success-name">{{ selectedTrainer.name }}</span>
            <span class="to__success-spec">{{ selectedTrainer.specialtyLabel }}</span>
          </div>
          <div class="to__success-actions">
            <button class="to__suc-btn to__suc-btn--lime" id="to-success-catalog" @click="navigateTo('trainer-catalog')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              {{ tr.backBtn }}
            </button>
            <button class="to__suc-btn to__suc-btn--outline" id="to-success-home" @click="navigateTo('landing')">
              {{ tr.backHomeBtn }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Form State -->
    <div v-if="!submitted" class="to__page">

      <!-- Hero Header -->
      <div class="to__hero">
        <div class="to__hero-bg" aria-hidden="true"></div>
        <div class="to__hero-inner">
          <button class="to__back-btn" id="to-back-catalog" @click="navigateTo('trainer-catalog')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            {{ tr.backBtn }}
          </button>
          <p class="to__eyebrow section-label">MUSCLE LAB GYM</p>
          <h1 class="to__title">
            {{ tr.pageTitle }}
            <span class="to__title-lime">{{ tr.pageTitleLime }}</span>
          </h1>
          <p class="to__desc">{{ tr.pageDesc }}</p>
        </div>
      </div>

      <!-- Body -->
      <div class="to__body">
        <div class="to__body-inner">

          <!-- Form -->
          <form class="to__form" @submit.prevent="handleSubmit" id="to-form" novalidate>
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
                        <label class="form-item__label" for="to-fullname">{{ tr.fullName }}</label>
                        <input
                          id="to-fullname"
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
                        <label class="form-item__label" for="to-email">{{ tr.email }}</label>
                        <input
                          id="to-email"
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
                        <label class="form-item__label" for="to-phone">{{ tr.phone }}</label>
                        <div class="phone-input-group" :class="{ 'phone-input-group--error': errors.phone }">
                          <div class="phone-prefix">
                            <span>+62</span>
                          </div>
                          <input
                            id="to-phone"
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

                      <!-- Sessions per Week -->
                      <div class="form-item" :class="{ 'form-item--error': errors.frequency }">
                        <label class="form-item__label" for="to-frequency">{{ tr.frequency }}</label>
                        <div class="reg__select-wrap">
                          <select
                            id="to-frequency"
                            v-model="form.frequency"
                            class="reg__select"
                            @blur="validateField('frequency')"
                          >
                            <option value="" disabled>{{ tr.frequencyPlaceholder }}</option>
                            <option v-for="opt in tr.frequencyOptions" :key="opt" :value="opt">{{ opt }}</option>
                          </select>
                          <svg class="reg__select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <span class="form-error-msg" v-if="errors.frequency">{{ errors.frequency }}</span>
                      </div>

                      <!-- Preferred Time Slot -->
                      <div class="form-item" :class="{ 'form-item--error': errors.timeSlot }">
                        <label class="form-item__label" for="to-timeslot">{{ tr.timeSlot }}</label>
                        <div class="reg__select-wrap">
                          <select
                            id="to-timeslot"
                            v-model="form.timeSlot"
                            class="reg__select"
                            @blur="validateField('timeSlot')"
                          >
                            <option value="" disabled>{{ tr.timeSlotPlaceholder }}</option>
                            <option v-for="opt in tr.timeSlotOptions" :key="opt" :value="opt">{{ opt }}</option>
                          </select>
                          <svg class="reg__select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <span class="form-error-msg" v-if="errors.timeSlot">{{ errors.timeSlot }}</span>
                      </div>

                      <!-- Training Goal -->
                      <div class="form-item">
                        <label class="form-item__label">{{ tr.goal }}</label>
                        <div class="to__radio-grid to__radio-grid--4" id="to-goal-group">
                          <label v-for="g in goalOptions" :key="g.val" class="to__rcard"
                            :class="{ 'to__rcard--active': form.goal === g.val }">
                            <input type="radio" v-model="form.goal" :value="g.val" />
                            <span class="to__rcard-icon">{{ g.icon }}</span>
                            <span class="to__rcard-text">{{ g.label }}</span>
                          </label>
                        </div>
                      </div>

                      <!-- Duration -->
                      <div class="form-item">
                        <label class="form-item__label">{{ tr.duration }}</label>
                        <div class="to__radio-grid to__radio-grid--3" id="to-duration-group">
                          <label v-for="d in durationOptions" :key="d.val" class="to__dcard"
                            :class="{ 'to__dcard--active': form.duration === d.val }">
                            <input type="radio" v-model="form.duration" :value="d.val" />
                            <span class="to__dcard-val">{{ d.months }}</span>
                            <span class="to__dcard-label">{{ d.label }}</span>
                            <span class="to__dcard-sub" v-if="d.savings">{{ d.savings }}</span>
                          </label>
                        </div>
                      </div>

                      <!-- Notes -->
                      <div class="form-item">
                        <label class="form-item__label" for="to-notes">{{ tr.notes }}</label>
                        <textarea
                          id="to-notes"
                          v-model="form.notes"
                          class="reg__textarea"
                          :placeholder="tr.notesPlaceholder"
                          rows="4"
                        ></textarea>
                      </div>

                      <!-- Agree checkbox -->
                      <div class="form-item" :class="{ 'form-item--error': errors.agree }" style="margin-bottom: 0;">
                        <label class="reg__checkbox-wrap" id="to-agree-label">
                          <input type="checkbox" v-model="form.agree" id="to-agree" @change="validateField('agree')" />
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
                
                <!-- Card 1: Selected Trainer Card -->
                <div class="mini-item-card" v-if="selectedTrainer">
                  <div class="mini-item-card__avatar-img-wrap">
                    <img :src="selectedTrainer.photo" :alt="selectedTrainer.name" class="mini-item-card__avatar-img" />
                  </div>
                  <div class="mini-item-card__details" style="text-align: left;">
                    <h4 class="mini-item-card__title">{{ selectedTrainer.name }}</h4>
                    <p class="mini-item-card__subtitle">{{ selectedTrainer.specialtyLabel }}</p>
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
                        <div class="details-item" v-if="selectedTrainer">
                          <span class="details-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          </span>
                          <div class="details-text">
                            <h5 class="details-text__title">{{ selectedTrainer.name }}</h5>
                            <p class="details-text__sub">{{ totalSessions }} {{ currentLang === 'id' ? 'Sesi Latihan' : 'Training Sessions' }}</p>
                          </div>
                        </div>

                        <div class="details-list">
                          <div class="details-row">
                            <span class="row-label">{{ currentLang === 'id' ? 'PEMESAN' : 'ORDERER' }}</span>
                            <span class="row-value">{{ form.fullName ? form.fullName : '-' }}</span>
                          </div>
                          <div class="details-row">
                            <span class="row-label">{{ currentLang === 'id' ? 'DURASI' : 'DURATION' }}</span>
                            <span class="row-value">{{ form.duration }} {{ currentLang === 'id' ? 'Bulan' : 'Month(s)' }}</span>
                          </div>
                          <div class="details-row">
                            <span class="row-label">{{ currentLang === 'id' ? 'FREKUENSI' : 'FREQUENCY' }}</span>
                            <span class="row-value">{{ form.frequency || '-' }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="summary-divider"></div>

                      <!-- Price breakdown calculations -->
                      <div class="summary-breakdown" v-if="selectedTrainer">
                        <div class="breakdown-item">
                          <span>Jumlah ({{ totalSessions }} {{ currentLang === 'id' ? 'Sesi' : 'Sessions' }})</span>
                          <span>Rp {{ baseSubtotalFormatted }}</span>
                        </div>
                        <div class="breakdown-item" v-if="discountVal > 0">
                          <span style="color: #00c864;">{{ currentLang === 'id' ? 'Diskon Durasi' : 'Duration Discount' }}</span>
                          <span style="color: #00c864;">-Rp {{ discountValFormatted }}</span>
                        </div>
                        <div class="breakdown-item" v-if="discountVal > 0">
                          <span>{{ t.transaction.subtotal }}</span>
                          <span>Rp {{ subtotalValFormatted }}</span>
                        </div>
                        <div class="breakdown-item">
                          <span>{{ t.transaction.adminFee }}</span>
                          <span>Rp 8.000</span>
                        </div>
                      </div>

                      <div class="summary-divider"></div>

                      <div class="payment-row">
                        <span class="payment-label">{{ t.transaction.totalPayment }}</span>
                        <span class="payment-value">Rp {{ totalPaymentFormatted }}</span>
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
const { navigateTo, selectedTrainer } = useNavigation()

const tr = computed(() => t.value.trainerOrder)
const submitted = ref(false)

const isId = computed(() => currentLang.value === 'id')

const goalOptions = computed(() => [
  { val: 'weightloss',  icon: '🔥', label: tr.value.goalWeightLoss },
  { val: 'muscle',      icon: '💪', label: tr.value.goalMuscle },
  { val: 'fitness',     icon: '⚡', label: tr.value.goalFitness },
  { val: 'competition', icon: '🏆', label: tr.value.goalCompetition },
])

const durationOptions = computed(() => [
  { val: '1', months: '1', label: isId.value ? 'BULAN' : 'MONTH',  savings: null },
  { val: '3', months: '3', label: isId.value ? 'BULAN' : 'MONTHS', savings: isId.value ? 'HEMAT 10%' : 'SAVE 10%' },
  { val: '6', months: '6', label: isId.value ? 'BULAN' : 'MONTHS', savings: isId.value ? 'HEMAT 20%' : 'SAVE 20%' },
])

const form = reactive({
  fullName: '', email: '', phone: '',
  goal: 'fitness', duration: '1',
  frequency: '', timeSlot: '',
  notes: '', agree: false,
})

const errors = reactive({
  fullName: '', email: '', phone: '',
  frequency: '', timeSlot: '', agree: '',
})

const sectionsOpen = reactive({
  pemesan: true,
  payment: true,
  voucher: true,
  ringkasan: true
})

const paymentMethod = ref('va') // 'va', 'qris'
const selectedBank = ref('bca') // 'bca', 'mandiri', 'bni'
const isSubmitting = ref(false)
const voucherCode = ref('')

// 15 Minutes Countdown Timer Logic
const timeLeft = ref(900) // 15 minutes in seconds
let timeLeftTimer = null

const formattedTimeLeft = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

// Price calculation computed logic
const trainerPriceVal = computed(() => {
  if (!selectedTrainer.value || !selectedTrainer.value.price) return 0
  const priceStr = selectedTrainer.value.price.replace(/\./g, '').replace(/,/g, '')
  return parseInt(priceStr, 10) || 0
})

const frequencyNum = computed(() => {
  if (!form.frequency) return 1
  const match = form.frequency.match(/\d+/)
  return match ? parseInt(match[0], 10) : 1
})

const totalSessions = computed(() => {
  const months = parseInt(form.duration, 10) || 1
  return frequencyNum.value * 4 * months
})

const baseSubtotal = computed(() => {
  return totalSessions.value * trainerPriceVal.value
})

const discountVal = computed(() => {
  const months = parseInt(form.duration, 10) || 1
  if (months === 3) return Math.round(baseSubtotal.value * 0.10)
  if (months === 6) return Math.round(baseSubtotal.value * 0.20)
  return 0
})

const subtotalVal = computed(() => {
  return baseSubtotal.value - discountVal.value
})

const totalPayment = computed(() => {
  return subtotalVal.value + 8000
})

const baseSubtotalFormatted = computed(() => baseSubtotal.value.toLocaleString('id-ID'))
const discountValFormatted = computed(() => discountVal.value.toLocaleString('id-ID'))
const subtotalValFormatted = computed(() => subtotalVal.value.toLocaleString('id-ID'))
const totalPaymentFormatted = computed(() => totalPayment.value.toLocaleString('id-ID'))

function validateField(field) {
  const req = isId.value ? 'Field ini wajib diisi.' : 'This field is required.'
  switch (field) {
    case 'fullName':
      errors.fullName = form.fullName.trim() ? '' : req; break
    case 'email':
      if (!form.email.trim()) { errors.email = req; break }
      errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? ''
        : (isId.value ? 'Format email tidak valid.' : 'Invalid email format.')
      break
    case 'phone':
      if (!form.phone.trim()) { errors.phone = req; break }
      if (form.phone.startsWith('0')) {
        errors.phone = isId.value ? 'No. telepon tidak boleh diawali 0.' : 'Phone cannot start with 0.'; break
      }
      errors.phone = /^\d{8,14}$/.test(form.phone.replace(/\s/g,'')) ? ''
        : (isId.value ? 'Format nomor tidak valid.' : 'Invalid phone number.')
      break
    case 'frequency':
      errors.frequency = form.frequency ? '' : req; break
    case 'timeSlot':
      errors.timeSlot = form.timeSlot ? '' : req; break
    case 'agree':
      errors.agree = form.agree ? '' : (isId.value ? 'Anda harus menyetujui syarat & ketentuan.' : 'You must agree to the terms.'); break
  }
}

const isFormValid = computed(() => {
  const baseNotEmpty = form.fullName.trim() !== '' &&
                       form.email.trim() !== '' &&
                       form.phone.trim() !== '' &&
                       form.frequency !== '' &&
                       form.timeSlot !== '' &&
                       form.agree === true
  
  if (!baseNotEmpty) return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^\d+$/
  
  const nameValid = form.fullName.trim().length >= 3
  const emailValid = emailRegex.test(form.email.trim())
  const phoneValid = !form.phone.trim().startsWith('0') && phoneRegex.test(form.phone.trim()) && form.phone.trim().length >= 8 && form.phone.trim().length <= 13
  
  return nameValid && emailValid && phoneValid && form.agree
})

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

function handleSubmit() {
  ['fullName', 'email', 'phone', 'frequency', 'timeSlot', 'agree'].forEach(validateField)
  if (Object.values(errors).some(e => e !== '')) return
  
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    submitted.value = true
    if (timeLeftTimer) clearInterval(timeLeftTimer)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 1200)
}

onMounted(() => {
  timeLeftTimer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      if (timeLeftTimer) clearInterval(timeLeftTimer)
      navigateTo('trainer-catalog')
    }
  }, 1000)
})

onUnmounted(() => {
  if (timeLeftTimer) clearInterval(timeLeftTimer)
})
</script>

<style scoped>
/* =========================================================
   PAGE
   ========================================================= */
.to { min-height: 100dvh; background: var(--color-black); }

/* =========================================================
   HERO
   ========================================================= */
.to__hero {
  position: relative;
  padding: clamp(100px, 14vw, 160px) 0 clamp(40px, 5vw, 60px);
  overflow: hidden;
}
.to__hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 20% 0%, rgba(200,244,0,0.05) 0%, transparent 70%),
    linear-gradient(to bottom, #050505 0%, var(--color-black) 100%);
  pointer-events: none;
}
.to__hero-inner {
  position: relative; max-width: 960px;
  margin: 0 auto; padding: 0 clamp(20px, 5vw, 64px);
}
.to__back-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-display); font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: #666; border: 1px solid #1e1e1e; background: transparent;
  padding: 9px 18px; border-radius: 50px; cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  margin-bottom: clamp(24px, 4vw, 40px);
}
.to__back-btn:hover { color: var(--color-lime); border-color: rgba(200,244,0,0.3); }
.to__eyebrow { margin-bottom: 12px; }
.to__title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 900; text-transform: uppercase; color: #fff;
  line-height: 0.9; letter-spacing: 0.02em;
  margin-bottom: clamp(12px, 2vw, 18px);
}
.to__title-lime { color: var(--color-lime); }
.to__desc { font-size: clamp(0.82rem, 1.4vw, 0.93rem); color: #555; line-height: 1.7; }

/* =========================================================
   BODY
   ========================================================= */
.to__body { padding: 0 clamp(20px, 5vw, 64px) clamp(60px, 8vw, 100px); }
.to__body-inner { max-width: 1200px; margin: 0 auto; }

/* =========================================================
   DYNAMIC CHECKOUT STYLES
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

/* Select */
.reg__select-wrap {
  position: relative;
}
.reg__select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  background: #050505;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px 44px 14px 18px;
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: #fff;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}
.reg__select:focus { border-color: rgba(200,244,0,0.4); }
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
  background: #050505;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px 18px;
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: #fff;
  outline: none;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;
  width: 100%;
}
.reg__textarea::placeholder { color: #333; }
.reg__textarea:focus { border-color: rgba(200,244,0,0.4); }

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
.mini-item-card__avatar-img-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 1.5px solid var(--color-border);
  flex-shrink: 0;
}
.mini-item-card__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
}
.mini-item-card__subtitle {
  font-size: 0.72rem;
  color: var(--color-gray-600);
  margin-top: 2px;
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
.row-label {
  color: var(--color-gray-500);
}
.row-value {
  color: var(--color-white);
  font-weight: 600;
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

/* Payment tabs */
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

/* Accordion expand transition */
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
   GOAL RADIO CARDS
   ========================================================= */
.to__radio-grid { display: grid; gap: 12px; }
.to__radio-grid--4 { grid-template-columns: repeat(4, 1fr); }
.to__radio-grid--3 { grid-template-columns: repeat(3, 1fr); }

.to__rcard {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; padding: 16px 12px;
  background: #0d0d0d; border: 1px solid #1e1e1e; border-radius: 12px;
  cursor: pointer; transition: border-color 0.2s, background 0.2s; text-align: center;
}
.to__rcard input { display: none; }
.to__rcard--active { border-color: rgba(200,244,0,0.35); background: rgba(200,244,0,0.04); }
.to__rcard-icon { font-size: 1.5rem; line-height: 1; }
.to__rcard-text {
  font-family: var(--font-display); font-size: 0.68rem; font-weight: 800;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: #666; transition: color 0.2s;
}
.to__rcard--active .to__rcard-text { color: var(--color-lime); }

/* Duration Cards */
.to__dcard {
  display: flex; flex-direction: column; align-items: center;
  gap: 4px; padding: 18px 12px;
  background: #0d0d0d; border: 1px solid #1e1e1e; border-radius: 12px;
  cursor: pointer; transition: border-color 0.2s, background 0.2s; text-align: center;
  position: relative;
}
.to__dcard input { display: none; }
.to__dcard--active { border-color: rgba(200,244,0,0.4); background: rgba(200,244,0,0.05); }
.to__dcard-val {
  font-family: var(--font-display); font-size: 2.4rem; font-weight: 900;
  color: #fff; line-height: 1;
}
.to__dcard--active .to__dcard-val { color: var(--color-lime); }
.to__dcard-label {
  font-family: var(--font-display); font-size: 0.65rem; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase; color: #444;
}
.to__dcard-sub {
  font-family: var(--font-display); font-size: 0.58rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: #00c864; background: rgba(0,200,100,0.1);
  border: 1px solid rgba(0,200,100,0.2); padding: 3px 8px;
  border-radius: 50px; margin-top: 4px;
}

/* Agree checkbox custom classes */
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
input[type="checkbox"] { display: none; }
.reg__agree-text {
  font-size: 0.8rem;
  color: #555;
  line-height: 1.5;
}

/* Spacer for bottom bar offset in body */
.to__body {
  padding-bottom: 120px !important;
}

/* =========================================================
   SUCCESS STATE
   ========================================================= */
.to__success {
  min-height: 100dvh; display: flex; align-items: center; justify-content: center;
  padding: clamp(40px, 8vw, 80px) clamp(20px, 5vw, 64px);
}
.to__success-inner {
  max-width: 520px; width: 100%; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 20px;
}
.to__success-icon {
  width: 80px; height: 80px; border-radius: 50%;
  background: rgba(200,244,0,0.1); border: 1px solid rgba(200,244,0,0.25);
  display: flex; align-items: center; justify-content: center;
  animation: pulseGlow 2s ease-in-out infinite;
}
.to__success-title {
  font-family: var(--font-display); font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 900; text-transform: uppercase; color: #fff; line-height: 1;
}
.to__success-desc { font-size: 0.88rem; color: #555; line-height: 1.7; max-width: 380px; }
.to__success-card {
  background: var(--color-card); border: 1px solid var(--color-border);
  border-radius: 12px; padding: 16px 24px; width: 100%;
  display: flex; flex-direction: column; gap: 4px;
}
.to__success-name {
  font-family: var(--font-display); font-size: 1.2rem;
  font-weight: 900; text-transform: uppercase; color: var(--color-lime);
}
.to__success-spec {
  font-family: var(--font-display); font-size: 0.62rem; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase; color: #555;
}
.to__success-actions {
  display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; width: 100%;
}
.to__suc-btn {
  display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px;
  font-family: var(--font-display); font-size: 0.78rem; font-weight: 800;
  letter-spacing: 0.12em; text-transform: uppercase; border-radius: 50px;
  cursor: pointer; transition: all 0.2s; flex: 1; justify-content: center; min-width: 160px;
}
.to__suc-btn--lime { background: var(--color-lime); color: #000; border: none; }
.to__suc-btn--lime:hover { background: #d4ff00; transform: translateY(-2px); }
.to__suc-btn--outline { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.2); }
.to__suc-btn--outline:hover { border-color: var(--color-lime); color: var(--color-lime); }

.success-fade-enter-active, .success-fade-leave-active { transition: opacity 0.4s ease; }
.success-fade-enter-from, .success-fade-leave-to { opacity: 0; }

/* =========================================================
   RESPONSIVE MEDIA QUERIES
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

@media (max-width: 768px) {
  .to__radio-grid--4 { grid-template-columns: repeat(2, 1fr); }
  .to__radio-grid--3 { grid-template-columns: repeat(3, 1fr); }
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
  .to__hero { padding-top: 90px; }
  .to__title { line-height: 0.95; }
  .to__success-actions { flex-direction: column; }
  .to__suc-btn { min-width: unset; width: 100%; }
  
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
  .to__radio-grid--4 { grid-template-columns: 1fr 1fr; }
  .to__radio-grid--3 { grid-template-columns: 1fr 1fr 1fr; }
}

@media (max-width: 360px) {
  .to__radio-grid--3 { grid-template-columns: 1fr; }
  .to__dcard-val { font-size: 1.8rem; }
}
</style>
