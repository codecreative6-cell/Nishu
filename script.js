/* ══════════════ DATA ══════════════ */
    const imgs = [1, 2, 3, 5, 6, 12, 16, 17, 18, 20, 22, 23, 25, 27, 32, 33, 34, 40, 43, 44, 45, 46, 47, 49, 50, 51, 52, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
    function src(n) { return `img/IMG%20(${n}).jpg` }

    const captions = [
      "Forever smiling 😊", "Pure joy ✨", "Golden moments 🌟", "Lit up the room 💫", "Sunshine vibes ☀️",
      "Simply beautiful 🌸", "Glowing bright ✨", "Unforgettable 💕", "That smile 🥰", "Queen energy 👑",
      "Full of grace 🌺", "Sparkling soul 💖", "Best memories 🎀", "She shines 🌙", "So lovely 💛",
      "Heart of gold 💛", "Magical 🦋", "Always stunning 🌹", "Bright days 🌈", "Sweet moments 🍬",
      "Pure happiness 😄", "Wonderful you 🌷", "Graceful always 🕊️", "Radiant 💎", "Precious 💎",
      "Beautiful story 📖", "Star of the day ⭐", "So so lovely 💗", "Timeless beauty ⏳", "Cherished 💞",
      "Joyful spirit 🎉", "Blooming 🌻", "Extra special ✨", "Dreamy 🌙", "Wonderful soul 🌊",
      "Light of life 💡", "Sweet & fierce 🌶️", "One of a kind 🦄"
    ];

    /* ══════════════ SPLASH ══════════════ */
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('splash').classList.add('hide');
        launchFireworks();
      }, 2800);
    });

    /* ══════════════ HERO SPARKLES ══════════════ */
    (function () {
      const field = document.getElementById('heroSparkles');
      if (!field) return;
      for (let i = 0; i < 40; i++) {
        const s = document.createElement('span');
        s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--d:${2 + Math.random() * 4}s;--del:${Math.random() * 4}s;width:${2 + Math.random() * 3}px;height:${2 + Math.random() * 3}px`;
        field.appendChild(s);
      }
    })();

    /* ══════════════ CUSTOM CURSOR ══════════════ */
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
      setTimeout(() => { trail.style.left = mx + 'px'; trail.style.top = my + 'px'; }, 80);
      spawnGlitter(mx, my);
    });

    /* ══════════════ GLITTER ══════════════ */
    let glitterTimer = 0;
    function spawnGlitter(x, y) {
      const now = Date.now();
      if (now - glitterTimer < 60) return;
      glitterTimer = now;
      const g = document.createElement('div');
      g.className = 'glitter';
      const colors = ['#f5c518', '#ff6b9d', '#a855f7', '#3b82f6', '#fb7185', '#fff'];
      g.style.cssText = `left:${x + Math.random() * 20 - 10}px;top:${y + Math.random() * 20 - 10}px;background:${colors[Math.random() * colors.length | 0]};--dur:${.8 + Math.random() * .6}s`;
      document.body.appendChild(g);
      setTimeout(() => g.remove(), 1400);
    }

    /* ══════════════ STARS ══════════════ */
    const starsC = document.getElementById('stars-canvas');
    const starsCtx = starsC.getContext('2d');
    let stars = [];
    function resizeStars() { starsC.width = window.innerWidth; starsC.height = window.innerHeight }
    resizeStars();
    window.addEventListener('resize', resizeStars);
    for (let i = 0; i < 200; i++) {
      stars.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: Math.random() * 1.5 + .3, a: Math.random(), da: .005 + Math.random() * .015, s: Math.random() * 2 + .5 });
    }
    function drawStars() {
      starsCtx.clearRect(0, 0, starsC.width, starsC.height);
      stars.forEach(s => {
        s.a += s.da;
        if (s.a > 1 || s.a < 0) s.da *= -1;
        starsCtx.beginPath();
        starsCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        starsCtx.fillStyle = `rgba(255,255,255,${s.a})`;
        starsCtx.fill();
      });
      requestAnimationFrame(drawStars);
    }
    drawStars();

    /* ══════════════ CONFETTI ══════════════ */
    const confC = document.getElementById('confetti-canvas');
    const confCtx = confC.getContext('2d');
    function resizeConf() { confC.width = window.innerWidth; confC.height = window.innerHeight }
    resizeConf();
    window.addEventListener('resize', resizeConf);
    let pieces = [];
    const confColors = ['#f5c518', '#ff6b9d', '#a855f7', '#3b82f6', '#fb7185', '#34d399', '#fbbf24', '#ec4899'];
    for (let i = 0; i < 80; i++) {
      pieces.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight - window.innerHeight,
        w: Math.random() * 10 + 5, h: Math.random() * 5 + 3,
        color: confColors[Math.random() * confColors.length | 0],
        vx: (Math.random() - .5) * 2, vy: Math.random() * 2 + 1,
        rot: Math.random() * 360, vr: (Math.random() - .5) * 6,
        shape: Math.random() < .5 ? 'rect' : 'circle'
      });
    }
    function drawConf() {
      confCtx.clearRect(0, 0, confC.width, confC.height);
      pieces.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        if (p.y > confC.height) { p.y = -20; p.x = Math.random() * confC.width }
        confCtx.save();
        confCtx.translate(p.x, p.y); confCtx.rotate(p.rot * Math.PI / 180);
        confCtx.fillStyle = p.color; confCtx.globalAlpha = .8;
        if (p.shape === 'rect') { confCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h) }
        else { confCtx.beginPath(); confCtx.arc(0, 0, p.w / 2, 0, Math.PI * 2); confCtx.fill() }
        confCtx.restore();
      });
      requestAnimationFrame(drawConf);
    }
    drawConf();

    /* ══════════════ FIREWORKS ══════════════ */
    const fwC = document.getElementById('fireworks-canvas');
    const fwCtx = fwC.getContext('2d');
    function resizeFw() { fwC.width = window.innerWidth; fwC.height = window.innerHeight }
    resizeFw();
    window.addEventListener('resize', resizeFw);
    let fireworks = [];
    let fwActive = false;

    class Particle {
      constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.vx = Math.cos(angle) * speed; this.vy = Math.sin(angle) * speed;
        this.alpha = 1; this.decay = Math.random() * .02 + .01; this.size = Math.random() * 3 + 1;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.vy += .08; this.alpha -= this.decay;
      }
      draw() {
        fwCtx.save(); fwCtx.globalAlpha = this.alpha;
        fwCtx.fillStyle = this.color; fwCtx.beginPath();
        fwCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2); fwCtx.fill();
        fwCtx.restore();
      }
    }
    let particles = [];
    const fwColors = ['#f5c518', '#ff6b9d', '#a855f7', '#3b82f6', '#fb7185', '#34d399', '#fff', '#fbbf24'];
    function burst(x, y) {
      const color = fwColors[Math.random() * fwColors.length | 0];
      for (let i = 0; i < 80; i++)particles.push(new Particle(x, y, color));
    }
    function fwLoop() {
      if (!fwActive) return;
      fwCtx.fillStyle = 'rgba(0,0,0,.15)';
      fwCtx.fillRect(0, 0, fwC.width, fwC.height);
      particles = particles.filter(p => { p.update(); p.draw(); return p.alpha > 0 });
      requestAnimationFrame(fwLoop);
    }
    function launchFireworks() {
      fwActive = true;
      fwCtx.clearRect(0, 0, fwC.width, fwC.height);
      const launch = () => {
        const x = Math.random() * fwC.width * .8 + fwC.width * .1;
        const y = Math.random() * fwC.height * .5 + 50;
        burst(x, y);
      };
      for (let i = 0; i < 12; i++)setTimeout(launch, i * 250);
      fwLoop();
      setTimeout(() => {
        fwActive = false;
        fwCtx.clearRect(0, 0, fwC.width, fwC.height);
      }, 5000);
    }

    /* ══════════════ BALLOONS ══════════════ */
    const ballColors = ['#ff6b9d', '#a855f7', '#3b82f6', '#f5c518', '#fb7185', '#34d399', '#ec4899', '#8b5cf6'];
    function makeBalloon() {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.cssText = `left:${Math.random() * 100}%;background:${ballColors[Math.random() * ballColors.length | 0]};animation-duration:${8 + Math.random() * 8}s;animation-delay:${-Math.random() * 8}s;width:${40 + Math.random() * 20}px;height:${55 + Math.random() * 20}px`;
      document.getElementById('balloons').appendChild(b);
    }
    for (let i = 0; i < 15; i++)makeBalloon();

    /* ══════════════ POLAROID GRID ══════════════ */
    const pg = document.getElementById('polaroid-grid');
    const galleryImgs = imgs.slice(0, 24);
    galleryImgs.forEach((n, i) => {
      const rots = [-6, -4, -2, 0, 2, 4, 6];
      const rot = rots[i % rots.length];
      const div = document.createElement('div');
      div.className = 'polaroid';
      div.style.cssText = `--rot:${rot}deg;--delay:${i * .06}s`;
      div.innerHTML = `<div class="shine"></div><img src="${src(n)}" alt="Photo ${n}" loading="lazy"/><div class="caption">${captions[i] || '✨'}</div>`;
      div.addEventListener('click', () => openLightbox(n, galleryImgs));
      pg.appendChild(div);
    });

    /* ══════════════ TIMELINE ══════════════ */
    const tl = document.getElementById('timeline');
    const tlData = [
      { img: imgs[0], title: "Every day is a gift", text: "And you make it even more special with your presence, your laugh, and your beautiful heart." },
      { img: imgs[5], title: "Moments to treasure", text: "Life's most precious memories are the ones spent with someone as wonderful as you." },
      { img: imgs[10], title: "Shining as always", text: "You have this incredible light inside you that brightens up every room you walk into." },
      { img: imgs[15], title: "Joy in every frame", text: "Looking back at these moments fills us with nothing but pure, overflowing happiness." },
      { img: imgs[20], title: "Growing more beautiful", text: "Every year you grow more graceful, more confident, and more absolutely magnificent." },
      { img: imgs[25], title: "Here's to another year", text: "May this birthday be the start of your best chapter — bold, beautiful, and brilliantly yours." },
    ];
    tlData.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'tl-item';
      div.innerHTML = `
    <div class="tl-img-wrap"><img class="tl-img" src="${src(item.img)}" alt="" loading="lazy"/></div>
    <div class="tl-dot"></div>
    <div class="tl-text"><div class="tl-card"><h3>${item.title}</h3><p>${item.text}</p></div></div>`;
      tl.appendChild(div);
    });

    /* (gift box removed — cake JS is below) */

    /* ══════════════ LIGHTBOX ══════════════ */
    let lbList = [], lbIdx = 0;
    function openLightbox(n, list) {
      lbList = list; lbIdx = list.indexOf(n);
      document.getElementById('lb-img').src = src(n);
      document.getElementById('lightbox').classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      document.getElementById('lightbox').classList.remove('active');
      document.body.style.overflow = '';
    }
    function lbNav(dir) {
      lbIdx = (lbIdx + dir + lbList.length) % lbList.length;
      document.getElementById('lb-img').src = src(lbList[lbIdx]);
    }
    document.getElementById('lightbox').addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbNav(-1);
      if (e.key === 'ArrowRight') lbNav(1);
    });

    /* ══════════════ CAKE / CANDLES ══════════════ */
    let blown = false;
    function blowCandles() {
      if (blown) return; blown = true;
      const flames = document.querySelectorAll('.flame-tip');
      flames.forEach((f, i) => setTimeout(() => {
        f.classList.add('out');
      }, i * 200));
      setTimeout(() => {
        document.getElementById('blow-hint').textContent = '🌟 Wish made! Happy Birthday Nishu! 🌟';
        triggerCelebration();
      }, 1200);
    }
    function triggerCelebration() {
      launchFireworks();
      spawnMusicNotes();
      /* extra confetti burst */
      for (let i = 0; i < 40; i++) {
        pieces.push({
          x: Math.random() * window.innerWidth, y: -20,
          w: Math.random() * 12 + 5, h: Math.random() * 6 + 3,
          color: confColors[Math.random() * confColors.length | 0],
          vx: (Math.random() - .5) * 4, vy: Math.random() * 4 + 2,
          rot: Math.random() * 360, vr: (Math.random() - .5) * 8,
          shape: Math.random() < .5 ? 'rect' : 'circle'
        });
      }
    }
    function spawnMusicNotes() {
      const noteChars = ['🎵', '🎶', '🎸', '🎹', '🎺', '🎻', '🎷'];
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const n = document.createElement('div');
          n.className = 'note';
          n.textContent = noteChars[Math.random() * noteChars.length | 0];
          n.style.cssText = `left:${10 + Math.random() * 80}%;bottom:${20 + Math.random() * 30}%;--dur:${2 + Math.random() * 2}s`;
          document.body.appendChild(n);
          setTimeout(() => n.remove(), 4000);
        }, i * 150);
      }
    }

    /* ══════════════ INTERSECTION OBSERVER ══════════════ */
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: .15 });
    document.querySelectorAll('.tl-item').forEach(el => io.observe(el));

    /* ══════════════ CLICK FIREWORKS ══════════════ */
    document.addEventListener('click', e => {
      if (e.target.closest('#lightbox') || e.target.closest('#cakeWrap') || e.target.closest('button')) return;
      fwActive = true;
      burst(e.clientX, e.clientY);
      fwLoop();
      setTimeout(() => fwActive = false, 1000);
    });