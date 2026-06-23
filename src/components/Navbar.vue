<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled, 'navbar--open': mobileOpen }">
    <div class="navbar__inner">
      <!-- Logo -->
      <a href="#" class="navbar__logo" id="nav-logo">
        MUSCLE <span class="logo-accent">LAB</span>
      </a>

      <!-- Desktop Nav Links -->
      <ul class="navbar__links" id="desktop-nav">
        <li v-for="link in navLinks" :key="link.name">
          <a
            :href="link.href"
            class="navbar__link"
            :class="{ 'navbar__link--active': activeLink === link.name }"
            @click="setActive(link.name)"
            :id="`nav-${link.name.toLowerCase()}`"
          >
            {{ link.name }}
          </a>
        </li>
      </ul>

      <!-- Desktop Right: icons -->
      <div class="navbar__actions" id="nav-actions">
        <button class="icon-btn" id="nav-notification" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span class="notif-dot"></span>
        </button>
        <button class="avatar-btn" id="nav-avatar" aria-label="User Profile">
          <span class="avatar-initials">MK</span>
        </button>
      </div>

      <!-- Mobile Hamburger -->
      <button
        class="hamburger"
        id="nav-hamburger"
        @click="toggleMobile"
        :class="{ 'hamburger--active': mobileOpen }"
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu Drawer -->
    <Transition name="mobile-menu">
      <div class="mobile-drawer" v-if="mobileOpen" id="mobile-nav">
        <ul class="mobile-links">
          <li v-for="link in navLinks" :key="link.name">
            <a
              :href="link.href"
              class="mobile-link"
              :class="{ 'mobile-link--active': activeLink === link.name }"
              @click="setActive(link.name); toggleMobile()"
              :id="`mobile-nav-${link.name.toLowerCase()}`"
            >
              <span class="mobile-link__num">0{{ navLinks.indexOf(link) + 1 }}</span>
              {{ link.name }}
              <svg class="mobile-link__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </li>
        </ul>
        <div class="mobile-drawer__footer">
          <div class="mobile-user">
            <div class="avatar-btn">
              <span class="avatar-initials">MK</span>
            </div>
            <div>
              <p class="mobile-user__name">Marcus Klein</p>
              <p class="mobile-user__tag">Elite Member</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Overlay for mobile -->
    <Transition name="overlay">
      <div class="mobile-overlay" v-if="mobileOpen" @click="toggleMobile" id="mobile-overlay"></div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileOpen = ref(false)
const activeLink = ref('HOME')

const navLinks = [
  { name: 'HOME', href: '#hero' },
  { name: 'MEMBERSHIP', href: '#membership' },
  { name: 'CLASSES', href: '#classes' },
  { name: 'ORDER', href: '#order' },
  { name: 'CHATBOT', href: '#chatbot' },
]

function setActive(name) { activeLink.value = name }
function toggleMobile() { mobileOpen.value = !mobileOpen.value }

function handleScroll() {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* =========================================================
   NAVBAR
   ========================================================= */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
}

.navbar--scrolled {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 48px);
  height: 72px;
}

/* Logo */
.navbar__logo {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #fff;
  transition: color 0.2s ease;
}
.logo-accent { color: #c8f400; }
.navbar__logo:hover { opacity: 0.85; }

/* Desktop Links */
.navbar__links {
  display: flex;
  align-items: center;
  list-style: none;
  gap: clamp(20px, 3vw, 36px);
}

.navbar__link {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #999;
  position: relative;
  padding-bottom: 4px;
  transition: color 0.2s ease;
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1.5px;
  background: #c8f400;
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.navbar__link:hover { color: #fff; }
.navbar__link:hover::after { width: 100%; }

.navbar__link--active {
  color: #fff;
}
.navbar__link--active::after {
  width: 100%;
}

/* Actions */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon-btn {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  transition: color 0.2s, background 0.2s;
}
.icon-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }

.notif-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c8f400;
  border: 1.5px solid #000;
}

.avatar-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #c8f400;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a2a00, #0f1800);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.avatar-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 0 12px rgba(200, 244, 0, 0.4);
}
.avatar-initials {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #c8f400;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  padding: 6px;
  cursor: pointer;
  z-index: 1100;
}
.hamburger span {
  display: block;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s, width 0.3s;
  transform-origin: center;
}
.hamburger span:nth-child(1) { width: 24px; }
.hamburger span:nth-child(2) { width: 18px; }
.hamburger span:nth-child(3) { width: 12px; }
.hamburger--active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
  width: 24px;
}
.hamburger--active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger--active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
  width: 24px;
}

/* =========================================================
   MOBILE DRAWER
   ========================================================= */
.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  width: min(320px, 85vw);
  background: #050505;
  border-left: 1px solid #1a1a1a;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 90px 0 40px;
  overflow-y: auto;
}

.mobile-links {
  list-style: none;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 12px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #666;
  transition: color 0.2s ease, background 0.2s ease;
}
.mobile-link:hover,
.mobile-link--active {
  color: #fff;
  background: rgba(255,255,255,0.04);
}
.mobile-link--active { color: #c8f400; }

.mobile-link__num {
  font-size: 0.6rem;
  color: #444;
  min-width: 20px;
  transition: color 0.2s;
}
.mobile-link:hover .mobile-link__num,
.mobile-link--active .mobile-link__num {
  color: #c8f400;
}

.mobile-link__arrow {
  margin-left: auto;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.2s, transform 0.2s;
}
.mobile-link:hover .mobile-link__arrow,
.mobile-link--active .mobile-link__arrow {
  opacity: 1;
  transform: translateX(0);
}

.mobile-drawer__footer {
  padding: 24px;
  border-top: 1px solid #111;
}
.mobile-user {
  display: flex;
  align-items: center;
  gap: 14px;
}
.mobile-user__name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  color: #fff;
}
.mobile-user__tag {
  font-size: 0.7rem;
  color: #c8f400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Overlay */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 1040;
}

/* Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateX(100%);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.35s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 900px) {
  .navbar__links { display: none; }
  .navbar__actions { display: none; }
  .hamburger { display: flex; }
}
</style>
