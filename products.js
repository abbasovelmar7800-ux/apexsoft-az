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
   group: 'layihe' — əsas məhsullarda deyil, aşağıdakı kiçik
     «Layihələrimiz» bölməsində göstərilir (Şok Bonus, AP Terminal)
   Əsas məhsullar bu siyahıdakı sıra ilə göstərilir.
   shots: ['img/ad.webp', ...] — telefon maketlərindəki real ekran
     şəkilləri (1-3 ədəd, 9:16, WebP ~440px en). Birincisi öndə olur.
     Yoxdursa — aşağıdakı "phone" sahəsindən telefon maketi qurulur.
   screen: Windows proqramının maketi (istəyə görə):
     { title, menu: [...], heading, rows: [[№, mağaza, status, məbləğ]] }
   flow: iş axını addımları (istəyə görə): [['Addım', 'kim / nə edir']]
   phone.title / badge / nav / navOn — telefon maketinin başlığı, nişanı,
     alt menyusu və seçili bəndi (istəyə görə)
   featured: köhnə sayt üçün idi — bu dizayn ondan istifadə etmir.
   icon: 'star' | 'store' | 'scissors' | 'bread' | 'chart' |
         'cart' | 'card' | 'phone' | 'box' | 'barcode' |
         'face' | 'clipboard' | 'code'
   need: "Sizə hansı uyğundur?" bölməsində müştərinin seçdiyi
     ehtiyac (bir cümlə). Yoxdursa məhsul orada görünmür.
   kind: 'case' — müştəri üçün xüsusi hazırlanmış layihə (satılmır):
     "Müştəri layihəsi" nişanı, düymə "Bənzərini sifariş et",
     seçicidə "Nümunə layihə" kimi çıxır
     caseNote — seçicidə göstərilən bir cümlə ("... üçün hazırlamışıq")
     chip     — formadakı seçimin adı (məs. 'Bonus sistemi')
   demo: canlı demo (istəyə görə) — saytın demo/ qovluğundakı veb versiya
     url   — 'demo/<id>/' (D:\ApexSoft MMC\demo\build.ps1 yığır)
     note  — demoya girmək üçün qısa qeyd (parol və s.)
     steps — "nəyi sınayın" — 2-3 qısa addım
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
     need: 'Müştərinin ehtiyacı bir cümlə ilə',
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
    need: 'Müştərilərim bonus qazansın və geri qayıtsın',
    /* Şok Market üçün xüsusi hazırlanıb — satılmır, nümunə kimi göstərilir */
    kind: 'case',
    group: 'layihe',
    caseNote: 'Bu sistemi Şok Market üçün hazırlamışıq — sizin mağazanız üçün də öz brendinizlə qura bilərik.',
    chip: 'Bonus sistemi',
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
    id: 'apexsupply',
    name: 'ApexSupply',
    status: 'new',
    icon: 'cart',
    theme: 'light',
    colors: { primary: '#1D4ED8', dark: '#0B2545', onPrimary: '#FFFFFF' },
    title: ['Distribusiya firması üçün', 'ofis və ekspeditor bir sistemdə.'],
    lead: 'Ekspeditor mağazada telefondan sifariş yazır və pul qəbul edir; ofis Windows proqramında sifarişi təsdiqləyir, faktura kəsir və malı sürücü ilə yola salır. Qalıq, borc və kassa hamı üçün eyni anda yenilənir. Faktura daxili sənəddir, e-qaimə isə e-taxes.gov.az-da yazılır.',
    need: 'Ekspeditorlarımın sifarişini, anbarı və mağaza borclarını bir yerdən idarə edim',
    parts: [
      ['Ofis (Windows)', 'sifariş, anbar, alış, faktura, ƏDV, hesabat'],
      ['Ekspeditor (Android)', 'canlı qalıq, sifariş, pul qəbulu, qəbz'],
      ['Çatdırılma və kassa', 'sürücü, marşrut vərəqi, təhvil aktı, üzləşmə']
    ],
    tags: ['Windows', 'Android', 'Onlayn', 'Distribusiya'],
    flow: [
      ['Sifariş', 'Ekspeditor mağazada telefondan yazır'],
      ['Təsdiq', 'Ofis Windows proqramında təsdiqləyir'],
      ['Faktura', 'Ofis fakturanı kəsir'],
      ['Çatdırılma', 'Sürücü malı marşrut vərəqi ilə aparır'],
      ['Pul qəbulu', 'Ekspeditor pulu alır, qəbz verir']
    ],
    /* Windows proqramının maketi (nümunə məlumatlar) */
    screen: {
      title: 'ApexSupply · Ofis',
      menu: ['Sifarişlər', 'Anbar', 'Alış', 'Fakturalar', 'ƏDV', 'Hesabatlar'],
      heading: 'Sifarişlər',
      rows: [['S-000124', 'Günəş Market', 'Yeni', '184,50 ₼'], ['S-000123', 'Nur Market', 'Təsdiqlənib', '96,20 ₼'],
        ['S-000122', 'Çinar Market', 'Yolda', '240,00 ₼'], ['S-000121', 'Bulaq Ərzaq', 'Çatdırılıb', '132,75 ₼']]
    },
    phone: {
      title: 'Kassam', badge: 'Ekspeditor', nav: ['Sifariş', 'Mağazalar', 'Kassam', 'Üzləşmə'], navOn: 2,
      balanceLabel: 'Əlimdə olan nağd', balance: '70,00 ₼', note: 'Bu gün · 3 qəbz · 75,00 ₼',
      button: 'Pul qəbul et', listTitle: 'Bugünkü qəbzlər',
      rows: [['QBZ-000007 · kart', '+5,00 ₼'], ['QBZ-000006 · nağd', '+10,00 ₼'], ['QBZ-000005 · nağd', '+60,00 ₼']]
    }
  },

  {
    id: 'topdan',
    name: 'Apex Mobil ERP',
    status: 'new',
    icon: 'box',
    theme: 'light',
    colors: { primary: '#0F3D6E', dark: '#0F3D6E', onPrimary: '#FFFFFF' },
    title: ['Topdan satış üçün', 'anbar və faktura.'],
    lead: 'Faktura, anbar, müştəri borcu və marşrut — telefonda, internetsiz. Faktura daxili sənəddir, e-qaimə isə e-taxes.gov.az-da yazılır.',
    need: 'Topdan satışı, fakturanı və borcları telefondan idarə edim',
    demo: {
      url: 'demo/topdan/',
      note: 'Nümunə şirkət: mallar, müştərilər və fakturalar artıq doldurulub.',
      steps: ['Paneldə bugünkü satışa baxın', 'Yeni faktura kəsin', 'Hesabatlarda mənfəəti görün']
    },
    parts: [
      ['Satış və faktura', 'PDF WhatsApp-la, termal çek'],
      ['Anbar və barkod', 'qalıq, mədaxil, qaytarma, sayım'],
      ['Müştəri və hesabat', 'borc, ödəniş, marşrut, mənfəət']
    ],
    tags: ['Android', 'Oflayn', 'Topdan satış', 'Anbar'],
    shots: ['img/mobil-faktura.webp', 'img/mobil-anbar.webp', 'img/mobil-hesabat.webp'],
    phone: {
      balanceLabel: 'Bu günkü satış', balance: '1 240 ₼', note: '8 faktura · 3 marşrut',
      button: 'Yeni faktura', listTitle: 'Son fakturalar',
      rows: [['Faktura №52', '+320 ₼'], ['Ödəniş qəbulu', '+150 ₼'], ['Qaytarma', '−24 ₼']]
    }
  },

  {
    id: 'tendir',
    name: 'Apex Təndir ERP',
    status: 'new',
    icon: 'bread',
    theme: 'light',
    colors: { primary: '#B4622B', dark: '#5A2E12', onPrimary: '#FFFFFF' },
    title: ['Çörək sexi və təndir üçün', 'satış uçotu və istehsal.'],
    lead: 'Satış, növbə, istehsal və nisyə alan mağazaların borcu — telefonda və planşetdə, internetsiz. Onlayn kassa (NKA) deyil: fiskal çeki NKA-nız verir, proqram satış uçotunu aparır.',
    need: 'Çörək seximin satışını, istehsalını və mağaza borclarını idarə edim',
    demo: {
      url: 'demo/tendir/',
      note: 'Nümunə çörək sexi: açıq növbə, satışlar, istehsal və mağaza borcları artıq doldurulub. Sahibin PIN-i: 1234.',
      steps: ['Kassada satış edin — ədədlə və çəki ilə', 'Növbəni bağlayıb Z-hesabata baxın', 'Mağazaların nisyə borcunu görün']
    },
    parts: [
      ['Satış', 'ədəd və çəki, barkod, nağd, kart, nisyə'],
      ['Növbə və istehsal', 'X/Z-hesabat, bişən, satılan, silinən'],
      ['Mağazalar və hesabat', 'borc, çatdırılma, PDF və Excel']
    ],
    tags: ['Android', 'Planşet', 'Oflayn', 'Çörək sexi'],
    shots: ['img/tendir-kassa.webp', 'img/tendir-istehsal.webp', 'img/tendir-magaza.webp'],
    phone: {
      balanceLabel: 'Bu günkü satış', balance: '486 ₼', note: '214 çek · 3 mağazaya çatdırılma',
      button: 'Satış', listTitle: 'Son çeklər',
      rows: [['Çek №214 · nağd', '+3,40 ₼'], ['Mağaza «Nur» · nisyə', '+48,00 ₼'], ['Silinmə · 6 çörək', '−4,20 ₼']]
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
    need: '1C-dəki malı telefonla skan edim, qalığa və qiymətə baxım',
    demo: {
      url: 'demo/apterminal/',
      note: 'Demoda 1C əvəzinə nümunə mağaza bazası qoşulub.',
      steps: ['Malı adı və ya barkodu ilə axtarın', 'Qiymətə və qalığa baxın', 'Sənəd yaradıb göndərin']
    },
    parts: [
      ['Android tətbiqi', 'skan, qiymət, qalıq, sayım'],
      ['1C körpüsü', 'telefonu 1C 8.3 bazasına qoşur'],
      ['Oflayn növbə', 'Wi-Fi olmayanda sənəd gözləyir']
    ],
    tags: ['Android', '1C 8.3', 'Barkod', 'Anbar'],
    shots: ['img/apt-ana.webp', 'img/apt-alis.webp', 'img/apt-anbar.webp'],
    phone: {
      balanceLabel: 'Skan edilən mal', balance: 'Süd 1L', note: 'Qalıq: 24 əd · 2,20 ₼',
      cardLabel: 'Barkod', cardNumber: '4 760 000 123 456',
      button: 'Sənədə əlavə et', listTitle: 'Son sənədlər',
      rows: [['Qaimə · 12 mal', 'göndərildi'], ['Sayım · Anbar', 'aktiv']]
    }
  }

];
