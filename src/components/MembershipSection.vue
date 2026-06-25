<template>
  <section class="membership" id="membership">
    <div class="membership__inner">
      <!-- Section Header -->
      <div class="membership__header">
        <h2 class="membership__title">
          <span class="membership__title-line1">{{ t.membership.title1 }}</span>
          <span class="membership__title-line2">{{ t.membership.title2 }}</span>
        </h2>
        <p class="membership__desc">
          {{ t.membership.desc }}
        </p>
      </div>

      <!-- Membership Cards Grid -->
      <div class="membership__grid">
        <!-- STARTER CARD -->
        <div class="card card--starter" id="membership-starter">
          <div class="card__top">
            <span class="card__level">{{ t.membership.level }} 01</span>
            <span class="card__icon" aria-hidden="true">
              <!-- Lightning bolt icon -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
          </div>
          
          <div class="card__header">
            <h3 class="card__tier-name">{{ t.membership.tiers.starter.name }}</h3>
            <div class="card__price-group">
              <span class="card__currency">{{ t.membership.currency }}</span>
              <span class="card__price">{{ t.membership.tiers.starter.price }}</span>
              <span class="card__period">{{ t.membership.perMonth }}</span>
            </div>
          </div>

          <ul class="card__features">
            <li v-for="(feat, idx) in t.membership.tiers.starter.features" :key="idx">
              <span class="feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{{ feat }}</span>
            </li>
          </ul>

          <button class="card__btn card__btn--dark" id="btn-starter-purchase" @click="navigateTo('transaction', 'starter')">
            {{ t.membership.purchase }}
          </button>
        </div>

        <!-- ACTIVE CARD -->
        <div class="card card--active" id="membership-active">
          <!-- Popular Pill -->
          <div class="card__badge-wrap">
            <span class="card__badge">{{ t.membership.mostPopular }}</span>
          </div>

          <div class="card__top">
            <span class="card__level">{{ t.membership.level }} 02</span>
            <span class="card__icon text-lime" aria-hidden="true">
              <!-- Star icon -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
          </div>

          <div class="card__header">
            <h3 class="card__tier-name">{{ t.membership.tiers.active.name }}</h3>
            <div class="card__price-group">
              <span class="card__currency">{{ t.membership.currency }}</span>
              <span class="card__price">{{ t.membership.tiers.active.price }}</span>
              <span class="card__period">{{ t.membership.perMonth }}</span>
            </div>
          </div>

          <ul class="card__features">
            <li v-for="(feat, idx) in t.membership.tiers.active.features" :key="idx">
              <span class="feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{{ feat }}</span>
            </li>
          </ul>

          <button class="card__btn card__btn--lime" id="btn-active-purchase" @click="navigateTo('transaction', 'active')">
            {{ t.membership.purchase }}
          </button>
        </div>

        <!-- PRO CARD -->
        <div class="card card--pro" id="membership-pro">
          <div class="card__top">
            <span class="card__level">{{ t.membership.level }} 03</span>
            <span class="card__icon" aria-hidden="true">
              <!-- Crown icon -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
                <path d="M3 20h18" />
              </svg>
            </span>
          </div>

          <div class="card__header">
            <h3 class="card__tier-name">{{ t.membership.tiers.pro.name }}</h3>
            <div class="card__price-group">
              <span class="card__currency">{{ t.membership.currency }}</span>
              <span class="card__price">{{ t.membership.tiers.pro.price }}</span>
              <span class="card__period">{{ t.membership.perMonth }}</span>
            </div>
          </div>

          <ul class="card__features">
            <li v-for="(feat, idx) in t.membership.tiers.pro.features" :key="idx">
              <span class="feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{{ feat }}</span>
            </li>
          </ul>

          <button class="card__btn card__btn--dark" id="btn-pro-purchase" @click="navigateTo('transaction', 'pro')">
            {{ t.membership.purchase }}
          </button>
        </div>
      </div>

      <!-- TIER BREAKDOWN SECTION -->
      <div class="breakdown">
        <h3 class="breakdown__title">{{ t.membership.breakdown.title }}</h3>
        
        <div class="breakdown__grid">
          <!-- KINETIC ANALYTICS -->
          <div class="breakdown-card" id="breakdown-analytics">
            <h4 class="breakdown-card__title">{{ t.membership.breakdown.analytics.title }}</h4>
            <p class="breakdown-card__desc">
              {{ t.membership.breakdown.analytics.desc }}
            </p>
          </div>

          <!-- HOURS -->
          <div class="breakdown-card" id="breakdown-hours">
            <h4 class="breakdown-card__title">{{ t.membership.breakdown.hours.title }}</h4>
            <div class="breakdown-card__list">
              <div v-for="(line, idx) in t.membership.breakdown.hours.desc.split('\n')" :key="idx" class="breakdown-card__row">
                <span class="row-label">{{ line.split(':')[0] }}:</span>
                <span class="row-val">{{ line.split(':')[1] }}</span>
              </div>
            </div>
          </div>

          <!-- SUPPORT -->
          <div class="breakdown-card" id="breakdown-support">
            <h4 class="breakdown-card__title">{{ t.membership.breakdown.support.title }}</h4>
            <div class="breakdown-card__list">
              <div v-for="(line, idx) in t.membership.breakdown.support.desc.split('\n')" :key="idx" class="breakdown-card__row">
                <span class="row-label">{{ line.split(':')[0] }}:</span>
                <span class="row-val">{{ line.split(':')[1] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage'
import { useNavigation } from '../composables/useNavigation'

const { t } = useLanguage()
const { navigateTo } = useNavigation()
</script>

<style scoped>
/* =========================================================
   MEMBERSHIP SECTION
   ========================================================= */
.membership {
  padding: var(--section-pad) 0;
  background-color: var(--color-black);
  position: relative;
  overflow: hidden;
}

.membership__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 64px);
}

/* Header */
.membership__header {
  max-width: 800px;
  margin-bottom: clamp(48px, 8vw, 84px);
}

.membership__title {
  display: flex;
  flex-direction: column;
  line-height: 0.95;
  margin-bottom: 24px;
}

.membership__title-line1,
.membership__title-line2 {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7.5vw, 6.2rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.membership__title-line1 {
  color: var(--color-white);
}

.membership__title-line2 {
  color: var(--color-lime);
  text-shadow: 0 0 60px rgba(200, 244, 0, 0.15);
}

.membership__desc {
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 1.8vw, 1.1rem);
  color: var(--color-gray-400);
  line-height: 1.6;
  max-width: 540px;
}

/* Membership Grid */
.membership__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: stretch;
  margin-bottom: clamp(60px, 10vw, 120px);
}

/* Cards style */
.card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: clamp(24px, 4vw, 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.4s var(--ease), border-color 0.4s var(--ease), box-shadow 0.4s var(--ease);
  min-height: 520px;
}

.card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

/* Active Highlight */
.card--active {
  border-color: rgba(200, 244, 0, 0.35);
  box-shadow: 0 10px 30px rgba(200, 244, 0, 0.04);
}

.card--active:hover {
  border-color: var(--color-lime);
  box-shadow: 0 20px 50px rgba(200, 244, 0, 0.12);
}

/* Popular Badge */
.card__badge-wrap {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.card__badge {
  background: var(--color-lime);
  color: var(--color-black);
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 6px 16px;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(200, 244, 0, 0.3);
  white-space: nowrap;
}

/* Card layout components */
.card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.card__level {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--color-gray-600);
  text-transform: uppercase;
}

.card__icon {
  color: var(--color-gray-400);
  display: flex;
  align-items: center;
}

.text-lime {
  color: var(--color-lime);
}

.card__header {
  margin-bottom: 36px;
}

.card__tier-name {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 8px;
}

.card__price-group {
  display: flex;
  align-items: baseline;
}

.card__currency {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--color-white);
  margin-right: 4px;
}

.card__price {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4vw, 3.2rem);
  font-weight: 900;
  color: var(--color-white);
  line-height: 1;
}

.card__period {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--color-gray-600);
  text-transform: uppercase;
  margin-left: 8px;
}

/* Features List */
.card__features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
  flex-grow: 1;
}

.card__features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.88rem;
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

/* Buttons inside cards */
.card__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: background 0.3s var(--ease), color 0.3s var(--ease), border-color 0.3s var(--ease), transform 0.2s var(--ease), box-shadow 0.3s var(--ease);
}

.card__btn--dark {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-white);
}

.card__btn--dark:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.card__btn--lime {
  background: var(--color-lime);
  color: var(--color-black);
  border: 1px solid var(--color-lime);
}

.card__btn--lime:hover {
  background: #d4ff00;
  border-color: #d4ff00;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(200, 244, 0, 0.25);
}

.card__btn:active {
  transform: translateY(0);
}

/* =========================================================
   TIER BREAKDOWN
   ========================================================= */
.breakdown {
  border-top: 1px solid var(--color-border);
  padding-top: clamp(48px, 8vw, 80px);
}

.breakdown__title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--color-white);
  margin-bottom: clamp(28px, 5vw, 44px);
}

.breakdown__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.breakdown-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: border-color 0.3s ease;
}

.breakdown-card:hover {
  border-color: rgba(255, 255, 255, 0.08);
}

.breakdown-card__title {
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--color-gray-400);
  text-transform: uppercase;
  margin-bottom: 18px;
}

.breakdown-card__desc {
  font-size: 0.85rem;
  color: var(--color-gray-600);
  line-height: 1.6;
}

.breakdown-card__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.breakdown-card__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  font-family: var(--font-display);
  letter-spacing: 0.08em;
}

.row-label {
  font-weight: 800;
  color: var(--color-gray-400);
}

.row-val {
  font-weight: 700;
  color: var(--color-lime);
}

/* =========================================================
   RESPONSIVE DESIGN (DESKTOP & MOBILE & TABLET)
   ========================================================= */
@media (max-width: 1024px) {
  .membership__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .breakdown__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  /* Push third breakdown element full width on tablet */
  #breakdown-support {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .membership__grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  /* Re-adjust active card margin for mobile popup badge spacing */
  .card--active {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .breakdown__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  #breakdown-support {
    grid-column: auto;
  }
}
</style>
