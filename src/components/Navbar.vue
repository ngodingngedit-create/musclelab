<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled, 'navbar--open': mobileOpen, 'navbar--profile': currentView === 'profile' }">
    <div class="navbar__inner">
      <!-- Profile Sidebar Toggle (mobile only — beautiful arrow pill button) -->
      <button
        v-if="currentView === 'profile'"
        class="profile-sidebar-nav-btn"
        @click="profileSidebarOpen = !profileSidebarOpen"
        :class="{ 'profile-sidebar-nav-btn--active': profileSidebarOpen }"
        aria-label="Toggle sidebar menu"
      >
        <!-- Sidebar panel icon -->
        <svg class="psb-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M9 3v18"/>
        </svg>
        <!-- Arrow chevron that rotates -->
        <svg class="psb-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <!-- Logo -->
      <a href="#" class="navbar__logo" id="nav-logo">
        MUSCLE <span class="logo-accent">LAB</span>
      </a>

      <!-- Desktop Nav Links -->
      <ul class="navbar__links" id="desktop-nav">
        <li v-for="link in navLinks" :key="link.key">
          <a
            :href="link.href"
            class="navbar__link"
            :class="{ 'navbar__link--active': currentView === 'landing' && activeLink === link.key }"
            @click.prevent="setActive(link.key, link.href)"
            :id="`nav-${link.key.toLowerCase()}`"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Desktop Right: icons + language -->
      <div class="navbar__actions" id="nav-actions">
        <!-- Language Switcher -->
        <div class="lang-switcher" id="lang-switcher" ref="langRef">
          <button
            class="lang-btn"
            id="lang-btn"
            @click="toggleLangDropdown"
            :aria-expanded="langOpen"
            aria-label="Select language"
          >
            <img
              :src="currentLang === 'id' ? '/flag_id.png' : '/flag_en.png'"
              :alt="currentLang === 'id' ? 'Indonesia' : 'English'"
              class="lang-flag"
            />
            <span class="lang-code">{{ currentLang.toUpperCase() }}</span>
            <svg
              class="lang-chevron"
              :class="{ 'lang-chevron--open': langOpen }"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <!-- Accordion Dropdown -->
          <Transition name="lang-dropdown">
            <div class="lang-dropdown" v-if="langOpen" id="lang-dropdown">
              <button
                class="lang-option"
                :class="{ 'lang-option--active': currentLang === 'id' }"
                id="lang-id"
                @click="selectLang('id')"
              >
                <img src="/flag_id.png" alt="Indonesia" class="lang-flag lang-flag--sm" />
                <span>{{ t.language.id }}</span>
                <span class="lang-check" v-if="currentLang === 'id'">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
              </button>
              <button
                class="lang-option"
                :class="{ 'lang-option--active': currentLang === 'en' }"
                id="lang-en"
                @click="selectLang('en')"
              >
                <img src="/flag_en.png" alt="English" class="lang-flag lang-flag--sm" />
                <span>{{ t.language.en }}</span>
                <span class="lang-check" v-if="currentLang === 'en'">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
              </button>
            </div>
          </Transition>
        </div>

        <!-- Notifications Wrapper -->
        <div class="notif-wrapper" ref="notifRef">
          <button class="icon-btn" id="nav-notification" aria-label="Notifications" @click="toggleNotifDropdown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span class="notif-dot" v-if="hasUnread"></span>
          </button>

          <!-- Notification Dropdown Card -->
          <Transition name="notif-fade">
            <div class="navbar-notif-dropdown" v-if="notifOpen" id="navbar-notif-dropdown">
              <div class="notif-dropdown-header">
                <h3>{{ currentLang === 'id' ? 'Notifikasi' : 'Notifications' }}</h3>
                <button @click="markAllAsRead" v-if="hasUnread">{{ currentLang === 'id' ? 'Tandai Semua Dibaca' : 'Mark all read' }}</button>
              </div>
              <div class="notif-dropdown-list">
                <div 
                  v-for="(n, idx) in notifications" 
                  :key="idx" 
                  class="notif-dropdown-item"
                  :class="{ 'notif-dropdown-item--unread': !n.read }"
                >
                  <div class="notif-item-icon" :class="`notif-item-icon--${n.type}`">
                    <svg v-if="n.type === 'success'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    <svg v-else-if="n.type === 'calendar'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                  </div>
                  <div class="notif-item-details">
                    <h4>{{ n.title }}</h4>
                    <p>{{ n.desc }}</p>
                    <span class="notif-item-time">{{ n.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <button class="avatar-btn" id="nav-avatar" aria-label="User Profile" @click="navigateTo('profile')">
          <span class="avatar-initials">MK</span>
        </button>
      </div>

      <!-- Mobile Actions (Hamburger & Notifications) -->
      <div class="navbar__mobile-actions">
        <!-- Mobile Notifications Bell (shown only on mobile) -->
        <div class="notif-wrapper notif-wrapper--mobile" ref="notifRefMobile">
          <button class="icon-btn" id="nav-notification-mobile" aria-label="Notifications" @click="toggleNotifDropdownMobile">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span class="notif-dot" v-if="hasUnread"></span>
          </button>

          <!-- Notification Dropdown Card -->
          <Transition name="notif-fade">
            <div class="navbar-notif-dropdown" v-if="notifOpenMobile" id="navbar-notif-dropdown-mobile">
              <div class="notif-dropdown-header">
                <h3>{{ currentLang === 'id' ? 'Notifikasi' : 'Notifications' }}</h3>
                <button @click="markAllAsRead" v-if="hasUnread">{{ currentLang === 'id' ? 'Tandai Semua Dibaca' : 'Mark all read' }}</button>
              </div>
              <div class="notif-dropdown-list">
                <div 
                  v-for="(n, idx) in notifications" 
                  :key="idx" 
                  class="notif-dropdown-item"
                  :class="{ 'notif-dropdown-item--unread': !n.read }"
                >
                  <div class="notif-item-icon" :class="`notif-item-icon--${n.type}`">
                    <svg v-if="n.type === 'success'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    <svg v-else-if="n.type === 'calendar'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                  </div>
                  <div class="notif-item-details">
                    <h4>{{ n.title }}</h4>
                    <p>{{ n.desc }}</p>
                    <span class="notif-item-time">{{ n.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>

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
    </div>

    <!-- Mobile Menu Drawer -->
    <Transition name="mobile-menu">
      <div class="mobile-drawer" v-if="mobileOpen" id="mobile-nav">
        <ul class="mobile-links">
          <li v-for="link in navLinks" :key="link.key">
            <a
              :href="link.href"
              class="mobile-link"
              :class="{ 'mobile-link--active': currentView === 'landing' && activeLink === link.key }"
              @click.prevent="setActive(link.key, link.href); toggleMobile()"
              :id="`mobile-nav-${link.key.toLowerCase()}`"
            >
              <!-- <span class="mobile-link__num">{{ navLinks.indexOf(link) }}</span> -->
              {{ link.label }}
              <svg class="mobile-link__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </li>
        </ul>

        <!-- Mobile Language Switcher -->
        <div class="mobile-lang" id="mobile-lang-switcher">
          <p class="mobile-lang__title">{{ t.language.label }}</p>
          <div class="mobile-lang__options">
            <button
              class="mobile-lang__btn"
              :class="{ 'mobile-lang__btn--active': currentLang === 'id' }"
              id="mobile-lang-id"
              @click="selectLang('id')"
            >
              <img src="/flag_id.png" alt="Indonesia" class="lang-flag lang-flag--sm" />
              <span>{{ t.language.id }}</span>
            </button>
            <button
              class="mobile-lang__btn"
              :class="{ 'mobile-lang__btn--active': currentLang === 'en' }"
              id="mobile-lang-en"
              @click="selectLang('en')"
            >
              <img src="/flag_en.png" alt="English" class="lang-flag lang-flag--sm" />
              <span>{{ t.language.en }}</span>
            </button>
          </div>
        </div>

        <div class="mobile-drawer__footer">
          <div class="mobile-user" @click="navigateTo('profile'); toggleMobile()" style="cursor: pointer;">
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

  <!-- Mobile Bottom Navigation Bar (Rendered outside the nav element to guarantee stability during viewport scroll height shifts) -->
  <div v-if="currentView !== 'transaction'" class="mobile-bottom-nav" :class="{ 'mobile-bottom-nav--hidden': mobileOpen, 'mobile-bottom-nav--sidebar-open': profileSidebarOpen }">
    <a
      href="#hero"
      class="mobile-bottom-nav__item"
      :class="{ 'mobile-bottom-nav__item--active': currentView === 'landing' && activeLink === 'HOME' }"
      @click.prevent="setActive('HOME', '#hero')"
      id="bottom-nav-home"
    >
      <span class="mobile-bottom-nav__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </span>
      <span class="mobile-bottom-nav__label">{{ t.nav.home }}</span>
    </a>

    <a
      href="#membership"
      class="mobile-bottom-nav__item"
      :class="{ 'mobile-bottom-nav__item--active': currentView === 'landing' && activeLink === 'MEMBERSHIP' }"
      @click.prevent="setActive('MEMBERSHIP', '#membership')"
      id="bottom-nav-membership"
    >
      <span class="mobile-bottom-nav__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="7"/>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
        </svg>
      </span>
      <span class="mobile-bottom-nav__label">{{ t.nav.membership }}</span>
    </a>

    <a
      href="#classes"
      class="mobile-bottom-nav__item"
      :class="{ 'mobile-bottom-nav__item--active': currentView === 'landing' && activeLink === 'CLASSES' }"
      @click.prevent="setActive('CLASSES', '#classes')"
      id="bottom-nav-classes"
    >
      <span class="mobile-bottom-nav__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6.5h2a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-2"/>
          <path d="M6 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5h2"/>
          <path d="M6 8h12v8H6z"/>
          <path d="M2 12h20"/>
        </svg>
      </span>
      <span class="mobile-bottom-nav__label">{{ t.nav.classes }}</span>
    </a>

    <a
      href="#"
      class="mobile-bottom-nav__item"
      :class="{ 'mobile-bottom-nav__item--active': currentView === 'profile' }"
      @click.prevent="navigateTo('profile')"
      id="bottom-nav-profile"
    >
      <span class="mobile-bottom-nav__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </span>
      <span class="mobile-bottom-nav__label">{{ currentLang === 'id' ? 'Profil' : 'Profile' }}</span>
    </a>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useNavigation } from '../composables/useNavigation'

const { currentLang, t, setLang } = useLanguage()
const { currentView, navigateTo, profileSidebarOpen } = useNavigation()

const isScrolled = ref(false)
const mobileOpen = ref(false)
const langOpen = ref(false)
const langRef = ref(null)
const activeLink = ref('HOME')

const notifOpen = ref(false)
const notifOpenMobile = ref(false)
const hasUnread = ref(true)
const notifRef = ref(null)
const notifRefMobile = ref(null)

const notifications = computed(() => [
  {
    title: currentLang.value === 'id' ? 'Pendaftaran Berhasil' : 'Registration Successful',
    desc: currentLang.value === 'id' ? 'Status Pro Elite Anda sekarang aktif. Selamat datang di Muscle Lab!' : 'Your Pro Elite status is now active. Welcome to Muscle Lab!',
    time: currentLang.value === 'id' ? '2 jam yang lalu' : '2h ago',
    type: 'success',
    read: false
  },
  {
    title: currentLang.value === 'id' ? 'Sesi Baru Dikonfirmasi' : 'New Session Confirmed',
    desc: currentLang.value === 'id' ? 'Sesi Strength Conditioning Anda hari Rabu jam 18:00 WIB telah disetujui.' : 'Your Strength Conditioning session on Wednesday at 18:00 WIB has been approved.',
    time: currentLang.value === 'id' ? '1 hari yang lalu' : '1d ago',
    type: 'calendar',
    read: false
  },
  {
    title: currentLang.value === 'id' ? 'Kode Promo Khusus' : 'Exclusive Promo Code',
    desc: currentLang.value === 'id' ? 'Gunakan kode FORGED20 untuk diskon 20% pembelian merchandise Muscle Lab.' : 'Use code FORGED20 for 20% off all Muscle Lab merchandise.',
    time: currentLang.value === 'id' ? '3 hari yang lalu' : '3d ago',
    type: 'promo',
    read: false
  }
])

const navLinks = computed(() => [
  { key: 'HOME', label: t.value.nav.home, href: '#hero' },
  { key: 'MEMBERSHIP', label: t.value.nav.membership, href: '#membership' },
  { key: 'CLASSES', label: t.value.nav.classes, href: '#classes' },
  { key: 'ORDER', label: t.value.nav.order, href: '#order' },
  { key: 'CHATBOT', label: t.value.nav.chatbot, href: '#chatbot' },
])

function setActive(key, href) {
  activeLink.value = key
  if (currentView.value !== 'landing') {
    currentView.value = 'landing'
    setTimeout(() => {
      if (href && href.startsWith('#')) {
        const el = document.querySelector(href)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }, 50)
  } else {
    if (href && href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
function toggleMobile() { mobileOpen.value = !mobileOpen.value }
function toggleLangDropdown() { langOpen.value = !langOpen.value }

function toggleNotifDropdown() {
  notifOpen.value = !notifOpen.value
  if (notifOpen.value) {
    hasUnread.value = false
  }
}

function toggleNotifDropdownMobile() {
  notifOpenMobile.value = !notifOpenMobile.value
  if (notifOpenMobile.value) {
    hasUnread.value = false
  }
}

function markAllAsRead() {
  hasUnread.value = false
}

function selectLang(lang) {
  setLang(lang)
  langOpen.value = false
}

function handleClickOutside(e) {
  if (langRef.value && !langRef.value.contains(e.target)) {
    langOpen.value = false
  }
  if (notifRef.value && !notifRef.value.contains(e.target)) {
    notifOpen.value = false
  }
  if (notifRefMobile.value && !notifRefMobile.value.contains(e.target)) {
    notifOpenMobile.value = false
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 30
}

let observer = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleClickOutside)

  // IntersectionObserver Scroll Spy
  const sections = ['#hero', '#membership', '#classes']
  const options = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id')
        if (id) {
          activeLink.value = id.toUpperCase()
        }
      }
    })
  }, options)

  sections.forEach(sel => {
    const el = document.querySelector(sel)
    if (el) observer.observe(el)
  })
})

watch(mobileOpen, (val) => {
  if (val) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  document.body.classList.remove('no-scroll')
  if (observer) observer.disconnect()
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

/* =========================================================
   LANGUAGE SWITCHER
   ========================================================= */
.lang-switcher {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px 6px 8px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #ccc;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.lang-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(200,244,0,0.4);
  color: #c8f400;
}

.lang-flag {
  width: 22px;
  height: 15px;
  border-radius: 3px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.5);
}

.lang-flag--sm {
  width: 20px;
  height: 13px;
  border-radius: 2px;
}

.lang-code {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.lang-chevron {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  color: #777;
  flex-shrink: 0;
}
.lang-chevron--open {
  transform: rotate(180deg);
  color: #c8f400;
}

/* Dropdown panel */
.lang-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 160px;
  background: #0a0a0a;
  border: 1px solid #1e1e1e;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,244,0,0.08);
  padding: 6px;
  z-index: 200;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 9px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #888;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  text-align: left;
}

.lang-option:hover {
  background: rgba(255,255,255,0.05);
  color: #fff;
}

.lang-option--active {
  color: #c8f400;
  background: rgba(200,244,0,0.06);
}

.lang-check {
  margin-left: auto;
  color: #c8f400;
  display: flex;
  align-items: center;
}

/* Dropdown animation */
.lang-dropdown-enter-active {
  animation: langDropIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.lang-dropdown-leave-active {
  animation: langDropOut 0.16s ease-in both;
}

@keyframes langDropIn {
  from { opacity: 0; transform: translateY(-8px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes langDropOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(-6px) scale(0.97); }
}

/* =========================================================
   ACTION ICONS
   ========================================================= */
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

/* Mobile Language Section */
.mobile-lang {
  padding: 20px 24px;
  border-top: 1px solid #111;
  margin-top: 8px;
}

.mobile-lang__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #444;
  margin-bottom: 12px;
}

.mobile-lang__options {
  display: flex;
  gap: 10px;
}

.mobile-lang__btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #1a1a1a;
  background: transparent;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #555;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.mobile-lang__btn:hover {
  background: rgba(255,255,255,0.04);
  color: #fff;
}

.mobile-lang__btn--active {
  border-color: rgba(200,244,0,0.5);
  background: rgba(200,244,0,0.07);
  color: #c8f400;
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
.navbar__mobile-actions {
  display: none;
}

@media (max-width: 900px) {
  .navbar__links { display: none; }
  .navbar__actions { display: none; }
  .navbar__mobile-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .hamburger { display: flex; }
}

.navbar--profile {
  background: rgba(5, 5, 5, 0.97) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-bottom: 1px solid rgba(255,255,255,0.05) !important;
}

/* Profile sidebar arrow pill button (left of logo on mobile) */
.profile-sidebar-nav-btn {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 36px;
  padding: 0 12px 0 10px;
  border-radius: 20px;
  background: rgba(200, 244, 0, 0.06);
  border: 1px solid rgba(200, 244, 0, 0.18);
  color: #c8f400;
  cursor: pointer;
  z-index: 1100;
  flex-shrink: 0;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.profile-sidebar-nav-btn:hover {
  background: rgba(200, 244, 0, 0.12);
  border-color: rgba(200, 244, 0, 0.35);
  box-shadow: 0 0 14px rgba(200, 244, 0, 0.12);
}

.profile-sidebar-nav-btn:active {
  background: rgba(200, 244, 0, 0.18);
  transform: scale(0.96);
}

/* Sidebar panel icon — stays static */
.psb-icon {
  opacity: 0.7;
  flex-shrink: 0;
  transition: opacity 0.2s;
}

.profile-sidebar-nav-btn:hover .psb-icon {
  opacity: 1;
}

/* Chevron arrow — rotates 180° when sidebar opens */
.psb-arrow {
  flex-shrink: 0;
  transition: transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}

.profile-sidebar-nav-btn--active {
  background: rgba(200, 244, 0, 0.14);
  border-color: rgba(200, 244, 0, 0.4);
  box-shadow: 0 0 18px rgba(200, 244, 0, 0.15);
}

.profile-sidebar-nav-btn--active .psb-arrow {
  transform: rotate(180deg);
}

@media (max-width: 900px) {
  .profile-sidebar-nav-btn {
    display: none; /* moved to floating drawer handle in UserProfile.vue */
  }
}

.navbar--hidden {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-bottom: none !important;
  box-shadow: none !important;
  pointer-events: none;
}

.navbar--hidden .navbar__inner {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* =========================================================
   MOBILE BOTTOM NAVBAR
   ========================================================= */
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 900px) {
  .mobile-bottom-nav {
    display: flex;
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: calc(100% - 32px);
    max-width: 420px;
    height: 66px;
    background: rgba(10, 10, 10, 0.75);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 22px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    z-index: 1000;
    align-items: center;
    justify-content: space-around;
    padding: 0 8px;
    pointer-events: auto;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  }

  .mobile-bottom-nav--hidden {
    opacity: 0;
    pointer-events: none;
    transform: translate3d(-50%, 40px, 0) scale(0.95);
  }

  .mobile-bottom-nav--sidebar-open {
    opacity: 0;
    pointer-events: none;
    transform: translate3d(-50%, 40px, 0) scale(0.95);
  }

  .mobile-bottom-nav__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #888;
    text-decoration: none;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.2s ease, transform 0.2s ease;
    gap: 5px;
    flex: 1;
    height: 100%;
    pointer-events: auto;
  }

  .mobile-bottom-nav__item--active {
    color: #c8f400;
  }

  .mobile-bottom-nav__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    transition: transform 0.2s ease;
    color: inherit;
  }

  .mobile-bottom-nav__item:active .mobile-bottom-nav__icon {
    transform: scale(0.85);
  }
  
  .mobile-bottom-nav__label {
    font-size: 0.6rem;
    line-height: 1;
  }
}

/* =========================================================
   NOTIFICATION DROPDOWN
   ========================================================= */
.notif-wrapper {
  position: relative;
}

.navbar-notif-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  width: 320px;
  background: rgba(13, 13, 13, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  z-index: 1010;
  transform-origin: top right;
}

.notif-dropdown-header {
  padding: 14px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.01);
}

.notif-dropdown-header h3 {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #fff;
  text-transform: uppercase;
  margin: 0;
}

.notif-dropdown-header button {
  background: transparent;
  border: none;
  color: #c8f400;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
}

.notif-dropdown-list {
  max-height: 260px;
  overflow-y: auto;
}

.notif-dropdown-item {
  padding: 14px 20px;
  display: flex;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  transition: background 0.2s;
}

.notif-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.02);
}

.notif-dropdown-item--unread {
  background: rgba(200, 244, 0, 0.01);
}

.notif-item-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notif-item-icon--success {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.notif-item-icon--calendar {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.notif-item-icon--promo {
  background: rgba(200, 244, 0, 0.08);
  color: #c8f400;
}

.notif-item-details h4 {
  font-size: 0.78rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 2px 0;
  text-align: left;
}

.notif-item-details p {
  font-size: 0.7rem;
  color: #999;
  line-height: 1.4;
  margin: 0 0 4px 0;
  text-align: left;
}

.notif-item-time {
  font-size: 0.65rem;
  color: #555;
  display: block;
  text-align: left;
}

/* Transitions */
.notif-fade-enter-active,
.notif-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.notif-fade-enter-from,
.notif-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

@media (max-width: 900px) {
  .navbar-notif-dropdown {
    position: fixed;
    top: 76px;
    left: 16px;
    right: 16px;
    width: auto;
    max-width: none;
    transform-origin: top right;
  }
  .notif-dropdown-list {
    max-height: 280px;
  }
}

@media (max-width: 640px) {
  .notif-dropdown-item {
    padding: 12px 16px;
    gap: 10px;
  }
  .notif-dropdown-header {
    padding: 12px 16px;
  }
}
</style>
