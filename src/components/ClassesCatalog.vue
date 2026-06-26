<template>
  <section class="catalog" id="classes-catalog">
    <!-- Hero Header -->
    <div class="catalog__hero">
      <div class="catalog__hero-bg" aria-hidden="true"></div>
      <div class="catalog__hero-inner">
        <button class="catalog__back-btn" id="catalog-back-home" @click="navigateTo('landing')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {{ tc.backBtn }}
        </button>
        <p class="catalog__eyebrow section-label">MUSCLE LAB GYM</p>
        <h1 class="catalog__title">{{ tc.pageTitle }}</h1>
        <p class="catalog__sub">{{ tc.pageSub }}</p>

        <!-- Search -->
        <div class="catalog__search-wrap">
          <svg class="catalog__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            v-model="search"
            class="catalog__search"
            id="catalog-search"
            type="text"
            :placeholder="tc.searchPlaceholder"
            autocomplete="off"
          />
          <button v-if="search" class="catalog__search-clear" @click="search = ''" aria-label="Clear search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="catalog__filters-wrap">
      <div class="catalog__filters" id="catalog-filters">
        <button
          v-for="f in filters"
          :key="f.key"
          :id="`filter-${f.key}`"
          class="filter-btn"
          :class="{ 'filter-btn--active': activeFilter === f.key }"
          @click="activeFilter = f.key"
        >{{ f.label }}</button>
      </div>
    </div>

    <!-- Grid -->
    <div class="catalog__inner">
      <div v-if="filteredClasses.length === 0" class="catalog__empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <p>{{ tc.noResults }}</p>
      </div>

      <div class="catalog__grid" v-else>
        <div
          v-for="(cls, i) in filteredClasses"
          :key="cls.id"
          class="ccard"
          :id="`ccard-${cls.id}`"
          :style="{ animationDelay: `${i * 0.07}s` }"
        >
          <!-- Image -->
          <div class="ccard__img-wrap">
            <img :src="classImages[cls.id] || '/class_yoga.png'" :alt="cls.name" class="ccard__img" loading="lazy" />
            <div class="ccard__img-overlay"></div>
          </div>

          <!-- Level badge -->
          <span class="ccard__level-badge" :class="`ccard__level-badge--${cls.level}`">
            {{ tc.levels[cls.level] }}
          </span>

          <!-- Category badge -->
          <span class="ccard__category">{{ cls.category }}</span>

          <!-- Content -->
          <div class="ccard__content">
            <h3 class="ccard__name">{{ cls.name }}</h3>
            <p class="ccard__desc">{{ cls.desc }}</p>

            <div class="ccard__meta">
              <div class="ccard__meta-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{{ cls.time }}</span>
              </div>
              <div class="ccard__meta-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>{{ cls.trainer }}</span>
              </div>
              <div class="ccard__meta-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>{{ tc.duration }}: {{ cls.duration }}</span>
              </div>
              <div class="ccard__meta-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>{{ tc.capacity }}: {{ cls.capacity }}</span>
              </div>
            </div>

            <button class="ccard__register-btn" :id="`catalog-register-${cls.id}`" @click="navigateToClassRegister(cls)">
              {{ tc.registerBtn }}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
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
const { navigateTo, navigateToClassRegister } = useNavigation()

const tc = computed(() => t.value.classesCatalog)

const search = ref('')
const activeFilter = ref('all')

const filters = computed(() => [
  { key: 'all',        label: tc.value.filterAll },
  { key: 'recovery',   label: tc.value.filterRecovery },
  { key: 'metabolic',  label: tc.value.filterMetabolic },
  { key: 'strength',   label: tc.value.filterStrength },
  { key: 'combat',     label: tc.value.filterCombat },
  { key: 'mindbody',   label: tc.value.filterMindBody },
])

const allClasses = computed(() => {
  const lang = t.value
  const isId = currentLang.value === 'id'
  return [
    {
      id: 'yoga',
      filterKey: 'recovery',
      category: lang.classesCatalog.filterRecovery,
      name: 'YOGA',
      desc: isId
        ? 'Latihan kelenturan dan keseimbangan untuk pemulihan optimal tubuh dan pikiran.'
        : 'Flexibility and balance training for optimal body and mind recovery.',
      time: lang.classes.list.find(c => c.id === 'yoga')?.time ?? 'MON/WED — 07:00 AM',
      trainer: 'ELENA VOLKOV',
      duration: '60 MIN',
      capacity: '20 PAX',
      level: 'beginner',
    },
    {
      id: 'hiit',
      filterKey: 'metabolic',
      category: lang.classesCatalog.filterMetabolic,
      name: 'HIIT',
      desc: isId
        ? 'Latihan interval intensitas tinggi untuk membakar lemak dan meningkatkan stamina.'
        : 'High-intensity interval training to torch fat and build lasting stamina.',
      time: lang.classes.list.find(c => c.id === 'hiit')?.time ?? 'TUE/THU — 06:00 PM',
      trainer: 'MARCUS THORNE',
      duration: '45 MIN',
      capacity: '25 PAX',
      level: 'intermediate',
    },
    {
      id: 'weights',
      filterKey: 'strength',
      category: lang.classesCatalog.filterStrength,
      name: lang.classes.list.find(c => c.id === 'weights')?.name ?? 'WEIGHT TRAINING',
      desc: isId
        ? 'Program latihan beban terstruktur untuk membangun kekuatan dan massa otot.'
        : 'Structured resistance training program to build raw strength and muscle mass.',
      time: lang.classes.list.find(c => c.id === 'weights')?.time ?? 'DAILY — 05:00 AM',
      trainer: 'SARAH CHEN',
      duration: '75 MIN',
      capacity: '15 PAX',
      level: 'advanced',
    },
    {
      id: 'boxing',
      filterKey: 'combat',
      category: lang.classesCatalog.filterCombat,
      name: lang.classes.list.find(c => c.id === 'boxing')?.name ?? 'BOXING',
      desc: isId
        ? 'Teknik tinju profesional dikombinasikan dengan kondisioning kardio intensif.'
        : 'Professional boxing techniques combined with intensive cardio conditioning.',
      time: lang.classes.list.find(c => c.id === 'boxing')?.time ?? 'FRI/SAT — 04:00 PM',
      trainer: 'JAXON REED',
      duration: '60 MIN',
      capacity: '18 PAX',
      level: 'intermediate',
    },
    {
      id: 'pilates',
      filterKey: 'mindbody',
      category: lang.classesCatalog.filterMindBody,
      name: 'PILATES',
      desc: isId
        ? 'Latihan inti tubuh dengan fokus pada kontrol gerak dan kesadaran tubuh.'
        : 'Core-focused movement with emphasis on body control and kinesthetic awareness.',
      time: isId ? 'SEL/KAM — 08:00 PAGI' : 'TUE/THU — 08:00 AM',
      trainer: 'MILA SANTOS',
      duration: '50 MIN',
      capacity: '16 PAX',
      level: 'beginner',
    },
    {
      id: 'crossfit',
      filterKey: 'strength',
      category: lang.classesCatalog.filterStrength,
      name: 'CROSSFIT',
      desc: isId
        ? 'Latihan fungsional berkekuatan tinggi yang menggabungkan kekuatan dan ketahanan.'
        : 'High-power functional training combining strength, endurance and agility.',
      time: isId ? 'SEN/RAB/JUM — 06:00 PAGI' : 'MON/WED/FRI — 06:00 AM',
      trainer: 'DEREK WALSH',
      duration: '60 MIN',
      capacity: '20 PAX',
      level: 'advanced',
    },
    {
      id: 'cycling',
      filterKey: 'metabolic',
      category: lang.classesCatalog.filterMetabolic,
      name: isId ? 'BERSEPEDA INDOOR' : 'INDOOR CYCLING',
      desc: isId
        ? 'Sesi kardio bersepeda dengan intensitas tinggi dan musik yang energik.'
        : 'High-energy indoor cycling cardio session with motivating music and intervals.',
      time: isId ? 'SETIAP HARI — 07:00 PAGI' : 'DAILY — 07:00 AM',
      trainer: 'NINA PARK',
      duration: '45 MIN',
      capacity: '30 PAX',
      level: 'beginner',
    },
    {
      id: 'muaythai',
      filterKey: 'combat',
      category: lang.classesCatalog.filterCombat,
      name: 'MUAY THAI',
      desc: isId
        ? 'Seni bela diri delapan senjata yang melatih kekuatan, kecepatan dan disiplin.'
        : 'The art of eight limbs — training power, speed, and combat discipline.',
      time: isId ? 'SAB/MIN — 10:00 PAGI' : 'SAT/SUN — 10:00 AM',
      trainer: 'KRISH PATEL',
      duration: '75 MIN',
      capacity: '15 PAX',
      level: 'intermediate',
    },
  ]
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

const filteredClasses = computed(() => {
  let list = allClasses.value
  if (activeFilter.value !== 'all') {
    list = list.filter(c => c.filterKey === activeFilter.value)
  }
  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    list = list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.trainer.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q)
    )
  }
  return list
})
</script>

<style scoped>
/* =========================================================
   CATALOG HERO
   ========================================================= */
.catalog {
  min-height: 100dvh;
  background: var(--color-black);
}

.catalog__hero {
  position: relative;
  padding: clamp(100px, 14vw, 160px) 0 clamp(48px, 6vw, 72px);
  overflow: hidden;
}

.catalog__hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,244,0,0.06) 0%, transparent 70%),
    linear-gradient(to bottom, #050505 0%, var(--color-black) 100%);
  pointer-events: none;
}

.catalog__hero-inner {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 64px);
}

.catalog__back-btn {
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
  margin-bottom: clamp(28px, 4vw, 48px);
}
.catalog__back-btn:hover { color: var(--color-lime); border-color: rgba(200,244,0,0.3); }

.catalog__eyebrow { margin-bottom: 12px; }

.catalog__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  line-height: 0.9;
  letter-spacing: 0.02em;
  margin-bottom: clamp(14px, 2vw, 20px);
}

.catalog__sub {
  max-width: 540px;
  font-size: clamp(0.82rem, 1.4vw, 0.95rem);
  color: #555;
  line-height: 1.7;
  margin-bottom: clamp(28px, 4vw, 44px);
}

/* Search */
.catalog__search-wrap {
  position: relative;
  max-width: 460px;
}

.catalog__search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.catalog__search {
  width: 100%;
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 50px;
  padding: 13px 48px 13px 44px;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #fff;
  outline: none;
  transition: border-color 0.2s;
}
.catalog__search::placeholder { color: #444; }
.catalog__search:focus { border-color: rgba(200,244,0,0.35); }

.catalog__search-clear {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #1a1a1a;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
}
.catalog__search-clear:hover { background: #2a2a2a; }

/* =========================================================
   FILTER BAR
   ========================================================= */
.catalog__filters-wrap {
  border-top: 1px solid #111;
  border-bottom: 1px solid #111;
  background: rgba(10,10,10,0.95);
  backdrop-filter: blur(12px);
  position: sticky;
  top: var(--nav-height);
  z-index: 10;
}

.catalog__filters {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 64px);
  display: flex;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.catalog__filters::-webkit-scrollbar { display: none; }

.filter-btn {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #555;
  background: transparent;
  border: none;
  padding: 16px 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.filter-btn:hover { color: #999; }
.filter-btn--active {
  color: var(--color-lime);
  border-bottom-color: var(--color-lime);
}

/* =========================================================
   GRID
   ========================================================= */
.catalog__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(40px, 6vw, 80px) clamp(20px, 5vw, 64px);
}

.catalog__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 80px 0;
  color: #333;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.catalog__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* =========================================================
   CLASS CARD
   ========================================================= */
.ccard {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  animation: fadeUp 0.5s var(--ease) both;
  transition: border-color 0.3s, transform 0.35s var(--ease);
}
.ccard:hover {
  border-color: rgba(200,244,0,0.25);
  transform: translateY(-6px);
}

/* Image */
.ccard__img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  flex-shrink: 0;
}
.ccard__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7) contrast(1.1);
  transition: transform 0.5s var(--ease), filter 0.4s;
}
.ccard:hover .ccard__img {
  transform: scale(1.06);
  filter: brightness(0.55) contrast(1.1);
}
.ccard__img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%);
}

/* Badges */
.ccard__level-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 50px;
  z-index: 2;
}
.ccard__level-badge--beginner    { background: rgba(0,200,100,0.15); color: #00c864; border: 1px solid rgba(0,200,100,0.25); }
.ccard__level-badge--intermediate { background: rgba(255,165,0,0.12); color: #f5a623; border: 1px solid rgba(255,165,0,0.2); }
.ccard__level-badge--advanced    { background: rgba(200,50,50,0.12); color: #e05252; border: 1px solid rgba(200,50,50,0.2); }

.ccard__category {
  position: absolute;
  top: 12px;
  left: 12px;
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #888;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(6px);
  padding: 4px 10px;
  border-radius: 50px;
  z-index: 2;
}

/* Content */
.ccard__content {
  padding: 20px 18px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.ccard__name {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 1.55rem);
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  line-height: 1;
  margin-bottom: 8px;
}

.ccard__desc {
  font-size: 0.78rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 14px;
  flex: 1;
}

.ccard__meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.ccard__meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #555;
}

/* Register Button */
.ccard__register-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid rgba(200,244,0,0.25);
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-lime);
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.2s;
  margin-top: auto;
}
.ccard__register-btn:hover {
  background: var(--color-lime);
  border-color: var(--color-lime);
  color: #000;
  transform: translateY(-1px);
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 1200px) {
  .catalog__grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 900px) {
  .catalog__grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}

@media (max-width: 640px) {
  .catalog__hero { padding-top: 90px; }
  .catalog__grid { grid-template-columns: 1fr; gap: 14px; }
  .catalog__title { line-height: 0.95; }
  .ccard__img-wrap { aspect-ratio: 16 / 7; }
  .filter-btn { padding: 14px 14px; font-size: 0.62rem; }
}

@media (max-width: 380px) {
  .catalog__search-wrap { max-width: 100%; }
  .ccard__name { font-size: 1.15rem; }
}
</style>
