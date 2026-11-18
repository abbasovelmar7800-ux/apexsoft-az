/* ApexSoft — variant B «Yüngül». Kitabxanasız, kiçik. Məhsullar products.js-dən, əlaqə config.js-dən. */
(function(){
  'use strict';
  var D=document,body=D.body;
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  function $(id){return D.getElementById(id)}
  function el(tag,cls,text){var e=D.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
  function use(id,cls){return '<svg'+(cls?' class="'+cls+'"':'')+' aria-hidden="true"><use href="#'+id+'"/></svg>'}
  function cap(s){s=String(s||'');return s.charAt(0).toLocaleUpperCase('az')+s.slice(1)}
  function n3(i){return ('00'+(i+1)).slice(-3)}
  /* Google şrifti ilk çəkilişi gözlətməsin (index.html-də media="print") */
  var fc0=$('fontCss');if(fc0)fc0.media='all';

  /* Qalan hər şey ilk çəkilişdən SONRA qurulur — zəif telefonda hero dərhal görünsün.
     (Məhsul bölmələri ekrandan aşağıdadır, ona görə yerdəyişmə olmur.) */
  function later(){if(window.requestAnimationFrame)requestAnimationFrame(function(){setTimeout(main,0)});else setTimeout(main,0)}
  later();
  function main(){

  /* ============================================================
     MƏHSULLAR — products.js. group:'layihe' / kind:'case' → «Layihələrimiz»
     ============================================================ */
  var PRODUCTS=(window.APEX_PRODUCTS||[]).filter(function(p){return p&&p.name});
  var SOON=PRODUCTS.filter(function(p){return p.status==='soon'});
  var LIVE=PRODUCTS.filter(function(p){return p.status!=='soon'});
  function isLay(p){return p.group==='layihe'||p.kind==='case'}
  var MAIN=LIVE.filter(function(p){return !isLay(p)});
  var LAY=LIVE.filter(isLay);
  function pid(p,k){return String(p.id||'').replace(/[^\w-]/g,'')||('mehsul-'+k)}
  var usedIds={};
  [].forEach.call(D.querySelectorAll('[id]'),function(e){usedIds[e.id]=1});
  function uid(p,k){var b=pid(p,k),u=b,n=2;while(usedIds[u])u=b+'-'+(n++);usedIds[u]=1;return u}
  MAIN.concat(LAY).forEach(function(p,i){p._id=uid(p,i)});SOON.forEach(function(p,i){p._id=uid(p,'tez-'+i)});

  var LINE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var ICONS={
    star:LINE+'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/></svg>',
    store:LINE+'<path d="M3 9l1.2-4.5A1.5 1.5 0 0 1 5.65 3h12.7a1.5 1.5 0 0 1 1.45 1.5L21 9"/><path d="M3 9h18v1.5a2.6 2.6 0 0 1-5.2 0A2.6 2.6 0 0 1 12 10.5a2.6 2.6 0 0 1-5.8 0A2.6 2.6 0 0 1 3 10.5V9z"/><path d="M5 13.5V21h14v-7.5"/><path d="M9.5 21v-5h5v5"/></svg>',
    scissors:LINE+'<circle cx="6.5" cy="6.5" r="2.6"/><circle cx="6.5" cy="17.5" r="2.6"/><path d="M8.7 8.3 20 19M8.7 15.7 20 5M13.2 12.9l1.6 1.5"/></svg>',
    bread:LINE+'<path d="M3.5 13c0-4 3.8-7 8.5-7s8.5 3 8.5 7c0 2.4-1.9 4-4.2 4H7.7C5.4 17 3.5 15.4 3.5 13z"/><path d="M8 10.6c.5-.9 1.3-1.5 2.3-1.9M7.5 17v3M12 17v3M16.5 17v3"/></svg>',
    chart:LINE+'<path d="M4 20V11M10 20V5M16 20v-7M21 20H3"/></svg>',
    cart:LINE+'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.5L22 8H6.2"/></svg>',
    card:LINE+'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/></svg>',
    phone:LINE+'<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
    box:LINE+'<path d="M21 8 12 3 3 8v8l9 5 9-5V8z"/><path d="m3 8 9 5 9-5M12 13v8"/></svg>',
    barcode:LINE+'<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 8v8M10 8v8M13 8v8M17 8v8"/></svg>',
    face:LINE+'<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="10" r="3"/><path d="M7.5 17.5a5 5 0 0 1 9 0"/></svg>',
    clipboard:LINE+'<rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 4V3h6v1M9 11l2 2 4-4M9 17h6"/></svg>',
    code:LINE+'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/></svg>'
  };
  function icon(p){return ICONS[p.icon]||ICONS.box}
  var UI={
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    info:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>'
  };

  /* ============================================================
     SAYĞAC — abacus.jasoncameron.dev (hesabsız, yalnız rəqəm artırır;
     ad, telefon və s. göndərilmir). Nəticələr: apexsoft.az/stat/
     Hər brauzer gündə bir ziyarət sayılır; localhost və /stat/-da
     "məni sayma" seçilmiş brauzer sayılmır.
     ============================================================ */
  var STAT='https://abacus.jasoncameron.dev/hit/apexsoft.az/';
  var counting=/(^|\.)apexsoft\.az$/.test(location.hostname)&&!navigator.webdriver&&!!window.fetch;
  try{if(localStorage.getItem('apx-me'))counting=false}catch(e){}
  function count(k){
    if(!counting)return;
    try{fetch(STAT+k,{credentials:'omit',keepalive:true,referrerPolicy:'no-referrer'}).catch(function(){})}catch(e){}
  }
  (function(){
    var day=new Date(Date.now()+144e5).toISOString().slice(0,10).replace(/-/g,''); /* Bakı vaxtı, UTC+4 */
    var last=null;try{last=localStorage.getItem('apx-v');localStorage.setItem('apx-v',day)}catch(e){}
    if(last!==day){count('ziyaret');count('gun-'+day)}
  })();

  /* ============================================================
     ƏLAQƏ — config.js-dəki APEX_SITE
     ============================================================ */
  var SITE=window.APEX_SITE||{};
  var EMAIL=String(SITE.email||'').trim();
  var WA=String(SITE.whatsapp||'').replace(/\D/g,'');
  var PHONE=String(SITE.phone||'').trim(),TEL=PHONE.replace(/[^\d+]/g,'');
  var IG=String(SITE.instagram||'').replace(/^@/,''),TT=String(SITE.tiktok||'').replace(/^@/,'');
  function waUrl(text){return 'https://wa.me/'+WA+(text?'?text='+encodeURIComponent(text):'')}
  /* bütün [data-wa] düymələri config.js-dəki nömrəyə; nömrə yoxdursa — əlaqə bölməsinə */
  [].forEach.call(D.querySelectorAll('[data-wa]'),function(a){
    if(WA){a.href=waUrl(a.getAttribute('data-wa'))}
    else if(a.id==='waFab'||a.closest('.nav'))a.hidden=true;
    else{a.href='#elaqe';a.removeAttribute('target');a.lastChild.nodeValue='Bizə yazın'}
  });
  var ctNum=$('ctNum');if(ctNum){if(PHONE)ctNum.textContent=PHONE;else ctNum.remove()}

  /* fərdi proqram — seçicidə və formada məhsul kimi */
  var CUSTOM={_id:'xidmetler',name:'Fərdi proqram',icon:'code',
    need:'Başqa — mənə fərdi proqram lazımdır',
    title:['Ehtiyacınıza uyğun','fərdi proqram.'],
    lead:'Mobil tətbiq, veb sayt, idarə paneli və ya 1C inteqrasiyası — biznesinizə uyğun hazırlayırıq.',
    parts:[['Mobil tətbiq','müştəri və işçi üçün'],['Veb sayt və panel','kataloq, hesabat'],['1C inteqrasiyası','mövcud bazanıza']]};

  /* ---------- düymələr ---------- */
  function liveBtn(p,cls){
    var a=el('a',cls);a.href=p.demo.url;a.target='_blank';a.rel='noopener';a.setAttribute('data-live',p._id);
    a.innerHTML=use('i-play')+'Canlı demo';return a;
  }
  function offerBtn(p,cls,label){
    var b=el('button',cls);b.type='button';b.setAttribute('data-demo',p._id);
    b.innerHTML=(label||'Təklif al')+use('i-arr');return b;
  }
  function waBtn(p,cls){
    var a=el('a',cls);a.href=WA?waUrl('Salam! '+p.name+' ilə maraqlanıram.'):'#elaqe';
    if(WA){a.target='_blank';a.rel='noopener'}
    a.innerHTML=use('i-wa')+'WhatsApp-da soruşun';return a;
  }
  function ctas(p,box,dark){
    if(p.kind==='case'){box.appendChild(offerBtn(p,'btn btn-blue','Bənzərini sifariş et'));return box}
    if(p.demo&&p.demo.url)box.appendChild(liveBtn(p,'btn btn-blue'));
    else box.appendChild(waBtn(p,'btn btn-blue'));
    box.appendChild(offerBtn(p,'btn btn-ghost'));
    return box;
  }

  /* ---------- cihaz maketləri ---------- */
  function phoneFrame(inner){var f=el('div','phn'),s=el('div','phn-s');s.appendChild(inner);f.appendChild(s);return f}
  function shot(src,alt){var i=el('img');i.src=src;i.alt=alt||'';i.width=440;i.height=782;i.loading='lazy';i.decoding='async';return i}
  function phoneDom(p){
    var f=p.phone||{},m=el('div','pm');
    var top=el('div','pm-top');top.appendChild(el('b',null,f.title||p.name));if(f.badge)top.appendChild(el('span',null,f.badge));m.appendChild(top);
    if(f.balance!=null){var b=el('div','pm-bal');b.appendChild(el('small',null,f.balanceLabel||''));b.appendChild(el('strong',null,f.balance));
      if(f.note)b.appendChild(el('em',null,f.note));m.appendChild(b)}
    if(f.button)m.appendChild(el('div','pm-btn',f.button));
    if(f.rows&&f.rows.length){m.appendChild(el('div','pm-h',f.listTitle||''));
      f.rows.slice(0,3).forEach(function(r){var row=el('div','pm-row'),v=String(r[1]==null?'':r[1]);
        row.appendChild(el('span',null,r[0]));row.appendChild(el('b',/^[−-]/.test(v)?'neg':null,v));m.appendChild(row)})}
    var nv=el('div','pm-nav');(f.nav||['','','','']).forEach(function(t,k){var s=el('span',k===(f.navOn==null?2:f.navOn)?'on':null,t||'•');nv.appendChild(s)});m.appendChild(nv);
    var ph=phoneFrame(m);ph.setAttribute('aria-hidden','true');return ph;
  }
  function winDom(p){
    var s=p.screen||{},w=el('div','win');w.setAttribute('aria-hidden','true');
    var t=el('div','win-t');t.appendChild(el('i'));t.appendChild(el('span',null,s.title||p.name));
    var c=el('em');['–','□','✕'].forEach(function(x){c.appendChild(el('s',null,x))});t.appendChild(c);w.appendChild(t);
    var b=el('div','win-b'),m=el('div','win-m');
    (s.menu||[]).forEach(function(x,i){m.appendChild(el('span',i?null:'on',x))});b.appendChild(m);
    var ct=el('div','win-c'),h=el('div','win-h');h.appendChild(el('span',null,s.heading||''));h.appendChild(el('small',null,'+ Yeni'));ct.appendChild(h);
    var th=el('div','win-r th');['№','Mağaza','Status','Məbləğ'].forEach(function(x){th.appendChild(el('span',null,x))});ct.appendChild(th);
    (s.rows||[]).forEach(function(r,i){var row=el('div','win-r');row.appendChild(el('span',null,r[0]));row.appendChild(el('span',null,r[1]));
      row.appendChild(el('span','chip c'+(i%4),r[2]));row.appendChild(el('b',null,r[3]));ct.appendChild(row)});
    b.appendChild(ct);w.appendChild(b);return w;
  }
  function device(p){
    var box=el('div','pr-dev rv');box.appendChild(el('div','halo'));
    if(p.screen){var sp=el('div','sup');sp.appendChild(winDom(p));sp.appendChild(phoneDom(p));box.appendChild(sp);
      box.appendChild(el('p','dev-cap','Ekran maketi · nümunə məlumatlar'))}
    else if(p.shots&&p.shots.length){var f=el('div','fan');
      p.shots.slice(0,3).forEach(function(src,i){f.appendChild(phoneFrame(shot(src,i?'':p.name+' — proqramın real ekranı')))});
      if(p.shots.length===1)f.classList.add('one');box.appendChild(f);box.appendChild(el('p','dev-cap','Proqramın real ekranları'))}
    else if(p.phone){var f1=el('div','fan one');f1.appendChild(phoneDom(p));box.appendChild(f1)}
    return box;
  }

  /* teqlər: «Android», «Windows» kimi adlar böyük hərfdə İ ilə yazılmasın */
  var EN=/^(Android|Windows|iOS|Excel|PDF)$/;
  function tagLine(tags,cls){var p=el('p',cls);
    (tags||[]).forEach(function(t,i){if(i)p.appendChild(D.createTextNode(' · '));var s=el('span',null,t);if(EN.test(t))s.lang='en';p.appendChild(s)});
    return p}

  /* ---------- məhsul bloku ---------- */
  function productBlock(p,i){
    var art=el('article','pr'+(i%2?' flip':'')+(i===0?' pr-main':''));art.id=p._id;art.setAttribute('aria-labelledby',p._id+'-n');
    if(i===0)art.setAttribute('data-dark',''); /* flaqman tünd zonadadır — nav da tünd qalır */
    var inn=el('div','wrap pr-in'),hd=el('header','pr-head rv');
    var tl=[].concat(p.title||[]);
    var idx=el('p','pr-idx');idx.appendChild(el('b',null,n3(i)));idx.appendChild(el('i'));if(tl[0])idx.appendChild(el('span',null,tl[0]));hd.appendChild(idx);
    var h=el('h3','pr-name',p.name);h.id=p._id+'-n';hd.appendChild(h);
    var tg=tagLine(p.tags,'pr-tags');if(p.status==='new')tg.insertBefore(el('span','pill','Yeni'),tg.firstChild);hd.appendChild(tg);
    inn.appendChild(hd);inn.appendChild(device(p));
    var bd=el('div','pr-body rv');
    if(tl[1])bd.appendChild(el('p','pr-title',cap(tl[1])));
    if(p.lead)bd.appendChild(el('p','pr-lead',p.lead));
    if(p.parts&&p.parts.length){var ul=el('ul','pr-parts');
      p.parts.forEach(function(x){var li=el('li');li.appendChild(el('b',null,x[0]));if(x[1])li.appendChild(el('span',null,cap(x[1])));ul.appendChild(li)});bd.appendChild(ul)}
    bd.appendChild(ctas(p,el('div','pr-cta')));
    inn.appendChild(bd);art.appendChild(inn);
    if(p.flow&&p.flow.length){var fw=el('div','wrap');fw.appendChild(el('p','flow-h rv','Bir sifarişin yolu'));
      var ol=el('ol','flow rv');p.flow.forEach(function(x){var li=el('li');li.appendChild(el('strong',null,x[0]));if(x[1])li.appendChild(el('span',null,x[1]));ol.appendChild(li)});
      fw.appendChild(ol);art.appendChild(fw)}
    return art;
  }

  (function render(){
    var list=$('prodList');
    if(list)MAIN.forEach(function(p,i){list.appendChild(productBlock(p,i))});
    /* hero zolağı */
    var hp=$('heroProds');
    if(hp){MAIN.forEach(function(p,i){
      var a=el('a','hp');a.href='#'+p._id;a.appendChild(el('b',null,n3(i)));
      var s=el('span');s.appendChild(el('strong',null,p.name));if(p.title&&p.title[0])s.appendChild(el('small',null,p.title[0]));a.appendChild(s);
      a.insertAdjacentHTML('beforeend',use('i-arr'));hp.appendChild(a)});
      if(!MAIN.length)hp.remove()}
    /* layihələr */
    var ll=$('layList');
    if(ll){LAY.forEach(function(p){
      var c=el('article','lay rv');c.id=p._id;
      var top=el('div','lay-top');top.appendChild(el('h3',null,p.name));top.appendChild(el('span','pill',p.kind==='case'?'Müştəri layihəsi':'Məhsul'));c.appendChild(top);
      var tl=[].concat(p.title||[]);if(tl.length){var t=el('p');t.appendChild(el('b',null,tl.join(' ')));c.appendChild(t)}
      if(p.caseNote||p.lead)c.appendChild(el('p',null,p.caseNote||p.lead));
      var ca=el('div','lay-cta');
      if(p.kind!=='case'&&p.demo&&p.demo.url)ca.appendChild(liveBtn(p,'tlink'));
      ca.appendChild(offerBtn(p,'tlink',p.kind==='case'?'Bənzərini sifariş et':'Təklif al'));
      c.appendChild(ca);ll.appendChild(c)});
      if(!LAY.length){var ls=$('layiheler');if(ls)ls.remove()}}
    /* tezliklə */
    if(SOON.length){var tz=$('tezlikle'),sec=el('section','sec'),w=el('div','wrap'),sl=el('div','soon-list');
      var sh=el('header','sh rv');var k=el('p','kick','Tezliklə');sh.appendChild(k);w.appendChild(sh);
      SOON.forEach(function(p){var c=el('div','soon-card rv');c.id=p._id;c.appendChild(el('h3',null,p.name));if(p.lead)c.appendChild(el('p',null,p.lead));sl.appendChild(c)});
      w.appendChild(sl);sec.appendChild(w);tz.appendChild(sec)}
    /* alt hissə */
    var fp=$('footProd');
    if(fp)MAIN.concat(SOON).forEach(function(p){var li=el('li'),a=el('a',null,p.name);a.href='#'+p._id;li.appendChild(a);fp.appendChild(li)});
    var fc=$('footContact');
    function fl(href,t,ext){var li=el('li'),a=el('a',null,t);a.href=href;if(ext){a.target='_blank';a.rel='noopener'}li.appendChild(a);return li}
    if(fc){fc.textContent='';
      if(WA)fc.appendChild(fl(waUrl(),'WhatsApp',true));
      if(TEL)fc.appendChild(fl('tel:'+TEL,PHONE));
      if(EMAIL)fc.appendChild(fl('mailto:'+EMAIL,EMAIL));
      if(IG)fc.appendChild(fl('https://instagram.com/'+encodeURIComponent(IG),'Instagram',true));
      if(TT)fc.appendChild(fl('https://tiktok.com/@'+encodeURIComponent(TT),'TikTok',true))}
    var cl=$('ctLinks');
    function cli(href,t,sub,ext){var li=el('li'),a=el('a');a.href=href;if(ext){a.target='_blank';a.rel='noopener'}
      a.appendChild(el('b',null,t));a.appendChild(el('span',null,sub));li.appendChild(a);return li}
    if(cl){
      if(TEL)cl.appendChild(cli('tel:'+TEL,'Zəng edin',PHONE));
      if(EMAIL)cl.appendChild(cli('mailto:'+EMAIL,'E-poçt',EMAIL));
      if(IG)cl.appendChild(cli('https://instagram.com/'+encodeURIComponent(IG),'Instagram','@'+IG+' ↗',true));
      if(TT)cl.appendChild(cli('https://tiktok.com/@'+encodeURIComponent(TT),'TikTok','@'+TT+' ↗',true))}
    var yr=$('year');if(yr)yr.textContent=String(new Date().getFullYear());
  })();

  /* ============================================================
     SORĞU FORMASI — WhatsApp / e-poçt mətnini hazırlayır (server lazım deyil)
     ============================================================ */
  var formN=0;
  function field(fid,label,kind,ac,req,ph){
    var w=el('div','fld'),lb=el('label',null,label),inp=el(kind==='area'?'textarea':'input');
    lb.htmlFor=fid;inp.id=fid;inp.name=fid.replace(/^f\d+-/,'');
    if(kind!=='area')inp.type=kind;
    if(kind==='tel')inp.inputMode='tel';
    if(ac)inp.autocomplete=ac;
    if(req)inp.required=true;
    if(ph)inp.placeholder=ph;
    var m=el('span','msg');m.id=fid+'-m';inp.setAttribute('aria-describedby',m.id);
    w.appendChild(lb);w.appendChild(inp);w.appendChild(m);return w;
  }
  function copyText(t,btn){
    function ok(){btn.textContent='Kopyalandı ✓'}
    function old(){var ta=el('textarea','sr-copy');ta.value=t;ta.setAttribute('readonly','');btn.parentNode.appendChild(ta);ta.select();
      try{D.execCommand('copy');ok()}catch(e){}ta.remove()}
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,old);else old();
  }
  function buildForm(host){
    var pre='f'+(++formN)+'-',f=el('form','form');f.noValidate=true;
    var row=el('div','f2');
    row.appendChild(field(pre+'ad','Adınız *','text','name',true,'Adınız'));
    row.appendChild(field(pre+'tel','Telefon *','tel','tel',true,'+994 50 000 00 00'));
    f.appendChild(row);
    f.appendChild(field(pre+'sirket','Şirkət','text','organization',false,'Şirkətin adı (istəyə görə)'));
    var fs=el('fieldset','fs'),cr=el('div','chips');fs.appendChild(el('legend',null,'Nə ilə maraqlanırsınız?'));
    function chip(p){
      var lb=el('label','chip-o'),cb=el('input');cb.type='checkbox';cb.name='mehsul';cb.value=p.chip||p.name;cb.setAttribute('data-pid',p._id);
      cb.addEventListener('change',function(){lb.classList.toggle('on',cb.checked)});
      lb.appendChild(cb);lb.appendChild(el('span',null,p.chip||p.name));cr.appendChild(lb);return cb;
    }
    MAIN.concat(SOON,[CUSTOM]).forEach(chip);
    fs.appendChild(cr);f.appendChild(fs);
    f.appendChild(field(pre+'mesaj','Mesaj','area',null,false,'Biznesiniz və ehtiyacınız haqqında bir neçə söz…'));
    var act=el('div','f-actions');
    if(WA){var bw=el('button','btn btn-blue');bw.type='submit';bw.value='wa';bw.innerHTML=use('i-wa')+'WhatsApp-la göndər';act.appendChild(bw)}
    if(EMAIL){var bm=el('button',WA?'btn btn-ghost':'btn btn-blue');bm.type='submit';bm.value='mail';bm.innerHTML='E-poçtla göndər'+use('i-arr');act.appendChild(bm)}
    f.appendChild(act);
    f.appendChild(el('p','f-note',WA&&EMAIL?'Düymə WhatsApp-ı və ya e-poçt proqramınızı hazır mətnlə açır.'
      :WA?'Düymə WhatsApp-ı hazır mətnlə açır — yalnız «Göndər»i basın.'
      :EMAIL?'Düymə e-poçt proqramınızı hazır mətnlə açır — yalnız «Göndər»i basın.'
      :PHONE?'Bizə zəng edin: '+PHONE:''));
    var done=el('div','f-done');done.hidden=true;done.setAttribute('role','status');f.appendChild(done);
    host.appendChild(f);

    function val(k){var x=f.elements[k];return x?String(x.value).trim():''}
    function setErr(k,msg){var x=f.elements[k];if(!x)return;var w=x.parentNode;
      w.classList.toggle('err',!!msg);x.setAttribute('aria-invalid',msg?'true':'false');w.querySelector('.msg').textContent=msg}
    f.addEventListener('input',function(e){var w=e.target.closest('.fld');if(w&&w.classList.contains('err'))setErr(e.target.name,'')});
    var via=WA?'wa':'mail';
    f.addEventListener('click',function(e){var b=e.target.closest('button[type=submit]');if(b)via=b.value});
    f.addEventListener('submit',function(e){
      e.preventDefault();
      if(e.submitter&&e.submitter.value)via=e.submitter.value;
      var name=val('ad'),tel=val('tel'),co=val('sirket'),msg=val('mesaj');
      var eName=name.length<2?'Adınızı yazın':'',eTel=tel.replace(/\D/g,'').length<7?'Telefon nömrənizi yazın':'';
      setErr('ad',eName);setErr('tel',eTel);
      if(eName||eTel){f.elements[eName?'ad':'tel'].focus();return}
      var prods=[].map.call(f.querySelectorAll('input[name=mehsul]:checked'),function(c){return c.value});
      var lines=['Salam, ApexSoft!','','Ad: '+name,'Telefon: '+tel];
      if(co)lines.push('Şirkət: '+co);
      if(prods.length)lines.push('Maraqlanıram: '+prods.join(', '));
      if(msg)lines.push('','Mesaj:',msg);
      var text=lines.join('\r\n');
      if(WA&&(via==='wa'||!EMAIL)){via='wa';window.open(waUrl(text),'_blank','noopener')}
      else if(!EMAIL)return;
      else{via='mail';location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent('Sorğu'+(prods.length?': '+prods.join(', '):'')+' — '+name)
        +'&body='+encodeURIComponent(text)}
      count('sorgu');
      done.textContent='';done.insertAdjacentHTML('beforeend',UI.check);
      var d=el('div');
      d.appendChild(el('b',null,via==='wa'?'WhatsApp açıldı':'E-poçt proqramınız açıldı'));
      d.appendChild(el('p',null,via==='wa'?'Mətn hazırdır — WhatsApp-da göndərin.'
        :'Mətn hazırdır — «Göndər»i basın. Açılmadısa, bizə birbaşa yazın: '+EMAIL));
      if(via!=='wa'){var cp=el('button','f-copy','Ünvanı kopyala');cp.type='button';
        cp.addEventListener('click',function(){copyText(EMAIL,cp)});d.appendChild(cp)}
      done.appendChild(d);done.hidden=false;
    });
    return {
      select:function(id){if(!id)return;var hit=null;
        [].forEach.call(f.querySelectorAll('input[name=mehsul]'),function(c){if(c.getAttribute('data-pid')===id)hit=c});
        /* layihə kartından gəlibsə — onun seçimini əlavə et */
        if(!hit){var p=LAY.filter(function(x){return x._id===id})[0];if(p)hit=chip(p)}
        if(hit&&!hit.checked){hit.checked=true;hit.parentNode.classList.add('on')}},
      fresh:function(){done.hidden=true},
      focus:function(){f.elements.ad.focus()}
    };
  }
  var cHost=$('contactForm'),cForm=cHost?buildForm(cHost):null;

  /* ====== təklif pəncərəsi ====== */
  var dlg=$('demo'),dForm=null;
  function openOffer(id){
    if(!dlg||typeof dlg.showModal!=='function'){
      if(cForm)cForm.select(id);var c=$('elaqe');if(c)c.scrollIntoView({behavior:calm?'auto':'smooth'});return;
    }
    if(!dForm)dForm=buildForm($('demoForm'));
    dForm.fresh();dForm.select(id);
    if(!dlg.open){dlg.classList.remove('closing');dlg.showModal();body.classList.add('modal-open')}
    if(fine)dForm.focus();
  }
  function closeDlg(d){
    if(!d||!d.open||d.classList.contains('closing'))return;
    if(calm){d.close();return}
    d.classList.add('closing');setTimeout(function(){d.close()},220);
  }
  if(dlg){
    dlg.addEventListener('close',function(){dlg.classList.remove('closing');body.classList.remove('modal-open')});
    dlg.addEventListener('cancel',function(e){e.preventDefault();closeDlg(dlg)});
    dlg.addEventListener('click',function(e){if(e.target===dlg)closeDlg(dlg)});
  }

  /* ============================================================
     CANLI DEMO — böyük ekranda telefon çərçivəsində; telefonda link özü işləyir
     ============================================================ */
  function hasDemo(p){return p.demo&&p.demo.url&&p.kind!=='case'}
  var DEMOS=MAIN.concat(LAY).filter(hasDemo),MAIN_DEMOS=MAIN.filter(hasDemo);
  /* hero-dakı «Canlı demo»: telefonda demosu olan ilk məhsula aparır */
  var heroLive=D.querySelector('.hero [data-live]');
  if(heroLive){if(MAIN_DEMOS.length)heroLive.href='#'+MAIN_DEMOS[0]._id;else heroLive.remove()}
  var dv=$('dv'),dvTabs=$('dvTabs'),dvScreen=$('dvScreen'),dvInfo=$('dvInfo');
  var dvBig=matchMedia('(min-width:880px) and (min-height:560px)');
  var dvCur=null,dvFrame=null;
  /* vərəqlər: əsas məhsullar; layihə demosu yalnız ondan açılanda əlavə olunur */
  function tabs(p){
    dvTabs.textContent='';
    var list=MAIN_DEMOS.indexOf(p)<0?MAIN_DEMOS.concat([p]):MAIN_DEMOS;
    list.forEach(function(x){
      var b=el('button','dv-tab',x.name);b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-selected',String(x===p));b.setAttribute('data-pid',x._id);
      b.addEventListener('click',function(){showLive(x)});dvTabs.appendChild(b);
    });
  }
  function showLive(p){
    if(dvCur===p)return;dvCur=p;
    if(!dv.open||MAIN_DEMOS.indexOf(p)<0||dvTabs.children.length!==MAIN_DEMOS.length)tabs(p);
    else [].forEach.call(dvTabs.children,function(b){b.setAttribute('aria-selected',String(b.getAttribute('data-pid')===p._id))});
    if(dvFrame)dvFrame.remove();
    dvScreen.classList.add('loading');
    var f=el('iframe');f.title=p.name+' — canlı demo';f.src=p.demo.url;f.setAttribute('allow','camera');
    f.addEventListener('load',function(){dvScreen.classList.remove('loading');escIn(f)});
    dvScreen.appendChild(f);dvFrame=f;count('demo-'+p._id);
    /* demo hələ yüklənərkən fokusu götürsə də Esc işləsin — sənəd yaranan kimi qulaq as */
    var tries=0,poll=setInterval(function(){if(++tries>40||dvFrame!==f){clearInterval(poll);return}if(escIn(f))clearInterval(poll)},250);
    dvInfo.textContent='';
    dvInfo.appendChild(el('p','kick','Canlı demo'));
    var h=el('h2',null,p.name);h.id='dvTitle';dvInfo.appendChild(h);
    if(p.lead)dvInfo.appendChild(el('p','dv-lead',p.lead));
    var d=p.demo;
    if(d.note){var n=el('div','dv-note');n.insertAdjacentHTML('beforeend',UI.info);n.appendChild(el('span',null,d.note));dvInfo.appendChild(n)}
    if(d.steps&&d.steps.length){dvInfo.appendChild(el('p','dv-h','Nəyi sınayın'));var ol=el('ol','dv-steps');
      d.steps.forEach(function(s){ol.appendChild(el('li',null,s))});dvInfo.appendChild(ol)}
    var act=el('div','dv-act');
    act.appendChild(offerBtn(p,'btn btn-blue'));
    var nw=el('a','btn btn-ghost','Yeni vərəqdə aç ');nw.href=d.url;nw.target='_blank';nw.rel='noopener';nw.insertAdjacentHTML('beforeend',UI.ext);
    nw.lastChild.setAttribute('width','18');nw.lastChild.setAttribute('height','18');
    act.appendChild(nw);dvInfo.appendChild(act);
    dvInfo.appendChild(el('p','dv-small','Demoda nümunə məlumatlar var — real hesablara və serverlərə qoşulmur.'));
  }
  /* demo fokusu götürəndə də Esc pəncərəni bağlasın (demo eyni mənbədədir) */
  function escIn(f){
    try{var w=f.contentWindow,d=w&&w.document;
      if(!d||d.URL==='about:blank'||d.readyState==='loading'&&!d.body)return false;
      if(w.__apxEsc)return true;w.__apxEsc=1;
      w.addEventListener('keydown',function(e){if(e.key==='Escape')closeDlg(dv)},true);return true;
    }catch(e){return true}
  }
  function openLive(id){
    if(!dv||typeof dv.showModal!=='function'||!dvBig.matches||!DEMOS.length)return false;
    var p=DEMOS.filter(function(x){return x._id===id})[0]||DEMOS[0];
    showLive(p);
    if(!dv.open){dv.classList.remove('closing');dv.showModal();body.classList.add('modal-open')}
    return true;
  }
  if(dv){
    dv.addEventListener('close',function(){
      dv.classList.remove('closing');body.classList.remove('modal-open');
      if(dvFrame){dvFrame.remove();dvFrame=null}dvCur=null; /* demo arxada CPU yeməsin */
    });
    dv.addEventListener('cancel',function(e){e.preventDefault();closeDlg(dv)});
    dv.addEventListener('click',function(e){if(e.target===dv)closeDlg(dv)});
  }

  /* ====== mobil menyu ====== */
  var nav=$('nav'),burger=$('burger'),mnav=$('mnav');
  function setMenu(o){if(!mnav)return;mnav.hidden=!o;burger.setAttribute('aria-expanded',String(o));if(o)nav.classList.remove('hide')}
  if(burger&&mnav){
    burger.addEventListener('click',function(){setMenu(mnav.hidden)});
    mnav.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
  }

  /* ====== ümumi kliklər: demo, təklif, sayğac ====== */
  D.addEventListener('click',function(e){
    var t=e.target;if(!t||!t.closest)return;
    var a=t.closest('a[href]'),h=a?a.getAttribute('href')||'':'';
    if(h.indexOf('https://wa.me/')===0)count('whatsapp');else if(h.indexOf('tel:')===0)count('zeng');
    var lv=t.closest('[data-live]');
    if(lv){var lid=lv.getAttribute('data-live')||'';
      if(openLive(lid)){e.preventDefault();setMenu(false)}
      else if(DEMOS.some(function(x){return x._id===lid}))count('demo-'+lid);
      return}
    var d=t.closest('[data-demo]');
    if(d){e.preventDefault();setMenu(false);if(dv&&dv.open)dv.close();openOffer(d.getAttribute('data-demo')||'');return}
    if(t.closest('[data-dv-close]'))closeDlg(dv);
    if(t.closest('[data-close]'))closeDlg(dlg);
  });
  addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

  /* ============================================================
     SİZƏ HANSI UYĞUNDUR — products.js-dəki "need"
     ============================================================ */
  (function finder(){
    var sec=$('uygun'),opts=$('fdOpts'),out=$('fdOut');
    if(!sec||!opts||!out)return;
    var list=MAIN.filter(function(p){return p.need}).concat([CUSTOM]);
    if(list.length<2){sec.remove();return}
    var btns=[],cur=-1;
    list.forEach(function(p,i){
      var b=el('button','fd-opt rv'+(i%4?' d'+(i%4):''));b.type='button';b.setAttribute('role','radio');b.setAttribute('aria-checked','false');b.tabIndex=i?-1:0;
      var ic=el('span','ico');ic.innerHTML=icon(p);b.appendChild(ic);b.appendChild(el('span',null,p.need));b.appendChild(el('span','rd'));
      b.addEventListener('click',function(){pick(i,true)});
      b.addEventListener('keydown',function(e){
        var k=e.key,dd=(k==='ArrowDown'||k==='ArrowRight')?1:(k==='ArrowUp'||k==='ArrowLeft')?-1:0;
        if(!dd)return;e.preventDefault();var j=(i+dd+list.length)%list.length;pick(j,false);btns[j].focus();
      });
      btns.push(b);opts.appendChild(b);
    });
    var em=el('div','fd-empty');em.appendChild(el('p','kick','Nəticə'));em.appendChild(el('p',null,'Soldakı siyahıdan ehtiyacınızı seçin — sizə uyğun proqramı burada göstərək.'));
    if(innerWidth<1024)em.lastChild.textContent='Yuxarıdakı siyahıdan ehtiyacınızı seçin — sizə uyğun proqramı burada göstərək.';
    out.appendChild(em);
    function pick(i,scroll){
      if(i===cur)return;cur=i;var p=list[i];
      btns.forEach(function(b,k){b.setAttribute('aria-checked',String(k===i));b.tabIndex=k===i?0:-1});
      out.textContent='';
      var c=el('div',calm?null:'fd-in');
      c.appendChild(el('p','kick fd-tag',p===CUSTOM?'Xidmət':'Sizə uyğundur'));
      c.appendChild(el('p','fd-name',p.name));
      var tl=[].concat(p.title||[]);if(tl.length)c.appendChild(el('p','fd-title',tl.join(' ')));
      if(p.parts&&p.parts.length){var ul=el('ul','fd-parts');
        p.parts.slice(0,3).forEach(function(x){var li=el('li');li.appendChild(el('b',null,x[0]));if(x[1])li.appendChild(D.createTextNode(' — '+x[1]));ul.appendChild(li)});c.appendChild(ul)}
      var cta=el('div','fd-cta');
      if(p===CUSTOM){cta.appendChild(offerBtn(p,'btn btn-blue','Layihənizi danışaq'));var sv=el('a','btn btn-ghost','Xidmətlər');sv.href='#xidmetler';cta.appendChild(sv)}
      else{ctas(p,cta);var mo=el('a','btn btn-ghost','Ətraflı');mo.href='#'+p._id;cta.appendChild(mo)}
      c.appendChild(cta);out.appendChild(c);
      if(scroll&&innerWidth<1024){var r=out.getBoundingClientRect();
        if(r.top>innerHeight*.5||r.top<0)out.scrollIntoView({behavior:calm?'auto':'smooth',block:'start'})}
    }
  })();

  /* ============================================================
     NAV — tünd bölmələrin ([data-dark]) üstündə tünd, açıq fonda açıq;
     aşağı sürüşəndə gizlənir. Ekranın yuxarısındakı nazik zolağa baxırıq.
     ============================================================ */
  var hero=D.querySelector('.hero');
  if(nav&&'IntersectionObserver' in window){
    var dz=[].slice.call(D.querySelectorAll('[data-dark]'));
    var nio=new IntersectionObserver(function(es){
      es.forEach(function(e){e.target._dk=e.isIntersecting});
      nav.classList.toggle('light',!dz.some(function(x){return x._dk}));
    },{rootMargin:'-4% 0px -95% 0px'});
    dz.forEach(function(x){nio.observe(x)});
  }
  var lastY=scrollY,fab=$('waFab'),ticking=false;
  addEventListener('scroll',function(){
    if(ticking)return;ticking=true;
    requestAnimationFrame(function(){ticking=false;var y=scrollY;
      if(nav&&(!mnav||mnav.hidden)){if(y>240&&y>lastY+4)nav.classList.add('hide');else if(y<lastY-4||y<240)nav.classList.remove('hide')}
      lastY=y});
  },{passive:true});
  /* WhatsApp düyməsi əlaqə bölməsində gizlənir (orada böyük düymə var) */
  /* WhatsApp düyməsi hero düymələri və əlaqə bölməsi görünəndə gizlənir (orada böyük düymə var) */
  var ct=$('elaqe'),hcta=D.querySelector('.hero-cta');
  if(fab&&'IntersectionObserver' in window){
    var seen={};
    var fio=new IntersectionObserver(function(es){es.forEach(function(e){seen[e.target===ct?'c':'h']=e.isIntersecting});
      fab.classList.toggle('off',!!(seen.c||seen.h))},{threshold:.1});
    if(ct)fio.observe(ct);if(hcta)fio.observe(hcta);
  }

  /* ============================================================
     HERO TELEFONU — xəttlər (callout) + masaüstündə yüngül əyilmə
     ============================================================ */
  var dev=$('heroDev'),p3=$('p3'),scr=$('p3scr'),co=$('co');
  var CO=[
    {t:'Növbə',fx:.12,fy:.057,side:'l',ly:.1},
    {t:'Ədəd',fx:.28,fy:.186,side:'l',ly:.4},
    {t:'İstehsal',fx:.305,fy:.958,side:'l',ly:.84},
    {t:'Barkod',fx:.71,fy:.038,side:'r',ly:.2,wide:1},
    {t:'Çəki ilə',fx:.875,fy:.62,side:'r',ly:.66,wide:1}
  ];
  var NS='http://www.w3.org/2000/svg';
  if(dev&&p3&&scr&&co){
    var sv=D.createElementNS(NS,'svg'),probes=[];
    co.appendChild(sv);
    CO.forEach(function(c){
      var g=D.createElementNS(NS,'g');if(c.wide)g.setAttribute('class','wide');
      var path=D.createElementNS(NS,'path'),r=D.createElementNS(NS,'circle'),d=D.createElementNS(NS,'circle');
      r.setAttribute('class','r');r.setAttribute('r','7');d.setAttribute('class','d');d.setAttribute('r','2.6');
      g.appendChild(path);g.appendChild(r);g.appendChild(d);sv.appendChild(g);
      var lb=el('span','co-t'+(c.side==='r'?' r':'')+(c.wide?' wide':''),c.t);co.appendChild(lb);
      probes.push({c:c,path:path,r:r,d:d,lb:lb,g:g});
    });
    /* Xətlərin ucları DOM-dan oxunmur: telefonun 3D çevrilməsi (perspective + rotateX/Y/Z) burada
       riyazi olaraq proyeksiya edilir. Ölçülər yalnız açılışda/ölçü dəyişəndə oxunur, sürüşmə zamanı
       heç bir layout işi yoxdur; yazılar transform ilə yerini dəyişir — zəif telefonda da hamar. */
    var stage=p3.parentNode,L={},A={rx:7,ry:-21,rz:2.5,ty:0},svW=0,svH=0;
    var measure=function(){
      var cs=getComputedStyle(stage),po=String(cs.perspectiveOrigin).split(' ');
      L.d=parseFloat(cs.perspective)||1400;L.ox=parseFloat(po[0])||0;L.oy=parseFloat(po[1])||0;
      L.x=p3.offsetLeft;L.y=p3.offsetTop;L.w=p3.offsetWidth;L.h=p3.offsetHeight;
      L.sx=scr.offsetLeft;L.sy=scr.offsetTop;L.sw=scr.offsetWidth;L.sh=scr.offsetHeight;
      L.W=dev.offsetWidth;L.H=dev.offsetHeight;
      probes.forEach(function(o){o.w=o.lb.offsetWidth;o.h=o.lb.offsetHeight});
    };
    var proj=function(px,py){
      var R=Math.PI/180,x=px-L.w/2,y=py-L.h/2,z=0,c,s,t;
      c=Math.cos(A.rz*R);s=Math.sin(A.rz*R);t=x*c-y*s;y=x*s+y*c;x=t;           /* rotateZ */
      c=Math.cos(A.ry*R);s=Math.sin(A.ry*R);t=x*c+z*s;z=-x*s+z*c;x=t;          /* rotateY */
      c=Math.cos(A.rx*R);s=Math.sin(A.rx*R);t=y*c-z*s;z=y*s+z*c;y=t;           /* rotateX */
      x+=L.x+L.w/2;y+=L.y+L.h/2+A.ty;var k=L.d/(L.d-z);                        /* translate + perspective */
      return [L.ox+(x-L.ox)*k,L.oy+(y-L.oy)*k];
    };
    var draw=function(){
      if(!L.w)return;
      if(L.W!==svW||L.H!==svH){svW=L.W;svH=L.H;sv.setAttribute('width',svW);sv.setAttribute('height',svH)}
      var q=[proj(0,0),proj(L.w,0),proj(L.w,L.h),proj(0,L.h)];
      var fl=Math.min(q[0][0],q[1][0],q[2][0],q[3][0]),fr=Math.max(q[0][0],q[1][0],q[2][0],q[3][0]);
      var ft=Math.min(q[0][1],q[1][1],q[2][1],q[3][1]),fb=Math.max(q[0][1],q[1][1],q[2][1],q[3][1]);
      var showWide=innerWidth>=600,gap=innerWidth<600?14:30;
      probes.forEach(function(o){
        var c=o.c;if(c.wide&&!showWide)return;
        if(!o.w){o.w=o.lb.offsetWidth;o.h=o.lb.offsetHeight}
        var a=proj(L.sx+L.sw*c.fx,L.sy+L.sh*c.fy),ax=a[0],ay=a[1];
        var ly=ft+(fb-ft)*c.ly;
        var ex=c.side==='l'?fl-gap*.4:fr+gap*.4;
        var lx=c.side==='l'?fl-gap:fr+gap;
        o.path.setAttribute('d','M'+ax.toFixed(1)+' '+ay.toFixed(1)+'L'+ex.toFixed(1)+' '+ly.toFixed(1)+'L'+lx.toFixed(1)+' '+ly.toFixed(1));
        o.r.setAttribute('cx',ax.toFixed(1));o.r.setAttribute('cy',ay.toFixed(1));o.d.setAttribute('cx',ax.toFixed(1));o.d.setAttribute('cy',ay.toFixed(1));
        var x=c.side==='l'?lx-8-o.w:lx+8;
        o.lb.style.transform='translate3d('+x.toFixed(1)+'px,'+(ly-o.h/2).toFixed(1)+'px,0)';
      });
    };
    /* telefon sürüşdürdükcə fırlanır və yuxarı qalxır (istinad saytlarındakı kimi), masaüstündə siçana da baxır.
       Yalnız transform. reduced-motion-da telefon sabitdir (CSS-dəki eyni bucaqlar). */
    /* «Stansiya»: telefon ekranın ortasına çatana qədər sabitdir və yazılar görünür (sürüşmədə heç nə
       yenidən çəkilmir). Sonra telefon fırlanıb yuxarı qalxır, yazılar isə sönür — yalnız bu qısa
       aralıqda xətlər hər kadrda yenilənir. */
    var cur={x:0,y:0,s:0},tgt={x:0,y:0,s:0},run=false,s0=0,span=600,coOp=1;
    var apply=function(){
      A.ty=-cur.s*34;A.rx=7+cur.x+cur.s*6;A.ry=-21+cur.y+cur.s*30;A.rz=2.5-cur.s*4.5;
      p3.style.transform='translate3d(0,'+A.ty.toFixed(1)+'px,0) rotateX('+A.rx.toFixed(2)+'deg) rotateY('+A.ry.toFixed(2)+'deg) rotateZ('+A.rz.toFixed(2)+'deg)';
      var op=Math.max(0,1-cur.s*4);
      if(op!==coOp){coOp=op;co.style.opacity=op.toFixed(3)}
      if(op>0)draw();
    };
    var step=function(){
      var d=0;['x','y','s'].forEach(function(k){var v=tgt[k]-cur[k];cur[k]+=v*.16;d+=Math.abs(v)});
      if(d<.004){cur.x=tgt.x;cur.y=tgt.y;cur.s=tgt.s}
      apply();
      if(d>=.004)requestAnimationFrame(step);else run=false;
    };
    var go=function(){if(!run){run=true;requestAnimationFrame(step)}};
    var place=function(){
      var top=dev.getBoundingClientRect().top+scrollY;
      s0=Math.max(0,top+L.y+L.h/2-innerHeight/2);span=Math.max(320,innerHeight*.75);
    };
    var sp=function(){tgt.s=Math.max(0,Math.min(1,(scrollY-s0)/span))};
    measure();draw();requestAnimationFrame(function(){draw();co.classList.add('on')});
    addEventListener('resize',function(){measure();place();sp();draw();go()});
    if(D.fonts&&D.fonts.ready)D.fonts.ready.then(function(){measure();draw()});
    if(D.fonts&&D.fonts.addEventListener)D.fonts.addEventListener('loadingdone',function(){measure();place();draw()});
    if(!calm&&hero){
      p3.classList.add('js');place();sp();cur.s=tgt.s;apply();
      setTimeout(function(){co.style.transition='none'},900); /* ilk görünmədən sonra sönmə sürüşməyə bağlıdır */
      addEventListener('scroll',function(){if(scrollY>s0+span*1.3&&cur.s>=1)return;sp();if(tgt.s!==cur.s)go()},{passive:true});
      if(fine){
        hero.addEventListener('pointermove',function(e){
          var r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
          tgt.y=x*7;tgt.x=-y*5;go();
        });
        hero.addEventListener('pointerleave',function(){tgt.x=0;tgt.y=0;go()});
      }
    }
  }

  /* ============================================================
     GİRİŞLƏR — yalnız ekrandan aşağıda olan elementlər (transform/opacity)
     ============================================================ */
  if(!calm&&'IntersectionObserver' in window){
    var vh=innerHeight;
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -6% 0px'});
    [].forEach.call(D.querySelectorAll('.rv'),function(e){if(e.getBoundingClientRect().top>vh){e.classList.add('rv-w');io.observe(e)}});
  }

  /* ünvanda #məhsul varsa (məs. apexsoft.az/#tendir) — bölmə indi yarandı, ora keç */
  var hs=location.hash.slice(1),ht=null;try{ht=hs&&D.getElementById(decodeURIComponent(hs))}catch(e){}
  if(ht&&scrollY<10)ht.scrollIntoView({block:'start',behavior:'instant'});
  }
})();
