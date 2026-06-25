import { ref, reactive, computed } from 'vue'

// Global reactive state - shared across all components
const currentLang = ref('id') // 'id' = Indonesia, 'en' = English

const translations = {
  en: {
    // Navbar
    nav: {
      home: 'HOME',
      membership: 'MEMBERSHIP',
      classes: 'CLASSES',
      order: 'ORDER',
      chatbot: 'CHATBOT',
    },
    // Hero
    hero: {
      eyebrow: 'PRECISION PERFORMANCE',
      headlineTop: 'FORGED IN',
      headlineLime: 'MOTION',
      desc: "The elite sanctuary for those who demand surgical precision in their training. We don't just build muscle; we curate kinetic excellence.",
      ctaJoin: 'JOIN THE LAB',
      ctaStats: 'EXPLORE STATS',
      scrollLabel: 'SCROLL',
    },
    // Stats bar
    stats: [
      { value: '12K+', label: 'Active Members' },
      { value: '48', label: 'Elite Coaches' },
      { value: '200+', label: 'Monthly Classes' },
      { value: '98%', label: 'Satisfaction Rate' },
      { value: '24/7', label: 'Access' },
      { value: '15yr', label: 'Of Excellence' },
    ],
    // Classes Section
    classes: {
      title: 'OUR',
      titleLime: 'CLASSES',
      desc: 'Curated high-intensity programming designed by elite physiologists.',
      viewAll: 'VIEW ALL CLASSES',
      book: 'BOOK CLASS',
      category: {
        recovery: 'RECOVERY',
        metabolic: 'METABOLIC',
        strength: 'STRENGTH',
        combat: 'COMBAT',
      },
      list: [
        { id: 'yoga', category: 'RECOVERY', name: 'YOGA', time: 'MON/WED — 07:00 AM', trainer: 'ELENA VOLKOV' },
        { id: 'hiit', category: 'METABOLIC', name: 'HIIT', time: 'TUE/THU — 06:00 PM', trainer: 'MARCUS THORNE' },
        { id: 'weights', category: 'STRENGTH', name: 'WEIGHT TRAINING', time: 'DAILY — 05:00 AM', trainer: 'SARAH CHEN' },
        { id: 'boxing', category: 'COMBAT', name: 'BOXING', time: 'FRI/SAT — 04:00 PM', trainer: 'JAXON REED' },
      ],
    },
    // Membership
    membership: {
      title1: 'CHOOSE YOUR',
      title2: 'PRECISION',
      desc: 'Elite memberships designed for those who demand surgical precision in their performance. No clutter, just kinetic results.',
      level: 'ACCESS LEVEL',
      perMonth: '/ MONTH',
      purchase: 'PURCHASE NOW',
      mostPopular: 'MOST POPULAR',
      currency: 'Rp',
      tiers: {
        starter: {
          name: 'STARTER',
          price: '490,000',
          features: [
            'Standard Gym Access',
            'Locker Room Access',
            'Basic App Tracking'
          ]
        },
        active: {
          name: 'ACTIVE',
          price: '890,000',
          features: [
            'Full Gym Access',
            'Group Training Sessions',
            'Biometric Health Check',
            'Dietary Consultation'
          ]
        },
        pro: {
          name: 'PRO',
          price: '1,490,000',
          features: [
            '24/7 VIP Gym Access',
            'Personal Trainer 1-on-1',
            'Elite Performance Lab',
            'Luxury Spa & Cryo Access',
            'Nutritional Supplement Stack'
          ]
        }
      },
      breakdown: {
        title: 'TIER BREAKDOWN',
        analytics: {
          title: 'KINETIC ANALYTICS',
          desc: 'AI tiers include our base tracking engine. Active and Pro levels unlock skeletal tracking and heart rate variance reporting during sessions.'
        },
        hours: {
          title: 'HOURS',
          desc: 'STARTER: 5AM - 11PM\nACTIVE: 5AM - 11PM\nPRO: 24/7 ACCESS'
        },
        support: {
          title: 'SUPPORT',
          desc: 'STARTER: WEB\nACTIVE: PRIORITY CHAT\nPRO: DEDICATED CONCIERGE'
        }
      }
    },
    // Footer
    footer: {
      topbar: 'KINETIC PRECISION · ELITE PERFORMANCE · FORGED IN MOTION',
      copy: '© 2024 Muscle Lab Gym. Kinetic Precision.\nAll rights reserved. Precision engineering for the human form.',
      connect: 'CONNECT',
      access: 'ACCESS',
      stayForged: 'STAY FORGED',
      newsletterDesc: 'Get exclusive training insights and early access to new programs.',
      emailPlaceholder: 'YOUR EMAIL',
      crafted: 'Crafted for the relentless.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      links: {
        instagram: 'Instagram',
        contact: 'Contact',
        newsletter: 'Newsletter',
        community: 'Community',
        hours: 'Hours',
        location: 'Location',
        membership: 'Membership',
        mobileApp: 'Mobile App',
      },
    },
    // Language
    language: {
      label: 'Language',
      id: 'Indonesian',
      en: 'English',
    },
    // Transaction
    transaction: {
      title1: 'PERSONAL',
      title2: 'INFORMATION',
      desc: 'Precision-engineered fitness begins with a single step. Secure your access to the Lab.',
      ordererTitle: 'Orderer Details',
      fullName: 'FULL NAME',
      fullNamePlaceholder: 'Full Name',
      email: 'EMAIL',
      emailPlaceholder: 'Contoh: example@example.com',
      phone: 'PHONE NUMBER',
      phonePlaceholder: 'Contoh: 81234567890',
      voucherTitle: 'Voucher',
      voucherPlaceholder: 'ENTER VOUCHER CODE',
      submitBtn: 'Submit',
      addVoucher: '+ Add Voucher',
      summaryTitle: 'Order Summary',
      itemLabel: 'Month Membership',
      ticketLabel: 'Ticket',
      buyerLabel: 'ORDERER',
      buyerPlaceholder: '-',
      subtotal: 'Subtotal',
      adminFee: 'Admin Fee',
      totalPayment: 'Total Payment',
      payNowBtn: 'PAY NOW',
      paymentDetails: 'PAYMENT DETAILS',
      payMethodLabel: 'CHOOSE PAYMENT METHOD',
      vaLabel: 'Virtual Account',
      qrisLabel: 'QRIS',
      walletLabel: 'E-Wallet',
      selectBank: 'SELECT YOUR BANK',
      selectWallet: 'SELECT YOUR E-WALLET',
      walletPhone: 'E-WALLET PHONE NUMBER',
      walletPhonePlaceholder: 'Contoh: 081234567890',
      vaInstruction: 'A Virtual Account billing code will be generated once you click PAY NOW.',
      qrisInstruction: 'A dynamic QRIS QR code will be presented for you to scan and pay.',
      walletInstruction: 'A push payment prompt will be sent to your e-wallet app.',
      finePrint: "By completing this purchase, you agree to Muscle Lab's Terms of Service and Privacy Policy. All transactions are secure.",
      successTitle: 'TRANSACTION COMPLETE',
      successDesc: 'Welcome to the Lab. Your elite status has been successfully initialized.',
      successDetails: 'A confirmation email with your access credentials and digital member ID has been sent.',
      redirectText: 'Redirecting to home in {seconds}s...',
      backHomeBtn: 'BACK TO HOME',
      timerLabel: 'TIME REMAINING',
      accessStartsToday: 'Muscle Lab Gym access starts today',
      membershipLabel: 'MEMBERSHIP',
      totalPaidLabel: 'TOTAL PAID',
      danaWallet: 'DANA Wallet',
      gopayWallet: 'GoPay Wallet',
      ovoWallet: 'OVO Wallet',
      bcaVa: 'BCA Virtual Account',
      mandiriVa: 'Mandiri Virtual Account',
      bniVa: 'BNI Virtual Account',
      phoneZeroWarning: 'Phone number cannot start with 0',
      bcaSteps: [
        'Open your BCA Mobile App and select m-Transfer.',
        'Choose BCA Virtual Account.',
        'Enter the generated Virtual Account number.',
        'Verify bill amount, enter your PIN, and press OK.'
      ],
      mandiriSteps: [
        'Open Livin\' by Mandiri App and tap Pay.',
        'Choose Multipayment and select provider.',
        'Enter the Mandiri Virtual Account number.',
        'Verify bill amount and enter Livin\' PIN.'
      ],
      bniSteps: [
        'Open BNI Mobile Banking App and choose Transfer.',
        'Select Virtual Account Billing.',
        'Enter the BNI Virtual Account number.',
        'Verify payment info and enter your Transaction PIN.'
      ],
      danaSteps: [
        'Enter your DANA mobile number in the field below.',
        'Click PAY NOW to trigger the payment request.',
        'Open the DANA app on your phone and open Notifications.',
        'Review payment details and enter DANA PIN to complete.'
      ],
      gopaySteps: [
        'Enter your GoPay mobile number in the field below.',
        'Click PAY NOW to trigger the request.',
        'Open the Gojek app on your phone and tap Pay or check bills.',
        'Review details and complete the transfer with GoPay PIN.'
      ],
      ovoSteps: [
        'Enter your OVO mobile number in the field below.',
        'Click PAY NOW. You will receive an OVO push notification.',
        'Open the OVO app on your phone within 30 seconds.',
        'Review amount and tap Pay with your OVO PIN.'
      ]
    },
  },
  id: {
    // Navbar
    nav: {
      home: 'BERANDA',
      membership: 'KEANGGOTAAN',
      classes: 'KELAS',
      order: 'PESAN',
      chatbot: 'CHATBOT',
    },
    // Hero
    hero: {
      eyebrow: 'PERFORMA PRESISI',
      headlineTop: 'DITEMPA DALAM',
      headlineLime: 'GERAK',
      desc: 'Sanctuary elite bagi mereka yang menuntut presisi tinggi dalam latihan. Kami tidak hanya membangun otot; kami mengkurasi keunggulan kinetik.',
      ctaJoin: 'BERGABUNG',
      ctaStats: 'LIHAT STATISTIK',
      
    },
    // Stats bar
    stats: [
      { value: '12K+', label: 'Anggota Aktif' },
      { value: '48', label: 'Pelatih Elite' },
      { value: '200+', label: 'Kelas per Bulan' },
      { value: '98%', label: 'Tingkat Kepuasan' },
      { value: '24/7', label: 'Akses' },
      { value: '15th', label: 'Keunggulan' },
    ],
    // Classes Section
    classes: {
      title: 'KELAS',
      titleLime: 'KAMI',
      desc: 'Pemrograman intensitas tinggi yang dikurasi oleh ahli fisiologi terbaik.',
      viewAll: 'LIHAT SEMUA KELAS',
      book: 'DAFTAR KELAS',
      category: {
        recovery: 'PEMULIHAN',
        metabolic: 'METABOLIK',
        strength: 'KEKUATAN',
        combat: 'PERTARUNGAN',
      },
      list: [
        { id: 'yoga', category: 'PEMULIHAN', name: 'YOGA', time: 'SEN/RAB — 07:00 PAGI', trainer: 'ELENA VOLKOV' },
        { id: 'hiit', category: 'METABOLIK', name: 'HIIT', time: 'SEL/KAM — 06:00 SORE', trainer: 'MARCUS THORNE' },
        { id: 'weights', category: 'KEKUATAN', name: 'LATIHAN BEBAN', time: 'SETIAP HARI — 05:00 PAGI', trainer: 'SARAH CHEN' },
        { id: 'boxing', category: 'PERTARUNGAN', name: 'TINJU', time: 'JUM/SAB — 04:00 SORE', trainer: 'JAXON REED' },
      ],
    },
    // Membership
    membership: {
      title1: 'PILIH',
      title2: 'PRESISI ANDA',
      desc: 'Keanggotaan elit yang dirancang untuk mereka yang menuntut presisi bedah dalam performa mereka. Tanpa basa-basi, hanya hasil kinetik.',
      level: 'LEVEL AKSES',
      perMonth: '/ BULAN',
      purchase: 'DAFTAR SEKARANG',
      mostPopular: 'PALING POPULER',
      currency: 'Rp',
      tiers: {
        starter: {
          name: 'STARTER',
          price: '490.000',
          features: [
            'Akses Gym Standar',
            'Akses Ruang Loker',
            'Pelacakan Aplikasi Dasar'
          ]
        },
        active: {
          name: 'ACTIVE',
          price: '890.000',
          features: [
            'Akses Gym Penuh',
            'Sesi Latihan Kelompok',
            'Pemeriksaan Kesehatan Biometrik',
            'Konsultasi Diet'
          ]
        },
        pro: {
          name: 'PRO',
          price: '1.490.000',
          features: [
            'Akses Gym VIP 24/7',
            'Pelatih Pribadi 1-on-1',
            'Lab Performa Elit',
            'Akses Spa Mewah & Cryo',
            'Suplemen Nutrisi Tambahan'
          ]
        }
      },
      breakdown: {
        title: 'BREAKDOWN TIER',
        analytics: {
          title: 'ANALISIS KINETIK',
          desc: 'Semua tier AI mencakup mesin pelacakan dasar kami. Level Active dan Pro membuka pelacakan kerangka tubuh dan laporan variabilitas detak jantung selama sesi latihan.'
        },
        hours: {
          title: 'JAM OPERASIONAL',
          desc: 'STARTER: 5 PAGI - 11 MALAM\nACTIVE: 5 PAGI - 11 MALAM\nPRO: AKSES 24/7'
        },
        support: {
          title: 'DUKUNGAN',
          desc: 'STARTER: WEB\nACTIVE: CHAT PRIORITAS\nPRO: LAYANAN CONCIERGE KHUSUS'
        }
      }
    },
    // Footer
    footer: {
      topbar: 'PRESISI KINETIK · PERFORMA ELITE · DITEMPA DALAM GERAK',
      copy: '© 2024 Muscle Lab Gym. Presisi Kinetik.\nSeluruh hak cipta dilindungi. Rekayasa presisi untuk tubuh manusia.',
      connect: 'TERHUBUNG',
      access: 'AKSES',
      stayForged: 'TETAP TERTEMPA',
      newsletterDesc: 'Dapatkan wawasan latihan eksklusif dan akses awal ke program baru.',
      emailPlaceholder: 'EMAIL ANDA',
      crafted: 'Dibuat untuk yang tak kenal lelah.',
      privacy: 'Kebijakan Privasi',
      terms: 'Ketentuan Penggunaan',
      links: {
        instagram: 'Instagram',
        contact: 'Kontak',
        newsletter: 'Newsletter',
        community: 'Komunitas',
        hours: 'Jam Buka',
        location: 'Lokasi',
        membership: 'Keanggotaan',
        mobileApp: 'Aplikasi Mobile',
      },
    },
    // Language
    language: {
      label: 'Bahasa',
      id: 'Indonesia',
      en: 'Inggris',
    },
    // Transaction
    transaction: {
      title1: 'PERSONAL',
      title2: 'INFORMASI',
      desc: 'Kebugaran yang dirancang dengan presisi dimulai dengan satu langkah. Amankan akses Anda ke Lab.',
      ordererTitle: 'Data Pemesan',
      fullName: 'NAMA LENGKAP',
      fullNamePlaceholder: 'Nama Lengkap',
      email: 'EMAIL',
      emailPlaceholder: 'Contoh: example@example.com',
      phone: 'NO TELEPON',
      phonePlaceholder: 'Contoh: 81234567890',
      voucherTitle: 'Voucher',
      voucherPlaceholder: 'MASUKAN KODE VOUCHER',
      submitBtn: 'Submit',
      addVoucher: '+ Tambah Voucher',
      summaryTitle: 'Ringkasan Pesanan',
      itemLabel: 'Bulan Keanggotaan',
      ticketLabel: 'Tiket',
      buyerLabel: 'PEMESAN',
      buyerPlaceholder: '-',
      subtotal: 'Subtotal',
      adminFee: 'Biaya Admin',
      totalPayment: 'Total Pembayaran',
      payNowBtn: 'BAYAR SEKARANG',
      paymentDetails: 'DETAIL PEMBAYARAN',
      payMethodLabel: 'PILIH METODE PEMBAYARAN',
      vaLabel: 'Virtual Account',
      qrisLabel: 'QRIS',
      walletLabel: 'Dompet Digital',
      selectBank: 'PILIH BANK ANDA',
      selectWallet: 'PILIH DOMPET DIGITAL',
      walletPhone: 'NOMOR HP E-WALLET',
      walletPhonePlaceholder: 'Contoh: 081234567890',
      vaInstruction: 'Nomor Virtual Account pembayaran akan diterbitkan setelah Anda mengeklik BAYAR SEKARANG.',
      qrisInstruction: 'Kode QRIS dinamis akan ditampilkan untuk dipindai dan dibayar.',
      walletInstruction: 'Permintaan pembayaran akan dikirimkan langsung ke aplikasi dompet digital Anda.',
      finePrint: 'Dengan menyelesaikan pembelian ini, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi Muscle Lab. Semua transaksi aman.',
      successTitle: 'TRANSAKSI SELESAI',
      successDesc: 'Selamat datang di Lab. Status elit Anda telah berhasil diinisialisasi.',
      successDetails: 'Email konfirmasi beserta kredensial akses dan ID anggota digital Anda telah dikirimkan.',
      redirectText: 'Mengalihkan ke beranda dalam {seconds} detik...',
      backHomeBtn: 'KEMBALI KE BERANDA',
      timerLabel: 'SISA WAKTU PEMBAYARAN',
      accessStartsToday: 'Akses Muscle Lab Gym dimulai hari ini',
      membershipLabel: 'KEANGGOTAAN',
      totalPaidLabel: 'TOTAL DIBAYAR',
      danaWallet: 'Dompet Digital DANA',
      gopayWallet: 'Dompet Digital GoPay',
      ovoWallet: 'Dompet Digital OVO',
      bcaVa: 'BCA Virtual Account',
      mandiriVa: 'Mandiri Virtual Account',
      bniVa: 'BNI Virtual Account',
      phoneZeroWarning: 'No telepon tidak boleh diawali dengan angka 0',
      bcaSteps: [
        'Buka aplikasi BCA Mobile, lalu pilih m-Transfer.',
        'Pilih BCA Virtual Account.',
        'Masukkan nomor Virtual Account yang tertera.',
        'Periksa info tagihan, masukkan PIN BCA Anda dan tekan OK.'
      ],
      mandiriSteps: [
        'Buka aplikasi Livin\' by Mandiri, lalu pilih Bayar.',
        'Pilih Multipayment dan masukkan penyedia jasa.',
        'Masukkan nomor Mandiri Virtual Account.',
        'Periksa info tagihan, konfirmasi dan masukkan PIN Livin\' Anda.'
      ],
      bniSteps: [
        'Buka aplikasi BNI Mobile Banking, lalu pilih Transfer.',
        'Pilih Virtual Account Billing.',
        'Masukkan nomor BNI Virtual Account.',
        'Periksa info tagihan, masukkan PIN Transaksi BNI Anda.'
      ],
      danaSteps: [
        'Masukkan nomor HP DANA Anda di bawah.',
        'Klik BAYAR SEKARANG untuk memicu permintaan pembayaran.',
        'Buka aplikasi DANA di HP Anda, buka Notifikasi.',
        'Periksa nominal pembayaran dan ketik PIN DANA Anda.'
      ],
      gopaySteps: [
        'Masukkan nomor HP GoPay Anda di bawah.',
        'Klik BAYAR SEKARANG untuk memproses tagihan.',
        'Buka aplikasi Gojek di HP Anda, ketuk Bayar atau cari tagihan tertunda.',
        'Periksa nominal, lalu selesaikan dengan PIN GoPay Anda.'
      ],
      ovoSteps: [
        'Masukkan nomor HP OVO Anda di bawah.',
        'Klik BAYAR SEKARANG. Anda akan menerima notifikasi pop-up.',
        'Buka aplikasi OVO di HP Anda dalam waktu 30 detik.',
        'Periksa nominal, lalu selesaikan pembayaran dengan PIN OVO Anda.'
      ]
    },
  },
}

export function useLanguage() {
  const t = computed(() => translations[currentLang.value])

  function setLang(lang) {
    if (lang === 'id' || lang === 'en') {
      currentLang.value = lang
    }
  }

  function toggleLang() {
    currentLang.value = currentLang.value === 'id' ? 'en' : 'id'
  }

  return {
    currentLang,
    t,
    setLang,
    toggleLang,
  }
}
