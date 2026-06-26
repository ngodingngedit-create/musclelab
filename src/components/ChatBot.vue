<template>
  <section class="cb" id="chatbot-page">
    <div class="cb__layout">

      <!-- ========= SIDEBAR ========= -->
      <aside class="cb__sidebar" :class="{ 'cb__sidebar--open': sidebarOpen }">
        <div class="cb__sidebar-inner">

          <!-- Bot Avatar -->
          <div class="cb__bot-profile">
            <div class="cb__bot-avatar">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 2v9"/><circle cx="12" cy="2" r="1.5"/><path d="M8 15h0M16 15h0"/></svg>
              <span class="cb__bot-online"></span>
            </div>
            <div class="cb__bot-meta">
              <h3 class="cb__bot-name">MUSCLE BOT</h3>
              <p class="cb__bot-status">
                <span class="cb__status-dot"></span>
                {{ isTyping ? tl.typing : tl.online }}
              </p>
            </div>
          </div>

          <!-- Quick Topics -->
          <div class="cb__quick-topics">
            <p class="cb__section-label">{{ tl.quickTopics }}</p>
            <button
              v-for="topic in quickTopics"
              :key="topic.id"
              class="cb__topic-btn"
              :id="`topic-${topic.id}`"
              @click="sendMessage(topic.text)"
            >
              <span class="cb__topic-icon">{{ topic.icon }}</span>
              {{ topic.label }}
            </button>
          </div>

          <!-- Conversation Starters -->
          <div class="cb__starters">
            <p class="cb__section-label">{{ tl.suggestions }}</p>
            <div class="cb__starter-chips">
              <button
                v-for="s in starterChips"
                :key="s"
                class="cb__chip"
                @click="sendMessage(s)"
              >{{ s }}</button>
            </div>
          </div>

          <!-- Clear button -->
          <div class="cb__sidebar-footer">
            <button class="cb__clear-btn" id="cb-clear" @click="clearChat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6l-1 14H6L5 6M8 6V4h8v2"/></svg>
              {{ tl.clearChat }}
            </button>
          </div>
        </div>
      </aside>

      <!-- ========= CHAT PANEL ========= -->
      <div class="cb__chat-panel">

        <!-- Chat Header -->
        <div class="cb__chat-header">
          <button class="cb__sidebar-toggle" @click="sidebarOpen = !sidebarOpen" id="cb-sidebar-toggle" :aria-label="tl.menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div class="cb__header-bot">
            <div class="cb__header-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 2v9"/><circle cx="12" cy="2" r="1.5"/></svg>
            </div>
            <div>
              <p class="cb__header-name">MUSCLE BOT</p>
              <p class="cb__header-status">
                <span class="cb__status-dot"></span>
                {{ isTyping ? tl.typing : tl.online }}
              </p>
            </div>
          </div>
          <button class="cb__home-btn" id="cb-home" @click="navigateTo('landing')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </button>
        </div>

        <!-- Messages -->
        <div class="cb__messages" ref="messagesEl" id="cb-messages">

          <!-- Welcome if empty -->
          <div v-if="messages.length === 0" class="cb__welcome">
            <div class="cb__welcome-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 2v9"/><circle cx="12" cy="2" r="1.5"/><path d="M8 15h0M16 15h0"/></svg>
            </div>
            <h2 class="cb__welcome-title">{{ tl.welcomeTitle }}</h2>
            <p class="cb__welcome-desc">{{ tl.welcomeDesc }}</p>
            <div class="cb__welcome-chips">
              <button v-for="s in welcomeChips" :key="s" class="cb__chip" @click="sendMessage(s)">{{ s }}</button>
            </div>
          </div>

          <!-- Message Bubbles -->
          <template v-for="(msg, i) in messages" :key="msg.id">

            <!-- Date separator -->
            <div v-if="showDateSep(i)" class="cb__date-sep">
              <span>{{ tl.today }}</span>
            </div>

            <!-- Bot message -->
            <div v-if="msg.role === 'bot'" class="cb__msg cb__msg--bot">
              <div class="cb__msg-avatar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 2v9"/><circle cx="12" cy="2" r="1.5"/></svg>
              </div>
              <div class="cb__msg-content">
                <div class="cb__bubble cb__bubble--bot" v-html="formatText(msg.text)"></div>
                <div class="cb__msg-meta">
                  <span>MUSCLE BOT</span> · <span>{{ msg.time }}</span>
                </div>
                <!-- Quick reply chips -->
                <div class="cb__quick-replies" v-if="msg.chips && i === messages.length - 1">
                  <button v-for="chip in msg.chips" :key="chip" class="cb__chip" @click="sendMessage(chip)">{{ chip }}</button>
                </div>
              </div>
            </div>

            <!-- User message -->
            <div v-else class="cb__msg cb__msg--user">
              <div class="cb__msg-content">
                <div class="cb__bubble cb__bubble--user">{{ msg.text }}</div>
                <div class="cb__msg-meta cb__msg-meta--right">
                  <span>{{ tl.you }}</span> · <span>{{ msg.time }}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
            </div>
          </template>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="cb__msg cb__msg--bot cb__msg--typing">
            <div class="cb__msg-avatar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8f400" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 2v9"/><circle cx="12" cy="2" r="1.5"/></svg>
            </div>
            <div class="cb__typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>

        </div>

        <!-- Input Bar -->
        <div class="cb__input-bar">
          <div class="cb__input-wrap">
            <textarea
              ref="inputEl"
              v-model="inputText"
              class="cb__input"
              id="cb-input"
              :placeholder="tl.inputPlaceholder"
              rows="1"
              @keydown.enter.exact.prevent="handleSend"
              @input="autoResize"
            ></textarea>
            <button
              class="cb__send-btn"
              id="cb-send"
              :class="{ 'cb__send-btn--active': inputText.trim() }"
              :disabled="!inputText.trim() || isTyping"
              @click="handleSend"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
          <p class="cb__input-hint">{{ tl.inputHint }}</p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useNavigation } from '../composables/useNavigation'

const { t, currentLang } = useLanguage()
const { navigateTo } = useNavigation()

const tl = computed(() => t.value.chatBot)
const isId = computed(() => currentLang.value === 'id')

const messages    = ref([])
const inputText   = ref('')
const isTyping    = ref(false)
const sidebarOpen = ref(false)
const messagesEl  = ref(null)
const inputEl     = ref(null)
let   msgCounter  = 0

// -------------------------------------------------------
//  QUICK TOPICS (sidebar)
// -------------------------------------------------------
const quickTopics = computed(() => isId.value ? [
  { id: 'schedule', icon: '📅', label: 'Jadwal Kelas',     text: 'Kapan jadwal kelas yang tersedia?' },
  { id: 'trainer',  icon: '🏋️', label: 'Personal Trainer', text: 'Berapa biaya personal trainer?' },
  { id: 'member',   icon: '💳', label: 'Keanggotaan',      text: 'Apa saja paket keanggotaan?' },
  { id: 'nutrition',icon: '🥗', label: 'Nutrisi',          text: 'Ada panduan nutrisi tidak?' },
  { id: 'tips',     icon: '💡', label: 'Tips Latihan',     text: 'Berikan tips latihan untuk pemula' },
  { id: 'location', icon: '📍', label: 'Lokasi & Jam',     text: 'Di mana lokasi gym dan jam bukanya?' },
] : [
  { id: 'schedule', icon: '📅', label: 'Class Schedule',   text: 'What classes are available?' },
  { id: 'trainer',  icon: '🏋️', label: 'Personal Trainer', text: 'How much does a personal trainer cost?' },
  { id: 'member',   icon: '💳', label: 'Membership',       text: 'What membership plans are available?' },
  { id: 'nutrition',icon: '🥗', label: 'Nutrition',        text: 'Do you have nutrition guidance?' },
  { id: 'tips',     icon: '💡', label: 'Workout Tips',     text: 'Give me workout tips for beginners' },
  { id: 'location', icon: '📍', label: 'Location & Hours', text: 'Where are you located and what are your hours?' },
])

const starterChips = computed(() => isId.value
  ? ['Harga keanggotaan', 'Kelas yoga', 'HIIT burning fat', 'Trainer terbaik']
  : ['Membership price', 'Yoga classes', 'HIIT fat burning', 'Best trainer']
)

const welcomeChips = computed(() => isId.value
  ? ['Apa saja kelasnya?', 'Cara daftar anggota', 'Rekomendasi program', 'Hubungi admin']
  : ['What classes are available?', 'How to register', 'Program recommendations', 'Contact admin']
)

// -------------------------------------------------------
//  DUMMY BOT BRAIN
// -------------------------------------------------------
const botReplies = {
  id: [
    {
      patterns: ['kelas', 'jadwal', 'schedule'],
      text: '📅 <strong>Kelas yang tersedia di Muscle Lab:</strong><br><br>🔥 <strong>HIIT</strong> — Sen, Rab, Jum · 06:00 & 18:00<br>🧘 <strong>Yoga</strong> — Sel, Kam, Sab · 07:00 & 19:00<br>🏋️ <strong>Weight Training</strong> — Setiap hari · 05:00–22:00<br>🥊 <strong>Boxing</strong> — Sel, Kam · 18:00<br>🚴 <strong>Cycling</strong> — Sen, Rab, Sab · 07:00',
      chips: ['Daftar kelas HIIT', 'Kelas yoga pagi', 'Harga per kelas'],
    },
    {
      patterns: ['trainer', 'pelatih', 'personal', 'biaya trainer', 'harga trainer'],
      text: '🏋️ <strong>Personal Trainer Muscle Lab:</strong><br><br>💪 <strong>Marcus Thorne</strong> — HIIT & Metabolik · <strong>Rp 350.000/sesi</strong><br>🧘 <strong>Elena Volkov</strong> — Yoga & Pemulihan · <strong>Rp 280.000/sesi</strong><br>⚡ <strong>Sarah Chen</strong> — Latihan Beban · <strong>Rp 320.000/sesi</strong><br>🥊 <strong>Jaxon Reed</strong> — Tinju & Combat · <strong>Rp 400.000/sesi</strong><br><br>Semua trainer bersertifikat internasional!',
      chips: ['Pesan Marcus Thorne', 'Lihat semua trainer', 'Paket 1 bulan'],
    },
    {
      patterns: ['keanggotaan', 'membership', 'paket', 'harga', 'biaya', 'daftar'],
      text: '💳 <strong>Paket Keanggotaan Muscle Lab:</strong><br><br>🥉 <strong>STARTER</strong> — Rp 299.000/bln<br>Akses semua alat, shower, 2x kelas/minggu<br><br>🥈 <strong>ACTIVE</strong> — Rp 499.000/bln<br>Semua Starter + kelas unlimited, loker pribadi<br><br>🥇 <strong>PRO</strong> — Rp 799.000/bln<br>Semua Active + 2x sesi trainer, nutrisi konsultasi<br><br>✅ Semua paket tanpa kontrak jangka panjang!',
      chips: ['Pilih Starter', 'Pilih Active', 'Pilih Pro'],
    },
    {
      patterns: ['nutrisi', 'nutrition', 'makan', 'diet', 'makanan'],
      text: '🥗 <strong>Panduan Nutrisi Muscle Lab:</strong><br><br><strong>🔥 Untuk Fat Loss:</strong><br>• Defisit kalori 300-500 kkal/hari<br>• Protein tinggi: 2g per kg BB<br>• Kurangi karbohidrat olahan<br><br><strong>💪 Untuk Muscle Gain:</strong><br>• Surplus kalori 200-300 kkal<br>• Protein: 1.6-2.2g per kg BB<br>• Karbohidrat kompleks sebelum latihan<br><br>Ingin program nutrisi personal? Anggota PRO mendapat konsultasi langsung!',
      chips: ['Program fat loss', 'Program muscle gain', 'Paket PRO'],
    },
    {
      patterns: ['tips', 'pemula', 'mulai', 'awal', 'cara'],
      text: '💡 <strong>Tips untuk Pemula:</strong><br><br>1️⃣ Mulai dengan <strong>3x latihan</strong> per minggu<br>2️⃣ Fokus pada <strong>teknik yang benar</strong> dulu<br>3️⃣ <strong>Pemanasan 10 menit</strong> sebelum latihan<br>4️⃣ Jangan skip <strong>hari istirahat</strong><br>5️⃣ Catat progress di <strong>jurnal latihan</strong><br>6️⃣ Minum air <strong>2–3 liter</strong> per hari<br><br>Pro Tip: Coba kelas HIIT atau Weight Training bersama trainer untuk awal yang solid! 💪',
      chips: ['Jadwal HIIT', 'Pesan trainer', 'Kelas untuk pemula'],
    },
    {
      patterns: ['lokasi', 'location', 'alamat', 'jam', 'buka', 'tutup', 'where', 'open', 'hours'],
      text: '📍 <strong>Muscle Lab Gym</strong><br><br>🗺️ Jl. Sudirman No. 88, Jakarta Selatan<br>📞 +62 21 5555 8888<br>📧 hello@musclelabgym.id<br><br>⏰ <strong>Jam Operasional:</strong><br>Sen – Jum: 05:00 – 23:00<br>Sabtu: 06:00 – 22:00<br>Minggu & Hari Libur: 07:00 – 20:00<br><br>🅿️ Parkir tersedia (2 jam gratis)',
      chips: ['Jadwal kelas hari ini', 'Hubungi admin', 'Cara mendaftar'],
    },
    {
      patterns: ['halo', 'hai', 'hi', 'hello', 'hey', 'hei'],
      text: '👋 Halo! Saya <strong>Muscle Bot</strong>, asisten virtual Muscle Lab Gym.<br><br>Saya bisa membantu kamu dengan informasi tentang:<br>• Jadwal & program kelas<br>• Personal trainer<br>• Keanggotaan & harga<br>• Tips nutrisi & latihan<br>• Info lokasi gym<br><br>Ada yang bisa saya bantu? 😊',
      chips: ['Lihat kelas', 'Info trainer', 'Harga membership'],
    },
    {
      patterns: ['terima kasih', 'makasih', 'thanks', 'thank you'],
      text: 'Sama-sama! 🙏 Senang bisa membantu. Kalau ada pertanyaan lain seputar Muscle Lab, jangan ragu untuk tanya lagi!<br><br>Semangat latihan! 💪🔥',
      chips: ['Tanya hal lain', 'Jadwal kelas', 'Kembali ke beranda'],
    },
    {
      patterns: ['default'],
      text: 'Maaf, saya tidak sepenuhnya mengerti pertanyaan itu. 😅<br><br>Coba tanyakan tentang:<br>• <strong>Kelas & jadwal</strong><br>• <strong>Personal trainer</strong><br>• <strong>Keanggotaan</strong><br>• <strong>Tips latihan</strong><br>• <strong>Lokasi gym</strong>',
      chips: ['Jadwal kelas', 'Info trainer', 'Harga membership'],
    },
  ],
  en: [
    {
      patterns: ['class', 'schedule', 'available', 'session'],
      text: '📅 <strong>Available Classes at Muscle Lab:</strong><br><br>🔥 <strong>HIIT</strong> — Mon, Wed, Fri · 06:00 & 18:00<br>🧘 <strong>Yoga</strong> — Tue, Thu, Sat · 07:00 & 19:00<br>🏋️ <strong>Weight Training</strong> — Daily · 05:00–22:00<br>🥊 <strong>Boxing</strong> — Tue, Thu · 18:00<br>🚴 <strong>Cycling</strong> — Mon, Wed, Sat · 07:00',
      chips: ['Sign up for HIIT', 'Morning yoga', 'Class pricing'],
    },
    {
      patterns: ['trainer', 'coach', 'personal', 'instructor', 'cost trainer'],
      text: '🏋️ <strong>Muscle Lab Personal Trainers:</strong><br><br>💪 <strong>Marcus Thorne</strong> — HIIT & Metabolic · <strong>Rp 350,000/session</strong><br>🧘 <strong>Elena Volkov</strong> — Yoga & Recovery · <strong>Rp 280,000/session</strong><br>⚡ <strong>Sarah Chen</strong> — Weight Training · <strong>Rp 320,000/session</strong><br>🥊 <strong>Jaxon Reed</strong> — Boxing & Combat · <strong>Rp 400,000/session</strong><br><br>All trainers are internationally certified!',
      chips: ['Book Marcus Thorne', 'See all trainers', '1-month package'],
    },
    {
      patterns: ['membership', 'plan', 'price', 'pricing', 'cost', 'fee', 'register', 'join'],
      text: '💳 <strong>Muscle Lab Membership Plans:</strong><br><br>🥉 <strong>STARTER</strong> — Rp 299,000/mo<br>Full equipment access, showers, 2x classes/week<br><br>🥈 <strong>ACTIVE</strong> — Rp 499,000/mo<br>All Starter + unlimited classes, personal locker<br><br>🥇 <strong>PRO</strong> — Rp 799,000/mo<br>All Active + 2x trainer sessions, nutrition consult<br><br>✅ No long-term contract required!',
      chips: ['Get Starter', 'Get Active', 'Get Pro'],
    },
    {
      patterns: ['nutrition', 'diet', 'food', 'eat', 'meal'],
      text: '🥗 <strong>Muscle Lab Nutrition Guide:</strong><br><br><strong>🔥 For Fat Loss:</strong><br>• 300-500 kcal daily deficit<br>• High protein: 2g per kg bodyweight<br>• Reduce refined carbs<br><br><strong>💪 For Muscle Gain:</strong><br>• 200-300 kcal surplus<br>• Protein: 1.6-2.2g per kg BW<br>• Complex carbs pre-workout<br><br>Want a personalized nutrition plan? PRO members get 1-on-1 nutrition consultation!',
      chips: ['Fat loss program', 'Muscle gain program', 'PRO package'],
    },
    {
      patterns: ['tip', 'beginner', 'start', 'new', 'advice', 'how to'],
      text: '💡 <strong>Beginner Tips:</strong><br><br>1️⃣ Start with <strong>3 workouts</strong> per week<br>2️⃣ Focus on <strong>correct form</strong> first<br>3️⃣ <strong>10-min warm-up</strong> before training<br>4️⃣ Never skip <strong>rest days</strong><br>5️⃣ Track your progress in a <strong>training journal</strong><br>6️⃣ Drink <strong>2–3 liters</strong> of water daily<br><br>Pro Tip: Try HIIT or Weight Training with a trainer for a strong start! 💪',
      chips: ['HIIT schedule', 'Book a trainer', 'Beginner classes'],
    },
    {
      patterns: ['location', 'address', 'where', 'hour', 'open', 'close'],
      text: '📍 <strong>Muscle Lab Gym</strong><br><br>🗺️ Jl. Sudirman No. 88, South Jakarta<br>📞 +62 21 5555 8888<br>📧 hello@musclelabgym.id<br><br>⏰ <strong>Operating Hours:</strong><br>Mon – Fri: 05:00 – 23:00<br>Saturday: 06:00 – 22:00<br>Sunday & Holidays: 07:00 – 20:00<br><br>🅿️ Parking available (2 hours free)',
      chips: ['Today\'s classes', 'Contact admin', 'How to register'],
    },
    {
      patterns: ['hi', 'hello', 'hey', 'hola', 'greet'],
      text: '👋 Hi! I\'m <strong>Muscle Bot</strong>, the Muscle Lab Gym virtual assistant.<br><br>I can help you with:<br>• Class schedules & programs<br>• Personal trainers<br>• Membership & pricing<br>• Nutrition & workout tips<br>• Gym location info<br><br>What can I help you with today? 😊',
      chips: ['Browse classes', 'Trainer info', 'Membership pricing'],
    },
    {
      patterns: ['thank', 'thanks', 'awesome', 'great', 'perfect'],
      text: 'You\'re welcome! 🙏 Happy to help. If you have any more questions about Muscle Lab, feel free to ask!<br><br>Stay strong! 💪🔥',
      chips: ['Ask something else', 'Class schedule', 'Back to home'],
    },
    {
      patterns: ['default'],
      text: 'Sorry, I didn\'t quite catch that. 😅<br><br>Try asking about:<br>• <strong>Classes & schedule</strong><br>• <strong>Personal trainers</strong><br>• <strong>Membership</strong><br>• <strong>Workout tips</strong><br>• <strong>Gym location</strong>',
      chips: ['Class schedule', 'Trainer info', 'Membership pricing'],
    },
  ],
}

function getBotReply(text) {
  const lang   = currentLang.value
  const lower  = text.toLowerCase()
  const rules  = botReplies[lang] || botReplies.en
  const match  = rules.find(r => r.patterns[0] !== 'default' && r.patterns.some(p => lower.includes(p)))
  return match || rules.find(r => r.patterns[0] === 'default')
}

// -------------------------------------------------------
//  CHAT LOGIC
// -------------------------------------------------------
function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function showDateSep(index) {
  return index === 0
}

async function scrollToBottom(smooth = true) {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTo({ top: messagesEl.value.scrollHeight, behavior: smooth ? 'smooth' : 'instant' })
  }
}

async function sendMessage(text) {
  if (!text || !text.trim()) return
  const userText = text.trim()
  inputText.value = ''
  if (inputEl.value) { inputEl.value.style.height = 'auto' }

  messages.value.push({ id: ++msgCounter, role: 'user', text: userText, time: now() })
  await scrollToBottom()

  isTyping.value = true
  await scrollToBottom()

  // Simulate typing delay (800ms - 2000ms)
  const delay = 900 + Math.random() * 900
  await new Promise(r => setTimeout(r, delay))

  const reply = getBotReply(userText)
  isTyping.value = false
  messages.value.push({ id: ++msgCounter, role: 'bot', text: reply.text, chips: reply.chips, time: now() })
  await scrollToBottom()
}

function handleSend() {
  const text = inputText.value.trim()
  if (!text || isTyping.value) return
  sendMessage(text)
}

function clearChat() {
  messages.value = []
}

function autoResize() {
  if (!inputEl.value) return
  inputEl.value.style.height = 'auto'
  inputEl.value.style.height = Math.min(inputEl.value.scrollHeight, 120) + 'px'
}

function formatText(text) {
  return text // already HTML-safe with <br> and <strong>
}

// Send a greeting on mount
onMounted(() => {
  const greeting = isId.value
    ? '👋 Halo! Saya <strong>Muscle Bot</strong>, asisten virtual Muscle Lab Gym.<br><br>Saya bisa membantu kamu dengan informasi seputar kelas, trainer, keanggotaan, dan tips latihan.<br><br>Ada yang bisa saya bantu? 😊'
    : '👋 Hi! I\'m <strong>Muscle Bot</strong>, Muscle Lab Gym\'s virtual assistant.<br><br>I can help with class info, trainers, membership, and workout tips.<br><br>What can I help you with today? 😊'
  const chips = isId.value
    ? ['Lihat kelas', 'Info trainer', 'Harga membership']
    : ['Browse classes', 'Trainer info', 'Membership pricing']
  messages.value.push({ id: ++msgCounter, role: 'bot', text: greeting, chips, time: now() })
})
</script>

<style scoped>
/* =========================================================
   PAGE LAYOUT
   ========================================================= */
.cb {
  height: 100dvh;
  background: var(--color-black);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: var(--nav-height);
}
.cb__layout {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: 100%;
}

/* =========================================================
   SIDEBAR
   ========================================================= */
.cb__sidebar {
  width: 280px;
  flex-shrink: 0;
  background: #050505;
  border-right: 1px solid #111;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #1a1a1a transparent;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.cb__sidebar-inner {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex: 1;
}

/* Bot Profile */
.cb__bot-profile {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 24px;
  border-bottom: 1px solid #111;
}
.cb__bot-avatar {
  width: 52px; height: 52px; border-radius: 14px;
  background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%);
  border: 1px solid rgba(200,244,0,0.2);
  display: flex; align-items: center; justify-content: center;
  position: relative; flex-shrink: 0;
}
.cb__bot-online {
  position: absolute; bottom: -2px; right: -2px;
  width: 12px; height: 12px; border-radius: 50%;
  background: #00c864; border: 2px solid #050505;
  animation: pulse 2s ease-in-out infinite;
}
.cb__bot-name {
  font-family: var(--font-display); font-size: 0.88rem; font-weight: 900;
  letter-spacing: 0.1em; color: #fff;
}
.cb__bot-status {
  display: flex; align-items: center; gap: 5px;
  font-family: var(--font-display); font-size: 0.62rem; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase; color: #00c864;
  margin-top: 2px;
}
.cb__status-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #00c864;
  animation: pulse 2s ease-in-out infinite;
}

/* Quick topics */
.cb__section-label {
  font-family: var(--font-display); font-size: 0.6rem; font-weight: 700;
  letter-spacing: 0.25em; text-transform: uppercase; color: #444;
  margin-bottom: 10px;
}
.cb__quick-topics { display: flex; flex-direction: column; gap: 2px; }
.cb__topic-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 10px;
  background: transparent; border: none; cursor: pointer;
  font-family: var(--font-display); font-size: 0.72rem;
  font-weight: 700; letter-spacing: 0.06em; color: #555;
  transition: background 0.2s, color 0.2s; text-align: left;
}
.cb__topic-btn:hover { background: #0f0f0f; color: #fff; }
.cb__topic-icon { font-size: 1rem; }

/* Starter chips */
.cb__starter-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.cb__chip {
  display: inline-flex; align-items: center;
  padding: 7px 14px; border-radius: 50px;
  background: #0d0d0d; border: 1px solid #1e1e1e; cursor: pointer;
  font-family: var(--font-display); font-size: 0.65rem; font-weight: 700;
  letter-spacing: 0.08em; color: #666; transition: all 0.2s;
  white-space: nowrap;
}
.cb__chip:hover { border-color: rgba(200,244,0,0.35); color: var(--color-lime); background: rgba(200,244,0,0.06); }

/* Sidebar footer */
.cb__sidebar-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #111;
}
.cb__clear-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 14px; border-radius: 8px;
  background: transparent; border: 1px solid #1e1e1e; cursor: pointer;
  font-family: var(--font-display); font-size: 0.65rem; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase; color: #444;
  transition: all 0.2s; width: 100%; justify-content: center;
}
.cb__clear-btn:hover { border-color: rgba(220,60,60,0.35); color: #e05252; }

/* =========================================================
   CHAT PANEL
   ========================================================= */
.cb__chat-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #070707;
}

/* Chat header */
.cb__chat-header {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 20px;
  background: #050505; border-bottom: 1px solid #111;
  flex-shrink: 0;
}
.cb__sidebar-toggle {
  display: none; /* shown on mobile */
  align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 8px;
  background: transparent; border: 1px solid #1a1a1a; cursor: pointer; color: #555;
  transition: color 0.2s, border-color 0.2s;
}
.cb__sidebar-toggle:hover { color: #fff; border-color: #333; }
.cb__header-bot { display: flex; align-items: center; gap: 12px; flex: 1; }
.cb__header-avatar {
  width: 36px; height: 36px; border-radius: 10px;
  background: linear-gradient(135deg, #0d0d0d, #1a1a1a);
  border: 1px solid rgba(200,244,0,0.2);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cb__header-name {
  font-family: var(--font-display); font-size: 0.85rem; font-weight: 900; color: #fff;
  letter-spacing: 0.08em;
}
.cb__header-status {
  display: flex; align-items: center; gap: 5px;
  font-family: var(--font-display); font-size: 0.6rem; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase; color: #00c864;
}
.cb__home-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 8px;
  background: transparent; border: 1px solid #1a1a1a; cursor: pointer; color: #555;
  transition: color 0.2s, border-color 0.2s;
}
.cb__home-btn:hover { color: var(--color-lime); border-color: rgba(200,244,0,0.3); }

/* =========================================================
   MESSAGES AREA
   ========================================================= */
.cb__messages {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  scrollbar-width: thin;
  scrollbar-color: #1a1a1a transparent;
  scroll-behavior: smooth;
}

/* Welcome */
.cb__welcome {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; padding: clamp(24px, 8vw, 64px) 20px; gap: 16px;
  margin: auto;
}
.cb__welcome-icon {
  width: 72px; height: 72px; border-radius: 20px;
  background: rgba(200,244,0,0.06); border: 1px solid rgba(200,244,0,0.2);
  display: flex; align-items: center; justify-content: center;
  animation: pulseGlow 2.5s ease-in-out infinite;
}
.cb__welcome-title {
  font-family: var(--font-display); font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 900; text-transform: uppercase; color: #fff; letter-spacing: 0.05em;
}
.cb__welcome-desc { font-size: 0.82rem; color: #444; line-height: 1.7; max-width: 340px; }
.cb__welcome-chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }

/* Date separator */
.cb__date-sep {
  display: flex; align-items: center; justify-content: center;
  padding: 8px 0 16px;
}
.cb__date-sep span {
  font-family: var(--font-display); font-size: 0.58rem; font-weight: 700;
  letter-spacing: 0.2em; text-transform: uppercase; color: #2a2a2a;
  background: #0a0a0a; padding: 4px 12px; border-radius: 50px; border: 1px solid #111;
}

/* Message row */
.cb__msg {
  display: flex; align-items: flex-end; gap: 10px;
  max-width: 75%; animation: fadeUp 0.3s var(--ease) both;
}
.cb__msg--bot { align-self: flex-start; }
.cb__msg--user { align-self: flex-end; flex-direction: row-reverse; }
.cb__msg--typing { margin-top: 8px; }

.cb__msg-avatar {
  width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
  background: linear-gradient(135deg, #0d0d0d, #1a1a1a);
  border: 1px solid rgba(200,244,0,0.2);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 18px;
}

.cb__msg-content {
  display: flex; flex-direction: column; gap: 4px; min-width: 0;
}

/* Bubble */
.cb__bubble {
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 0.85rem;
  line-height: 1.65;
  max-width: 100%;
  word-break: break-word;
}
.cb__bubble--bot {
  background: #101010;
  border: 1px solid #1a1a1a;
  color: #ccc;
  border-bottom-left-radius: 4px;
}
.cb__bubble--bot :deep(strong) { color: #fff; }
.cb__bubble--bot :deep(br) { content: ''; display: block; margin: 2px 0; }

.cb__bubble--user {
  background: linear-gradient(135deg, var(--color-lime) 0%, #a8d900 100%);
  color: #000;
  font-weight: 600;
  border-bottom-right-radius: 4px;
}

/* Meta */
.cb__msg-meta {
  display: flex; align-items: center; gap: 5px;
  font-family: var(--font-display); font-size: 0.55rem;
  font-weight: 600; letter-spacing: 0.1em; color: #2a2a2a; padding: 0 4px;
}
.cb__msg-meta--right { justify-content: flex-end; }

/* Quick replies */
.cb__quick-replies { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }

/* Typing indicator */
.cb__typing-indicator {
  display: flex; align-items: center; gap: 5px;
  padding: 12px 18px;
  background: #101010; border: 1px solid #1a1a1a; border-radius: 18px; border-bottom-left-radius: 4px;
}
.cb__typing-indicator span {
  width: 7px; height: 7px; border-radius: 50%; background: #333;
  animation: typingBounce 1.2s ease-in-out infinite;
}
.cb__typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.cb__typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

/* =========================================================
   INPUT BAR
   ========================================================= */
.cb__input-bar {
  padding: 12px 20px 16px;
  background: #050505;
  border-top: 1px solid #111;
  flex-shrink: 0;
}
.cb__input-wrap {
  display: flex; align-items: flex-end; gap: 10px;
  background: #0a0a0a; border: 1px solid #1e1e1e;
  border-radius: 14px; padding: 8px 8px 8px 16px;
  transition: border-color 0.2s;
}
.cb__input-wrap:focus-within { border-color: rgba(200,244,0,0.3); }

.cb__input {
  flex: 1; background: transparent; border: none; outline: none;
  font-family: var(--font-body); font-size: 0.88rem; color: #fff;
  resize: none; min-height: 24px; max-height: 120px;
  scrollbar-width: none; line-height: 1.5;
  overflow-y: auto;
}
.cb__input::placeholder { color: #333; }

.cb__send-btn {
  width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
  background: #1a1a1a; border: none; cursor: pointer; color: #444;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.cb__send-btn--active { background: var(--color-lime); color: #000; }
.cb__send-btn--active:hover { background: #d4ff00; transform: scale(1.05); }
.cb__send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

.cb__input-hint {
  font-family: var(--font-display); font-size: 0.58rem; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase; color: #222;
  text-align: center; margin-top: 8px;
}

/* =========================================================
   KEYFRAMES
   ========================================================= */
@keyframes typingBounce {
  0%, 80%, 100% { transform: translateY(0); background: #333; }
  40% { transform: translateY(-6px); background: var(--color-lime); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 768px) {
  .cb__sidebar {
    position: fixed;
    left: 0; top: var(--nav-height); bottom: 0;
    z-index: 100;
    transform: translateX(-100%);
  }
  .cb__sidebar--open {
    transform: translateX(0);
    box-shadow: 4px 0 40px rgba(0,0,0,0.8);
  }
  .cb__sidebar-toggle { display: flex; }
  .cb__msg { max-width: 90%; }
  .cb__messages { padding: 16px 14px; }
  .cb__input-bar { padding: 10px 14px 14px; }
}

@media (max-width: 480px) {
  .cb__msg { max-width: 95%; }
  .cb__bubble { padding: 10px 14px; font-size: 0.82rem; }
  .cb__welcome-title { font-size: 1.2rem; }
}
</style>
