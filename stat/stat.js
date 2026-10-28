/* Sayt statistikası — app.js-in abacus.jasoncameron.dev-də artırdığı sayğacları oxuyur.
   /get heç nəyi artırmır; bu səhifənin özü sayılmır. */
(function(){
  var API='https://abacus.jasoncameron.dev/get/apexsoft.az/';
  var MON=['yanvar','fevral','mart','aprel','may','iyun','iyul','avqust','sentyabr','oktyabr','noyabr','dekabr'];
  var WD=['bazar','bazar ertəsi','çərşənbə axşamı','çərşənbə','cümə axşamı','cümə','şənbə'];
  var nf=window.Intl?new Intl.NumberFormat('az-Latn-AZ'):null;
  function fmt(n){return n==null?'—':nf?nf.format(n):String(n)}
  function $(id){return document.getElementById(id)}
  function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}

  /* Bakı vaxtı (UTC+4, yay saatı yoxdur): i gün əvvəl */
  function day(i){var d=new Date(Date.now()+144e5-i*864e5);return{key:d.toISOString().slice(0,10).replace(/-/g,''),d:d.getUTCDate(),m:d.getUTCMonth(),w:d.getUTCDay()}}

  /* null — xidmət cavab vermədi; 0 — hələ heç kim sayılmayıb */
  function get(k){
    return fetch(API+k,{credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store'}).then(function(r){
      if(r.status===404)return 0;if(!r.ok)return null;
      return r.json().then(function(j){return typeof j.value==='number'?j.value:0});
    }).catch(function(){return null});
  }

  var DEMOS=(window.APEX_PRODUCTS||[]).filter(function(p){return p&&p.status!=='soon'&&p.demo&&p.demo.url}).map(function(p){
    return{name:p.name,key:'demo-'+String(p.id||'').replace(/[^\w-]/g,'')};
  });
  var CONTACT=[{name:'WhatsApp-a keçid',key:'whatsapp'},{name:'Sorğu forması göndərildi',key:'sorgu'},{name:'Zəng düyməsi',key:'zeng'}];

  function list(host,items,vals){
    host.textContent='';
    items.forEach(function(it,i){var li=el('li');li.appendChild(el('span',null,it.name));li.appendChild(el('b',null,fmt(vals[i])));host.appendChild(li)});
  }

  var tip=$('tip'),bars=$('bars');
  function chart(days,vals){
    bars.textContent='';
    var max=Math.max.apply(null,vals.map(function(v){return v||0}).concat([1])),top=vals.indexOf(Math.max.apply(null,vals));
    days.forEach(function(d,i){
      var v=vals[i],col=el('div','st-col'+(i===days.length-1?' today':''));
      col.setAttribute('role','listitem');col.tabIndex=0;
      var lbl=d.d+' '+MON[d.m]+', '+WD[d.w]+' — '+(v==null?'məlumat yoxdur':fmt(v)+' ziyarətçi');
      col.setAttribute('aria-label',lbl);col._tip=lbl;
      var track=el('div','st-track'),bar=el('div','st-bar'+(v?'':' zero'));
      if(v)bar.style.height=Math.max(3,v/max*100)+'%';
      /* rəqəm yalnız bu gün və ən çox olan gündə yazılır, qalanı — üstünə gələndə */
      if(v&&(i===days.length-1||i===top))bar.appendChild(el('span','st-val',fmt(v)));
      track.appendChild(bar);col.appendChild(track);
      col.appendChild(el('span','st-day',i===days.length-1?'Bu gün':String(d.d)));
      bars.appendChild(col);
    });
  }
  function showTip(col){
    if(!col||!col._tip){tip.hidden=true;return}
    tip.textContent=col._tip;tip.hidden=false;
    var c=bars.getBoundingClientRect(),r=col.getBoundingClientRect(),w=tip.offsetWidth;
    var x=r.left-c.left+r.width/2-w/2;x=Math.max(0,Math.min(c.width-w,x));
    tip.style.transform='translateX('+x+'px)';
  }
  bars.addEventListener('pointerover',function(e){showTip(e.target.closest('.st-col'))});
  bars.addEventListener('pointerleave',function(){tip.hidden=true});
  bars.addEventListener('focusin',function(e){showTip(e.target.closest('.st-col'))});
  bars.addEventListener('focusout',function(){tip.hidden=true});

  var busy=false;
  function load(){
    if(busy)return;busy=true;$('upd').textContent='Yüklənir…';
    var days=[];for(var i=13;i>=0;i--)days.push(day(i));
    var keys=days.map(function(d){return'gun-'+d.key}).concat(['ziyaret'],DEMOS.map(function(d){return d.key}),CONTACT.map(function(c){return c.key}));
    Promise.all(keys.map(get)).then(function(v){
      busy=false;
      var dv=v.slice(0,14),all=v[14],dm=v.slice(15,15+DEMOS.length),ct=v.slice(15+DEMOS.length);
      var wk=dv.slice(7);
      $('kToday').textContent=fmt(dv[13]);$('kYest').textContent=fmt(dv[12]);
      $('kWeek').textContent=wk.some(function(x){return x==null})?'—':fmt(wk.reduce(function(a,b){return a+b},0));
      $('kAll').textContent=fmt(all);
      chart(days,dv);list($('demos'),DEMOS,dm);list($('contact'),CONTACT,ct);
      var failed=v.filter(function(x){return x==null}).length;
      var t=new Date().toLocaleTimeString('az-Latn-AZ',{timeZone:'Asia/Baku',hour:'2-digit',minute:'2-digit'});
      $('upd').textContent=failed===v.length?'Sayğac xidməti cavab vermədi — bir az sonra “Yenilə”ni basın.'
        :failed?'Bəzi rəqəmlər gəlmədi (—). Yeniləndi: '+t:'Yeniləndi: '+t+' (Bakı vaxtı)';
    });
  }
  $('refresh').addEventListener('click',load);
  load();

  /* "bu cihazı sayma" — app.js localStorage-da apx-me görəndə saymır */
  var me=$('me');
  function setMe(on){me.setAttribute('aria-checked',String(on))}
  try{setMe(!!localStorage.getItem('apx-me'))}catch(e){me.disabled=true}
  me.addEventListener('click',function(){
    var on=me.getAttribute('aria-checked')!=='true';
    try{if(on)localStorage.setItem('apx-me','1');else localStorage.removeItem('apx-me');setMe(on)}catch(e){me.disabled=true}
  });
})();
