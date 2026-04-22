/**
 * WebCraft Studio — Production JavaScript
 * Features: Loader, Cursor, Progress Bar, Navbar, Animations,
 *           Scroll Reveal, Counter, Form Validation, Back to Top,
 *           Mobile Nav, Active Links, Typed Effect
 */

/* ================================================================
   1. PAGE LOADER
   ================================================================ */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
    // Trigger hero animations after load
    document.querySelectorAll(".hero-content, .hero-inner").forEach((el) => {
      el.style.opacity = "1";
    });
  }, 1800);
});

/* ================================================================
   2. CUSTOM CURSOR
   ================================================================ */
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursor-ring");

if (cursor && cursorRing && window.innerWidth > 768) {
  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll(
    "a, button, input, textarea, select, .team-card, .service-row, .feature-card",
  );
  hoverEls.forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover"),
    );
  });
}

/* ================================================================
   3. SCROLL PROGRESS BAR
   ================================================================ */
const progressBar = document.getElementById("progress-bar");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
  });
}

/* ================================================================
   4. NAVBAR — scroll detection + active link
   ================================================================ */
const navbar = document.getElementById("navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Mark active nav link based on current page
(function setActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a, .mobile-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
})();

/* ================================================================
   5. HAMBURGER / MOBILE NAV
   ================================================================ */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });

  // Close on link click
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
    }
  });
}

/* ================================================================
   6. SCROLL REVEAL (IntersectionObserver)
   ================================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

// Auto-stagger children within parent containers
document
  .querySelectorAll(
    ".features-grid, .team-grid, .eval-cards, .mission-grid, .services-list, .highlights-grid",
  )
  .forEach((container) => {
    container.querySelectorAll(".reveal").forEach((el, i) => {
      el.dataset.delay = i * 100;
    });
  });

document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right")
  .forEach((el) => {
    revealObserver.observe(el);
  });

/* ================================================================
   7. ANIMATED COUNTER
   ================================================================ */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const isFloat = target % 1 !== 0;

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = isFloat ? start.toFixed(1) : Math.floor(start);
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        if (!isNaN(target)) {
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll("[data-count]")
  .forEach((el) => counterObserver.observe(el));

/* ================================================================
   8. TYPED TEXT EFFECT (for hero if present)
   ================================================================ */
const typedEl = document.getElementById("typed-text");
if (typedEl) {
  const words = typedEl.dataset.words
    ? typedEl.dataset.words.split(",")
    : ["Website", "E-Commerce", "Company Profile"];
  let wordIdx = 0,
    charIdx = 0,
    deleting = false;

  function typeLoop() {
    const current = words[wordIdx];
    if (deleting) {
      typedEl.textContent = current.slice(0, --charIdx);
    } else {
      typedEl.textContent = current.slice(0, ++charIdx);
    }

    let delay = deleting ? 60 : 110;

    if (!deleting && charIdx === current.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 300;
    }

    setTimeout(typeLoop, delay);
  }

  setTimeout(typeLoop, 800);
}

/* ================================================================
   9. CONTACT FORM VALIDATION
   ================================================================ */
window.submitForm = function () {
  let valid = true;

  const fields = [
    { id: "name", errId: "err-name", pattern: /.+/ },
    { id: "email", errId: "err-email", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    { id: "message", errId: "err-message", pattern: /.+/ },
  ];

  fields.forEach((f) => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (!el || !err) return;

    const ok = f.pattern.test(el.value.trim());
    err.classList.toggle("show", !ok);
    if (!ok) valid = false;
  });

  if (!valid) return;

  const btn = document.getElementById("submitBtn");
  if (btn) {
    btn.textContent = "Mengirim...";
    btn.disabled = true;
  }

  const form = document.getElementById("contactForm");

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        form.style.display = "none";
        document.getElementById("formSuccess").classList.add("show");
      } else {
        alert("Gagal mengirim. Coba lagi.");
        btn.disabled = false;
        btn.textContent = "Kirim Pesan →";
      }
    })
    .catch(() => {
      alert("Terjadi error koneksi.");
      btn.disabled = false;
      btn.textContent = "Kirim Pesan →";
    });
};

/* ================================================================
   10. BACK TO TOP
   ================================================================ */
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ================================================================
   11. SMOOTH HOVER ON SERVICE ROWS
   ================================================================ */
document.querySelectorAll(".service-row").forEach((row) => {
  row.addEventListener("mouseenter", () => {
    row.querySelector(".service-row-arrow") &&
      (row.querySelector(".service-row-arrow").textContent = "→");
  });
});

/* ================================================================
   12. TICKER — duplicate for seamless loop
   ================================================================ */
const ticker = document.querySelector(".ticker-inner");
if (ticker) {
  ticker.innerHTML += ticker.innerHTML; // Duplicate for infinite loop
}

/* ================================================================
   13. PROCESS STEP HIGHLIGHT on hover
   ================================================================ */
document.querySelectorAll(".proc-step").forEach((step) => {
  step.addEventListener("mouseenter", () => {
    step.querySelector(".proc-num") &&
      step.querySelector(".proc-num").classList.add("active");
  });
  step.addEventListener("mouseleave", () => {
    step.querySelector(".proc-num") &&
      step.querySelector(".proc-num").classList.remove("active");
  });
});

/* ================================================================
   14. KEYBOARD ACCESSIBILITY
   ================================================================ */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (hamburger) hamburger.classList.remove("open");
    if (mobileNav) mobileNav.classList.remove("open");
  }
});

/* ================================================================
   15. PARALLAX SUBTLE on hero BG
   ================================================================ */
const heroBg = document.querySelector(".hero-bg-grad");
if (heroBg && window.innerWidth > 768) {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.3}px)`;
    },
    { passive: true },
  );
}
