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
   featured: true — hero düyməsi, uçan sözlər və 3D noutbukun
     ekranı bu məhsulu göstərir (yalnız biri; yoxdursa — ilk
     'new'/'live' məhsul götürülür)
   icon: 'star' | 'store' | 'scissors' | 'bread' | 'chart' |
         'cart' | 'card' | 'phone'
   colors: məhsulun öz brend rəngləri
     primary   — əsas rəng (düymə, vurğu)
     dark      — tünd rəng (panel fonu, başlıq)
     onPrimary — əsas rəngin üstündəki yazı rəngi
   theme: 'dark' (standart) və ya 'light' — panelin fonu

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
    /* uçan sözlər (featured məhsul üçün) */
    words: {
      intro: 'Müştərinin telefonunda —',
      list: ['Bonus', 'Kartım', 'Kampaniyalar', 'Tarixçə', 'Filiallar', 'Bildirişlər'],
      final: 'hamısı {name}-da.'
    },
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
    id: 'magaza',
    name: 'Mağaza Proqramı',
    status: 'soon',
    icon: 'store',
    lead: 'Marketlər üçün kassa, anbar və hesabat — bir sistemdə.',
    tags: ['Kassa', 'Anbar', 'Hesabat', 'Terminal']
  }

];
