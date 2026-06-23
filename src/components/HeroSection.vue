<template>
  <section class="hero" id="hero">
    <!-- Background Image -->
    <div class="hero__bg">
      <img src="/hero_athlete.png" alt="Elite athlete training" class="hero__bg-img" />
      <div class="hero__overlay"></div>
    </div>

    <!-- Vertical side text -->
    <div class="hero__side-text" aria-hidden="true">KINETIC EXCELLENCE</div>

    <!-- Content -->
    <div class="hero__content">
      <p class="hero__eyebrow">PRECISION PERFORMANCE</p>

      <h1 class="hero__headline">
        <span class="hero__headline-white">FORGED IN</span>
        <span class="hero__headline-lime">MOTION</span>
      </h1>

      <p class="hero__desc">
        The elite sanctuary for those who demand surgical precision
        in their training. We don't just build muscle; we curate kinetic excellence.
      </p>

      <div class="hero__ctas">
        <a href="#classes" class="btn-lime" id="hero-cta-join">
          JOIN THE LAB
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="#stats" class="btn-outline" id="hero-cta-stats">
          EXPLORE STATS
        </a>
      </div>
    </div>

    <!-- Stats ticker bar -->
    <div class="hero__stats-bar">
      <div class="stats-ticker">
        <div class="ticker-track">
          <span v-for="(s, i) in [...stats, ...stats]" :key="i" class="ticker-item">
            <strong>{{ s.value }}</strong> {{ s.label }}
            <span class="ticker-dot" aria-hidden="true">·</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero__scroll" aria-label="Scroll down">
      <span class="scroll-line"></span>
      <span class="scroll-label">SCROLL</span>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '12K+', label: 'Active Members' },
  { value: '48', label: 'Elite Coaches' },
  { value: '200+', label: 'Monthly Classes' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Access' },
  { value: '15yr', label: 'Of Excellence' },
]
</script>

<style scoped>
/* =========================================================
   HERO SECTION
   ========================================================= */
.hero {
  position: relative;
  height: 100dvh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Background */
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  filter: grayscale(1) contrast(1.1) brightness(0.55);
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 55% 80% at 60% 50%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.9) 80%),
    linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.7) 100%),
    linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%);
}

/* Side text */
.hero__side-text {
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.15);
  white-space: nowrap;
  z-index: 2;
}

/* Content */
.hero__content {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 clamp(24px, 6vw, 80px);
  padding-top: 72px;
  animation: fadeUp 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.hero__eyebrow {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(0.65rem, 1.2vw, 0.8rem);
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #c8f400;
  margin-bottom: clamp(12px, 2vw, 20px);
  animation: fadeIn 0.8s 0.1s both;
}

.hero__headline {
  display: flex;
  flex-direction: column;
  line-height: 0.9;
  margin-bottom: clamp(20px, 3vw, 36px);
}

.hero__headline-white,
.hero__headline-lime {
  display: block;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: clamp(4.5rem, 12vw, 10rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.hero__headline-white {
  color: #fff;
  animation: slideInLeft 0.7s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.hero__headline-lime {
  color: #c8f400;
  animation: slideInLeft 0.7s 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  text-shadow: 0 0 80px rgba(200, 244, 0, 0.25);
}

.hero__desc {
  max-width: 500px;
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  color: #999;
  line-height: 1.7;
  margin-bottom: clamp(28px, 4vw, 44px);
  animation: fadeUp 0.7s 0.45s both;
}

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  animation: fadeUp 0.7s 0.55s both;
}

/* Stats Bar */
.hero__stats-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background: rgba(200, 244, 0, 0.06);
  border-top: 1px solid rgba(200, 244, 0, 0.15);
  overflow: hidden;
  height: 48px;
  display: flex;
  align-items: center;
}

.stats-ticker {
  display: flex;
  width: 100%;
  overflow: hidden;
}
.ticker-track {
  display: flex;
  gap: 0;
  animation: marquee 30s linear infinite;
  white-space: nowrap;
}
.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #777;
  padding: 0 30px;
}
.ticker-item strong {
  color: #c8f400;
  font-weight: 800;
}
.ticker-dot { color: #333; }

/* Scroll indicator */
.hero__scroll {
  position: absolute;
  bottom: 80px;
  right: clamp(24px, 4vw, 48px);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.scroll-line {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, #c8f400, transparent);
  animation: pulseGlow 2s ease-in-out infinite;
}
.scroll-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: #555;
  text-transform: uppercase;
  writing-mode: vertical-lr;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 768px) {
  .hero__content { padding-top: 80px; }
  .hero__side-text { display: none; }
  .hero__scroll { display: none; }
  .hero__desc { max-width: 100%; }
}

@media (max-width: 480px) {
  .hero__ctas { flex-direction: column; }
  .hero__ctas .btn-lime,
  .hero__ctas .btn-outline { width: 100%; justify-content: center; }
}
</style>
