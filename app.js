(function(){
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia('(pointer:fine)').matches;
  var body=document.body;
  var bootAt=null;

  /* ====== giriş pərdəsi (yaddaş bloklansa da açılsın) ====== */
  var intro=document.getElementById('intro');
  function boot(){body.classList.remove('lock');body.classList.add('booted');bootAt=performance.now()}
  var seen=false;
  try{seen=!!sessionStorage.getItem('introSeen');sessionStorage.setItem('introSeen','1')}catch(e){seen=true}
  if(calm||seen){
    if(intro)intro.remove();boot();
  }else{
    setTimeout(function(){intro.classList.add('done');boot();
      setTimeout(function(){intro.remove()},1100)},1500);
  }

  /* ============================================================
     MƏHSULLAR — products.js siyahısından qurulur.
     Yeni proqram = products.js-ə bir element; burada heç nə dəyişmir.
     ============================================================ */
  var PRODUCTS=(window.APEX_PRODUCTS||[]).filter(function(p){return p&&p.name});
  var LIVE=PRODUCTS.filter(function(p){return p.status!=='soon'});
  var SOON=PRODUCTS.filter(function(p){return p.status==='soon'});
  var FEAT=LIVE.filter(function(p){return p.featured})[0]||LIVE[0]||null;
  if(FEAT)LIVE=[FEAT].concat(LIVE.filter(function(p){return p!==FEAT}));

  function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
  function pid(p,k){return String(p.id||'').replace(/[^\w-]/g,'')||('mehsul-'+k)}
  /* hər məhsula unikal id (səhifədəki digər id-lərlə də toqquşmasın) */
  var usedIds={fly:1,asm:1,asmBox:1,ustunluk:1,elaqe:1,mehsullar:1,tezlikle:1,nav:1,intro:1,gl:1,scene3d:1,heroProd:1,navProd:1};
  function uid(p,k){var b=pid(p,k),u=b,n=2;while(usedIds[u])u=b+'-'+(n++);usedIds[u]=1;return u}
  LIVE.forEach(function(p,i){p._id=uid(p,i)});SOON.forEach(function(p,i){p._id=uid(p,'tez-'+i)});
  function rgb(h){var m=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(h||''));if(!m)return null;var x=m[1];
    if(x.length===3)x=x[0]+x[0]+x[1]+x[1]+x[2]+x[2];return [parseInt(x.slice(0,2),16),parseInt(x.slice(2,4),16),parseInt(x.slice(4,6),16)]}
  function rgba(h,a){var c=rgb(h);return c?'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')':null}
  /* məhsulun brend rənglərini elementə CSS dəyişənləri kimi ver */
  function paint(node,p){var c=(p&&p.colors)||{};
    if(rgb(c.primary)){node.style.setProperty('--p',c.primary);node.style.setProperty('--pA',rgba(c.primary,.18));
      node.style.setProperty('--pG',rgba(c.primary,.22));node.style.setProperty('--pS',rgba(c.primary,.14))}
    if(rgb(c.dark))node.style.setProperty('--pk',c.dark);
    if(rgb(c.onPrimary))node.style.setProperty('--pon',c.onPrimary)}
  var LINE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var ICONS={
    star:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.6" fill="currentColor"/><path d="M12 6.9l1.36 3.6 3.84.17-3 2.4 1.03 3.7L12 14.66 8.77 16.77l1.03-3.7-3-2.4 3.84-.17z" class="ic-star"/></svg>',
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
    clipboard:LINE+'<rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 4V3h6v1M9 11l2 2 4-4M9 17h6"/></svg>'
  };
  function iconHTML(p){return ICONS[p.icon]||ICONS.star}

  function phoneMock(p){
    var f=p.phone||{},wrap=el('div','phone'),ph=el('div','ph');wrap.setAttribute('aria-hidden','true');
    var top=el('div','ph-top'),logo=el('span','ph-logo');
    logo.appendChild(el('i'));logo.appendChild(document.createTextNode(f.title||p.name));
    top.appendChild(logo);top.appendChild(el('span','ph-bell'));ph.appendChild(top);
    var bd=el('div','ph-body');
    if(f.balance!=null){var bal=el('div','ph-bal');bal.appendChild(el('small',null,f.balanceLabel||''));
      bal.appendChild(el('b',null,f.balance));bal.appendChild(el('em',null,f.note||''));bd.appendChild(bal)}
    if(f.cardNumber){var cd=el('div','ph-card');cd.appendChild(el('small',null,f.cardLabel||''));
      cd.appendChild(el('div','ph-bar'));cd.appendChild(el('span',null,f.cardNumber));bd.appendChild(cd)}
    if(f.button)bd.appendChild(el('div','ph-btn',f.button));
    if(f.rows&&f.rows.length){bd.appendChild(el('div','ph-h',f.listTitle||''));
      f.rows.forEach(function(r){var row=el('div','ph-row'),v=String(r[1]==null?'':r[1]);
        row.appendChild(el('span',null,r[0]));row.appendChild(el('b',/^[\u2212-]/.test(v)?'neg':null,v));bd.appendChild(row)})}
    ph.appendChild(bd);
    var nv=el('div','ph-nav');for(var k=0;k<5;k++)nv.appendChild(el('i',k?null:'on'));ph.appendChild(nv);
    wrap.appendChild(ph);return wrap;
  }

  function productPanel(p,i){
    var sec=el('section','shell sec pp-sec');sec.id=p._id;
    var mock=!!p.phone;
    var pan=el('div','pp rv'+(p.theme==='light'?' pp-light':'')+(mock?(i%2?' pp-flip':''):' pp-single'));
    paint(pan,p);
    if(p.status==='new')pan.appendChild(el('span','pp-badge','Yeni'));
    var main=el('div','pp-main');
    var brand=el('div','pp-brand'),ico=el('span','pp-ico');ico.innerHTML=iconHTML(p);
    brand.appendChild(ico);brand.appendChild(el('span',null,p.name));brand.appendChild(el('em',null,'ApexSoft tərəfindən'));
    main.appendChild(brand);
    var tl=[].concat(p.title||[]);
    if(tl.length){var h=el('h2');h.appendChild(document.createTextNode(tl[0]));
      if(tl[1]){h.appendChild(el('br'));h.appendChild(el('b',null,tl[1]))}main.appendChild(h)}
    if(p.lead)main.appendChild(el('p','pp-lead',p.lead));
    if(p.parts&&p.parts.length){var ul=el('ul','pp-parts');
      p.parts.forEach(function(x){var li=el('li');li.appendChild(el('b',null,x[0]));if(x[1])li.appendChild(el('span',null,x[1]));ul.appendChild(li)});
      main.appendChild(ul)}
    if(p.stats&&p.stats.length){var sg=el('div','pp-stats');
      p.stats.forEach(function(x,k){var d=el('div','rv'+(k?' rv-d'+Math.min(k,3):'')),b=el('b');
        var m=/^(\d+)(%?)$/.exec(String(x[0]));
        if(m){b.dataset.count=m[1];if(m[2])b.dataset.suffix=m[2];b.textContent='0'}else b.textContent=x[0];
        d.appendChild(b);d.appendChild(el('span',null,x[1]||''));sg.appendChild(d)});
      main.appendChild(sg)}
    if(p.tags&&p.tags.length){var tg=el('div','tags pp-tags');p.tags.forEach(function(t){tg.appendChild(el('span',null,t))});main.appendChild(tg)}
    pan.appendChild(main);
    if(mock)pan.appendChild(phoneMock(p));
    sec.appendChild(pan);return sec;
  }

  function soonCard(p,i){
    var c=el('div','card card-row rv'+(i?' rv-d'+Math.min(i,3):''));c.id=p._id;
    var ic=el('div','cicon');ic.innerHTML=iconHTML(p);c.appendChild(ic);
    var tx=el('div'),h=el('h3');h.appendChild(document.createTextNode(p.name+' '));h.appendChild(el('span','soon','Tezliklə'));
    tx.appendChild(h);if(p.lead)tx.appendChild(el('p',null,p.lead));c.appendChild(tx);
    if(p.tags&&p.tags.length){var tg=el('div','tags');p.tags.forEach(function(t){tg.appendChild(el('span',null,t))});c.appendChild(tg)}
    return c;
  }

  (function renderProducts(){
    var box=document.getElementById('mehsullar');
    LIVE.forEach(function(p,i){box.appendChild(productPanel(p,i))});
    if(SOON.length){
      var sec=el('section','shell sec soon-sec'),list=el('div','soon-list');
      SOON.forEach(function(p,i){list.appendChild(soonCard(p,i))});
      sec.appendChild(list);document.getElementById('tezlikle').appendChild(sec);
    }
    /* nav: bir məhsul varsa onun adı, çoxdursa "Məhsullar" */
    var nl=document.getElementById('navProd');
    if(LIVE.length===1){nl.textContent=LIVE[0].name;nl.href='#'+LIVE[0]._id}
    else if(!LIVE.length&&SOON.length)nl.href='#tezlikle';
    else if(!PRODUCTS.length)nl.remove();
    /* hero düyməsi — seçilmiş məhsul, öz rəngində */
    var hb=document.getElementById('heroProd');
    if(FEAT){hb.hidden=false;hb.href='#'+FEAT._id;hb.querySelector('span').textContent=FEAT.name;
      hb.querySelector('i').innerHTML=iconHTML(FEAT);paint(hb,FEAT)}
  })();

  /* ====== scroll girişləri + saylar ====== */
  function countUp(el){
    var b=el.querySelector('[data-count]');if(!b||b.dataset.done)return;b.dataset.done='1';
    var target=+b.dataset.count,suf=b.dataset.suffix||'',t0=null,dur=1400;
    function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/dur,1);p=1-Math.pow(1-p,3);
      b.textContent=Math.round(target*p)+suf;if(p<1)requestAnimationFrame(step)}
    requestAnimationFrame(step);
  }
  var rvs=document.querySelectorAll('.rv,.sec-head');
  if('IntersectionObserver' in window&&!calm){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);countUp(en.target)}});
    },{threshold:.15});
    rvs.forEach(function(e){io.observe(e)});
  }else{
    rvs.forEach(function(e){e.classList.add('in')});
    document.querySelectorAll('[data-count]').forEach(function(b){b.textContent=b.dataset.count+(b.dataset.suffix||'')});
  }

  /* ====== nav gizlət/göstər ====== */
  var nav=document.getElementById('nav'),lastY=0;
  addEventListener('scroll',function(){
    var y=scrollY;
    if(y>160&&y>lastY)nav.classList.add('hide');else nav.classList.remove('hide');
    lastY=y;
  },{passive:true});

  /* ====== köməkçilər ====== */
  function clamp(v,a,b){return v<a?a:v>b?b:v}
  function sstep(a,b,v){if(b-a<1e-6)return v<a?0:1;v=clamp((v-a)/(b-a),0,1);return v*v*(3-2*v)}
  function lerp(a,b,t){return a+(b-a)*t}
  function eOut(t){return 1-Math.pow(1-t,3)}
  /* yapışqan bölmə daxilində irəliləyiş (girişdə mənfi, sonda 1-dən böyük ola bilər) */
  function rawProg(r){return -r.top/Math.max(1,r.height-innerHeight)}

  /* ============================================================
     UÇAN SÖZLƏR — scroll ilə sözlər dərinlikdən kameraya uçur
     ============================================================ */
  var fly=document.getElementById('fly'),fIntro=null,fFinal=null,fWords=[];
  var FW=FEAT&&FEAT.words&&FEAT.words.list&&FEAT.words.list.length?FEAT.words:null;
  var OFFS=[[-16,-15],[17,14],[-10,-12],[14,15],[-9,-14],[9,12],[-14,13],[12,-13]];
  if(FW){
    paint(fly,FEAT);fly.setAttribute('aria-label',FEAT.name);
    var stage=fly.querySelector('.fly-stage');
    fIntro=el('p','fly-intro',FW.intro||'');stage.appendChild(fIntro);
    FW.list.forEach(function(w,i){
      var sp=el('span','fw'+(i%2?' g':''),w),o=OFFS[i%OFFS.length];stage.appendChild(sp);
      fWords.push({el:sp,x:o[0],y:o[1],on:true});
    });
    fFinal=el('p','fly-final');
    var fin=String(FW.final||'{name}'),ki=fin.indexOf('{name}');
    if(ki<0)fFinal.textContent=fin;
    else{fFinal.appendChild(document.createTextNode(fin.slice(0,ki)));
      var nw=el('span','nw');nw.appendChild(el('b','sbm',FEAT.name));nw.appendChild(document.createTextNode(fin.slice(ki+6)));
      fFinal.appendChild(nw)}
    stage.appendChild(fFinal);
    fly.style.height=(160+fWords.length*40)+'vh';
  }else{fly.remove();fly=null}
  var asm=document.getElementById('asm'),asmBox=document.getElementById('asmBox');
  var asmP=calm?1:0,asmVis=0;
  if(calm){if(fly)fly.classList.add('calm');asm.classList.add('calm')}

  function place(el,x,y,z,o,b){
    el.style.transform='translate(-50%,-50%) translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,'+z.toFixed(1)+'px)';
    el.style.opacity=o.toFixed(3);
    el.style.filter=b>.1?'blur('+b.toFixed(1)+'px)':'none';
  }

  /* söz başlanğıcı, addım, uzunluq — söz sayına görə */
  var W0=.1,WL=.22,WS=fWords.length>1?Math.min(.118,(.7-WL)/(fWords.length-1)):.1;
  function domFx(){
    var vh=innerHeight;
    var r2=asm.getBoundingClientRect(),pr2=rawProg(r2);
    asmVis=clamp(1-Math.abs((r2.top+r2.height/2-vh/2)/(r2.height/2+vh*.3)),0,1);
    if(calm)return;
    var vw=innerWidth;
    var r=fly?fly.getBoundingClientRect():null;
    if(r&&r.bottom>-vh*.2&&r.top<vh*1.2){
      var p=clamp(rawProg(r),0,1);
      var ti=clamp(p/.13,0,1);
      place(fIntro,0,0,ti*ti*700,1-sstep(.2,.8,ti),ti*5);
      for(var i=0;i<fWords.length;i++){
        var w=fWords[i],t=(p-(W0+i*WS))/WL;
        if(t<=0||t>=1){if(w.on){w.el.style.opacity=0;w.on=false}continue}
        w.on=true;
        var z=lerp(-2600,650,t);
        var o=sstep(0,.2,t)*(1-sstep(.62,.84,t));
        var b=t<.28?(1-t/.28)*6:t>.75?(t-.75)/.25*5:0;
        place(w.el,w.x*vw/100,w.y*vh/100,z,o,b);
      }
      var tf=clamp((p-.82)/.15,0,1);
      place(fFinal,0,0,lerp(-1800,0,eOut(tf)),sstep(0,.55,tf),(1-tf)*6);
    }
    /* loqo: bölmə görünməyə başlayanda yığılmağa başlayır */
    asmP=sstep(-.5,.5,pr2);
    if(r2.bottom>-vh*.2&&r2.top<vh*1.2)asm.style.setProperty('--ap',sstep(.3,.6,pr2).toFixed(3));
  }

  /* ============================================================
     WEBGL — three.js gec yüklənir, səhifə onu gözləmir
     ============================================================ */
  var glFrame=null,glDead=false;
  function noGL(){
    if(glDead)return;glDead=true;
    document.documentElement.classList.add('no-gl');
    var c=document.getElementById('gl');if(c)c.remove();
  }
  window.__apexNoGL=noGL;
  window.__apexGL=function(){
    if(glDead||glFrame)return;
    try{glFrame=initGL()}catch(e){glFrame=null}
    if(!glFrame)noGL();
    else if(calm)redraw();
  };
  /* 12 san. ərzində yüklənməsə — statik fon qalır */
  setTimeout(function(){if(!glFrame)noGL()},12000);

  function tick(now){requestAnimationFrame(tick);domFx();if(glFrame)glFrame(now)}
  var queued=false;
  function redraw(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;domFx();if(glFrame)glFrame(performance.now())})}
  if(calm){addEventListener('scroll',redraw,{passive:true});addEventListener('resize',redraw);redraw()}
  else requestAnimationFrame(tick);

  function initGL(){
    var cv=document.getElementById('gl');
    if(!cv||typeof THREE==='undefined')return null;
    var R;
    try{R=new THREE.WebGLRenderer({canvas:cv,alpha:false,antialias:false,powerPreference:'high-performance'})}catch(e){return null}

    var PR=Math.min(devicePixelRatio||1,1.5),SMALL=innerWidth<760;
    R.setPixelRatio(PR);R.setClearColor(0x000000,0);R.autoClear=false;
    var FOV=38,CZ=10,TANF=Math.tan(FOV*Math.PI/360),VH=2*CZ*TANF;
    var cam=new THREE.PerspectiveCamera(FOV,1,.1,100);cam.position.set(0,0,CZ);
    var QUAD=new THREE.PlaneGeometry(2,2);
    var VS_QUAD='varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}';
    function quadScene(mat){var s=new THREE.Scene(),m=new THREE.Mesh(QUAD,mat);m.frustumCulled=false;s.add(m);return s}

    /* --- 1) göy mənzərə: səma, buludlar, dağlar, su, sahillər (yarım ölçüdə) --- */
    var bgRT=new THREE.WebGLRenderTarget(4,4,{depthBuffer:false});
    var DU={uRes:{value:new THREE.Vector2(1,1)},uAsp:{value:1},uTime:{value:0},uScroll:{value:0},uHor:{value:.26},
      uMouse:{value:new THREE.Vector2(0,0)}};
    var dreamMat=new THREE.ShaderMaterial({uniforms:DU,depthTest:false,depthWrite:false,blending:THREE.NoBlending,
      vertexShader:VS_QUAD,
      fragmentShader:[
        'uniform vec2 uRes;uniform float uAsp,uTime,uScroll,uHor;uniform vec2 uMouse;',
        'varying vec2 vUv;',
        'float h11(float n){return fract(sin(n*12.9898)*43758.5453);}',
        'float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
        'float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
        '  return mix(mix(h21(i),h21(i+vec2(1.,0.)),f.x),mix(h21(i+vec2(0.,1.)),h21(i+vec2(1.,1.)),f.x),f.y);}',
        'float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*vn(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return s;}',
        'float n1(float x){float i=floor(x),f=fract(x);f=f*f*(3.-2.*f);return mix(h11(i),h11(i+1.),f);}',
        'float ridge(float x){float s=0.,a=.6,fq=1.;',
        '  for(int i=0;i<5;i++){float n=1.-abs(n1(x*fq)*2.-1.);s+=a*n*n;fq*=2.13;a*=.45;}return s;}',
        'float ridgeLo(float x){float n=1.-abs(n1(x)*2.-1.),m=1.-abs(n1(x*2.13)*2.-1.);return .6*n*n+.27*m*m;}',
        /* səma: üfüqdə ağ, yuxarıda göy */
        'vec3 sky(vec2 p){',
        '  float t=clamp((p.y-uHor)/max(1.1-uHor,.35),0.,1.);',
        '  vec3 c=mix(vec3(.965,.982,1.),vec3(.80,.895,.995),smoothstep(0.,.3,t));',
        '  c=mix(c,vec3(.52,.72,.955),smoothstep(.28,1.,t));',
        '  vec2 d=(p-vec2(uAsp*.62,uHor+.1))*vec2(.7,1.5);',
        '  c=mix(c,vec3(1.,.99,.965),.62*exp(-dot(d,d)*4.5));',
        '  return c;}',
        /* buludlar: üfüq boyu zolaq + yuxarıda səpələnmiş (scroll ilə aşağı axır) */
        'float cloud(vec2 p){',
        '  vec2 q=vec2(p.x*.85+uTime*.006,(p.y+uScroll*.32)*2.1);',
        '  float n=fbm(q*1.7+vec2(fbm(q*.8+vec2(uTime*.004,3.1))*1.1,0.));',
        '  float rel=p.y-uHor;',
        '  float bank=smoothstep(-.01,.06,rel)*(1.-smoothstep(.16,.36,rel));',
        '  float hi=(.5+.5*sin((p.y+uScroll*.32)*4.3+1.3))*smoothstep(.12,.32,rel);',
        '  float w=max(bank,hi*.8);',
        '  return smoothstep(.48,.74,n*(.5+.62*w));}',
        'vec3 clouds(vec2 p,vec3 c){',
        '  float d=cloud(p);',
        '  if(d<.003)return c;',
        '  float d2=cloud(p+vec2(.016,.024));',
        '  float lit=clamp(.62+(d-d2)*2.6,0.,1.);',
        '  vec3 cc=mix(vec3(.76,.86,.97),vec3(1.,1.,1.),lit);',
        '  return mix(c,cc,d*.95);}',
        /* üfüqdən yuxarı: səma + uzaq dağ + bulud + orta dağ + yaxın təpələr (yumşaq kənarlar) */
        'vec3 above(vec2 p){',
        '  vec3 c=sky(p);',
        '  vec3 hz=sky(vec2(p.x,uHor+.015));',
        '  float x=p.x,mx=uMouse.x,e=1.5/uRes.y;',
        '  float xf=x*1.05+mx*.02+3.1,rf=ridge(xf),hf=uHor+.035+.15*rf;',
        '  float af=smoothstep(hf+e,hf-e,p.y);',
        '  if(af>0.){float sl=ridgeLo(xf+.04)-ridgeLo(xf-.04);',
        '    vec3 m=mix(vec3(.62,.75,.92),vec3(.86,.925,.995),clamp(.5-sl*2.6,0.,1.));',
        '    m=mix(m,vec3(.975,.99,1.),smoothstep(.014,0.,hf-p.y)*.55);',
        '    c=mix(c,mix(m,hz,smoothstep(0.,.1,hf-p.y)*.78),af);}',
        '  c=clouds(p,c);',
        '  float xm=x*1.75+mx*.045+7.7,rm=ridge(xm),hm=uHor+.012+.085*rm;',
        '  float am=smoothstep(hm+e,hm-e,p.y);',
        '  if(am>0.){float sl=ridgeLo(xm+.04)-ridgeLo(xm-.04);',
        '    vec3 m=mix(vec3(.45,.60,.84),vec3(.72,.83,.96),clamp(.5-sl*2.4,0.,1.));',
        '    c=mix(c,mix(m,hz,smoothstep(0.,.06,hm-p.y)*.72),am);}',
        '  float xn=x*3.+mx*.08+12.4,hn=uHor+.004+.032*ridgeLo(xn);',
        '  float an=smoothstep(hn+e,hn-e,p.y);',
        '  if(an>0.)c=mix(c,mix(vec3(.38,.53,.78),hz,.15+.55*smoothstep(0.,.025,hn-p.y)),an);',
        '  return c;}',
        /* su: dalğalı əks + günəş parıltısı */
        'vec3 water(vec2 p){',
        '  float d=uHor-p.y;',
        '  float w=fbm(vec2(p.x*7.,d*46.-uTime*.22));',
        '  vec2 rp=vec2(p.x+(w-.5)*.035*(.15+d*3.),uHor+d*.9+(w-.5)*.008);',
        '  vec3 c=above(rp);',
        '  c=mix(c,vec3(.36,.56,.84),.16+min(d*.9,.35));',
        '  float g=exp(-pow((p.x-uAsp*.62)/(.035+d*.55),2.));',
        '  float sp=smoothstep(.78,.97,vn(vec2(p.x*110.,d*700.-uTime*2.6)));',
        '  c+=g*sp*.3;',
        '  c=mix(c,sky(vec2(p.x,uHor+.01)),exp(-d*55.)*.55);',
        '  return c;}',
        'void main(){',
        '  vec2 p=vec2(vUv.x*uAsp,vUv.y);',
        '  vec3 c=p.y>=uHor?above(p):water(p);',
        '  vec3 hz=sky(vec2(p.x,uHor+.015));',
        /* sahillər: solda və sağda, ortada çay — yaşıl-mavi çəmən, ağ çiçəklər */
        '  float ax=uAsp,e=1.5/uRes.y,dy=max(uHor-p.y,0.);',
        '  float lx=ax*(.2+.34*dy)+.035*(fbm(vec2(p.y*3.5,2.))-.5);',
        '  float lt=uHor+.05*(1.-smoothstep(0.,.24*ax,p.x))+.012*(fbm(vec2(p.x*6.,1.3))-.5);',
        '  float rx=ax*(.81-.38*dy)+.035*(fbm(vec2(p.y*3.,5.))-.5);',
        '  float rt=uHor+.1*smoothstep(.76*ax,ax,p.x)+.014*(fbm(vec2(p.x*5.,7.7))-.5);',
        '  float aL=smoothstep(lx+e*ax,lx-e*ax,p.x)*smoothstep(lt+e,lt-e,p.y);',
        '  float aR=smoothstep(rx-e*ax,rx+e*ax,p.x)*smoothstep(rt+e,rt-e,p.y);',
        '  float ba=max(aL,aR);',
        '  if(ba>0.){',
        '    bool lf=p.x<.5*ax;',
        '    float edge=lf?lx-p.x:p.x-rx;',
        '    float dd=(lf?lt:rt)-p.y;',
        '    vec3 meadow=mix(vec3(.44,.64,.66),vec3(.66,.82,.80),fbm(p*vec2(15.,24.)));',
        '    vec3 rock=mix(vec3(.55,.62,.72),vec3(.70,.77,.86),fbm(p*vec2(11.,19.)+7.));',
        '    float rk=smoothstep(.06*ax,0.,edge)*.8;',
        '    vec3 bc=mix(meadow,rock,rk);',
        '    vec2 fg=p*46.,fi=floor(fg),ff=fract(fg)-.5;',
        '    vec2 fo=(vec2(h21(fi+3.7),h21(fi+9.1))-.5)*.5;',
        '    float fq=.09+.07*h21(fi+5.3);',
        '    float sp=step(.8,h21(fi))*smoothstep(fq+.06,fq-.05,length(ff-fo))*(.5+.4*h21(fi+1.9));',
        '    bc=mix(bc,vec3(.98,.99,1.),sp*(1.-rk)*.75);',
        '    bc=mix(bc,bc*1.08+.03,smoothstep(.015,0.,dd));',
        '    bc=mix(bc,hz,.1+.25*smoothstep(.06,0.,dd)*step(uHor,p.y));',
        '    c=mix(c,bc,ba);}',
        /* titrəmə (banding olmasın) */
        '  c+=(h21(gl_FragCoord.xy+fract(uTime))-.5)/255.;',
        '  gl_FragColor=vec4(c,1.);',
        '}'
      ].join('\n')
    });
    var dreamScene=quadScene(dreamMat);
    var blitMat=new THREE.ShaderMaterial({uniforms:{tBg:{value:bgRT.texture}},depthTest:false,depthWrite:false,
      blending:THREE.NoBlending,vertexShader:VS_QUAD,
      fragmentShader:'uniform sampler2D tBg;varying vec2 vUv;void main(){gl_FragColor=vec4(texture2D(tBg,vUv).rgb,1.);}'});
    var blitScene=quadScene(blitMat);

    /* --- 2) üzən şüşə kürələr və sikkələr --- */
    var orbScene=new THREE.Scene();
    var OU={uT:{value:0},uA:{value:1}};
    function orbMaterial(kind){
      return new THREE.ShaderMaterial({uniforms:{uK:{value:kind},uT:OU.uT,uA:OU.uA},transparent:true,depthTest:false,depthWrite:false,
        vertexShader:[
          'varying vec3 vN;varying vec3 vV;varying vec3 vP;',
          'void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);vP=position;',
          'gl_Position=projectionMatrix*mv;}'
        ].join('\n'),
        fragmentShader:[
          'uniform float uK,uT,uA;varying vec3 vN;varying vec3 vV;varying vec3 vP;',
          'float h3(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}',
          'float v3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
          '  return mix(mix(mix(h3(i),h3(i+vec3(1.,0.,0.)),f.x),mix(h3(i+vec3(0.,1.,0.)),h3(i+vec3(1.,1.,0.)),f.x),f.y),',
          '             mix(mix(h3(i+vec3(0.,0.,1.)),h3(i+vec3(1.,0.,1.)),f.x),mix(h3(i+vec3(0.,1.,1.)),h3(i+vec3(1.,1.,1.)),f.x),f.y),f.z);}',
          'void main(){',
          '  vec3 N=normalize(vN),V=normalize(vV);',
          '  float fr=pow(1.-max(dot(N,V),0.),2.);',
          '  float tx=v3(vP*3.2)*.6+v3(vP*7.)*.28+v3(vP*15.)*.12;',
          '  vec3 base=mix(vec3(.95,.98,1.),vec3(.66,.81,.98),smoothstep(.4,.76,tx)*.85);',
          '  vec3 L=normalize(vec3(.45,.6,.66));',
          '  vec3 col=base*(.66+.34*max(dot(N,L),0.));',
          '  col=mix(col,vec3(1.),fr*.7);',
          '  col+=.06*vec3(sin(fr*7.+1.),sin(fr*7.+2.6),sin(fr*7.+4.2));',
          '  float sp=pow(max(dot(N,normalize(L+V)),0.),70.);',
          '  col=min(col+sp*.55,vec3(1.));',
          '  float a=uK>.5?mix(.4,.88,fr):mix(.28,.9,fr);',
          '  gl_FragColor=vec4(col,clamp(a+sp*.3,0.,1.)*uA);',
          '}'
        ].join('\n')});
    }
    var sphereGeo=new THREE.SphereGeometry(1,48,32),coinGeo=new THREE.CylinderGeometry(1,1,.13,64,1);
    var sphereMat=orbMaterial(0),coinMat=orbMaterial(1);
    /* fx/fy — ekran payı, z — dərinlik, r — radius, par — scroll parallaksı */
    var ORBS=[
      {k:0,fx:.84,fy:.2,z:-4.5,r:1.25,par:.3},
      {k:1,fx:.56,fy:.12,z:-2.5,r:.5,par:.45},
      {k:1,fx:.95,fy:.5,z:-3,r:.42,par:.5},
      {k:0,fx:.47,fy:.29,z:-1.2,r:.15,par:.7},
      {k:0,fx:.67,fy:.08,z:-2,r:.13,par:.6},
      {k:1,fx:.04,fy:.14,z:-2,r:.3,par:.55},
      {k:0,fx:.14,fy:1.15,z:-3,r:.75,par:.4},
      {k:1,fx:.76,fy:1.35,z:-1.5,r:.45,par:.6},
      {k:0,fx:.45,fy:1.75,z:-5,r:1.,par:.35}
    ].filter(function(o,i){return !SMALL||[0,1,3,5,6,7].indexOf(i)>=0});
    ORBS.forEach(function(o,i){
      o.m=new THREE.Mesh(o.k?coinGeo:sphereGeo,o.k?coinMat:sphereMat);
      o.ph=i*1.7;o.rs=(i%2?1:-1)*(.12+i*.025);
      o.m.rotation.set(o.k?1.2+i*.3:0,i,o.k?.4:0);
      orbScene.add(o.m);
    });

    /* --- 3) noutbuk səhnəsi (render target-ə çəkilir) --- */
    var scene=new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xE8F0FF,0.95));
    var key=new THREE.DirectionalLight(0xffffff,1.05);key.position.set(4,7,5);scene.add(key);
    var fill=new THREE.PointLight(0xBFDBFE,0.7,30);fill.position.set(-5,2.4,5);scene.add(fill);
    var rim=new THREE.DirectionalLight(0x93C5FD,0.55);rim.position.set(-3,4,-6);scene.add(rim);

    /* roundRect fallback (köhnə brauzerlər) */
    if(!CanvasRenderingContext2D.prototype.roundRect){
      CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){
        r=typeof r==='number'?[r,r,r,r]:r;
        this.moveTo(x+r[0],y);this.lineTo(x+w-r[1],y);this.quadraticCurveTo(x+w,y,x+w,y+r[1]);
        this.lineTo(x+w,y+h-r[2]);this.quadraticCurveTo(x+w,y+h,x+w-r[2],y+h);
        this.lineTo(x+r[3],y+h);this.quadraticCurveTo(x,y+h,x,y+h-r[3]);
        this.lineTo(x,y+r[0]);this.quadraticCurveTo(x,y,x+r[0],y);return this};
    }

    /* ekran teksturası: seçilmiş məhsulun idarə paneli, öz brend rəngində */
    function screenTexture(){
      var P=FEAT||{name:'ApexSoft'},col=P.colors||{},SC=P.screen||{};
      var Y=rgb(col.primary)?col.primary:'#3B82F6',YK=rgb(col.dark)?col.dark:'#15161A',YO=rgb(col.onPrimary)?col.onPrimary:'#15161A';
      var menu=(SC.menu||(P.parts||[]).map(function(x){return x[0]}).concat(['Hesabatlar','Ayarlar'])).slice(0,6);
      var cards=(SC.cards||(P.stats||[]).map(function(x){return [String(x[1]).toUpperCase(),String(x[0])]})).slice(0,3);
      var rows=(SC.rows||[]).slice(0,3);
      var c=document.createElement('canvas');c.width=1024;c.height=640;
      var x=c.getContext('2d');
      var MUT='rgba(235,232,224,.6)',MUT2='rgba(235,232,224,.4)',TX='#F4F3EF';
      x.fillStyle='#0E0F12';x.fillRect(0,0,1024,640);
      x.fillStyle=YK;x.fillRect(0,0,1024,54);
      x.strokeStyle=rgba(Y,.2);x.beginPath();x.moveTo(0,54.5);x.lineTo(1024,54.5);x.stroke();
      ['#FF5F57','#FEBC2E','#28C840'].forEach(function(cc,i){
        x.fillStyle=cc;x.beginPath();x.arc(30+i*26,27,7,0,7);x.fill()});
      x.fillStyle=MUT;x.font='600 19px Inter,Arial';x.fillText(P.name+' — '+(SC.title||'İdarə Paneli'),120,34);
      x.fillStyle='#121317';x.fillRect(0,55,226,585);
      x.strokeStyle=rgba(Y,.12);x.beginPath();x.moveTo(226.5,55);x.lineTo(226.5,640);x.stroke();
      x.fillStyle=Y;x.beginPath();x.arc(40,98,16,0,7);x.fill();
      x.fillStyle=YO;x.font='900 18px Arial';x.textAlign='center';
      x.fillText(P.icon==='star'||!P.icon?'\u2605':String(P.name).charAt(0),40,104);x.textAlign='left';
      x.fillStyle=Y;x.font='800 21px Inter,Arial';x.fillText(P.name,66,95);
      x.fillStyle=MUT2;x.font='600 13px Inter,Arial';x.fillText('İdarə paneli',66,114);
      menu.forEach(function(it,i){
        var y=176+i*56;
        if(i===0){x.fillStyle=rgba(Y,.14);
          x.beginPath();x.roundRect(14,y-29,198,44,10);x.fill();
          x.fillStyle=Y;x.fillRect(14,y-29,3,44);
          x.fillStyle=Y;}
        else x.fillStyle=MUT;
        x.font='600 18px Inter,Arial';x.fillText(String(it),34,y);
      });
      cards.forEach(function(s,i){
        var sx=254+i*252;
        x.fillStyle='#17181D';x.beginPath();x.roundRect(sx,82,232,94,12);x.fill();
        x.strokeStyle=rgba(Y,.16);x.stroke();
        x.fillStyle=MUT2;x.font='700 14px Inter,Arial';x.fillText(String(s[0]),sx+20,116);
        x.fillStyle=i===1?Y:TX;x.font='800 30px Inter,Arial';x.fillText(String(s[1]),sx+20,158);
      });
      x.fillStyle=MUT2;x.font='700 13px Inter,Arial';x.fillText(SC.chart||'GÜNLÜK',258,214);
      [.42,.56,.38,.7,.52,.9,.64,.78].forEach(function(h,i){
        var bx=262+i*92,bh=178*h,by=420-bh;
        var gr=x.createLinearGradient(0,by,0,420);
        if(i===5){gr.addColorStop(0,Y);gr.addColorStop(1,rgba(Y,.25))}
        else{gr.addColorStop(0,rgba(Y,.72));gr.addColorStop(1,rgba(Y,.1))}
        x.fillStyle=gr;x.beginPath();x.roundRect(bx,by,64,bh,[6,6,0,0]);x.fill();
      });
      x.strokeStyle=rgba(Y,.2);x.beginPath();x.moveTo(254,420.5);x.lineTo(1000,420.5);x.stroke();
      rows.forEach(function(r,i){
        var ry=470+i*52,v=String(r[1]==null?'':r[1]);
        x.fillStyle=TX;x.font='600 19px Inter,Arial';x.fillText(String(r[0]),258,ry);
        x.fillStyle=Y;x.font='700 19px Inter,Arial';
        x.fillText(v,1000-x.measureText(v).width,ry);
        if(i<rows.length-1){x.strokeStyle='rgba(235,228,214,.08)';x.beginPath();x.moveTo(254,ry+18);x.lineTo(1000,ry+18);x.stroke()}
      });
      var t=new THREE.CanvasTexture(c);t.anisotropy=4;return t;
    }

    /* noutbuk modeli — gümüşü gövdə, rig mərkəzdə fırlanır */
    var rig=new THREE.Group();scene.add(rig);
    var laptop=new THREE.Group();laptop.position.set(0,-1.15,.25);rig.add(laptop);
    var metal=new THREE.MeshStandardMaterial({color:0xE3E9F2,metalness:0.45,roughness:0.32});
    var metal2=new THREE.MeshStandardMaterial({color:0xD5DEEB,metalness:0.5,roughness:0.3});
    var base=new THREE.Mesh(new THREE.BoxGeometry(3.5,0.13,2.35),metal);
    base.position.y=0.065;laptop.add(base);

    var kbC=document.createElement('canvas');kbC.width=512;kbC.height=340;
    var kx=kbC.getContext('2d');
    kx.fillStyle='#E8EEF6';kx.fillRect(0,0,512,340);
    kx.fillStyle='rgba(30,60,120,.13)';
    for(var r=0;r<5;r++)for(var col=0;col<13;col++){kx.beginPath();kx.roundRect(18+col*37,30+r*40,31,32,5);kx.fill()}
    kx.fillStyle='rgba(30,60,120,.09)';kx.beginPath();kx.roundRect(146,246,220,70,8);kx.fill();
    var kb=new THREE.Mesh(new THREE.PlaneGeometry(3.3,2.16),
      new THREE.MeshStandardMaterial({map:new THREE.CanvasTexture(kbC),metalness:.3,roughness:.55}));
    kb.rotation.x=-Math.PI/2;kb.position.y=0.132;laptop.add(kb);

    var lid=new THREE.Group();lid.position.set(0,0.13,-1.15);
    var lidBody=new THREE.Mesh(new THREE.BoxGeometry(3.5,2.24,0.09),metal2);
    lidBody.position.y=1.12;lid.add(lidBody);
    var screenMat=new THREE.MeshBasicMaterial({map:screenTexture()});
    var screen=new THREE.Mesh(new THREE.PlaneGeometry(3.26,2.04),screenMat);
    screen.position.set(0,1.12,0.05);lid.add(screen);
    laptop.add(lid);
    var edgeMat=new THREE.LineBasicMaterial({color:0x2563EB,transparent:true,opacity:.55});
    [base,lidBody].forEach(function(m){
      var e=new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),edgeMat);
      e.position.copy(m.position);m.parent.add(e);
    });

    var rt=(R.capabilities.isWebGL2&&THREE.WebGLMultisampleRenderTarget)
      ?new THREE.WebGLMultisampleRenderTarget(4,4):new THREE.WebGLRenderTarget(4,4);

    /* --- ASCII qlif atlası (boşdan → sıxa) --- */
    var GLY=' .:-=+*01#%@',NG=GLY.length,glyTex=null,cellPx=0;
    function makeGlyphs(cell){
      var c=document.createElement('canvas');c.width=cell*NG;c.height=cell;
      var x=c.getContext('2d');x.fillStyle='#000';x.fillRect(0,0,c.width,c.height);
      x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';
      x.font='700 '+Math.round(cell*.95)+'px ui-monospace,Menlo,Consolas,"Courier New",monospace';
      for(var i=0;i<NG;i++)x.fillText(GLY[i],i*cell+cell/2,cell*.55);
      var t=new THREE.CanvasTexture(c);
      t.minFilter=t.magFilter=THREE.NearestFilter;t.generateMipmaps=false;
      return t;
    }

    /* --- kompozit: rəngli ASCII/holoqrafik model (premultiplied, fonun üstünə) --- */
    var U={
      tScene:{value:rt.texture},tGlyph:{value:null},
      uRes:{value:new THREE.Vector2(1,1)},
      uCell:{value:12},uNG:{value:NG},
      uTime:{value:0},uReveal:{value:0},uSolid:{value:1},uAlpha:{value:1},
      uG1:{value:new THREE.Color(0x9CC3F7)},uG2:{value:new THREE.Color(0x0F2A6B)},uG3:{value:new THREE.Color(0x38BDF8)}
    };
    var post=new THREE.ShaderMaterial({
      uniforms:U,depthTest:false,depthWrite:false,transparent:true,
      blending:THREE.CustomBlending,blendSrc:THREE.OneFactor,blendDst:THREE.OneMinusSrcAlphaFactor,
      vertexShader:VS_QUAD,
      fragmentShader:[
        'uniform sampler2D tScene;uniform sampler2D tGlyph;',
        'uniform vec2 uRes;',
        'uniform float uCell,uNG,uTime,uReveal,uSolid,uAlpha;',
        'uniform vec3 uG1,uG2,uG3;',
        'varying vec2 vUv;',
        'float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
        'void main(){',
        '  vec2 px=vUv*uRes;',
        '  vec2 cid=floor(px/uCell);vec2 cuv=fract(px/uCell);',
        '  vec2 suv=(cid+.5)*uCell/uRes;',
        '  vec4 s=texture2D(tScene,suv);',
        '  vec3 sc=s.a>.001?s.rgb/s.a:vec3(0.);',
        '  float lum=dot(sc,vec3(.299,.587,.114));',
        '  float D=clamp(pow(1.-lum,1.1)*1.25+.06,0.,.92);',
        '  float n=h21(cid);',
        '  float th=n*.72+suv.y*.28;',
        '  float vis=smoothstep(th-.08,th+.08,uReveal*1.25-.1);',
        '  float band=clamp(vis*(1.-vis)*4.,0.,1.);',
        '  float fr=floor(uTime*16.);',
        '  float gi=floor(D*(uNG-1.)+.5);',
        '  if(band>.15||h21(cid+fr*.37)>.993)gi=1.+floor(h21(cid+fr*.13)*(uNG-1.));',
        '  float g=texture2D(tGlyph,vec2((gi+cuv.x)/uNG,cuv.y)).r;',
        /* rəngli yerlər (Şok sarısı) öz rəngində qalır */
        '  float sat=max(sc.r,max(sc.g,sc.b))-min(sc.r,min(sc.g,sc.b));',
        '  vec3 gc=mix(mix(uG1,uG2,D),sc*.95,clamp(sat*1.6,0.,1.));gc=mix(gc,uG3,band*.7);',
        '  float ga=g*s.a*vis*(1.-uSolid*.6)*.9;',
        '  vec4 fu=texture2D(tScene,vUv);',
        '  float k=uSolid*vis;',
        '  vec3 m=fu.rgb*k;float mA=fu.a*k;',
        '  m=gc*ga+m*(1.-ga);mA=ga+mA*(1.-ga);',
        '  gl_FragColor=vec4(m*uAlpha,mA*uAlpha);',
        '}'
      ].join('\n')
    });
    var postScene=quadScene(post);

    /* --- 4) loqo zərrəcikləri (açıq fonda göy) --- */
    var pScene=new THREE.Scene(),pGroup=new THREE.Group();pScene.add(pGroup);
    var pMat=new THREE.ShaderMaterial({
      uniforms:{uP:{value:0},uT:{value:0},uPx:{value:1},
        uC1:{value:new THREE.Color(0x1E40AF)},uC2:{value:new THREE.Color(0x172F7A)},uC3:{value:new THREE.Color(0x0B1A33)}},
      transparent:true,depthTest:false,depthWrite:false,blending:THREE.NormalBlending,
      vertexShader:[
        'attribute vec3 aStart;attribute float aD;attribute float aS;attribute float aM;',
        'uniform float uP,uT,uPx;',
        'varying float vA;varying float vM;varying float vSh;',
        'void main(){',
        '  float t=clamp(uP*1.7-aD*.7,0.,1.);t=1.-pow(1.-t,3.);',
        '  float sw=(1.-t)*(1.6+aD*2.2);float cs=cos(sw),sn=sin(sw);',
        '  vec3 s=vec3(aStart.x*cs-aStart.z*sn,aStart.y,aStart.x*sn+aStart.z*cs);',
        '  vec3 p=mix(s,position,t);',
        '  p+=vec3(sin(uT*1.3+aD*40.),cos(uT*1.1+aM*33.),sin(uT*.9+aD*21.))*(.0012+(1.-t)*.03);',
        '  vec4 mv=modelViewMatrix*vec4(p,1.);',
        '  gl_Position=projectionMatrix*mv;',
        '  gl_PointSize=aS*uPx*(1.+(1.-t)*.8)*(10./-mv.z);',
        '  vA=mix(.3,1.,t);vM=aM;',
        '  vSh=t*pow(.5+.5*sin(uT*1.8-position.x*7.),6.);',
        '}'
      ].join('\n'),
      fragmentShader:[
        'uniform vec3 uC1,uC2,uC3;',
        'varying float vA;varying float vM;varying float vSh;',
        'void main(){',
        '  float r=length(gl_PointCoord-.5);',
        '  float a=smoothstep(.5,.22,r)*.95;',
        '  vec3 c=vM<.5?mix(uC1,uC2,vM*2.):mix(uC2,uC3,vM*2.-1.);',
        '  c=mix(c,vec3(.15,.55,.98),vSh*.55);',
        '  gl_FragColor=vec4(c,clamp(a*vA,0.,1.));',
        '}'
      ].join('\n')
    });
    var pts=null;
    function buildLogo(){
      if(pts)return;
      var FS=215,FONT='800 '+FS+'px Montserrat, Inter, Arial, sans-serif',TX=300;
      var m=document.createElement('canvas').getContext('2d');m.font=FONT;
      var cw=Math.ceil(TX+m.measureText('ApexSoft').width+16),ch=360;
      var c=document.createElement('canvas');c.width=cw;c.height=ch;
      var x=c.getContext('2d');x.fillStyle='#fff';
      x.save();x.translate(-128,-22.4);x.scale(4.6,4.6);
      x.fill(new Path2D('M50 14 C58 22, 78 40, 80 62 C81 72, 72 72, 66 66 C60 60, 56 50, 50 44 C44 50, 40 56, 36 60 L30 54 C36 44, 44 30, 50 14 Z'));
      x.fill(new Path2D('M30 70 C40 64, 52 56, 60 60 C64 62, 62 68, 56 70 C48 73, 38 74, 30 70 Z'));
      x.restore();
      x.font=FONT;x.textBaseline='alphabetic';x.fillText('ApexSoft',TX,262);
      var d=x.getImageData(0,0,cw,ch).data,stp=SMALL?4:3,cand=[];
      for(var yy=0;yy<ch;yy+=stp)for(var xx=0;xx<cw;xx+=stp){
        if(d[(yy*cw+xx)*4+3]>128)cand.push(xx+(Math.random()-.5)*stp*.6,yy+(Math.random()-.5)*stp*.6);
      }
      var total=cand.length/2,max=SMALL?6500:15000,N=Math.min(total,max);
      for(var i=total-1;i>0;i--){var j=(Math.random()*(i+1))|0,
        ax=cand[i*2],ay=cand[i*2+1];cand[i*2]=cand[j*2];cand[i*2+1]=cand[j*2+1];cand[j*2]=ax;cand[j*2+1]=ay}
      var pos=new Float32Array(N*3),st=new Float32Array(N*3),aD=new Float32Array(N),aS=new Float32Array(N),aM=new Float32Array(N);
      for(i=0;i<N;i++){
        var nx=cand[i*2]/cw;
        pos[i*3]=nx-.5;pos[i*3+1]=-(cand[i*2+1]-ch/2)/cw;pos[i*3+2]=0;
        st[i*3]=(Math.random()-.5)*2.6;st[i*3+1]=(Math.random()-.5)*1.3;st[i*3+2]=.5-Math.random()*2.6;
        aD[i]=clamp(nx*.55+Math.random()*.45,0,1);
        aS[i]=3.3+Math.pow(Math.random(),4)*2.8;
        aM[i]=clamp(nx+(Math.random()-.5)*.12,0,1);
      }
      var g=new THREE.BufferGeometry();
      g.setAttribute('position',new THREE.BufferAttribute(pos,3));
      g.setAttribute('aStart',new THREE.BufferAttribute(st,3));
      g.setAttribute('aD',new THREE.BufferAttribute(aD,1));
      g.setAttribute('aS',new THREE.BufferAttribute(aS,1));
      g.setAttribute('aM',new THREE.BufferAttribute(aM,1));
      pts=new THREE.Points(g,pMat);pts.frustumCulled=false;pGroup.add(pts);
    }

    /* --- ölçü + scroll açar kadrları --- */
    var anchor=document.getElementById('scene3d');
    var W=0,H=0,buf=new THREE.Vector2(),KF=[];
    function docTop(el){return el.getBoundingClientRect().top+scrollY}
    function layout(){
      var w=cv.clientWidth||innerWidth,h=cv.clientHeight||innerHeight;
      if(w!==W||h!==H){
        W=w;H=h;R.setSize(W,H,false);
        cam.aspect=W/H;cam.updateProjectionMatrix();
        R.getDrawingBufferSize(buf);rt.setSize(buf.x,buf.y);
        var bs=SMALL?.42:.5;
        bgRT.setSize(Math.max(2,Math.round(buf.x*bs)),Math.max(2,Math.round(buf.y*bs)));
        DU.uRes.value.set(bgRT.width,bgRT.height);DU.uAsp.value=W/H;
        U.uRes.value.copy(buf);
        var cell=Math.max(8,Math.round(9*PR));
        if(cell!==cellPx){cellPx=cell;if(glyTex)glyTex.dispose();glyTex=makeGlyphs(cell);U.tGlyph.value=glyTex}
        U.uCell.value=cellPx;
      }
      var a=anchor.getBoundingClientRect(),sy=scrollY;
      var hero={fx:(a.left+a.width/2)/W,fy:(a.top+sy+a.height/2)/H,sz:Math.min(a.width,a.height)/H,so:.92,al:1,rv:1};
      if(calm){
        /* hərəkət azaldılıbsa: noutbuk yerində qalır, sonra sakitcə əriyir */
        var heroOut={fx:hero.fx,fy:hero.fy,sz:hero.sz,so:.92,al:1,rv:0};
        KF=[[0,hero],[H*.5,hero],[H*1.1,heroOut]];
        return;
      }
      if(!fly){
        /* uçan sözlər yoxdursa: noutbuk hero-dan sonra əriyir */
        KF=[[0,hero],[H*.35,hero],[H*.95,{fx:hero.fx,fy:hero.fy,sz:hero.sz,so:.92,al:1,rv:0}]];
        return;
      }
      var flyS={fx:.5,fy:.5,sz:Math.min(.6,W/H*.78),so:0,al:.42,rv:1};
      var gone={fx:.5,fy:.5,sz:flyS.sz*1.15,so:0,al:.42,rv:0};
      var ft=docTop(fly),fe=ft+fly.offsetHeight-innerHeight;
      KF=[[0,hero],[ft,flyS],[fe,flyS],[fe+H*.6,gone]];
    }
    var S={};
    function stateAt(s){
      if(s<=KF[0][0])return KF[0][1];
      for(var i=1;i<KF.length;i++){
        if(s<=KF[i][0]){
          var a=KF[i-1],b=KF[i],k=sstep(a[0],b[0],s);
          for(var key in a[1])S[key]=lerp(a[1][key],b[1][key],k);
          return S;
        }
      }
      return KF[KF.length-1][1];
    }
    layout();
    addEventListener('resize',layout);
    addEventListener('load',layout);
    var built=false;
    function fontsReady(){
      if(built)return;built=true;layout();buildLogo();
      /* şriftlər yükləndikdən sonra ekran yazılarını yenidən çək */
      var old=screenMat.map;screenMat.map=screenTexture();screenMat.needsUpdate=true;if(old)old.dispose();
    }
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fontsReady,fontsReady);
    setTimeout(fontsReady,2500);

    /* --- siçan --- */
    var mx=0,my=0,cmx=0,cmy=0;
    if(fine&&!calm){
      addEventListener('pointermove',function(e){
        mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2;
      },{passive:true});
    }

    /* --- kadr --- */
    var T0=performance.now();
    return function frame(now){
      var t=calm?0:(now-T0)/1000,sy=scrollY,sc=sy/H;
      cmx+=(mx-cmx)*.05;cmy+=(my-cmy)*.05;
      var pr=buf.x/W;

      /* 1) mənzərə — scroll ilə üfüq aşağı enir, "göyə qalxırıq" (calm: sabit) */
      DU.uTime.value=t;DU.uScroll.value=calm?0:sc;DU.uMouse.value.set(cmx,cmy);
      DU.uHor.value=calm?.26:.26-.62*sstep(0,3.4,sc);
      R.setRenderTarget(bgRT);R.render(dreamScene,cam);

      /* 2) noutbuk → render target */
      var st=stateAt(sy);
      var since=bootAt?now-bootAt:-1;
      var rev0=calm?1:(since<0?0:eOut(clamp((since-150)/2300,0,1)));
      var lidT=calm?1:(since<0?0:eOut(clamp((since-100)/1800,0,1)));
      lid.rotation.x=lerp(1.5,-.22,lidT);
      var vw=VH*cam.aspect,s=st.sz*VH/3.9;
      var fyNow=(calm||!fly)?st.fy-sc:st.fy;   /* calm və ya uçan söz yoxdursa: model səhifə ilə sürüşür */
      rig.scale.setScalar(s);
      rig.position.set((st.fx-.5)*vw,(.5-fyNow)*VH+(calm?0:Math.sin(t*.8)*.05*s),0);
      rig.rotation.y=(calm?0:Math.sin(t*.32)*.38+sc*.55)-.15+cmx*.3;
      rig.rotation.x=.24+(calm?0:Math.sin(t*.5)*.03)+cmy*.1;
      var mR=st.rv*rev0;
      U.uReveal.value=mR;U.uSolid.value=st.so;U.uAlpha.value=st.al;U.uTime.value=t;
      R.setRenderTarget(rt);R.clear();
      if(st.al*mR>.002)R.render(scene,cam);

      /* 3) ekrana: fon → kürələr → model → zərrəciklər */
      R.setRenderTarget(null);
      R.render(blitScene,cam);

      OU.uT.value=t;OU.uA.value=1-.7*asmVis;
      for(var i=0;i<ORBS.length;i++){
        var o=ORBS[i],dist=CZ-o.z,vhz=2*dist*TANF,vwz=vhz*cam.aspect;
        var fy=o.fy-(calm?0:sc*o.par);fy=((fy+.6)%2.4+2.4)%2.4-.6;
        var bob=calm?0:Math.sin(t*.5+o.ph)*.015;
        o.m.position.set((o.fx-.5)*vwz-cmx*(.15+o.z*-.04),(.5-fy+bob)*vhz+cmy*.1,o.z);
        o.m.scale.setScalar(o.r);
        if(!calm){o.m.rotation.y=o.ph+t*o.rs;if(o.k)o.m.rotation.z=.4+Math.sin(t*.3+o.ph)*.25}
      }
      R.render(orbScene,cam);

      R.render(postScene,cam);

      if(pts){
        var b=asmBox.getBoundingClientRect();
        if(b.bottom>-H*.6&&b.top<H*1.6){
          pGroup.position.set(((b.left+b.width/2)/W-.5)*vw,(.5-(b.top+b.height/2)/H)*VH,0);
          pGroup.scale.setScalar(b.width/W*vw);
          pGroup.rotation.y=cmx*.16;pGroup.rotation.x=cmy*.07;
          pMat.uniforms.uP.value=asmP;pMat.uniforms.uT.value=t;
          pMat.uniforms.uPx.value=pr*clamp(b.width/900,.55,1.2);
          R.render(pScene,cam);
        }
      }
    };
  }
})();

/* three.js — bütövlük yoxlaması (SRI) ilə yüklənir: CDN-dəki fayl dəyişdirilsə,
   brauzer onu işlətmir və səhifə 3D-siz (statik fonla) açılır */
(function(){
  var s=document.createElement('script');
  s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  s.integrity='sha512-dLxUelApnYxpLt6K2iomGngnHO83iUvZytA3YjDUCjT0HDOHKXnVYdf3hU4JjM8uEhxf9nD1/ey98U3t2vZ0qQ==';
  s.crossOrigin='anonymous';s.referrerPolicy='no-referrer';s.async=true;
  s.onload=function(){if(window.__apexGL)window.__apexGL()};
  s.onerror=function(){if(window.__apexNoGL)window.__apexNoGL()};
  document.head.appendChild(s);
})();
