// AMK INDUSTRY — SHARED JS
(function () {
  // Navbar
  const nav = document.querySelector(".nav");
  const ham = document.querySelector(".ham");
  const mnav = document.querySelector(".mnav");
  window.addEventListener("scroll", () => {
    nav &&
      (window.scrollY > 50
        ? nav.classList.add("scrolled")
        : nav.classList.remove("scrolled"));
  });

  // Hamburger
  ham &&
    ham.addEventListener("click", () => {
      ham.classList.toggle("open");
      mnav && mnav.classList.toggle("open");
      document.body.style.overflow =
        mnav && mnav.classList.contains("open") ? "hidden" : "";
    });
  mnav &&
    mnav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        ham && ham.classList.remove("open");
        mnav.classList.remove("open");
        document.body.style.overflow = "";
      }),
    );

  // Active nav
  const pg = window.location.pathname.split("/").pop() || "index-dark.html";
  document.querySelectorAll(".nav-links a,.mnav a").forEach((a) => {
    const h = a.getAttribute("href") || "";
    if (
      h === pg ||
      (pg === "" && h === "index-dark.html") ||
      (pg === "index-dark.html" && h === "index-dark.html")
    )
      a.classList.add("active");
  });

  // Fade-up observer
  const fo = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("vis");
          fo.unobserve(e.target);
        }
      }),
    { threshold: 0.1 },
  );
  document.querySelectorAll(".fu").forEach((el) => fo.observe(el));

  // Counter animation
  function animCount(el) {
    const target = parseInt(el.dataset.t),
      suffix = el.dataset.s || "",
      dur = 1600,
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

  // Tabs
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

  // Contact form
  const cf = document.getElementById("cform");
  cf &&
    cf.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = cf.querySelector("button[type=submit]");
      const orig = btn.innerHTML;
      btn.innerHTML = "<span>✓ MESSAGE SENT!</span>";
      btn.style.background = "#16a34a";
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = "";
        btn.disabled = false;
        cf.reset();
      }, 3200);
    });

  // Hash scroll on page load (for anchor links from other pages)
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  }
})();
