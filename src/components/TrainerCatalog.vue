<template>
  <section class="tc" id="trainer-catalog">

    <!-- Hero -->
    <div class="tc__hero">
      <div class="tc__hero-bg" aria-hidden="true"></div>
      <div class="tc__hero-inner">
        <button class="tc__back-btn" id="tc-back-home" @click="navigateTo('landing')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {{ tc.backBtn }}
        </button>
        <p class="tc__eyebrow section-label">MUSCLE LAB GYM</p>
        <h1 class="tc__title">{{ tc.pageTitle }}</h1>
        <p class="tc__sub">{{ tc.pageSub }}</p>
        <!-- Search -->
        <div class="tc__search-wrap">
          <svg class="tc__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input v-model="search" class="tc__search" id="tc-search" type="text" :placeholder="tc.searchPlaceholder" autocomplete="off" />
          <button v-if="search" class="tc__search-clear" @click="search = ''" aria-label="Clear">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="tc__filters-wrap">
      <div class="tc__filters" id="tc-filters">
        <button v-for="f in filters" :key="f.key" :id="`tc-filter-${f.key}`"
          class="tc-filter-btn" :class="{ 'tc-filter-btn--active': activeFilter === f.key }"
          @click="activeFilter = f.key">{{ f.label }}</button>
      </div>
    </div>

    <!-- Grid -->
    <div class="tc__inner">
      <div v-if="filteredTrainers.length === 0" class="tc__empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <p>{{ tc.noResults }}</p>
      </div>

      <div class="tc__grid" v-else>
        <div v-for="(trainer, i) in filteredTrainers" :key="trainer.id"
          class="tcard" :id="`tcard-${trainer.id}`"
          :style="{ animationDelay: `${i * 0.07}s` }">

          <!-- Photo -->
          <div class="tcard__photo-wrap">
            <img :src="trainer.photo" :alt="trainer.name" class="tcard__photo" loading="lazy" />
            <div class="tcard__photo-overlay"></div>
            <div class="tcard__rating">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#c8f400" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              {{ trainer.rating }}
            </div>
            <span class="tcard__specialty-badge">{{ trainer.specialtyLabel }}</span>
          </div>

          <!-- Content -->
          <div class="tcard__content">
            <h3 class="tcard__name">{{ trainer.name }}</h3>
            <p class="tcard__bio">{{ trainer.bio }}</p>

            <div class="tcard__stats">
              <div class="tcard__stat">
                <span class="tcard__stat-val">{{ trainer.experience }}</span>
                <span class="tcard__stat-label">{{ tc.experience }}</span>
              </div>
              <div class="tcard__stat-div"></div>
              <div class="tcard__stat">
                <span class="tcard__stat-val">{{ trainer.clients }}+</span>
                <span class="tcard__stat-label">{{ tc.clients }}</span>
              </div>
              <div class="tcard__stat-div"></div>
              <div class="tcard__stat">
                <span class="tcard__stat-val">{{ trainer.rating }}</span>
                <span class="tcard__stat-label">{{ tc.rating }}</span>
              </div>
            </div>

            <div class="tcard__footer">
              <div class="tcard__price">
                <span class="tcard__price-label">{{ tc.priceLabel }}</span>
                <div class="tcard__price-val">
                  <span class="tcard__price-cur">Rp</span>
                  <span class="tcard__price-num">{{ trainer.price }}</span>
                </div>
              </div>
              <button class="tcard__order-btn" :id="`tc-order-${trainer.id}`" @click="navigateToTrainerOrder(trainer)">
                {{ tc.orderBtn }}
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
import { ref, computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useNavigation } from '../composables/useNavigation'

const { t, currentLang } = useLanguage()
const { navigateTo, navigateToTrainerOrder } = useNavigation()

const tc = computed(() => t.value.trainerCatalog)

const search = ref('')
const activeFilter = ref('all')

const filters = computed(() => [
  { key: 'all',      label: tc.value.filterAll },
  { key: 'hiit',     label: tc.value.filterHiit },
  { key: 'yoga',     label: tc.value.filterYoga },
  { key: 'strength', label: tc.value.filterStrength },
  { key: 'combat',   label: tc.value.filterCombat },
  { key: 'mindbody', label: tc.value.filterMindBody },
  { key: 'cardio',   label: tc.value.filterCardio },
])

const allTrainers = computed(() => {
  const isId = currentLang.value === 'id'
  return [
    {
      id: 'marcus', filterKey: 'hiit',
      name: 'MARCUS THORNE', photo: '/class_hiit.png',
      specialtyLabel: isId ? 'HIIT & METABOLIK' : 'HIIT & METABOLIC',
      rating: '4.9', experience: isId ? '8 TH' : '8 YRS', clients: 120, price: '350.000',
      bio: isId ? 'Spesialis HIIT dengan fokus pada pembakaran lemak dan peningkatan stamina jangka panjang.' : 'HIIT specialist focused on fat loss and sustained stamina improvement.',
    },
    {
      id: 'elena', filterKey: 'yoga',
      name: 'ELENA VOLKOV', photo: '/class_yoga.png',
      specialtyLabel: isId ? 'YOGA & PEMULIHAN' : 'YOGA & RECOVERY',
      rating: '4.8', experience: isId ? '10 TH' : '10 YRS', clients: 95, price: '280.000',
      bio: isId ? 'Ahli yoga dan pemulihan dengan pendekatan holistik untuk keseimbangan tubuh dan pikiran.' : 'Yoga and recovery expert with a holistic approach to body-mind balance.',
    },
    {
      id: 'sarah', filterKey: 'strength',
      name: 'SARAH CHEN', photo: '/class_weights.png',
      specialtyLabel: isId ? 'LATIHAN BEBAN' : 'WEIGHT TRAINING',
      rating: '4.9', experience: isId ? '7 TH' : '7 YRS', clients: 110, price: '320.000',
      bio: isId ? 'Pelatih kekuatan bersertifikat yang membangun fondasi otot dengan program terstruktur.' : 'Certified strength coach who builds muscle foundations with structured programming.',
    },
    {
      id: 'jaxon', filterKey: 'combat',
      name: 'JAXON REED', photo: '/class_boxing.png',
      specialtyLabel: isId ? 'TINJU & PERTARUNGAN' : 'BOXING & COMBAT',
      rating: '4.7', experience: isId ? '12 TH' : '12 YRS', clients: 85, price: '400.000',
      bio: isId ? 'Mantan atlet tinju profesional yang mengajarkan teknik dan kondisioning kardio.' : 'Former professional boxer teaching technique and cardio conditioning.',
    },
    {
      id: 'mila', filterKey: 'mindbody',
      name: 'MILA SANTOS', photo: '/class_yoga.png',
      specialtyLabel: isId ? 'PILATES & PIKIRAN-TUBUH' : 'PILATES & MIND-BODY',
      rating: '4.8', experience: isId ? '9 TH' : '9 YRS', clients: 78, price: '260.000',
      bio: isId ? 'Instruktur pilates bersertifikat dengan keahlian dalam kesadaran tubuh dan pergerakan inti.' : 'Certified Pilates instructor specializing in body awareness and core movement.',
    },
    {
      id: 'derek', filterKey: 'strength',
      name: 'DEREK WALSH', photo: '/class_weights.png',
      specialtyLabel: 'CROSSFIT',
      rating: '4.6', experience: isId ? '6 TH' : '6 YRS', clients: 100, price: '380.000',
      bio: isId ? 'Pelatih CrossFit Level 3 yang menggabungkan kekuatan, ketahanan, dan kelincahan fungsional.' : 'CrossFit Level 3 coach combining strength, endurance, and functional agility.',
    },
    {
      id: 'nina', filterKey: 'cardio',
      name: 'NINA PARK', photo: '/class_hiit.png',
      specialtyLabel: isId ? 'BERSEPEDA & KARDIO' : 'CYCLING & CARDIO',
      rating: '4.7', experience: isId ? '5 TH' : '5 YRS', clients: 130, price: '250.000',
      bio: isId ? 'Spesialis kardio yang memotivasi klien melalui sesi bersepeda indoor yang energik dan intens.' : 'Cardio specialist who motivates clients through high-energy indoor cycling sessions.',
    },
    {
      id: 'krish', filterKey: 'combat',
      name: 'KRISH PATEL', photo: '/class_boxing.png',
      specialtyLabel: 'MUAY THAI',
      rating: '4.9', experience: isId ? '15 TH' : '15 YRS', clients: 70, price: '420.000',
      bio: isId ? 'Juara Muay Thai regional yang melatih teknik, kekuatan, dan disiplin seni bela diri.' : 'Regional Muay Thai champion coaching technique, strength, and martial discipline.',
    },
  ]
})

const filteredTrainers = computed(() => {
  let list = allTrainers.value
  if (activeFilter.value !== 'all') list = list.filter(t => t.filterKey === activeFilter.value)
  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    list = list.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.specialtyLabel.toLowerCase().includes(q) ||
      t.bio.toLowerCase().includes(q)
    )
  }
  return list
})
</script>

<style scoped>
/* =========================================================
   PAGE
   ========================================================= */
.tc {
  min-height: 100dvh;
  background: var(--color-black);
}

/* =========================================================
   HERO
   ========================================================= */
.tc__hero {
  position: relative;
  padding: clamp(100px, 14vw, 160px) 0 clamp(48px, 6vw, 72px);
  overflow: hidden;
}
.tc__hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,244,0,0.06) 0%, transparent 70%),
    linear-gradient(to bottom, #050505 0%, var(--color-black) 100%);
  pointer-events: none;
}
.tc__hero-inner {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 64px);
}

.tc__back-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-display); font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: #666; border: 1px solid #1e1e1e; background: transparent;
  padding: 9px 18px; border-radius: 50px; cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  margin-bottom: clamp(28px, 4vw, 48px);
}
.tc__back-btn:hover { color: var(--color-lime); border-color: rgba(200,244,0,0.3); }

.tc__eyebrow { margin-bottom: 12px; }

.tc__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 900; text-transform: uppercase; color: #fff;
  line-height: 0.9; letter-spacing: 0.02em;
  margin-bottom: clamp(14px, 2vw, 20px);
}
.tc__sub {
  max-width: 540px;
  font-size: clamp(0.82rem, 1.4vw, 0.95rem); color: #555;
  line-height: 1.7; margin-bottom: clamp(28px, 4vw, 44px);
}

/* Search */
.tc__search-wrap { position: relative; max-width: 460px; }
.tc__search-icon {
  position: absolute; left: 18px; top: 50%;
  transform: translateY(-50%); pointer-events: none;
}
.tc__search {
  width: 100%; background: #0d0d0d; border: 1px solid #1e1e1e;
  border-radius: 50px; padding: 13px 48px 13px 44px;
  font-family: var(--font-display); font-size: 0.75rem;
  font-weight: 700; letter-spacing: 0.12em; color: #fff;
  outline: none; transition: border-color 0.2s;
}
.tc__search::placeholder { color: #444; }
.tc__search:focus { border-color: rgba(200,244,0,0.35); }
.tc__search-clear {
  position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
  display: flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; background: #1a1a1a;
  border-radius: 50%; cursor: pointer; transition: background 0.2s;
}
.tc__search-clear:hover { background: #2a2a2a; }

/* =========================================================
   FILTER BAR
   ========================================================= */
.tc__filters-wrap {
  border-top: 1px solid #111; border-bottom: 1px solid #111;
  background: rgba(10,10,10,0.95); backdrop-filter: blur(12px);
  position: sticky; top: var(--nav-height); z-index: 10;
}
.tc__filters {
  max-width: 1400px; margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 64px);
  display: flex; gap: 4px; overflow-x: auto;
  scrollbar-width: none; -ms-overflow-style: none;
}
.tc__filters::-webkit-scrollbar { display: none; }
.tc-filter-btn {
  flex-shrink: 0; font-family: var(--font-display);
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: #555;
  background: transparent; border: none; padding: 16px 20px;
  cursor: pointer; border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.tc-filter-btn:hover { color: #999; }
.tc-filter-btn--active { color: var(--color-lime); border-bottom-color: var(--color-lime); }

/* =========================================================
   GRID
   ========================================================= */
.tc__inner {
  max-width: 1400px; margin: 0 auto;
  padding: clamp(40px, 6vw, 80px) clamp(20px, 5vw, 64px);
}
.tc__empty {
  display: flex; flex-direction: column; align-items: center;
  gap: 16px; padding: 80px 0; color: #333;
  font-family: var(--font-display); font-size: 0.8rem;
  font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
}
.tc__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* =========================================================
   TRAINER CARD
   ========================================================= */
.tcard {
  background: var(--color-card); border: 1px solid var(--color-border);
  border-radius: 18px; overflow: hidden; display: flex; flex-direction: column;
  animation: fadeUp 0.5s var(--ease) both;
  transition: border-color 0.3s, transform 0.35s var(--ease);
}
.tcard:hover { border-color: rgba(200,244,0,0.25); transform: translateY(-6px); }

/* Photo */
.tcard__photo-wrap {
  position: relative; aspect-ratio: 4 / 3;
  overflow: hidden; flex-shrink: 0;
}
.tcard__photo {
  width: 100%; height: 100%; object-fit: cover;
  object-position: center top;
  filter: brightness(0.75) contrast(1.1) grayscale(0.2);
  transition: transform 0.5s var(--ease), filter 0.4s;
}
.tcard:hover .tcard__photo { transform: scale(1.06); filter: brightness(0.6) contrast(1.1); }
.tcard__photo-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%);
}

.tcard__rating {
  position: absolute; top: 12px; right: 12px;
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(0,0,0,0.6); border: 1px solid rgba(200,244,0,0.2);
  backdrop-filter: blur(8px); padding: 5px 10px; border-radius: 50px;
  font-family: var(--font-display); font-size: 0.72rem; font-weight: 800;
  color: #fff; letter-spacing: 0.05em;
}

.tcard__specialty-badge {
  position: absolute; bottom: 12px; left: 12px;
  font-family: var(--font-display); font-size: 0.58rem; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--color-lime); background: rgba(200,244,0,0.1);
  border: 1px solid rgba(200,244,0,0.2); backdrop-filter: blur(6px);
  padding: 4px 10px; border-radius: 50px;
}

/* Content */
.tcard__content {
  padding: 18px 18px; display: flex; flex-direction: column;
  gap: 10px; flex: 1;
}
.tcard__name {
  font-family: var(--font-display); font-size: clamp(1.1rem, 1.8vw, 1.45rem);
  font-weight: 900; text-transform: uppercase; color: #fff;
  line-height: 1; letter-spacing: 0.02em;
}
.tcard__bio {
  font-size: 0.77rem; color: #4a4a4a; line-height: 1.6; flex: 1;
}
.tcard__stats {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 0; border-top: 1px solid #111;
}
.tcard__stat { display: flex; flex-direction: column; gap: 2px; }
.tcard__stat-val {
  font-family: var(--font-display); font-size: 0.95rem;
  font-weight: 900; color: #fff; line-height: 1;
}
.tcard__stat-label {
  font-family: var(--font-display); font-size: 0.52rem;
  font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #3a3a3a;
}
.tcard__stat-div { width: 1px; height: 24px; background: #1a1a1a; }

/* Footer */
.tcard__footer {
  display: flex; align-items: center; justify-content: space-between;
  gap: 10px; padding-top: 10px; border-top: 1px solid #111;
}
.tcard__price { display: flex; flex-direction: column; gap: 1px; }
.tcard__price-label {
  font-family: var(--font-display); font-size: 0.52rem;
  font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #3a3a3a;
}
.tcard__price-val { display: flex; align-items: baseline; gap: 2px; }
.tcard__price-cur { font-family: var(--font-display); font-size: 0.62rem; font-weight: 700; color: #555; }
.tcard__price-num { font-family: var(--font-display); font-size: 1.05rem; font-weight: 900; color: var(--color-lime); }

.tcard__order-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 16px; background: transparent;
  border: 1px solid rgba(200,244,0,0.3); border-radius: 8px;
  font-family: var(--font-display); font-size: 0.65rem; font-weight: 800;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-lime);
  cursor: pointer; transition: background 0.25s, color 0.25s, transform 0.2s;
  white-space: nowrap;
}
.tcard__order-btn:hover { background: var(--color-lime); color: #000; transform: translateY(-1px); }

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 1200px) { .tc__grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 900px)  { .tc__grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
@media (max-width: 640px)  {
  .tc__hero { padding-top: 90px; }
  .tc__grid { grid-template-columns: 1fr; gap: 14px; }
  .tc__title { line-height: 0.95; }
  .tc-filter-btn { padding: 14px 12px; font-size: 0.62rem; }
}
</style>
