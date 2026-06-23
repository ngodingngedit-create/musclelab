<template>
  <footer class="footer" id="footer">
    <!-- Top decorative bar -->
    <div class="footer__topbar">
      <div class="topbar__inner">
        <span class="topbar__tagline">KINETIC PRECISION · ELITE PERFORMANCE · FORGED IN MOTION</span>
      </div>
    </div>

    <div class="footer__body">
      <div class="footer__inner">
        <!-- Brand -->
        <div class="footer__brand">
          <a href="#" class="footer__logo" id="footer-logo">
            MUSCLE <span class="logo-lime">LAB</span>
          </a>
          <p class="footer__copy">
            © 2024 Muscle Lab Gym. Kinetic Precision.<br />
            All rights reserved. Precision engineering for the human form.
          </p>
          <!-- Social Icons -->
          <div class="footer__socials">
            <a href="#" class="social-link" id="footer-instagram" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="social-link" id="footer-twitter" aria-label="Twitter / X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4l16 16M4 20L20 4"/></svg>
            </a>
            <a href="#" class="social-link" id="footer-youtube" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96C23 15.86 23 12 23 12s0-3.86-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>
            </a>
          </div>
        </div>

        <!-- Connect -->
        <div class="footer__col">
          <h4 class="footer__col-title">CONNECT</h4>
          <ul class="footer__links">
            <li><a href="#" class="footer__link" id="footer-instagram-link">Instagram</a></li>
            <li><a href="#" class="footer__link" id="footer-contact">Contact</a></li>
            <li><a href="#" class="footer__link" id="footer-newsletter">Newsletter</a></li>
            <li><a href="#" class="footer__link" id="footer-community">Community</a></li>
          </ul>
        </div>

        <!-- Access -->
        <div class="footer__col">
          <h4 class="footer__col-title">ACCESS</h4>
          <ul class="footer__links">
            <li><a href="#" class="footer__link" id="footer-hours">Hours</a></li>
            <li><a href="#" class="footer__link" id="footer-location">Location</a></li>
            <li><a href="#" class="footer__link" id="footer-membership">Membership</a></li>
            <li><a href="#" class="footer__link" id="footer-app">Mobile App</a></li>
          </ul>
        </div>

        <!-- Newsletter CTA -->
        <div class="footer__newsletter">
          <h4 class="footer__col-title">STAY FORGED</h4>
          <p class="newsletter-desc">Get exclusive training insights and early access to new programs.</p>
          <div class="newsletter-form" id="footer-newsletter-form">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              class="newsletter-input"
              id="newsletter-email"
              aria-label="Email address for newsletter"
            />
            <button class="newsletter-btn" id="newsletter-submit" aria-label="Subscribe to newsletter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer__bottom">
      <div class="footer__bottom-inner">
        <span>Crafted for the relentless.</span>
        <div class="footer__bottom-links">
          <a href="#" class="footer__bottom-link" id="footer-privacy">Privacy Policy</a>
          <a href="#" class="footer__bottom-link" id="footer-terms">Terms of Use</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No logic needed for this component
</script>

<style scoped>
/* =========================================================
   FOOTER
   ========================================================= */
.footer {
  background: #000;
  border-top: 1px solid #111;
}

/* Top decorative bar */
.footer__topbar {
  background: #c8f400;
  overflow: hidden;
}
.topbar__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
}
.topbar__tagline {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #000;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Body */
.footer__body {
  padding: clamp(48px, 7vw, 80px) 0 40px;
}

.footer__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 64px);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

/* Brand column */
.footer__brand {}

.footer__logo {
  display: inline-block;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 16px;
  transition: opacity 0.2s;
}
.footer__logo:hover { opacity: 0.8; }
.logo-lime { color: #c8f400; }

.footer__copy {
  font-size: 0.78rem;
  color: #444;
  line-height: 1.8;
  max-width: 280px;
  margin-bottom: 24px;
}

.footer__socials {
  display: flex;
  gap: 10px;
}

.social-link {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.social-link:hover {
  border-color: #c8f400;
  color: #c8f400;
  background: rgba(200, 244, 0, 0.06);
}

/* Columns */
.footer__col {}

.footer__col-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 20px;
}

.footer__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__link {
  font-size: 0.85rem;
  color: #555;
  transition: color 0.2s ease, padding-left 0.2s ease;
}
.footer__link:hover {
  color: #c8f400;
  padding-left: 6px;
}

/* Newsletter */
.footer__newsletter {}

.newsletter-desc {
  font-size: 0.8rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 16px;
}

.newsletter-form {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #1a1a1a;
  transition: border-color 0.2s;
}
.newsletter-form:focus-within {
  border-color: #c8f400;
}

.newsletter-input {
  flex: 1;
  background: #050505;
  border: none;
  outline: none;
  color: #fff;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 13px 16px;
}
.newsletter-input::placeholder { color: #333; }

.newsletter-btn {
  background: #c8f400;
  color: #000;
  width: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s;
}
.newsletter-btn:hover { background: #d4ff00; }

/* Bottom bar */
.footer__bottom {
  border-top: 1px solid #0d0d0d;
  padding: 20px 0;
}
.footer__bottom-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 64px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.72rem;
  color: #333;
}

.footer__bottom-links {
  display: flex;
  gap: 24px;
}

.footer__bottom-link {
  font-size: 0.72rem;
  color: #333;
  transition: color 0.2s;
}
.footer__bottom-link:hover { color: #c8f400; }

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 1100px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  .footer__brand { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .footer__brand { grid-column: auto; }
  .footer__bottom-inner { flex-direction: column; align-items: flex-start; }
  .topbar__tagline { font-size: 0.6rem; }
}
</style>
