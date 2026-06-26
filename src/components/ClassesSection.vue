<template>
  <section class="classes" id="classes">
    <div class="classes__inner">
      <!-- Section Header -->
      <div class="classes__header">
        <div class="classes__title-group">
          <h2 class="classes__title">
            {{ t.classes.title }} <span class="title-lime">{{ t.classes.titleLime }}</span>
          </h2>
          <div class="title-underline"></div>
        </div>
        <div class="classes__header-right">
          <p class="classes__header-desc">
            {{ t.classes.desc }}
          </p>
          <button class="view-all-link" id="classes-view-all" @click="navigateTo('classes-catalog')">
            {{ t.classes.viewAll }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="classes__grid">
        <div
          v-for="(cls, i) in t.classes.list"
          :key="cls.id"
          class="class-card"
          :id="`class-card-${cls.id}`"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <!-- Image -->
          <div class="class-card__img-wrap">
            <img :src="classImages[cls.id]" :alt="cls.name + ' class'" class="class-card__img" loading="lazy" />
            <div class="class-card__img-overlay"></div>
          </div>

          <!-- Badge -->
          <span class="class-card__category">{{ cls.category }}</span>

          <!-- Content -->
          <div class="class-card__content">
            <h3 class="class-card__name">{{ cls.name }}</h3>
            <div class="class-card__meta">
              <div class="meta-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2" class="meta-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{{ cls.time }}</span>
              </div>
              <div class="meta-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2" class="meta-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>{{ cls.trainer }}</span>
              </div>
            </div>
          </div>

          <div class="class-card__hover">
            <button class="class-card__book-btn" :id="`book-${cls.id}`" @click="navigateToClassRegister(cls)">
              {{ t.classes.book }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
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
const { navigateTo, navigateToClassRegister } = useNavigation()

// Map class id to image path (stays the same regardless of language)
const classImages = {
  yoga: '/class_yoga.png',
  hiit: '/class_hiit.png',
  weights: '/class_weights.png',
  boxing: '/class_boxing.png',
}
</script>

<style scoped>
/* =========================================================
   CLASSES SECTION
   ========================================================= */
.classes {
  padding: var(--section-pad) 0;
  background: var(--color-black);
}

.classes__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 64px);
}

/* Header */
.classes__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: clamp(40px, 6vw, 72px);
  flex-wrap: wrap;
}

.classes__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #fff;
  line-height: 1;
}

.title-lime { color: #c8f400; }

.title-underline {
  width: 60px;
  height: 3px;
  background: #c8f400;
  margin-top: 14px;
  border-radius: 2px;
}

.classes__header-right {
  text-align: right;
  flex-shrink: 0;
}

.classes__header-desc {
  font-size: 0.82rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 12px;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #c8f400;
  transition: gap 0.2s ease, opacity 0.2s;
}
.view-all-link:hover { gap: 14px; }

/* Grid */
.classes__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* Card */
.class-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 0.3s ease;
  animation: fadeUp 0.6s var(--ease) both;
  aspect-ratio: 3 / 4.5;
  display: flex;
  flex-direction: column;
}

.class-card:hover {
  transform: translateY(-8px);
  border-color: rgba(200, 244, 0, 0.3);
}

/* Card Image */
.class-card__img-wrap {
  position: absolute;
  inset: 0;
}
.class-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: brightness(0.65) contrast(1.1);
}
.class-card:hover .class-card__img {
  transform: scale(1.06);
  filter: brightness(0.5) contrast(1.1);
}
.class-card__img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.1) 0%,
    rgba(0,0,0,0.0) 40%,
    rgba(0,0,0,0.85) 100%
  );
}

/* Category badge */
.class-card__category {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 3;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 50px;
}

/* Card Content */
.class-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  padding: 20px 18px;
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.class-card:hover .class-card__content {
  transform: translateY(-48px);
}

.class-card__name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.02em;
  line-height: 1;
  margin-bottom: 12px;
}

.class-card__meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #bbb;
  text-transform: uppercase;
}

.meta-icon { flex-shrink: 0; }

/* Hover CTA */
.class-card__hover {
  position: absolute;
  bottom: 16px;
  left: 18px;
  right: 18px;
  z-index: 4;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.class-card:hover .class-card__hover {
  opacity: 1;
  transform: translateY(0);
}

.class-card__book-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 11px;
  background: #c8f400;
  color: #000;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 10px;
  transition: background 0.2s;
}
.class-card__book-btn:hover { background: #d4ff00; }

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 1100px) {
  .classes__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .classes__header { flex-direction: column; align-items: flex-start; }
  .classes__header-right { text-align: left; }
  .classes__grid { grid-template-columns: 1fr; gap: 14px; }
  .class-card { aspect-ratio: 4 / 3; }
  .class-card__content { transform: none !important; }
  .class-card__hover { display: none; }
}
</style>
