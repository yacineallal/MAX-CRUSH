(() => {
'use strict';
const $ = id => document.getElementById(id);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const PHOTO = (id,title,file,caption,tag='A LITTLE PIECE OF US') => ({id,title,file,caption,tag,type:'photo'});
const cards = [
 PHOTO('wallpaper','A very invasive lock screen.','wallpaper','You somehow made it onto my lock screen. Very invasive. Please continue.'),
 PHOTO('photobooth','Eight frames. All my favorites.','photobooth','Eight photos. Several questionable faces. Unfortunately, I like you in every single one.'),
 PHOTO('coffin','Romance, with a lid.','coffin','Some guys buy a jewelry box. I apparently needed access to a 3D printer and a concerning level of commitment to the aesthetic. A little coffin, a ring, a necklace. Very normal behavior.','HANDMADE, WITH QUESTIONABLE RESTRAINT'),
 PHOTO('halloween','My favorite extraterrestrial.','halloween','CLASSIFIED: Evidence that my favorite alien is, in fact, you. This memory will not be erased.','CLASSIFIED MEMORY'),
 PHOTO('smudge','An inspection by Smudge.','smudge','Smudge has reviewed this relationship. Approval is pending. More treats may influence the decision.','OFFICIAL FELINE CORRESPONDENCE'),
 PHOTO('produce','Your boyfriend. Produce edition.','produce','You have unlocked: your boyfriend, produce edition. No refunds. Possibly organic.','RARE COLLECTIBLE • UNFORTUNATELY YOURS'),
 PHOTO('vr','Cute in every reality.','vr','You were exploring another reality. I was standing there thinking you looked cute in this one.'),
 PHOTO('note','A small note. A large admission.','note','Apparently one language wasn’t enough for me to embarrass myself romantically. So I left you written evidence.','FROM THE ORIGINAL PAPER ARCHIVE'),
 PHOTO('crush','You started this.','crush','You said “MAX CRUSH ACTIVATION” first. I simply made the situation significantly worse.','ORIGIN STORY'),
 PHOTO('voice','The evidence is permanent.','voice','Unfortunately, there is documentary evidence. I am exclusively your simp. My legal team has advised me to stop talking.','ARCHIVED VOICE-MESSAGE SCREENSHOT'),
 {id:'french-letter',title:'Une lettre, avec très peu de dignité.',tag:'UNE LETTRE POUR KAILEE',type:'letter'},
 {id:'smudge-report',title:'A message from management.',tag:'SMUDGE • DEPARTMENT OF JUDGMENT',type:'smudge',text:'My human appears happy. Your continued presence is provisionally tolerated. Please note: this does not entitle you to my favorite spot, my treats, or an opinion. — Smudge'},
 {id:'lesson',title:'Your French lesson has arrived.',tag:'LEÇON 01 • HIGHLY SUSPICIOUS EDUCATION',type:'note',text:'Tu me manques.',extra:'Translation: I miss you. There. An educational excuse to be annoying.'},
 {id:'complaint',title:'A formal complaint.',tag:'PLEASE FORWARD TO KAILEE',type:'note',text:'Je t’aime. C’est très gênant pour mon image.',extra:'Translation: I love you. This is very inconvenient for my image.'},
 {id:'sincere',title:'Just this, for a moment.',tag:'NO CLEVER FOOTNOTE TODAY',type:'note',text:'I really like the life happening in these pictures. Especially because you’re in it.',extra:'The silly faces. The ordinary days. The things that become memories before we realize it. I want more of those with you.'},
 {id:'activation',title:'Maximum capacity exceeded.',tag:'SYSTEM STATUS: EMBARRASSING',type:'meter',text:'MAX CRUSH ACTIVATION',extra:'The meter has reached its limit. My feelings have apparently ignored the technical specifications.'},
 {id:'bad-day',title:'For the days that feel heavy.',tag:'OPEN WHENEVER YOU NEED IT',type:'note',text:'You don’t have to be cheerful or funny or have everything figured out to matter to me.',extra:'We can take today in small pieces. A breath. A glass of water. A message. I’m on your side, Kailee. You can simply be you.'},
 {id:'coffin-secret',title:'Here lies my dignity.',tag:'SECRET DELIVERY • YOU FOUND IT',type:'note',text:'Cause of death: Kailee.',extra:'Survived by a website, a 3D printer, and a deeply unimpressed cat.',secret:true}
];
const french = [
'MADEMOISELLE,',
'Je voulais t’écrire une petite lettre discrète. Puis j’ai ajouté une enveloppe interactive, un arc, des cœurs et un chat. Comme tu peux le constater, je gère mes sentiments avec énormément de retenue.',
'Tout a commencé avec « MAX CRUSH ACTIVATION ». Je tiens à préciser que tu as lancé cette expression. Tu portes donc une certaine responsabilité dans ce qui a suivi. Moi, j’ai simplement pris le problème au sérieux et décidé de lui construire un site internet.',
'Depuis, les preuves s’accumulent.',
'Il y a nos photos de photomaton, dans lesquelles nous essayons parfois d’être adorables avant de retrouver immédiatement notre véritable vocation : faire des têtes ridicules. Je les aime toutes. Même celles qui pourraient compromettre nos futures carrières.',
'Il y a aussi ce petit cercueil que je t’ai imprimé pour y mettre tes bijoux. Certaines personnes offrent des fleurs. Moi, je fabrique du mobilier funéraire miniature. Chacun sa manière de séduire.',
'À Halloween, tu étais mon extraterrestre préféré. Et quand tu portais le casque de réalité virtuelle, tu explorais probablement un univers extraordinaire pendant que je pensais simplement : « Elle est vraiment trop mignonne. » Une activité intellectuelle très exigeante.',
'Quant à Smudge, je respecte son autorité. Je sais très bien que je ne suis pas le personnage principal ici. Je suis un candidat dont le dossier reste à examiner par un petit nuage de poils profondément sceptique.',
'Et oui, concernant ce fameux message vocal : je maintiens ma déclaration. Je suis ton simp exclusif. Une phrase terrible pour ma réputation, mais visiblement excellente pour mon bonheur.',
'Derrière toutes ces bêtises, il y a quelque chose de très simple : j’aime être avec toi. J’aime nos souvenirs, nos moments absurdes et toutes ces petites choses qui deviennent importantes parce qu’elles sont à nous.',
'Alors je continuerai à t’écrire des mots, à fabriquer des cadeaux et à trouver des excuses beaucoup trop compliquées pour te faire sourire.',
'Tu me plais énormément. C’est devenu assez embarrassant.',
'Ton Yacine,\nRomantique à ses heures. Ridicule à plein temps.',
'P.-S. : Si Smudge demande, c’est elle qui a programmé le site.'
];
const english = [
'MADEMOISELLE,',
'I wanted to write you a small, discreet letter. Then I added an interactive envelope, a bow, hearts, and a cat. As you can see, I handle my feelings with tremendous restraint.',
'It all began with “MAX CRUSH ACTIVATION.” You introduced that expression, so you bear some responsibility for what followed. I simply took the problem seriously and decided to build it a website.',
'The evidence has been piling up ever since.',
'There are our photo booth pictures, where we occasionally try to look adorable before immediately returning to our true calling: making ridiculous faces. I love them all. Even the ones that could compromise our future careers.',
'Then there is the little coffin I printed for your jewelry. Some people give flowers. I manufacture miniature funeral furniture. Everyone has their own way of flirting.',
'At Halloween, you were my favorite extraterrestrial. When you wore the VR headset, you were probably exploring an extraordinary universe while I was simply thinking, “She is so cute.” A very demanding intellectual activity.',
'As for Smudge, I respect her authority. I know I am not the main character here. I am an applicant whose file still needs to be reviewed by a deeply skeptical little cloud of fur.',
'And yes, about that famous voice message: I stand by my statement. I am your exclusive simp. A terrible sentence for my reputation, but apparently excellent for my happiness.',
'Underneath all this nonsense, there is something very simple: I love being with you. I love our memories, our absurd moments, and all the little things that become important because they are ours.',
'So I will keep writing notes, making gifts, and finding excessively complicated excuses to make you smile.',
'I love you enormously. It has become quite embarrassing.',
'Your Yacine,\nRomantic occasionally. Ridiculous full time.',
'P.S. If Smudge asks, she programmed the website.'
];
const key='kailee-post-office-v1';
let storageOK=true, saved={seen:[],deck:[],last:null};
try {const value=JSON.parse(localStorage.getItem(key)||'null');if(value&&Array.isArray(value.seen)&&Array.isArray(value.deck))saved=value;}catch{storageOK=false;}
const known=new Set(cards.map(c=>c.id));saved.seen=saved.seen.filter(id=>known.has(id));saved.deck=saved.deck.filter(id=>known.has(id)&&!cards.find(c=>c.id===id).secret);
function persist(){try{localStorage.setItem(key,JSON.stringify(saved));}catch{storageOK=false;}}
function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function drawCard(){if(!saved.deck.length){saved.deck=shuffle(cards.filter(c=>!c.secret).map(c=>c.id));if(saved.deck.at(-1)===saved.last){[saved.deck[0],saved.deck[saved.deck.length-1]]=[saved.deck.at(-1),saved.deck[0]];}}const id=saved.deck.pop();saved.last=id;persist();return id;}
let timers=[],shotAnimation=null,shot=false,pulling=false,pointer=null,startY=0,pull=0,currentId=null;
function later(fn,delay){timers.push(setTimeout(fn,delay));}
function clearPending(){timers.forEach(clearTimeout);timers=[];if(shotAnimation){shotAnimation.cancel();shotAnimation=null;}}
function navigate(id){clearPending();for(const e of document.querySelectorAll('.screen'))e.hidden=e.id!==id;window.scrollTo({top:0,behavior:'instant'});if(id==='home')resetBow();}
function counts(){ $('countTop').textContent=saved.seen.length;const unseen=cards.filter(c=>!c.secret&&!saved.seen.includes(c.id)).length;$('newNote').textContent=unseen?`${unseen} little surprises still waiting for you.`:'You’ve discovered every delivery. More memories can move in here.';}
function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
function showCard(id){const c=cards.find(c=>c.id===id);if(!c)return;currentId=id;navigate('surprise');if(!saved.seen.includes(id))saved.seen.push(id);persist();counts();$('cardType').textContent=c.tag;$('cardNumber').textContent=`DELIVERY ${String(cards.indexOf(c)+1).padStart(2,'0')}`;const body=$('cardBody');body.replaceChildren();const heading=el('h2',c.title);heading.id='cardTitle';body.append(heading);
 if(c.type==='photo'){const fig=el('figure'),img=el('img');img.src=`assets/${c.file}.webp`;img.alt=c.title;img.decoding='async';fig.append(img,el('figcaption',c.caption));body.append(fig);if(id==='voice')body.append(el('p','A keepsake of the original voice message.','fine'));if(id==='coffin'){const secret=el('button','⚰','text-button');secret.setAttribute('aria-label','Inspect the little coffin');let taps=0;secret.addEventListener('click',()=>{taps++;if(taps===3)showCard('coffin-secret');});body.append(secret,el('p','Some things have a little more inside.','fine'));}}
 else if(c.type==='letter'){const copy=el('div',undefined,'letter-copy');copy.lang='fr';french.forEach(t=>copy.append(el('p',t)));body.append(copy);const details=el('details',undefined,'translation');details.append(el('summary','Read the English translation'));english.forEach(t=>details.append(el('p',t)));body.append(details);}
 else {if(c.type==='smudge'){const canvas=el('canvas',undefined,'pixel-cat');canvas.width=16;canvas.height=16;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','A pixel portrait inspired by Smudge');body.append(canvas);drawCat(canvas,false);}if(c.type==='meter'){const meter=el('div',undefined,'meter');meter.append(el('span'));body.append(meter);}body.append(el('p',c.text,'big-quote'));if(c.extra)body.append(el('p',c.extra));}
 $('savedStatus').textContent=storageOK?'Kept in your archive. For whenever you want it again.':'Kept for this visit. This browser isn’t allowing saved discoveries.';
 heading.tabIndex=-1;heading.focus({preventScroll:true});}
function showArchive(){navigate('archive');counts();$('archiveProgress').textContent=`${saved.seen.length} discoveries, each a little piece of us.`;const grid=$('archiveGrid');grid.replaceChildren();if(!saved.seen.length)grid.append(el('p','Your archive is waiting. Open your first envelope.','empty'));for(const id of [...saved.seen].reverse()){const c=cards.find(c=>c.id===id),b=el('button',undefined,'archive-item');if(c.file){const img=el('img');img.src=`assets/${c.file}.webp`;img.alt='';img.loading='lazy';b.append(img);}else b.append(el('div',c.type==='letter'?'✉':c.type==='smudge'?'🐾':'♥','archive-symbol'));b.append(el('span',c.tag),el('strong',c.title));b.addEventListener('click',()=>showCard(id));grid.append(b);}}
$('archiveTop').onclick=showArchive;$('archiveFromCard').onclick=showArchive;$('homeLink').onclick=e=>{e.preventDefault();navigate('home');};$('another').onclick=()=>navigate('home');$('back').onclick=()=>navigate('home');$('badDay').onclick=()=>showCard('bad-day');$('letterLink').onclick=()=>showCard('french-letter');
// Hearts: separate background and burst particles, with frame-rate independent motion.
const fx=$('fx'),ctx=fx.getContext('2d');let W=innerWidth,H=innerHeight,ambient=[],sparks=[],lastFrame=0,rainUntil=0;
const heartMap=['01100110','11111111','11111111','01111110','00111100','00011000'];
const sprites=['#ac3652','#d48094','#bd8781','#ffffff'].map(color=>{const c=document.createElement('canvas');c.width=8;c.height=6;const x=c.getContext('2d');x.fillStyle=color;heartMap.forEach((r,y)=>[...r].forEach((p,i)=>{if(p==='1')x.fillRect(i,y,1,1);}));return c;});
function resize(){W=innerWidth;H=innerHeight;const d=Math.min(devicePixelRatio||1,2);fx.width=Math.round(W*d);fx.height=Math.round(H*d);ctx.setTransform(d,0,0,d,0,0);ctx.imageSmoothingEnabled=false;ambient=Array.from({length:reduce?10:26},()=>({x:Math.random()*W,y:Math.random()*H,s:1.4+Math.random()*1.3,v:9+Math.random()*13,p:Math.random()*6,a:.12+Math.random()*.22,sprite:sprites[Math.floor(Math.random()*3)]}));positionArrow();}
function burst(x,y,n=40){if(reduce)n=8;for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=50+Math.random()*160;sparks.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60,age:0,life:1.1+Math.random()*.9,s:1.3+Math.random()*1.4,sprite:sprites[Math.floor(Math.random()*sprites.length)]});}}
function heartRain(){if(!reduce)rainUntil=performance.now()+1700;}
function effects(t){const dt=Math.min((t-lastFrame)/1000||0,0.04);lastFrame=t;ctx.clearRect(0,0,W,H);for(const p of ambient){if(!reduce){p.y-=p.v*dt;p.x+=Math.sin(t/1500+p.p)*7*dt;if(p.y<-20){p.y=H+20;p.x=Math.random()*W;}}ctx.globalAlpha=p.a;ctx.drawImage(p.sprite,p.x,p.y,8*p.s,6*p.s);}if(t<rainUntil&&Math.random()<dt*25)sparks.push({x:Math.random()*W,y:-20,vx:Math.random()*20-10,vy:60,age:0,life:4,s:1.6,sprite:sprites[1]});for(let i=sparks.length-1;i>=0;i--){const p=sparks[i];p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=110*dt;if(p.age>p.life||p.y>H+30){sparks.splice(i,1);continue;}ctx.globalAlpha=Math.min(1,(p.life-p.age)*2);ctx.drawImage(p.sprite,p.x,p.y,8*p.s,6*p.s);}ctx.globalAlpha=1;for(const c of document.querySelectorAll('.pixel-cat'))drawCat(c,Math.floor(t/2800)%2===0&&t%2800<150);requestAnimationFrame(effects);}
// Smudge-inspired flat face, cream ruff, little pink nose.
const catMap=['..BB........BB..','..BTB......BTB..','..BTTBBBBBBTTB..','.BTTTTTTTTTTTTB.','.BTTDDDDDDTTTTB.','.BTDWBDDDDBWDTB.','.BTDDDDPPDDDDTB.','BBTDDDDDDDDDDTBB','.BTTDDBBBBDDTTB.','..BCTTTTTTTTCB..','..BCCCCCCCCCCB..','..BCCCCCCCCCCB..','...BCCCCCCCCB...','....BBBBBBBB....','....BB....BB....','................'];
function drawCat(canvas,blink){const x=canvas.getContext('2d'),pal={B:'#493630',T:'#947969',D:'#59433e',C:'#ead4b6',P:'#ce8a99',W:'#aecad4'};x.clearRect(0,0,16,16);catMap.forEach((r,y)=>[...r].forEach((p,i)=>{if(p!=='.'){x.fillStyle=blink&&p==='W'?pal.D:pal[p];x.fillRect(i,y,1,1);}}));}
// Keep all arrow coordinates in the shooting area's local coordinate system.
const stage=$('shooting'),arrow=$('arrow'),bow=$('bow'),seal=$('seal'),str=$('string');
function aim(){const s=stage.getBoundingClientRect(),b=bow.getBoundingClientRect(),r=seal.getBoundingClientRect();const bx=b.left+b.width/2-s.left,by=b.top+b.height/2-s.top,tx=r.left+r.width/2-s.left,ty=r.top+r.height/2-s.top;return{bx,by,tx,ty,angle:Math.atan2(tx-bx,by-ty)*180/Math.PI};}
function positionArrow(){if($('home').hidden||shot)return;const a=aim();arrow.style.left=a.bx+'px';arrow.style.top=a.by+'px';arrow.style.opacity='1';arrow.style.transform=`translate(-50%,-100%) rotate(${a.angle}deg) translateY(${pull}px)`;str.setAttribute('d',`M12 50Q70 ${50+pull*2} 128 50`);}
function resetBow(){shot=false;pulling=false;pointer=null;pull=0;stage.classList.remove('open');$('skip').disabled=false;$('hint').textContent='Pull the bow down. Release a little chaos.';str.setAttribute('d','M12 50Q70 50 128 50');requestAnimationFrame(positionArrow);counts();}
function openEnvelope(){const r=seal.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,48);stage.classList.add('open');heartRain();later(()=>{const r=$('paper').getBoundingClientRect();burst(r.left+r.width/2,r.top+15,28);},reduce?40:320);later(()=>{showCard(drawCard());burst(W/2,Math.min(H*.4,300),25);},reduce?160:1100);}
function shoot(){if(shot)return;const a=aim();shot=true;pulling=false;$('skip').disabled=true;$('hint').textContent='Special delivery. Brace yourself.';str.setAttribute('d','M12 50Q70 50 128 50');const rad=a.angle*Math.PI/180,dx=a.tx-a.bx-70*Math.sin(rad),dy=a.ty-a.by+70*Math.cos(rad);shotAnimation=arrow.animate([{transform:`translate(-50%,-100%) rotate(${a.angle}deg) translateY(${pull}px)`},{transform:`translate(-50%,-100%) translate(${dx}px,${dy}px) rotate(${a.angle}deg)`}],{duration:reduce?30:360,easing:'cubic-bezier(.55,0,1,.7)',fill:'forwards'});shotAnimation.onfinish=openEnvelope;}
stage.addEventListener('pointerdown',e=>{if(shot||!e.isPrimary||(e.pointerType==='mouse'&&e.button!==0))return;pulling=true;pointer=e.pointerId;startY=e.clientY;stage.setPointerCapture(pointer);$('hint').textContent='Pull down a little, then release.';});
stage.addEventListener('pointermove',e=>{if(!pulling||e.pointerId!==pointer)return;pull=Math.max(0,Math.min(48,(e.clientY-startY)*.65));positionArrow();});
stage.addEventListener('pointerup',e=>{if(!pulling||e.pointerId!==pointer)return;pulling=false;if(pull<12){pull=0;positionArrow();$('hint').textContent='A little farther down. You’ve got this.';}else shoot();});
stage.addEventListener('pointercancel',()=>{pulling=false;pull=0;positionArrow();});$('skip').onclick=shoot;
window.addEventListener('resize',resize);if(document.fonts)document.fonts.ready.then(positionArrow);new ResizeObserver(()=>{if(!shot)positionArrow();}).observe(stage);resize();counts();requestAnimationFrame(effects);
})();
// ─── Pixel cat café music ─────────────────────────────────────
(() => {
  "use strict";

  function setupCatMusic() {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "♫ Cat music: OFF";
    button.setAttribute("aria-label", "Turn on cat music");
    button.setAttribute("aria-pressed", "false");

    Object.assign(button.style, {
      position: "fixed",
      right: "12px",
      bottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
      zIndex: "100",
      border: "2px solid #d97b73",
      borderRadius: "20px",
      padding: "10px 14px",
      background: "#fff7f2",
      color: "#8f354b",
      fontFamily: '"Pixelify Sans", monospace',
      fontSize: "14px",
      cursor: "pointer",
      boxShadow: "0 3px 0 #b95a54",
      touchAction: "manipulation"
    });

    document.body.appendChild(button);

    let context;
    let master;
    let enabled = false;
    let busy = false;
    let timer;
    let nextBeat = 0;
    let step = 0;
    const voices = new Set();

    const beatLength = 0.23;

    // Two little musical phrases. Null means a short rest.
    const melody = [
      72, null, 76, 79, 81, 79, 76, null,
      74, 76, 79, null, 76, 74, 72, null,
      69, null, 72, 76, 79, 76, 72, null,
      71, 74, 77, null, 74, 71, 72, null
    ];

    const bass = [48, 53, 45, 55];

    function frequency(note) {
      return 440 * Math.pow(2, (note - 69) / 12);
    }

    function tone(note, time, duration, volume, type = "triangle") {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency(note), time);

      envelope.gain.setValueAtTime(0, time);
      envelope.gain.linearRampToValueAtTime(volume, time + 0.012);
      envelope.gain.exponentialRampToValueAtTime(
        0.0001,
        time + duration
      );

      oscillator.connect(envelope);
      envelope.connect(master);

      voices.add(oscillator);
      oscillator.onended = () => {
        voices.delete(oscillator);
        oscillator.disconnect();
        envelope.disconnect();
      };

      oscillator.start(time);
      oscillator.stop(time + duration + 0.02);
    }

    // A soft synthesized chirp shaped like a tiny meow.
    function meow(time) {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(740, time);
      oscillator.frequency.exponentialRampToValueAtTime(
        1040,
        time + 0.07
      );
      oscillator.frequency.exponentialRampToValueAtTime(
        520,
        time + 0.3
      );

      envelope.gain.setValueAtTime(0, time);
      envelope.gain.linearRampToValueAtTime(0.09, time + 0.035);
      envelope.gain.exponentialRampToValueAtTime(
        0.0001,
        time + 0.32
      );

      oscillator.connect(envelope);
      envelope.connect(master);

      voices.add(oscillator);
      oscillator.onended = () => {
        voices.delete(oscillator);
        oscillator.disconnect();
        envelope.disconnect();
      };

      oscillator.start(time);
      oscillator.stop(time + 0.35);
    }

    function scheduleMusic() {
      if (!enabled || document.hidden) return;

      // Avoid replaying missed notes after an interruption.
      if (nextBeat < context.currentTime) {
        nextBeat = context.currentTime + 0.04;
      }

      while (nextBeat < context.currentTime + 0.15) {
        const position = step % melody.length;
        const note = melody[position];
        const root = bass[Math.floor(position / 8)];

        if (note !== null) {
          tone(note, nextBeat, 0.19, 0.16, "square");
        }

        if (position % 4 === 0) {
          tone(root, nextBeat, 0.65, 0.24);
        }

        // Quiet high sparkle between phrases.
        if (position === 15) {
          tone(84, nextBeat, 0.4, 0.08);
        }

        // One meow every four phrases.
        if (step % 128 === 127) {
          meow(nextBeat);
        }

        nextBeat += beatLength;
        step++;
      }
    }

    function stopNotes() {
      for (const voice of voices) {
        try {
          voice.stop();
        } catch {
          // The voice may already have finished.
        }
      }
    }

    function updateButton() {
      button.textContent = enabled
        ? "♫ Cat music: ON"
        : "♫ Cat music: OFF";

      button.setAttribute("aria-pressed", String(enabled));
      button.setAttribute(
        "aria-label",
        enabled ? "Turn off cat music" : "Turn on cat music"
      );
    }

    button.addEventListener("click", async () => {
      if (busy) return;
      busy = true;

      try {
        if (enabled) {
          enabled = false;
          clearInterval(timer);
          stopNotes();
          await context.suspend();
        } else {
          const AudioContext =
            window.AudioContext || window.webkitAudioContext;

          if (!AudioContext) {
            button.textContent = "Music unavailable";
            button.disabled = true;
            return;
          }

          if (!context) {
            context = new AudioContext();
            master = context.createGain();

            // Overall volume: increase or decrease this value.
            master.gain.value = 0.12;
            master.connect(context.destination);
          }

          await context.resume();

          enabled = true;
          nextBeat = context.currentTime + 0.05;
          scheduleMusic();
          timer = setInterval(scheduleMusic, 50);
        }

        updateButton();
      } catch {
        enabled = false;
        clearInterval(timer);
        stopNotes();
        updateButton();
      } finally {
        busy = false;
      }
    });

    // Pause when she switches apps or locks her phone.
    document.addEventListener("visibilitychange", () => {
      if (!context || !enabled) return;

      if (document.hidden) {
        stopNotes();
        void context.suspend().catch(() => {});
      } else {
        void context.resume().then(() => {
          nextBeat = context.currentTime + 0.05;
        }).catch(() => {});
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupCatMusic, {
      once: true
    });
  } else {
    setupCatMusic();
  }
})();
