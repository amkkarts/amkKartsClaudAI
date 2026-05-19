/* ============================================================
   AMK INDUSTRY — SHARED SCRIPT
   ============================================================ */
(function () {
  /* ── Navbar scroll ── */
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* ── Hamburger menu ── */
  const ham = document.querySelector(".ham");
  const mnav = document.querySelector(".mnav");
  if (ham) {
    ham.addEventListener("click", () => {
      ham.classList.toggle("open");
      mnav && mnav.classList.toggle("open");
      document.body.style.overflow =
        mnav && mnav.classList.contains("open") ? "hidden" : "";
    });
  }
  mnav &&
    mnav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        ham && ham.classList.remove("open");
        mnav.classList.remove("open");
        document.body.style.overflow = "";
      }),
    );

  /* ── Active nav link ── */
  const pg = window.location.pathname.split("/").pop() || "index-dark.html";
  document.querySelectorAll(".nav-links a, .mnav a").forEach((a) => {
    const h = a.getAttribute("href") || "";
    if (
      h === pg ||
      h.split("#")[0] === pg ||
      (pg === "" && h === "index-dark.html")
    ) {
      a.classList.add("active");
    }
  });

  /* ── Fade-up observer ── */
  const fo = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("vis");
          fo.unobserve(e.target);
        }
      }),
    { threshold: 0.08 },
  );
  document.querySelectorAll(".fu").forEach((el) => fo.observe(el));

  /* ── Counter animation ── */
  function animCount(el) {
    const target = parseInt(el.dataset.t),
      suffix = el.dataset.s || "";
    const dur = 1800,
      start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1),
        ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString() + suffix;
    };
    requestAnimationFrame(tick);
  }
  const co = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animCount(e.target);
          co.unobserve(e.target);
        }
      }),
    { threshold: 0.4 },
  );
  document.querySelectorAll("[data-t]").forEach((el) => co.observe(el));

  /* ── Tab switching ── */
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tc = btn.closest(".tabs-wrap");
      if (!tc) return;
      tc.querySelectorAll(".tab-btn").forEach((b) =>
        b.classList.remove("active"),
      );
      tc.querySelectorAll(".tab-panel").forEach((p) =>
        p.classList.remove("active"),
      );
      btn.classList.add("active");
      const panel = tc.querySelector("#" + btn.dataset.tab);
      if (panel) panel.classList.add("active");
    });
  });

  /* ── FAQ accordion ── */
  // document.querySelectorAll(".faq-item").forEach((item) => {
  //   const q = item.querySelector(".faq-q");
  //   if (!q) return;
  //   q.addEventListener("click", () => {
  //     const isOpen = item.classList.contains("open");
  //     document.querySelectorAll(".faq-item").forEach((i) => {
  //       i.classList.remove("open");
  //       const a = i.querySelector(".faq-a");
  //       if (a) a.classList.remove("open");
  //     });
  //     if (!isOpen) {
  //       item.classList.add("open");
  //       const a = item.querySelector(".faq-a");
  //       if (a) a.classList.add("open");
  //     }
  //   });
  // });

  /* ── Product filter ── */
  window.filterProducts = function (cat, btn) {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".prod-detail").forEach((s) => {
      const cats = s.getAttribute("data-cat") || "";
      s.style.display = cat === "all" || cats.includes(cat) ? "" : "none";
    });
  };

  /* ── Colour swatch ── */
  document.querySelectorAll(".colors-row").forEach((row) => {
    row.querySelectorAll(".swatch").forEach((sw) => {
      sw.addEventListener("click", () => {
        row
          .querySelectorAll(".swatch")
          .forEach((s) => s.classList.remove("active"));
        sw.classList.add("active");
      });
    });
  });

  /* ── Contact form ── */
  const cf = document.getElementById("cform");
  if (cf) {
    cf.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = cf.querySelector("button[type=submit]");
      btn.textContent = "SENDING...";
      btn.disabled = true;
      setTimeout(() => {
        cf.style.display = "none";
        const succ = document.getElementById("form-success");
        if (succ) succ.style.display = "block";
      }, 1200);
    });
  }

  /* ── Pre-fill contact form from URL ── */
  const params = new URLSearchParams(window.location.search);
  const sel = document.getElementById("interest-select");
  if (sel) {
    const pmap = {
      "Electric+Kart+Single": "electric-single",
      "Electric Kart Single": "electric-single",
      "Petrol+Kart+Single": "petrol-single",
      "Petrol Kart Single": "petrol-single",
      "Electric+Kart+Double": "electric-double",
      "Electric Kart Double": "electric-double",
      "Golf+Cart+6S": "golf-cart-6s",
      "Vintage+Golf+Cart": "vintage-golf-cart",
      "Electric+Shuttle": "electric-shuttle",
      "Cyber+Quad": "cyber-quad",
    };
    const p = params.get("product"),
      s = params.get("service"),
      pk = params.get("package");
    if (p) {
      const v = pmap[p] || pmap[decodeURIComponent(p)];
      if (v) sel.value = v;
    }
    if (s) sel.value = s;
    if (pk) {
      if (pk === "business") sel.value = "fleet";
      else if (pk === "enterprise") sel.value = "full-package";
    }
  }

  /* ── Hash scroll ── */
  if (window.location.hash) {
    setTimeout(() => {
      const t = document.querySelector(window.location.hash);
      if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  }

  /* ── Hero Carousel ── */
  const slides = document.querySelectorAll(".hc-slide");
  const dots = document.querySelectorAll(".hc-dot");
  const progressBar = document.querySelector(".hc-progress-bar");
  const progressDuration = 15000; // 15 seconds per slide
  if (slides.length > 0) {
    let current = 0,
      timer = null,
      progressFrame = null,
      progressStart = null;

    // Smoothly animate the progress bar from 0% to 100% over the slide duration.
    function updateProgress(now) {
      if (!progressBar || progressStart === null) return;
      const elapsed = now - progressStart;
      const pct = Math.min((elapsed / progressDuration) * 100, 100);
      progressBar.style.width = `${pct}%`;
      if (elapsed < progressDuration) {
        progressFrame = requestAnimationFrame(updateProgress);
      }
    }

    // Reset visual progress whenever the carousel changes slides or user interacts.
    function resetProgress() {
      if (progressFrame) cancelAnimationFrame(progressFrame);
      if (progressBar) progressBar.style.width = "0%";
      progressStart = performance.now();
      progressFrame = requestAnimationFrame(updateProgress);
    }

    function goTo(idx) {
      slides[current].classList.remove("active");
      dots[current] && dots[current].classList.remove("active");
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current] && dots[current].classList.add("active");

      /* handle video slide */
      slides.forEach((s, i) => {
        const vid = s.querySelector("video");
        if (vid) {
          if (i === current) {
            vid.currentTime = 0;
            vid.play();
          } else vid.pause();
        }
      });

      resetProgress();
    }

    // Start or restart the auto-advance timer and keep progress bar in sync.
    function startAuto() {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), progressDuration);
      resetProgress();
    }

    const prevBtn = document.querySelector(".hc-prev");
    const nextBtn = document.querySelector(".hc-next");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goTo(current - 1);
        startAuto();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goTo(current + 1);
        startAuto();
      });
    }

    dots.forEach((d, i) =>
      d.addEventListener("click", () => {
        goTo(i);
        startAuto();
      }),
    );

    goTo(0);
    startAuto();
  }
})();
