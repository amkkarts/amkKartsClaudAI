/* ============================================================
   AMK INDUSTRY — SHARED JS (Light Theme)
   ============================================================ */
(function () {
  /* ── Navbar scroll ── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── Hamburger ── */
  const ham = document.querySelector('.ham');
  const mnav = document.querySelector('.mnav');
  ham && ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mnav && mnav.classList.toggle('open');
    document.body.style.overflow = (mnav && mnav.classList.contains('open')) ? 'hidden' : '';
  });
  mnav && mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham && ham.classList.remove('open');
    mnav.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* ── Active nav link ── */
  const pg = window.location.pathname.split('/').pop() || 'index-light.html';
  document.querySelectorAll('.nav-links a, .mnav a').forEach(a => {
    const h = a.getAttribute('href') || '';
    if (h === pg || (pg === '' && h === 'index-light.html') || (pg === 'index-light.html' && h === 'index-light.html'))
      a.classList.add('active');
  });

  /* ── Fade-up observer ── */
  const fo = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); fo.unobserve(e.target); }
  }), { threshold: 0.1 });
  document.querySelectorAll('.fu').forEach(el => fo.observe(el));

  /* ── Counter animation ── */
  function animCount(el) {
    const target = parseInt(el.dataset.t), suffix = el.dataset.s || '', dur = 1600, start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString() + suffix;
    };
    requestAnimationFrame(tick);
  }
  const co = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { animCount(e.target); co.unobserve(e.target); }
  }), { threshold: 0.4 });
  document.querySelectorAll('[data-t]').forEach(el => co.observe(el));

  /* ── Tab switching ── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tc = btn.closest('.tabs-wrap');
      if (!tc) return;
      tc.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tc.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = tc.querySelector('#' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q') && item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-a'); if (a) a.classList.remove('open');
      });
      if (!isOpen) {
        item.classList.add('open');
        const a = item.querySelector('.faq-a'); if (a) a.classList.add('open');
      }
    });
  });

  /* ── Hash scroll on load ── */
  if (window.location.hash) {
    setTimeout(() => {
      const t = document.querySelector(window.location.hash);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  }
})();
