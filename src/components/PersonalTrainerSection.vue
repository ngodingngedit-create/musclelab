<template>
  <section class="pt-section" id="personal-trainers">
    <div class="pt-section__inner">

      <!-- Header -->
      <div class="pt-section__header">
        <div class="pt-section__header-left">
          <p class="pt-section__eyebrow section-label">{{ ts.eyebrow }}</p>
          <h2 class="pt-section__title">
            {{ ts.title }}
            <span class="pt-title-lime">{{ ts.titleLime }}</span>
          </h2>
          <div class="pt-section__underline"></div>
        </div>
        <div class="pt-section__header-right">
          <p class="pt-section__desc">{{ ts.desc }}</p>
          <button class="pt-view-all" id="trainer-view-all" @click="navigateTo('trainer-catalog')">
            {{ ts.viewAll }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <!-- Trainer Cards Grid -->
      <div class="pt-section__grid">
        <div
          v-for="(trainer, i) in popularTrainers"
          :key="trainer.id"
          class="pt-card"
          :id="`trainer-card-${trainer.id}`"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <!-- Photo -->
          <div class="pt-card__photo-wrap">
            <img :src="trainer.photo" :alt="trainer.name" class="pt-card__photo" loading="lazy" />
            <div class="pt-card__photo-overlay"></div>
            <!-- Rating pill -->
            <div class="pt-card__rating">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#c8f400" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              {{ trainer.rating }}
            </div>
          </div>

          <!-- Content -->
          <div class="pt-card__content">
            <div class="pt-card__specialty-badge">{{ trainer.specialtyLabel }}</div>
            <h3 class="pt-card__name">{{ trainer.name }}</h3>

            <div class="pt-card__stats">
              <div class="pt-stat">
                <span class="pt-stat__val">{{ trainer.experience }}</span>
                <span class="pt-stat__label">{{ ts.experience }}</span>
              </div>
              <div class="pt-stat-divider"></div>
              <div class="pt-stat">
                <span class="pt-stat__val">{{ trainer.clients }}+</span>
                <span class="pt-stat__label">{{ ts.clients }}</span>
              </div>
            </div>

            <div class="pt-card__price-row">
              <div class="pt-card__price">
                <span class="pt-card__price-currency">Rp</span>
                <span class="pt-card__price-amount">{{ trainer.price }}</span>
                <span class="pt-card__price-per">{{ ts.perSession }}</span>
              </div>
              <button
                class="pt-card__order-btn"
                :id="`trainer-order-${trainer.id}`"
                @click="navigateToTrainerOrder(trainer)"
              >
                {{ ts.orderBtn }}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useNavigation } from '../composables/useNavigation'

const { t, currentLang } = useLanguage()
const { navigateTo, navigateToTrainerOrder } = useNavigation()

const ts = computed(() => t.value.trainerSection)

const popularTrainers = computed(() => {
  const isId = currentLang.value === 'id'
  return [
    {
      id: 'marcus',
      name: 'MARCUS THORNE',
      photo: '/class_hiit.png',
      specialtyLabel: isId ? 'HIIT & METABOLIK' : 'HIIT & METABOLIC',
      filterKey: 'hiit',
      rating: '4.9',
      experience: isId ? '8 TH' : '8 YRS',
      clients: 120,
      price: '350.000',
      bio: isId
        ? 'Spesialis HIIT dengan fokus pada pembakaran lemak dan peningkatan stamina jangka panjang.'
        : 'HIIT specialist focused on fat loss and sustained stamina improvement.',
    },
    {
      id: 'elena',
      name: 'ELENA VOLKOV',
      photo: '/class_yoga.png',
      specialtyLabel: isId ? 'YOGA & PEMULIHAN' : 'YOGA & RECOVERY',
      filterKey: 'yoga',
      rating: '4.8',
      experience: isId ? '10 TH' : '10 YRS',
      clients: 95,
      price: '280.000',
      bio: isId
        ? 'Ahli yoga dan pemulihan dengan pendekatan holistik untuk keseimbangan tubuh dan pikiran.'
        : 'Yoga and recovery expert with a holistic approach to body-mind balance.',
    },
    {
      id: 'sarah',
      name: 'SARAH CHEN',
      photo: '/class_weights.png',
      specialtyLabel: isId ? 'LATIHAN BEBAN' : 'WEIGHT TRAINING',
      filterKey: 'strength',
      rating: '4.9',
      experience: isId ? '7 TH' : '7 YRS',
      clients: 110,
      price: '320.000',
      bio: isId
        ? 'Pelatih kekuatan bersertifikat yang membangun fondasi otot dengan program terstruktur.'
        : 'Certified strength coach who builds muscle foundations with structured programming.',
    },
    {
      id: 'jaxon',
      name: 'JAXON REED',
      photo: '/class_boxing.png',
      specialtyLabel: isId ? 'TINJU & PERTARUNGAN' : 'BOXING & COMBAT',
      filterKey: 'combat',
      rating: '4.7',
      experience: isId ? '12 TH' : '12 YRS',
      clients: 85,
      price: '400.000',
      bio: isId
        ? 'Mantan atlet tinju profesional yang mengajarkan teknik dan kondisioning kardio.'
        : 'Former professional boxer teaching technique and cardio conditioning.',
    },
  ]
})
</script>

<style scoped>
/* =========================================================
   SECTION
   ========================================================= */
.pt-section {
  padding: var(--section-pad) 0;
  background: var(--color-black);
  border-top: 1px solid #0f0f0f;
}

.pt-section__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 64px);
}

/* =========================================================
   HEADER
   ========================================================= */
.pt-section__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: clamp(40px, 6vw, 72px);
  flex-wrap: wrap;
}

.pt-section__eyebrow { margin-bottom: 12px; }

.pt-section__title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #fff;
  line-height: 1;
}
.pt-title-lime { color: var(--color-lime); }

.pt-section__underline {
  width: 60px;
  height: 3px;
  background: var(--color-lime);
  margin-top: 14px;
  border-radius: 2px;
}

.pt-section__header-right {
  text-align: right;
  flex-shrink: 0;
  max-width: 360px;
}

.pt-section__desc {
  font-size: 0.82rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 14px;
}

.pt-view-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-lime);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: gap 0.2s ease, opacity 0.2s;
  padding: 0;
}
.pt-view-all:hover { gap: 14px; }

/* =========================================================
   GRID
   ========================================================= */
.pt-section__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

/* =========================================================
   TRAINER CARD
   ========================================================= */
.pt-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: fadeUp 0.6s var(--ease) both;
  transition: border-color 0.3s, transform 0.35s var(--ease);
}
.pt-card:hover {
  border-color: rgba(200,244,0,0.25);
  transform: translateY(-6px);
}

/* Photo */
.pt-card__photo-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  flex-shrink: 0;
}
.pt-card__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: brightness(0.75) contrast(1.1) grayscale(0.2);
  transition: transform 0.5s var(--ease), filter 0.4s;
}
.pt-card:hover .pt-card__photo {
  transform: scale(1.06);
  filter: brightness(0.6) contrast(1.1) grayscale(0.1);
}
.pt-card__photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%);
}

/* Rating pill */
.pt-card__rating {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(0,0,0,0.6);
  border: 1px solid rgba(200,244,0,0.2);
  backdrop-filter: blur(8px);
  padding: 5px 10px;
  border-radius: 50px;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.05em;
}

/* Content */
.pt-card__content {
  padding: 18px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.pt-card__specialty-badge {
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-lime);
  background: rgba(200,244,0,0.08);
  border: 1px solid rgba(200,244,0,0.15);
  padding: 4px 10px;
  border-radius: 50px;
  display: inline-block;
  align-self: flex-start;
}

.pt-card__name {
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  line-height: 1;
  letter-spacing: 0.02em;
}

/* Stats row */
.pt-card__stats {
  display: flex;
  align-items: center;
  gap: 16px;
}
.pt-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pt-stat__val {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}
.pt-stat__label {
  font-family: var(--font-display);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #444;
}
.pt-stat-divider {
  width: 1px;
  height: 28px;
  background: #1e1e1e;
}

/* Price + Button */
.pt-card__price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #111;
}
.pt-card__price {
  display: flex;
  align-items: baseline;
  gap: 3px;
}
.pt-card__price-currency {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  color: #555;
}
.pt-card__price-amount {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 900;
  color: var(--color-lime);
  line-height: 1;
}
.pt-card__price-per {
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 600;
  color: #444;
  letter-spacing: 0.05em;
}

.pt-card__order-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  background: var(--color-lime);
  color: #000;
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  white-space: nowrap;
}
.pt-card__order-btn:hover { background: #d4ff00; transform: translateY(-1px); }

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 1100px) {
  .pt-section__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .pt-section__header { flex-direction: column; align-items: flex-start; }
  .pt-section__header-right { text-align: left; max-width: 100%; }
  .pt-section__grid { grid-template-columns: 1fr; gap: 14px; }
}
</style>
