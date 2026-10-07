/* ============================================================
   ApexSoft — MƏHSULLAR
   ------------------------------------------------------------
   Sayt məhsulları bu siyahıdan özü qurur. Yeni proqram əlavə
   etmək üçün aşağıdakı şablonu kopyalayıb siyahıya yapışdırın —
   index.html-ə toxunmaq lazım deyil.

   status:
     'new'  — öz bölməsi olur, üstündə "Yeni" nişanı
     'live' — öz bölməsi olur (nişansız)
     'soon' — "Tezliklə" kartı kimi kiçik göstərilir
   featured: true — 3D noutbukun ekranı bu məhsulu göstərir və o,
     siyahıda birinci olur (yalnız biri; yoxdursa — ilk 'new'/'live')
   Hero düymələri və uçan sözlər bütün məhsulları özü göstərir.
   icon: 'star' | 'store' | 'scissors' | 'bread' | 'chart' |
         'cart' | 'card' | 'phone' | 'box' | 'barcode' |
         'face' | 'clipboard'
   colors: məhsulun öz brend rəngləri
     primary   — əsas rəng (düymə, vurğu)
     dark      — tünd rəng (panel fonu, başlıq)
     onPrimary — əsas rəngin üstündəki yazı rəngi
   theme: 'dark' (standart) və ya 'light' — panelin fonu
     dark panel üçün primary açıq/parlaq olsun (tünd fonda oxunsun);
     light panel üçün dark tünd olsun (ağ fonda başlıq rəngi)

   ŞABLON (vergülə diqqət edin):
   {
     id: 'yeni-proqram',            // latın hərfləri, boşluqsuz
     name: 'Yeni Proqram',
     status: 'new',
     icon: 'chart',
     colors: { primary: '#22C55E', dark: '#0F1A14', onPrimary: '#0F1A14' },
     title: ['Kimin üçün', 'nə edir.'],
     lead: 'Bir cümlə ilə izah.',
     parts: [['Hissə', 'qısa izah'], ['Hissə 2', 'qısa izah']],
     stats: [[3, 'filial'], ['24/7', 'dəstək']],
     tags: ['Android', 'Hesabat'],
     phone: {                        // istəyə görə — telefon maketi
       balanceLabel: 'Bu gün', balance: '1 250 ₼', note: '48 satış',
       cardLabel: 'Kart', cardNumber: '0000 0000 0000',
       button: 'Aç', listTitle: 'Son əməliyyatlar',
       rows: [['Satış', '+12,00 ₼'], ['Qaytarma', '−3,00 ₼']]
     }
   },
   ============================================================ */

window.APEX_PRODUCTS = [

  {
    id: 'sokbonus',
    name: 'Şok Bonus',
    status: 'new',
    featured: true,
    icon: 'star',
    colors: { primary: '#FFC72C', dark: '#15161A', onPrimary: '#15161A' },
    title: ['Şok Market üçün', 'bonus sistemi.'],
    lead: 'Kartı oxut, bonus qazan, balansı telefondan izlə.',
    parts: [
      ['Şok Bonus', 'Müştəri tətbiqi'],
      ['ŞOK Nəzarət', 'Filial müdiri üçün'],
      ['İdarə paneli', 'Hesabat və kampaniyalar · 1C']
    ],
    stats: [[2, 'mobil tətbiq'], [5, 'filial'], ['1C', 'inteqrasiya']],
    /* telefon maketi */
    phone: {
      balanceLabel: 'Bonus balansı', balance: '12,40 ₼', note: 'Bu ay · 6 alış · +3,18 ₼',
      cardLabel: 'Bonus kartım', cardNumber: '2 000 000 418 527',
      button: 'Tam ekranda göstər', listTitle: 'Son əməliyyatlar',
      rows: [['Alış · Filial 2', '+0,42 ₼'], ['Alış · Filial 1', '+1,16 ₼'], ['Bonusla ödəniş', '−5,00 ₼']]
    },
    /* 3D noutbukun ekranı (featured məhsul üçün) */
    screen: {
      title: 'İdarə Paneli',
      menu: ['Ana səhifə', 'Bonus sorğuları', 'Kartlar', 'Kampaniyalar', 'Hesabatlar', 'Ayarlar'],
      cards: [['KARTLAR', '4 812'], ['BU AY BONUS', '₼ 1 240'], ['SORĞULAR', '7']],
      chart: 'GÜNLÜK BONUS',
      rows: [['Kart •••8527 · Filial 2', '+0,42 ₼'], ['Kart •••1904 · Filial 1', '+1,16 ₼'], ['Kampaniya · Həftəsonu', 'aktiv']]
    }
  },

  {
    id: 'topdan',
    name: 'ApexSoft Topdan',
    status: 'new',
    icon: 'box',
    theme: 'light',
    colors: { primary: '#0F3D6E', dark: '#0F3D6E', onPrimary: '#FFFFFF' },
    title: ['Topdan satış üçün', 'anbar və faktura.'],
    lead: 'Faktura, anbar, müştəri borcu və marşrut — telefonda, internetsiz.',
    parts: [
      ['Satış və faktura', 'PDF WhatsApp-la, termal çek'],
      ['Anbar və barkod', 'qalıq, mədaxil, qaytarma, sayım'],
      ['Müştəri və hesabat', 'borc, ödəniş, marşrut, mənfəət']
    ],
    tags: ['Android', 'Oflayn', 'Topdan satış', 'Anbar'],
    phone: {
      balanceLabel: 'Bu günkü satış', balance: '1 240 ₼', note: '8 faktura · 3 marşrut',
      button: 'Yeni faktura', listTitle: 'Son fakturalar',
      rows: [['Faktura №52', '+320 ₼'], ['Ödəniş qəbulu', '+150 ₼'], ['Qaytarma', '−24 ₼']]
    }
  },

  {
    id: 'ap-terminal',
    name: 'AP Terminal',
    status: 'live',
    icon: 'barcode',
    theme: 'light',
    colors: { primary: '#1B5A4B', dark: '#1B5A4B', onPrimary: '#FFFFFF' },
    title: ['1C mağazaları üçün', 'mobil terminal.'],
    lead: 'Barkodu telefonla skan edin, qiymət və qalığa baxın, sənədi birbaşa 1C-yə yazın.',
    parts: [
      ['Android tətbiqi', 'skan, qiymət, qalıq, sayım'],
      ['1C körpüsü', 'telefonu 1C 8.3 bazasına qoşur'],
      ['Oflayn növbə', 'Wi-Fi olmayanda sənəd gözləyir']
    ],
    tags: ['Android', '1C 8.3', 'Barkod', 'Anbar'],
    phone: {
      balanceLabel: 'Skan edilən mal', balance: 'Süd 1L', note: 'Qalıq: 24 əd · 2,20 ₼',
      cardLabel: 'Barkod', cardNumber: '4 760 000 123 456',
      button: 'Sənədə əlavə et', listTitle: 'Son sənədlər',
      rows: [['Qaimə · 12 mal', 'göndərildi'], ['Sayım · Anbar', 'aktiv']]
    }
  },

  {
    id: 'magaza',
    name: 'Mağaza Proqramı',
    status: 'soon',
    icon: 'store',
    lead: 'Marketlər üçün kassa, anbar, alış və hesabat — Windows proqramı.',
    tags: ['Windows', 'Kassa', 'Anbar', '1C']
  },

  {
    id: 'berberxana',
    name: 'Bərbərxana Proqramı',
    status: 'soon',
    icon: 'scissors',
    lead: 'Randevu, kassa, müştərilər və usta maaşı — sahibin telefonunda.',
    tags: ['Android', 'Randevu', 'Kassa']
  },

  {
    id: 'isci',
    name: 'ApexSoft İşçi',
    status: 'soon',
    icon: 'face',
    lead: 'Üz tanıma ilə işçi giriş-çıxışı və aylıq hesabat.',
    tags: ['Android', 'Üz tanıma', 'Davamiyyət']
  }

];
