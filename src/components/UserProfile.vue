<template>
  <div class="profile-layout" :class="{ 'profile-layout--collapsed': sidebarCollapsed }">
    
    <!-- LEFT SIDEBAR -->
    <aside class="profile-sidebar" :class="{ 'profile-sidebar--open': profileSidebarOpen, 'profile-sidebar--collapsed': sidebarCollapsed }">
      <div class="profile-sidebar__header">
        <template v-if="!sidebarCollapsed">
          <h2 class="profile-sidebar__brand">MUSCLE LAB PRO</h2>
          <span class="profile-sidebar__sub">ELITE ATHLETE</span>
        </template>
        <template v-else>
          <h2 class="profile-sidebar__brand profile-sidebar__brand--collapsed">ML</h2>
        </template>
      </div>

      <nav class="profile-sidebar__nav">
        <ul>
          <li v-for="item in menuItems" :key="item.key">
            <button
              class="profile-sidebar__link"
              :class="{ 'profile-sidebar__link--active': activeTab === item.key }"
              @click="setActiveTab(item.key)"
            >
              <span class="link-icon">
                <!-- SVG Icons directly rendered for absolute compiler safety -->
                <svg v-if="item.key === 'profile'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <svg v-else-if="item.key === 'stats'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                <svg v-else-if="item.key === 'schedules'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <svg v-else-if="item.key === 'management'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </span>
              <span class="link-label" v-if="!sidebarCollapsed">{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </nav>

      <div class="profile-sidebar__footer">
        <button class="sidebar-toggle-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          <svg v-if="!sidebarCollapsed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          <span v-if="!sidebarCollapsed">{{ currentLang === 'id' ? 'Tutup Menu' : 'Collapse Menu' }}</span>
        </button>
      </div>
    </aside>

    <!-- MAIN CONTENT CONTAINER -->
    <div class="profile-main">
      
      <!-- LOCAL DASHBOARD HEADER -->
     

      <!-- DASHBOARD GRID CONTENT -->
      <main class="dashboard-body">

        <!-- TOP ROW: Profile Banner & Current Status (STAYS CONSTANT) -->
        <div class="dashboard-row-top">
          
          <!-- Marcus Thorne Profile Card -->
          <div class="profile-banner-card">
            <div class="profile-banner-card__inner">
              <div class="profile-banner-card__avatar-wrap">
                <img src="/athlete_avatar.png" alt="Marcus Thorne Portrait" class="profile-banner-card__avatar" />
              </div>
              <div class="profile-banner-card__info">
                <span class="profile-banner-card__badge">ACTIVE MEMBER</span>
                <h2 class="profile-banner-card__name">MARCUS THORNE</h2>
                <div class="profile-banner-card__location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Muscle Lab Downtown, LA</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Current Status Card -->
          <div class="status-card">
            <h3 class="dashboard-card-subtitle">CURRENT STATUS</h3>
            <div class="status-card__badge-row">
              <div class="status-card__icon-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div class="status-card__text-wrap">
                <h4 class="status-card__badge-title">PRO ELITE</h4>
                <p class="status-card__badge-desc">Renews Dec 12, 2024</p>
              </div>
            </div>

            <!-- Training Goal Progress -->
            <div class="progress-block">
              <div class="progress-block__header">
                <span>TRAINING GOAL PROGRESS</span>
                <span class="progress-val">85%</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: 85%"></div>
              </div>
            </div>
          </div>

        </div>

        <!-- MIDDLE ROW: Grid of 4 Action Cards -->
        <div class="dashboard-action-grid">
          <div 
            v-for="card in actionCards" 
            :key="card.key" 
            class="action-card"
            :class="{ 'action-card--active': activeActionCard === card.key }"
            @click="handleCardClick(card.key)"
            style="cursor: pointer;"
          >
            <div class="action-card__icon-wrap">
              <!-- Inline SVG render based on card key for absolute compile safety -->
              <svg v-if="card.key === 'classes'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6.5 6.5h11M6.5 12h11M6.5 17.5h11"/><circle cx="4" cy="6.5" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="17.5" r="1" fill="currentColor"/></svg>
              <svg v-else-if="card.key === 'orders'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <svg v-else-if="card.key === 'support'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <svg v-else-if="card.key === 'booking'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>
            </div>
            <h4 class="action-card__title">{{ card.title }}</h4>
            <p class="action-card__desc">{{ card.desc }}</p>
          </div>
        </div>

        <!-- BOTTOM ROW: Dynamic Content Toggled by Active Action Cards (Desktop Only) -->
        <div class="dashboard-row-bottom" v-show="!isMobile">
          
          <!-- DEFAULT: Recent Workouts Chart & Stats PR Column -->
          <template v-if="!activeActionCard">
            <!-- Recent Workouts Bar Chart Card -->
            <div class="chart-card">
              <div class="chart-card__header">
                <div class="chart-card__title-wrap">
                  <h3 class="chart-card__title">RECENT WORKOUTS</h3>
                  <p class="chart-card__subtitle">Intensity levels over the last 7 sessions</p>
                </div>
                
                <!-- Tab toggler -->
                <div class="chart-card__tabs">
                  <button 
                    class="chart-card__tab" 
                    :class="{ 'chart-card__tab--active': activeWorkoutType === 'strength' }"
                    @click="activeWorkoutType = 'strength'"
                  >
                    Strength
                  </button>
                  <button 
                    class="chart-card__tab" 
                    :class="{ 'chart-card__tab--active': activeWorkoutType === 'cardio' }"
                    @click="activeWorkoutType = 'cardio'"
                  >
                    Cardio
                  </button>
                </div>
              </div>

              <!-- Chart workspace bars wrapper -->
              <div class="chart-box">
                <div class="chart-grid-lines">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="chart-bars-wrap">
                  <div 
                    v-for="bar in chartData[activeWorkoutType]" 
                    :key="bar.day" 
                    class="chart-bar-col"
                  >
                    <div class="chart-bar-track">
                      <div 
                        class="chart-bar-fill" 
                        :class="{ 'chart-bar-fill--highlighted': bar.highlight }"
                        :style="{ height: bar.val + '%' }"
                      >
                        <!-- Dynamic floating label badge above highlighted WED bar -->
                        <span v-if="bar.highlight" class="chart-bar-badge">{{ bar.label }}</span>
                      </div>
                    </div>
                    <span class="chart-day-label">{{ bar.day }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Vertical Stats PR stack -->
            <div class="stats-pr-column">
              <div 
                v-for="stat in personalStats" 
                :key="stat.label" 
                class="stats-pr-card"
              >
                <h5 class="stats-pr-card__label">{{ stat.label }}</h5>
                <div class="stats-pr-card__value-wrap">
                  <span class="stats-pr-card__value">{{ stat.val }}</span>
                  <span class="stats-pr-card__unit" v-if="stat.unit">{{ stat.unit }}</span>
                </div>
              </div>
            </div>
          </template>

          <!-- KELAS SAYA CONTENT -->
          <template v-else-if="activeActionCard === 'classes'">
            <div class="card-content-panel">
              <div class="panel-header">
                <h3>{{ t.classesTitle }}</h3>
                <button class="panel-close-btn" @click="activeActionCard = null" aria-label="Close panel">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div class="panel-body">
                <div class="classes-list-detailed">
                  <div class="class-item-row" v-for="c in myClassesList" :key="c.id">
                    <div class="class-item-row__category" :class="`cat--${c.id}`">{{ c.category }}</div>
                    <div class="class-item-row__details">
                      <h4>{{ c.name }}</h4>
                      <p>{{ currentLang === 'id' ? 'Pelatih' : 'Trainer' }}: <strong>{{ c.trainer }}</strong></p>
                    </div>
                    <div class="class-item-row__schedule">
                      <span>{{ c.time }}</span>
                    </div>
                    <div class="class-item-row__status">
                      <span class="status-pill status-pill--registered">{{ currentLang === 'id' ? 'TERDAFTAR' : 'REGISTERED' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- PESANAN SAYA CONTENT -->
          <template v-else-if="activeActionCard === 'orders'">
            <div class="card-content-panel">
              <div class="panel-header">
                <h3>{{ t.ordersTitle }}</h3>
                <button class="panel-close-btn" @click="activeActionCard = null" aria-label="Close panel">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div class="panel-body">
                <div class="orders-list-detailed">
                  <div class="order-item-row" v-for="o in myOrdersList" :key="o.id">
                    <div class="order-item-row__id">#{{ o.id }}</div>
                    <div class="order-item-row__details">
                      <h4>{{ o.item }}</h4>
                      <p>{{ currentLang === 'id' ? 'Tanggal Pesan' : 'Order Date' }}: <strong>{{ o.date }}</strong></p>
                    </div>
                    <div class="order-item-row__price">
                      <span>{{ o.price }}</span>
                    </div>
                    <div class="order-item-row__status">
                      <span class="status-pill" :class="`status-pill--${o.status.toLowerCase()}`">
                        {{ o.status === 'Shipped' ? (currentLang === 'id' ? 'DIKIRIM' : 'SHIPPED') : (currentLang === 'id' ? 'SELESAI' : 'DELIVERED') }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- DUKUNGAN CONTENT -->
          <template v-else-if="activeActionCard === 'support'">
            <div class="card-content-panel">
              <div class="panel-header">
                <h3>{{ t.supportTitle }}</h3>
                <button class="panel-close-btn" @click="activeActionCard = null" aria-label="Close panel">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div class="panel-body support-panel-grid">
                <!-- Support Form -->
                <form class="support-form" @submit.prevent="submitSupportTicket">
                  <div class="form-group">
                    <label>{{ currentLang === 'id' ? 'KATEGORI MASALAH' : 'ISSUE CATEGORY' }}</label>
                    <select v-model="supportForm.category">
                      <option value="billing">{{ currentLang === 'id' ? 'Pembayaran & Akun' : 'Billing & Account' }}</option>
                      <option value="training">{{ currentLang === 'id' ? 'Latihan & Kelas' : 'Training & Classes' }}</option>
                      <option value="facilities">{{ currentLang === 'id' ? 'Fasilitas Gym' : 'Gym Facilities' }}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>{{ currentLang === 'id' ? 'PESAN KELUHAN' : 'TICKET MESSAGE' }}</label>
                    <textarea v-model="supportForm.message" :placeholder="currentLang === 'id' ? 'Tuliskan keluhan atau pertanyaan Anda disini...' : 'Describe your request or issue here...'"></textarea>
                  </div>
                  <button type="submit" class="action-btn-form">{{ currentLang === 'id' ? 'KIRIM TIKET' : 'SUBMIT TICKET' }}</button>
                </form>
                
                <!-- FAQ Sidebar -->
                <div class="support-faq">
                  <h4>{{ currentLang === 'id' ? 'PERTANYAAN UMUM' : 'FREQUENTLY ASKED QUESTIONS' }}</h4>
                  <div class="faq-item" v-for="faq in faqList" :key="faq.question">
                    <h5>{{ faq.question }}</h5>
                    <p>{{ faq.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- PEMESANAN CONTENT -->
          <template v-else-if="activeActionCard === 'booking'">
            <div class="card-content-panel">
              <div class="panel-header">
                <h3>{{ t.bookingTitle }}</h3>
                <button class="panel-close-btn" @click="activeActionCard = null" aria-label="Close panel">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div class="panel-body booking-panel-grid">
                <!-- New Booking form -->
                <form class="booking-form" @submit.prevent="submitBooking">
                  <div class="form-group">
                    <label>{{ currentLang === 'id' ? 'PILIH COACH' : 'CHOOSE COACH' }}</label>
                    <select v-model="bookingForm.trainer">
                      <option value="Elena Volkov">Elena Volkov (Recovery)</option>
                      <option value="Marcus Thorne">Marcus Thorne (Metabolic)</option>
                      <option value="Sarah Chen">Sarah Chen (Strength)</option>
                      <option value="Jaxon Reed">Jaxon Reed (Combat)</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>{{ currentLang === 'id' ? 'PILIH JADWAL & WAKTU' : 'DATE & TIME' }}</label>
                    <input type="datetime-local" v-model="bookingForm.datetime" />
                  </div>
                  <button type="submit" class="action-btn-form">{{ currentLang === 'id' ? 'PESAN SEKARANG' : 'BOOK PT SESSION' }}</button>
                </form>

                <!-- Scheduled Bookings list -->
                <div class="scheduled-bookings">
                  <h4>{{ currentLang === 'id' ? 'JADWAL COACHING AKTIF' : 'ACTIVE PT SCHEDULES' }}</h4>
                  <div class="booking-active-row" v-for="b in activeBookingsList" :key="b.id">
                    <div class="booking-avatar-mini">
                      <span class="initials">{{ b.trainer.split(' ').map(n=>n[0]).join('') }}</span>
                    </div>
                    <div class="booking-row-info">
                      <h5>{{ b.trainer }}</h5>
                      <p>{{ b.datetime }}</p>
                    </div>
                    <div class="booking-row-cancel">
                      <button @click="cancelBooking(b.id)" class="cancel-link">{{ currentLang === 'id' ? 'BATAL' : 'CANCEL' }}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

        </div>

      </main>

      <!-- LOCAL PROFILE FOOTER -->
      <footer class="profile-footer">
        <div class="profile-footer__inner">
          <div class="profile-footer__left">
            <h3 class="profile-footer__logo">MUSCLE LAB GYM</h3>
            <p class="profile-footer__desc">
              Precision performance for the kinetic elite.<br />
              Engineered for those who refuse to be average.
            </p>
          </div>
          
          <div class="profile-footer__links-row">
            <div class="profile-footer__col">
              <h4>CONNECT</h4>
              <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div class="profile-footer__col">
              <h4>VISIT</h4>
              <ul>
                <li><a href="#">Location</a></li>
                <li><a href="#">Hours</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="profile-footer__bottom">
          <p>© 2024 Muscle Lab Gym. Kinetic Precision.</p>
          <div class="profile-footer__icons">
            <!-- Share icon -->
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" y2="15.42" />
              <line x1="15.41" y1="6.51" y2="8.59" />
            </svg>
            <!-- Lock icon -->
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>
      </footer>

    </div>

    <!-- Mobile sidebar overlay -->
    <div 
      class="profile-sidebar-overlay" 
      v-if="profileSidebarOpen" 
      @click="profileSidebarOpen = false"
    ></div>

    <!-- =====================================================
         FLOATING DRAWER HANDLE (mobile only)
         Fixed to left edge of screen, slides with sidebar
         ===================================================== -->
    <button
      class="floating-drawer-btn"
      :class="{ 'floating-drawer-btn--open': profileSidebarOpen }"
      @click="profileSidebarOpen = !profileSidebarOpen"
      aria-label="Toggle sidebar"
    >
      <!-- Decorative dot strip (top) -->
      <span class="fdb-dots">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <!-- Arrow icon — rotates when sidebar opens -->
      <svg
        class="fdb-arrow"
        width="14" height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 18l6-6-6-6"/>
      </svg>

      <!-- Decorative dot strip (bottom) -->
      <span class="fdb-dots">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>

  </div>

  <!-- =====================================================
       MOBILE FULL-SCREEN PANEL (slide-in like page navigation)
       ===================================================== -->
  <Transition name="mobile-panel-slide">
    <div class="mobile-full-panel" v-if="mobilePanelActive && isMobile">
      <!-- Panel Top Header with Back Button -->
      <header class="mobile-panel-header">
        <button class="mobile-panel-back" @click="closeMobilePanel">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
          </svg>
          <span>{{ currentLang === 'id' ? 'Kembali' : 'Back' }}</span>
        </button>
        <h2 class="mobile-panel-title">
          <template v-if="activeActionCard === 'classes'">{{ t.classesTitle }}</template>
          <template v-else-if="activeActionCard === 'orders'">{{ t.ordersTitle }}</template>
          <template v-else-if="activeActionCard === 'support'">{{ t.supportTitle }}</template>
          <template v-else-if="activeActionCard === 'booking'">{{ t.bookingTitle }}</template>
        </h2>
      </header>

      <!-- Panel Body Content -->
      <div class="mobile-panel-body">

        <!-- KELAS SAYA -->
        <template v-if="activeActionCard === 'classes'">
          <div class="mobile-classes-list">
            <div class="mobile-class-card" v-for="c in myClassesList" :key="c.id">
              <div class="mobile-class-card__badge" :class="`cat--${c.id}`">{{ c.category }}</div>
              <div class="mobile-class-card__info">
                <h4>{{ c.name }}</h4>
                <p>{{ currentLang === 'id' ? 'Pelatih' : 'Trainer' }}: <strong>{{ c.trainer }}</strong></p>
                <span class="mobile-class-card__time">{{ c.time }}</span>
              </div>
              <span class="status-pill status-pill--registered">{{ currentLang === 'id' ? 'AKTIF' : 'ACTIVE' }}</span>
            </div>
          </div>
        </template>

        <!-- PESANAN SAYA -->
        <template v-else-if="activeActionCard === 'orders'">
          <div class="mobile-orders-list">
            <div class="mobile-order-card" v-for="o in myOrdersList" :key="o.id">
              <div class="mobile-order-card__top">
                <span class="mobile-order-card__id">#{{ o.id }}</span>
                <span class="status-pill" :class="`status-pill--${o.status.toLowerCase()}`">
                  {{ o.status === 'Shipped' ? (currentLang === 'id' ? 'DIKIRIM' : 'SHIPPED') : (currentLang === 'id' ? 'SELESAI' : 'DONE') }}
                </span>
              </div>
              <h4 class="mobile-order-card__item">{{ o.item }}</h4>
              <div class="mobile-order-card__bottom">
                <span class="mobile-order-card__date">{{ o.date }}</span>
                <span class="mobile-order-card__price">{{ o.price }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- DUKUNGAN -->
        <template v-else-if="activeActionCard === 'support'">
          <div class="mobile-support-wrap">
            <form class="mobile-support-form" @submit.prevent="submitSupportTicket">
              <h4 class="mobile-section-label">{{ currentLang === 'id' ? 'Kirim Tiket' : 'Submit Ticket' }}</h4>
              <div class="form-group">
                <label>{{ currentLang === 'id' ? 'KATEGORI MASALAH' : 'ISSUE CATEGORY' }}</label>
                <select v-model="supportForm.category">
                  <option value="billing">{{ currentLang === 'id' ? 'Pembayaran & Akun' : 'Billing & Account' }}</option>
                  <option value="training">{{ currentLang === 'id' ? 'Latihan & Kelas' : 'Training & Classes' }}</option>
                  <option value="facilities">{{ currentLang === 'id' ? 'Fasilitas Gym' : 'Gym Facilities' }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>{{ currentLang === 'id' ? 'PESAN KELUHAN' : 'TICKET MESSAGE' }}</label>
                <textarea v-model="supportForm.message" :placeholder="currentLang === 'id' ? 'Tuliskan keluhan Anda...' : 'Describe your issue...'"></textarea>
              </div>
              <button type="submit" class="action-btn-form mobile-full-btn">{{ currentLang === 'id' ? 'KIRIM TIKET' : 'SUBMIT TICKET' }}</button>
            </form>

            <div class="mobile-faq">
              <h4 class="mobile-section-label">{{ currentLang === 'id' ? 'Pertanyaan Umum' : 'FAQ' }}</h4>
              <div class="mobile-faq-item" v-for="faq in faqList" :key="faq.question">
                <h5>{{ faq.question }}</h5>
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </template>

        <!-- PEMESANAN -->
        <template v-else-if="activeActionCard === 'booking'">
          <div class="mobile-booking-wrap">
            <form class="mobile-booking-form" @submit.prevent="submitBooking">
              <h4 class="mobile-section-label">{{ currentLang === 'id' ? 'Pesan Sesi Baru' : 'Book New Session' }}</h4>
              <div class="form-group">
                <label>{{ currentLang === 'id' ? 'PILIH COACH' : 'CHOOSE COACH' }}</label>
                <select v-model="bookingForm.trainer">
                  <option value="Elena Volkov">Elena Volkov (Recovery)</option>
                  <option value="Marcus Thorne">Marcus Thorne (Metabolic)</option>
                  <option value="Sarah Chen">Sarah Chen (Strength)</option>
                  <option value="Jaxon Reed">Jaxon Reed (Combat)</option>
                </select>
              </div>
              <div class="form-group">
                <label>{{ currentLang === 'id' ? 'JADWAL & WAKTU' : 'DATE & TIME' }}</label>
                <input type="datetime-local" v-model="bookingForm.datetime" />
              </div>
              <button type="submit" class="action-btn-form mobile-full-btn">{{ currentLang === 'id' ? 'PESAN SEKARANG' : 'BOOK SESSION' }}</button>
            </form>

            <div class="mobile-active-bookings">
              <h4 class="mobile-section-label">{{ currentLang === 'id' ? 'Jadwal Aktif' : 'Active Schedules' }}</h4>
              <div class="mobile-booking-row" v-for="b in activeBookingsList" :key="b.id">
                <div class="booking-avatar-mini">
                  <span class="initials">{{ b.trainer.split(' ').map(n=>n[0]).join('') }}</span>
                </div>
                <div class="booking-row-info">
                  <h5>{{ b.trainer }}</h5>
                  <p>{{ b.datetime }}</p>
                </div>
                <button @click="cancelBooking(b.id)" class="cancel-link">{{ currentLang === 'id' ? 'BATAL' : 'CANCEL' }}</button>
              </div>
            </div>
          </div>
        </template>

      </div>
    </div>
  </Transition>

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useNavigation } from '../composables/useNavigation'

// Layout/routing hooks
const { currentLang } = useLanguage()
const { navigateTo, profileSidebarOpen } = useNavigation()

// Sidebar collapsible & active states
const sidebarCollapsed = ref(false)
const activeTab = ref('profile')
const activeWorkoutType = ref('strength')

// Selected action card (null means default recent workouts/PR stack is visible)
const activeActionCard = ref(null)

// Mobile state: detect viewport and panel overlay
const isMobile = ref(false)
const mobilePanelActive = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 900
}

function handleCardClick(cardKey) {
  if (isMobile.value) {
    activeActionCard.value = cardKey
    mobilePanelActive.value = true
    document.body.classList.add('no-scroll')
  } else {
    activeActionCard.value = (activeActionCard.value === cardKey ? null : cardKey)
  }
}

function closeMobilePanel() {
  mobilePanelActive.value = false
  activeActionCard.value = null
  document.body.classList.remove('no-scroll')
}

// Notification dropdown toggler
const notifOpen = ref(false)
const hasUnread = ref(true)
const notifRef = ref(null)

// Dynamic Mock Lists for Dashboard Content Panels
const myClassesList = ref([
  { id: 'yoga', category: 'PEMULIHAN', name: 'YOGA SORE', time: 'SEN/RAB — 07:00 PAGI', trainer: 'ELENA VOLKOV' },
  { id: 'hiit', category: 'METABOLIK', name: 'HIIT INTENSE', time: 'SEL/KAM — 06:00 SORE', trainer: 'MARCUS THORNE' },
  { id: 'weights', category: 'KEKUATAN', name: 'LATIHAN BEBAN MANDIRI', time: 'SETIAP HARI — 05:00 PAGI', trainer: 'SARAH CHEN' }
])

const myOrdersList = ref([
  { id: 'ORD-9883', item: 'Muscle Lab Whey Protein Isolate (2KG)', price: 'Rp 850.000', date: '24 Jun 2026', status: 'Shipped' },
  { id: 'ORD-9742', item: 'Premium Leather Lifting Belt', price: 'Rp 620.000', date: '18 Jun 2026', status: 'Shipped' },
  { id: 'ORD-9511', item: 'Muscle Lab Black Steel Shaker (700ml)', price: 'Rp 180.000', date: '05 Jun 2026', status: 'Delivered' }
])

const supportForm = ref({
  category: 'billing',
  message: ''
})

const faqList = [
  { question: 'Bagaimana cara mengganti jadwal kelas?', answer: 'Anda dapat membatalkan booking kelas 2 jam sebelum kelas dimulai dari tab jadwal, lalu melakukan booking ulang.' },
  { question: 'Kapan masa aktif member saya diperbarui?', answer: 'Masa aktif member Pro Elite Anda diperbarui secara otomatis setiap bulan melalui metode pembayaran utama.' }
]

const bookingForm = ref({
  trainer: 'Elena Volkov',
  datetime: ''
})

const activeBookingsList = ref([
  { id: 1, trainer: 'Sarah Chen', datetime: 'Jumat, 28 Jun 2026 — 08:00 PAGI' },
  { id: 2, trainer: 'Elena Volkov', datetime: 'Senin, 01 Jul 2026 — 07:00 PAGI' }
])

// Submit & Delete actions
function submitSupportTicket() {
  if (!supportForm.value.message.trim()) {
    alert(currentLang.value === 'id' ? 'Tuliskan pesan masalah Anda!' : 'Please enter your support request!');
    return;
  }
  alert(currentLang.value === 'id' ? 'Tiket keluhan berhasil dikirim! Tim support kami akan menghubungi Anda dalam 24 jam.' : 'Support ticket submitted! Our team will contact you within 24 hours.');
  supportForm.value.message = '';
}

function submitBooking() {
  if (!bookingForm.value.datetime) {
    alert(currentLang.value === 'id' ? 'Pilih tanggal & waktu terlebih dahulu!' : 'Please select date & time first!');
    return;
  }
  const dt = new Date(bookingForm.value.datetime);
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = dt.toLocaleDateString(currentLang.value === 'id' ? 'id-ID' : 'en-US', dateOptions);
  const formattedTime = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  activeBookingsList.value.push({
    id: Date.now(),
    trainer: bookingForm.value.trainer,
    datetime: `${formattedDate} — ${formattedTime}`
  });
  alert(currentLang.value === 'id' ? 'Sesi PT berhasil dipesan!' : 'PT Session booked successfully!');
  bookingForm.value.datetime = '';
}

function cancelBooking(id) {
  if (confirm(currentLang.value === 'id' ? 'Apakah Anda yakin ingin membatalkan jadwal coaching ini?' : 'Are you sure you want to cancel this coaching session?')) {
    activeBookingsList.value = activeBookingsList.value.filter(b => b.id !== id);
  }
}

// Translations local map
const translations = {
  id: {
    backHome: 'Kembali Ke Beranda',
    notificationsTitle: 'Notifikasi',
    markRead: 'Tandai Semua Dibaca',
    notif1Title: 'Pendaftaran Berhasil',
    notif1Desc: 'Status Pro Elite Anda sekarang aktif. Selamat datang di Muscle Lab!',
    notif2Title: 'Sesi Baru Dikonfirmasi',
    notif2Desc: 'Sesi Strength Conditioning hari Rabu jam 18:00 WIB telah disetujui.',
    notif3Title: 'Kode Promo Khusus',
    notif3Desc: 'Gunakan kode FORGED20 untuk diskon 20% pembelian merchandise.',
    h1: 'Profil',
    h2: 'Statistik',
    h3: 'Jadwal',
    h4: 'Manajemen',
    classesTitle: 'KELAS SAYA',
    classesDesc: 'Lihat sesi mendatang dan slot latihan terdaftar.',
    ordersTitle: 'PESANAN SAYA',
    ordersDesc: 'Lacak pengiriman suplemen dan peralatan olahraga.',
    supportTitle: 'DUKUNGAN',
    supportDesc: 'Bantuan teknis dan panduan latihan khusus 24/7.',
    bookingTitle: 'PEMESANAN',
    bookingDesc: 'Atur jadwal sesi Pelatih Pribadi dan evaluasi fisik.',
    benchPress: 'PR BENCH PRESS',
    bodyFat: 'LEMAK TUBUH SAAT INI',
    sessionsWeek: 'SESI MINGGU INI'
  },
  en: {
    backHome: 'Back Home',
    notificationsTitle: 'Notifications',
    markRead: 'Mark all read',
    notif1Title: 'Registration Successful',
    notif1Desc: 'Your Pro Elite status is now active. Welcome to Muscle Lab!',
    notif2Title: 'New Session Confirmed',
    notif2Desc: 'Your Strength Conditioning session on Wednesday at 18:00 WIB has been approved.',
    notif3Title: 'Exclusive Promo Code',
    notif3Desc: 'Use code FORGED20 for 20% off all Muscle Lab merchandise.',
    h1: 'Profile',
    h2: 'Stats',
    h3: 'Schedules',
    h4: 'Management',
    classesTitle: 'MY CLASSES',
    classesDesc: 'View upcoming sessions and booked training slots.',
    ordersTitle: 'MY ORDERS',
    ordersDesc: 'Track supplements and gear shipments.',
    supportTitle: 'SUPPORT',
    supportDesc: '24/7 technical and training program assistance.',
    bookingTitle: 'BOOKING',
    bookingDesc: 'Schedule PT sessions and performance evaluations.',
    benchPress: 'BENCH PRESS PR',
    bodyFat: 'CURRENT BODY FAT',
    sessionsWeek: 'SESSIONS THIS WEEK'
  }
}

const t = computed(() => translations[currentLang.value] || translations.en)

// Sidebar items definition
const menuItems = computed(() => [
  { key: 'profile', label: t.value.h1 },
  { key: 'stats', label: t.value.h2 },
  { key: 'schedules', label: t.value.h3 },
  { key: 'management', label: t.value.h4 }
])

// Action Cards details
const actionCards = computed(() => [
  { key: 'classes', title: t.value.classesTitle, desc: t.value.classesDesc },
  { key: 'orders', title: t.value.ordersTitle, desc: t.value.ordersDesc },
  { key: 'support', title: t.value.supportTitle, desc: t.value.supportDesc },
  { key: 'booking', title: t.value.bookingTitle, desc: t.value.bookingDesc }
])

// Workout intensity day data mock
const chartData = {
  strength: [
    { day: 'MON', val: 32, highlight: false },
    { day: 'TUE', val: 48, highlight: false },
    { day: 'WED', val: 82, highlight: true, label: '120%' },
    { day: 'THU', val: 38, highlight: false },
    { day: 'FRI', val: 56, highlight: false },
    { day: 'SAT', val: 24, highlight: false },
    { day: 'SUN', val: 64, highlight: false }
  ],
  cardio: [
    { day: 'MON', val: 50, highlight: false },
    { day: 'TUE', val: 70, highlight: false },
    { day: 'WED', val: 90, highlight: true, label: '120%' },
    { day: 'THU', val: 60, highlight: false },
    { day: 'FRI', val: 80, highlight: false },
    { day: 'SAT', val: 40, highlight: false },
    { day: 'SUN', val: 75, highlight: false }
  ]
}

// Side PR column stats
const personalStats = computed(() => [
  { label: t.value.benchPress, val: '145', unit: 'KG' },
  { label: t.value.bodyFat, val: '10.2', unit: '%' },
  { label: t.value.sessionsWeek, val: '5', unit: '/ 6' }
])

// Notifications dropdown state list
const notifications = ref([
  {
    title: t.value.notif1Title,
    desc: t.value.notif1Desc,
    time: currentLang.value === 'id' ? '2 jam yang lalu' : '2h ago',
    type: 'success',
    read: false
  },
  {
    title: t.value.notif2Title,
    desc: t.value.notif2Desc,
    time: currentLang.value === 'id' ? '1 hari yang lalu' : '1d ago',
    type: 'calendar',
    read: false
  },
  {
    title: t.value.notif3Title,
    desc: t.value.notif3Desc,
    time: currentLang.value === 'id' ? '3 hari yang lalu' : '3d ago',
    type: 'promo',
    read: false
  }
])

function setActiveTab(tabKey) {
  activeTab.value = tabKey
  if (tabKey !== 'profile') {
    alert(currentLang.value === 'id' ? `Modul "${tabKey.toUpperCase()}" sedang disiapkan.` : `"${tabKey.toUpperCase()}" view module is under construction.`);
    activeTab.value = 'profile'
  }
  profileSidebarOpen.value = false
}

function toggleNotif() {
  notifOpen.value = !notifOpen.value
}

function markAllAsRead() {
  hasUnread.value = false
  notifications.value.forEach(n => n.read = true)
}

function closeDropdown(e) {
  if (notifRef.value && !notifRef.value.contains(e.target)) {
    notifOpen.value = false
  }
}

// Toggle body no-scroll when mobile profile sidebar drawer is open
watch(profileSidebarOpen, (val) => {
  if (val) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }
})

onMounted(() => {
  document.addEventListener('click', closeDropdown)
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
  window.removeEventListener('resize', checkMobile)
  document.body.classList.remove('no-scroll')
})
</script>

<style scoped>
/* =========================================================
   USER PROFILE DASHBOARD GRID STYLE SHEETS
   ========================================================= */
.profile-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  background-color: #050505;
  color: var(--color-white);
  min-height: 100vh;
  position: relative;
  font-family: var(--font-body);
  transition: grid-template-columns 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding-top: 72px; /* offset fixed navbar height */
}

.profile-layout--collapsed {
  grid-template-columns: 80px 1fr;
}

/* LEFT SIDEBAR */
.profile-sidebar {
  background-color: #0b0b0b;
  border-right: 1px solid var(--color-border);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 72px);
  position: sticky;
  top: 72px;
  z-index: 110;
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 0.3s ease;
  width: 100%;
  overflow-x: hidden;
}

.profile-sidebar--collapsed {
  padding: 32px 12px;
}

.profile-sidebar__header {
  margin-bottom: 48px;
  min-height: 38px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-sidebar__brand {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: var(--color-white);
  line-height: 1;
  margin-bottom: 4px;
  white-space: nowrap;
}

.profile-sidebar__brand--collapsed {
  text-align: center;
  color: #c8f400;
  font-size: 1.3rem;
  margin: 0;
}

.profile-sidebar__sub {
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--color-gray-500);
}

.profile-sidebar__nav {
  flex: 1;
}

.profile-sidebar__nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-sidebar__link {
  width: 100%;
  background: transparent;
  border: none;
  color: var(--color-gray-400);
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  transition: all 0.25s var(--ease);
  white-space: nowrap;
}

.profile-sidebar__link:hover {
  color: var(--color-white);
  background: rgba(255, 255, 255, 0.02);
}

.profile-sidebar__link--active {
  background-color: rgba(200, 244, 0, 0.06) !important;
  color: #c8f400 !important;
  box-shadow: inset 3px 0 0 #c8f400;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.profile-sidebar--collapsed .profile-sidebar__link {
  justify-content: center;
  padding: 12px 0;
  gap: 0;
}

.link-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile-sidebar__footer {
  margin-top: auto;
}

/* Sidebar expand/collapse button */
.sidebar-toggle-btn {
  width: 100%;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-gray-400);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.sidebar-toggle-btn:hover {
  border-color: rgba(200, 244, 0, 0.4);
  color: #c8f400;
  background: rgba(200, 244, 0, 0.03);
}

.profile-sidebar--collapsed .sidebar-toggle-btn {
  padding: 12px 0;
  gap: 0;
}

/* MAIN COLUMN */
.profile-main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}

/* HEADER BAR */
.profile-header {
  padding: 24px clamp(20px, 4vw, 48px);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #050505;
  position: sticky;
  top: 72px;
  z-index: 100;
}

.profile-header__left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mobile-sidebar-toggle {
  display: none;
  background: transparent;
  border: none;
  color: var(--color-white);
  cursor: pointer;
}

.profile-header__title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: var(--color-white);
}

.profile-header__right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-back-link {
  background: transparent;
  border: none;
  color: #555;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.2s;
}
.nav-back-link:hover {
  color: #c8f400;
}

.notif-wrapper {
  position: relative;
}

.header-icon-btn {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--color-gray-300);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.header-icon-btn:hover {
  color: var(--color-white);
  border-color: rgba(255, 255, 255, 0.1);
}

.header-notif-dot {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--color-lime);
}

.header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.header-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* LOCAL NOTIFICATION DROPDOWN POPUP */
.dashboard-notif-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  width: 340px;
  background: rgba(13, 13, 13, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: slide-dropdown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slide-dropdown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.notif-dropdown-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notif-dropdown-header h3 {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--color-white);
}

.notif-dropdown-header button {
  background: transparent;
  border: none;
  color: var(--color-lime);
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
}

.notif-dropdown-list {
  max-height: 280px;
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
  background: rgba(255, 255, 255, 0.01);
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
  color: var(--color-lime);
}

.notif-item-details h4 {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 2px;
}

.notif-item-details p {
  font-size: 0.7rem;
  color: var(--color-gray-500);
  line-height: 1.4;
  margin-bottom: 4px;
}

.notif-item-time {
  font-size: 0.65rem;
  color: var(--color-gray-600);
}

/* WORKSPACE BODY */
.dashboard-body {
  padding: clamp(20px, 4vw, 40px) clamp(20px, 4vw, 48px);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* TOP ROW */
.dashboard-row-top {
  display: grid;
  grid-template-columns: 2.2fr 1.3fr;
  gap: 24px;
}

/* Profile Banner Card */
.profile-banner-card {
  background: linear-gradient(135deg, rgba(13, 13, 13, 0.75), rgba(5, 5, 5, 0.95)), 
              url('/elite_gym_banner.png');
  background-size: cover;
  background-position: center;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: clamp(24px, 4vw, 36px);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.profile-banner-card__inner {
  display: flex;
  align-items: center;
  gap: 28px;
  z-index: 2;
  width: 100%;
}

.profile-banner-card__avatar-wrap {
  width: clamp(70px, 10vw, 96px);
  height: clamp(70px, 10vw, 96px);
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--color-lime);
  flex-shrink: 0;
}

.profile-banner-card__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-banner-card__info {
  display: flex;
  flex-direction: column;
}

.profile-banner-card__badge {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: var(--color-lime);
  background: rgba(200, 244, 0, 0.08);
  padding: 4px 10px;
  border-radius: 4px;
  width: max-content;
  margin-bottom: 8px;
}

.profile-banner-card__name {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 900;
  letter-spacing: 0.02em;
  color: var(--color-white);
  margin: 0 0 6px 0;
  line-height: 1.1;
}

.profile-banner-card__location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-gray-400);
  font-size: 0.8rem;
}

.profile-banner-card__location svg {
  color: var(--color-lime);
}

/* Status Card */
.status-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: clamp(24px, 4vw, 36px);
  display: flex;
  flex-direction: column;
}

.dashboard-card-subtitle {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--color-gray-500);
  margin: 0 0 16px 0;
  text-transform: uppercase;
}

.status-card__badge-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.status-card__icon-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(200, 244, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.status-card__text-wrap {}

.status-card__badge-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: var(--color-white);
  margin: 0 0 2px 0;
}

.status-card__badge-desc {
  font-size: 0.75rem;
  color: var(--color-gray-500);
}

.progress-block {}

.progress-block__header {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--color-gray-300);
  margin-bottom: 8px;
}

.progress-val {
  color: var(--color-lime);
}

.progress-bar-bg {
  height: 6px;
  background-color: var(--color-border);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--color-lime);
  border-radius: 3px;
}

/* MIDDLE ROW: Grid of 4 Action Cards */
.dashboard-action-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.action-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.25s var(--ease);
}

.action-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.4);
}

.action-card--active {
  border-color: #c8f400 !important;
  background: rgba(200, 244, 0, 0.04) !important;
  box-shadow: 0 0 15px rgba(200, 244, 0, 0.15) !important;
}

.action-card__icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-400);
  margin-bottom: 20px;
  transition: all 0.2s;
}

.action-card:hover .action-card__icon-wrap {
  background-color: rgba(200, 244, 0, 0.08);
  border-color: rgba(200, 244, 0, 0.15);
  color: var(--color-lime);
}

.action-card--active .action-card__icon-wrap {
  background-color: rgba(200, 244, 0, 0.1) !important;
  border-color: rgba(200, 244, 0, 0.2) !important;
  color: #c8f400 !important;
}

.action-card__title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--color-white);
  margin: 0 0 8px 0;
  text-transform: uppercase;
}

.action-card__desc {
  font-size: 0.75rem;
  color: var(--color-gray-500);
  line-height: 1.5;
}

/* BOTTOM ROW: Dynamic Content Cards & Layouts */
.dashboard-row-bottom {
  display: grid;
  grid-template-columns: 2.2fr 1.3fr;
  gap: 24px;
}

/* Recent Workouts Bar Chart Card */
.chart-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
}

.chart-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.chart-card__title-wrap {}

.chart-card__title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--color-white);
  margin: 0 0 4px 0;
}

.chart-card__subtitle {
  font-size: 0.72rem;
  color: var(--color-gray-500);
}

.chart-card__tabs {
  display: flex;
  background-color: #030303;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.chart-card__tab {
  background: transparent;
  border: none;
  padding: 6px 14px;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--color-gray-500);
  border-radius: 6px;
  transition: all 0.2s;
  cursor: pointer;
}

.chart-card__tab--active {
  background-color: rgba(255, 255, 255, 0.03);
  color: var(--color-white);
}

.chart-box {
  flex: 1;
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.chart-grid-lines {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

.chart-grid-lines span {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.02);
}

.chart-bars-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 170px;
  z-index: 2;
  padding: 0 10px;
}

.chart-bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 32px;
}

.chart-bar-track {
  height: 130px;
  width: 8px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.chart-bar-fill {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.chart-bar-fill--highlighted {
  background-color: var(--color-lime);
  box-shadow: 0 0 16px rgba(200, 244, 0, 0.3);
}

.chart-bar-badge {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-white);
  color: var(--color-black);
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 900;
  padding: 3px 6px;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.chart-bar-badge::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px;
  border-style: solid;
  border-color: var(--color-white) transparent transparent transparent;
}

.chart-day-label {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--color-gray-500);
}

/* Vertical Stats PR Column */
.stats-pr-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stats-pr-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 20px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: border-color 0.2s;
}
.stats-pr-card:hover {
  border-color: rgba(255, 255, 255, 0.05);
}

.stats-pr-card__label {
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--color-gray-500);
  margin: 0 0 6px 0;
  text-transform: uppercase;
}

.stats-pr-card__value-wrap {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.stats-pr-card__value {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--color-white);
  line-height: 1;
}

.stats-pr-card__unit {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-lime);
}

/* DYNAMIC CONTENT PANEL */
.card-content-panel {
  background: #0f0f0f;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: clamp(20px, 4vw, 32px);
  width: 100%;
  grid-column: 1 / -1;
  animation: fadeUp 0.3s ease forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 16px;
}

.panel-header h3 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--color-white);
  margin: 0;
}

.panel-close-btn {
  background: transparent;
  border: none;
  color: #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}
.panel-close-btn:hover {
  color: #fff;
}

.panel-body {
  width: 100%;
}

/* Detailed classes list */
.classes-list-detailed {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.class-item-row {
  display: grid;
  grid-template-columns: 120px 2fr 1.5fr 1fr;
  gap: 16px;
  align-items: center;
  background: #141414;
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.class-item-row__category {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  padding: 6px 12px;
  border-radius: 6px;
  text-align: center;
  width: max-content;
}

.class-item-row__category.cat--yoga {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}
.class-item-row__category.cat--hiit {
  background: rgba(230, 126, 34, 0.1);
  color: #e67e22;
}
.class-item-row__category.cat--weights {
  background: rgba(155, 89, 182, 0.1);
  color: #9b59b6;
}

.class-item-row__details h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}
.class-item-row__details p {
  font-size: 0.78rem;
  color: #888;
}

.class-item-row__schedule {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #fff;
}

.status-pill {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 6px 12px;
  border-radius: 4px;
  text-transform: uppercase;
}
.status-pill--registered {
  background: rgba(200, 244, 0, 0.1);
  color: #c8f400;
}

/* Detailed orders list */
.orders-list-detailed {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-item-row {
  display: grid;
  grid-template-columns: 100px 2fr 1.2fr 110px;
  gap: 16px;
  align-items: center;
  background: #141414;
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.order-item-row__id {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 800;
  color: #888;
}

.order-item-row__details h4 {
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}
.order-item-row__details p {
  font-size: 0.78rem;
  color: #555;
}

.order-item-row__price {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 800;
  color: #fff;
}

.status-pill--shipped {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  text-align: center;
}
.status-pill--delivered {
  background: rgba(255, 255, 255, 0.08);
  color: #ccc;
  text-align: center;
}

/* Support Panel styling */
.support-panel-grid {
  display: grid;
  grid-template-columns: 1.5fr 1.2fr;
  gap: 32px;
}

.support-form, .booking-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #555;
}

.form-group select, .form-group textarea, .form-group input {
  background: #141414;
  border: 1px solid var(--color-border);
  color: #fff;
  border-radius: 8px;
  padding: 12px 16px;
  font-family: inherit;
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s;
}
.form-group select:focus, .form-group textarea:focus, .form-group input:focus {
  border-color: #c8f400;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.action-btn-form {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  background: var(--color-lime);
  color: var(--color-black);
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 50px;
  transition: background 0.25s, transform 0.2s;
  cursor: pointer;
  width: max-content;
}
.action-btn-form:hover {
  background: #d4ff00;
  transform: translateY(-2px);
}
.action-btn-form:active {
  transform: translateY(0);
}

.support-faq h4, .scheduled-bookings h4 {
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #fff;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 8px;
}

.faq-item {
  margin-bottom: 16px;
}

.faq-item h5 {
  font-size: 0.8rem;
  font-weight: 700;
  color: #c8f400;
  margin-bottom: 4px;
}

.faq-item p {
  font-size: 0.75rem;
  color: #888;
  line-height: 1.5;
}

/* Booking Panel styling */
.booking-panel-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 32px;
}

.scheduled-bookings {
  display: flex;
  flex-direction: column;
}

.booking-active-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #141414;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 12px;
  border: 1px solid rgba(255, 255, 255, 0.01);
}

.booking-avatar-mini {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(200, 244, 0, 0.1);
  color: #c8f400;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.8rem;
}

.booking-row-info {
  flex: 1;
}
.booking-row-info h5 {
  font-size: 0.82rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2px;
}
.booking-row-info p {
  font-size: 0.72rem;
  color: #888;
}

.cancel-link {
  background: transparent;
  border: none;
  color: #c0392b;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
}
.cancel-link:hover {
  background: rgba(192, 57, 43, 0.1);
}

/* LOCAL PROFILE FOOTER */
.profile-footer {
  border-top: 1px solid var(--color-border);
  padding: clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px) 32px;
  background-color: #030303;
  margin-top: auto;
}

.profile-footer__inner {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 40px;
}

.profile-footer__left {}

.profile-footer__logo {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: var(--color-white);
  margin: 0 0 12px 0;
}

.profile-footer__desc {
  font-size: 0.78rem;
  color: var(--color-gray-500);
  line-height: 1.7;
}

.profile-footer__links-row {
  display: flex;
  gap: 60px;
}

.profile-footer__col h4 {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: var(--color-white);
  margin: 0 0 16px 0;
}

.profile-footer__col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-footer__col a {
  font-size: 0.78rem;
  color: var(--color-gray-500);
  transition: color 0.2s;
}
.profile-footer__col a:hover {
  color: var(--color-lime);
}

.profile-footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 0.72rem;
  color: var(--color-gray-600);
  border-top: 1px solid rgba(255, 255, 255, 0.02);
  padding-top: 24px;
}

.profile-footer__icons {
  display: flex;
  gap: 16px;
  color: var(--color-gray-600);
}

/* Mobile sidebar overlay */
.profile-sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 105;
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  .profile-layout {
    grid-template-columns: 1fr !important;
  }
  
  .profile-sidebar {
    position: fixed;
    top: 72px;
    left: 0;
    transform: translateX(-100%);
    width: 280px;
    height: calc(100vh - 72px);
    box-shadow: 20px 0 60px rgba(0,0,0,0.8);
  }
  
  .profile-sidebar--open {
    transform: translateX(0);
  }
  
  .mobile-sidebar-toggle {
    display: block;
  }

  .sidebar-toggle-btn {
    display: none !important;
  }
}

/* =========================================================
   MOBILE (≤900px) — Main layout improvements
   ========================================================= */
@media (max-width: 900px) {

  /* Hide inner dashboard header on mobile — sidebar toggle moved to global navbar */
  .profile-header {
    display: none;
  }

  /* profile-layout: padding = global navbar (72px) */
  .profile-layout {
    padding-top: 72px;
  }

  /* Main dashboard body: extra bottom padding for mobile bottom nav */
  .dashboard-body {
    padding: 16px;
    padding-bottom: 90px; /* leave room for mobile bottom nav bar */
    gap: 16px;
  }

  /* Top row: stack cards vertically */
  .dashboard-row-top {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  /* Profile banner — compact on mobile */
  .profile-banner-card {
    padding: 20px;
    border-radius: 16px;
  }

  .profile-banner-card__inner {
    gap: 16px;
  }

  .profile-banner-card__avatar-wrap {
    width: 64px;
    height: 64px;
  }

  .profile-banner-card__name {
    font-size: 1.5rem;
  }

  /* Status card compact */
  .status-card {
    padding: 20px;
    border-radius: 16px;
  }

  /* Action cards grid — 2x2 on mobile */
  .dashboard-action-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  /* Action card — touch-friendly sizing */
  .action-card {
    padding: 18px 16px;
    border-radius: 14px;
  }

  .action-card__icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    margin-bottom: 14px;
  }

  .action-card__title {
    font-size: 0.78rem;
  }

  .action-card__desc {
    font-size: 0.68rem;
  }

  /* Bottom row stays hidden on mobile — use mobile panel instead */
  .dashboard-row-bottom {
    display: none !important;
  }
}

/* =========================================================
   MOBILE FULL-SCREEN PANEL OVERLAY
   ========================================================= */
.mobile-full-panel {
  position: fixed;
  inset: 0;
  top: 72px; /* below global navbar */
  background-color: #050505;
  z-index: 300;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Slide-in from right transition */
.mobile-panel-slide-enter-active,
.mobile-panel-slide-leave-active {
  transition: transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease;
}
.mobile-panel-slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.mobile-panel-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Panel top header (back button + title) */
.mobile-panel-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: #0a0a0a;
  flex-shrink: 0;
}

.mobile-panel-back {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #c8f400;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.2s;
  white-space: nowrap;
}

.mobile-panel-back:hover {
  background: rgba(200, 244, 0, 0.08);
}

.mobile-panel-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--color-white);
  margin: 0;
  flex: 1;
  text-align: right;
}

/* Panel scrollable body */
.mobile-panel-body {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 20px 16px 100px; /* bottom padding for bottom nav */
}

/* --- KELAS SAYA mobile cards --- */
.mobile-classes-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.mobile-class-card {
  background: #0f0f0f;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-class-card__badge {
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  padding: 5px 10px;
  border-radius: 6px;
  width: max-content;
}

.mobile-class-card__info h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}

.mobile-class-card__info p {
  font-size: 0.78rem;
  color: #888;
  margin-bottom: 6px;
}

.mobile-class-card__time {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  color: #c8f400;
  letter-spacing: 0.05em;
}

/* --- PESANAN SAYA mobile cards --- */
.mobile-orders-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.mobile-order-card {
  background: #0f0f0f;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 14px;
  padding: 18px;
}

.mobile-order-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.mobile-order-card__id {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  color: #555;
}

.mobile-order-card__item {
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.4;
  margin-bottom: 12px;
}

.mobile-order-card__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-order-card__date {
  font-size: 0.72rem;
  color: #666;
}

.mobile-order-card__price {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 800;
  color: #c8f400;
}

/* --- SUPPORT / DUKUNGAN mobile --- */
.mobile-support-wrap,
.mobile-booking-wrap {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.mobile-support-form,
.mobile-booking-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-section-label {
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 4px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.mobile-full-btn {
  width: 100% !important;
  justify-content: center;
}

/* FAQ items on mobile */
.mobile-faq {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mobile-faq-item {
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding: 14px 0;
}

.mobile-faq-item:last-child {
  border-bottom: none;
}

.mobile-faq-item h5 {
  font-size: 0.82rem;
  font-weight: 700;
  color: #c8f400;
  margin-bottom: 6px;
}

.mobile-faq-item p {
  font-size: 0.75rem;
  color: #888;
  line-height: 1.5;
}

/* Active bookings on mobile */
.mobile-active-bookings {
  display: flex;
  flex-direction: column;
}

.mobile-booking-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #0f0f0f;
  padding: 14px;
  border-radius: 12px;
  margin-bottom: 10px;
  border: 1px solid rgba(255,255,255,0.03);
}

/* =========================================================
   SMALL SCREENS (≤640px) — Additional tweaks
   ========================================================= */
@media (max-width: 640px) {

  .profile-banner-card__name {
    font-size: 1.3rem;
  }

  .profile-banner-card__avatar-wrap {
    width: 56px;
    height: 56px;
  }

  .dashboard-action-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .action-card {
    padding: 16px 14px;
  }

  .action-card__icon-wrap {
    width: 36px;
    height: 36px;
    margin-bottom: 12px;
  }

  .action-card__title {
    font-size: 0.72rem;
  }

  .action-card__desc {
    font-size: 0.62rem;
    display: none; /* hide desc on very small screens */
  }
}

</style>
