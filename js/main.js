/* ============================================================
   Stiya Theresa Justin — Creative Portfolio 2026
   Interactions: loader, cursor, tooltips, tilt, magnetic,
   scroll reveal, counters, active nav, copy-to-clipboard.
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Custom cursor ---------- */
  const cursor = $(".cursor");
  if (cursor && finePointer && !reduceMotion) {
    const dot = $(".cursor__dot", cursor);
    const ring = $(".cursor__ring", cursor);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

    window.addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    window.addEventListener("pointerdown", () => cursor.classList.add("is-down"));
    window.addEventListener("pointerup", () => cursor.classList.remove("is-down"));

    const hoverables = "a, button, [data-tip], [data-tilt], .chips li, .tile";
    document.addEventListener("pointerover", (e) => {
      if (e.target.closest(hoverables)) cursor.classList.add("is-hover");
    });
    document.addEventListener("pointerout", (e) => {
      if (e.target.closest(hoverables)) cursor.classList.remove("is-hover");
    });

    const tick = () => {
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(tick);
    };
    tick();
  }

  /* ---------- Tooltips (data-tip) ---------- */
  const tip = $(".tooltip");
  if (tip) {
    let current = null;

    const place = (el) => {
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const above = r.top > 70;
      tip.classList.toggle("is-below", !above);
      const y = above ? r.top : r.bottom;
      // keep inside viewport horizontally
      const half = tip.offsetWidth / 2 + 8;
      const cx = Math.min(Math.max(x, half), innerWidth - half);
      tip.style.left = cx + "px";
      tip.style.top = y + "px";
    };

    const show = (el) => {
      const text = el.getAttribute("data-tip");
      if (!text) return;
      current = el;
      tip.textContent = text;
      tip.setAttribute("aria-hidden", "false");
      place(el);
      tip.classList.add("is-on");
    };
    const hide = () => {
      current = null;
      tip.classList.remove("is-on");
      tip.setAttribute("aria-hidden", "true");
    };

    document.addEventListener("pointerover", (e) => {
      const el = e.target.closest("[data-tip]");
      if (el && el !== current) show(el);
    });
    document.addEventListener("pointerout", (e) => {
      const el = e.target.closest("[data-tip]");
      if (el && !el.contains(e.relatedTarget)) hide();
    });
    document.addEventListener("focusin", (e) => {
      const el = e.target.closest("[data-tip]");
      if (el) show(el);
    });
    document.addEventListener("focusout", hide);
    window.addEventListener("scroll", () => { if (current) place(current); }, { passive: true });

    // Touch: tap shows tooltip briefly
    document.addEventListener("touchstart", (e) => {
      const el = e.target.closest("[data-tip]");
      if (!el) return hide();
      show(el);
      setTimeout(hide, 1600);
    }, { passive: true });
  }

  /* ---------- 3D tilt (data-tilt) ---------- */
  if (finePointer && !reduceMotion) {
    $$("[data-tilt]").forEach((el) => {
      const max = 10;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--tx", `${px * max}deg`);
        el.style.setProperty("--ty", `${-py * max}deg`);
      });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--tx", "0deg");
        el.style.setProperty("--ty", "0deg");
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    $$(".magnetic").forEach((el) => {
      const strength = 0.35;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.translate = `${dx * strength}px ${dy * strength}px`;
      });
      el.addEventListener("pointerleave", () => { el.style.translate = "0px 0px"; });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Counters ---------- */
  const counters = $$("[data-count]");
  const runCounter = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduceMotion) { el.textContent = target; return; }
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Nav colour follows section theme ---------- */
  const themed = $$("[data-theme]");
  if ("IntersectionObserver" in window && themed.length) {
    const tio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) document.body.dataset.nav = en.target.dataset.theme;
      });
    }, { rootMargin: "-10% 0px -85% 0px" });
    themed.forEach((s) => tio.observe(s));
  }

  /* ---------- Active nav + hide on scroll down ---------- */
  const nav = $(".nav");
  const navLinks = $$(".nav__links a");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = "#" + en.target.id;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach((s) => sio.observe(s));
  }

  let lastY = scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = scrollY;
    if (nav) {
      const goingDown = y > lastY && y > 120;
      nav.classList.toggle("is-hidden", goingDown);
    }
    lastY = y;
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ---------- Copy to clipboard ---------- */
  const toast = $(".toast");
  let toastTimer;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-on"), 1800);
  };
  const fallbackCopy = (text) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
    ta.remove();
    return ok;
  };
  $$(".copy[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy");
      let ok = false;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try { await navigator.clipboard.writeText(text); ok = true; } catch (_) { ok = fallbackCopy(text); }
      } else {
        ok = fallbackCopy(text);
      }
      if (ok) {
        btn.classList.add("is-copied");
        btn.setAttribute("data-tip", "Copied!");
        showToast(`Copied ${text}`);
        setTimeout(() => {
          btn.classList.remove("is-copied");
          btn.setAttribute("data-tip", "Click to copy");
        }, 1600);
      } else {
        showToast("Copy failed. Select and copy manually.");
      }
    });
  });

  /* ---------- Reels: hover to play, global sound toggle (default on) ---------- */
  const reels = $$("[data-video]");
  const allVideos = reels.map((f) => $("video", f)).filter(Boolean);
  let soundOn = true;
  try { soundOn = localStorage.getItem("reelSound") !== "off"; } catch (_) {}
  let gestureSeen = false;

  const applySound = () => {
    allVideos.forEach((v) => {
      v.muted = !soundOn;
      v.closest("[data-video]").classList.toggle("is-sound", soundOn);
    });
    document.body.classList.toggle("reels-muted", !soundOn);
    try { localStorage.setItem("reelSound", soundOn ? "on" : "off"); } catch (_) {}
  };
  const stopReel = (v) => { v.pause(); try { v.currentTime = 0; } catch (_) {} };
  const playReel = async (v) => {
    const fig = v.closest("[data-video]");
    allVideos.forEach((o) => { if (o !== v && !o.paused) stopReel(o); });
    v.muted = !soundOn;
    try {
      await v.play();
      fig.classList.remove("is-blocked");
    } catch (_) {
      // Browser blocked audio before any user click: play muted, hint for sound.
      if (!soundOn) return;
      v.muted = true;
      fig.classList.add("is-blocked");
      try { await v.play(); } catch (__) {}
    }
  };
  const toggleSound = () => { soundOn = !soundOn; applySound(); };

  reels.forEach((fig) => {
    const v = $("video", fig);
    const btn = $(".reel__sound", fig);
    if (!v) return;
    v.addEventListener("play", () => fig.classList.add("is-playing"));
    v.addEventListener("pause", () => fig.classList.remove("is-playing"));
    v.addEventListener("ended", () => stopReel(v));
    v.addEventListener("error", () => fig.classList.add("is-missing"));
    if (finePointer) {
      fig.addEventListener("pointerenter", () => playReel(v));
      fig.addEventListener("pointerleave", () => stopReel(v));
    }
    if (btn) btn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); toggleSound(); });
    fig.addEventListener("click", (e) => {
      if (e.target === btn) return;
      if (v.paused) playReel(v); else toggleSound();
    });
  });
  applySound();

  // First real click anywhere unlocks audio: unmute whatever is playing.
  document.addEventListener("pointerdown", () => {
    if (gestureSeen) return;
    gestureSeen = true;
    if (!soundOn) return;
    allVideos.forEach((v) => {
      const fig = v.closest("[data-video]");
      if (fig.classList.contains("is-blocked")) { fig.classList.remove("is-blocked"); v.muted = false; }
    });
  }, { capture: true });

  if (!finePointer && "IntersectionObserver" in window && allVideos.length) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting && en.intersectionRatio >= 0.6) playReel(v);
        else if (!v.paused) stopReel(v);
      });
    }, { threshold: [0, 0.6] });
    allVideos.forEach((v) => vio.observe(v));
  }

  /* ---------- Smooth anchor scroll with nav offset ---------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#" || id === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        return;
      }
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + scrollY - 24;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });

  /* ---------- Sparkle trail on hero title ---------- */
  const heroTitle = $(".hero__title");
  if (heroTitle && finePointer && !reduceMotion) {
    let last = 0;
    heroTitle.addEventListener("pointermove", (e) => {
      const now = performance.now();
      if (now - last < 70) return;
      last = now;
      const s = document.createElement("span");
      s.className = "spark";
      s.style.cssText = `
        position:fixed; left:${e.clientX}px; top:${e.clientY}px; width:10px; height:10px;
        pointer-events:none; z-index:60; border-radius:50%;
        background:${Math.random() > 0.5 ? "#f5e84f" : "#99e203"};
        transform:translate(-50%,-50%) scale(1); opacity:1;
        transition: transform .7s cubic-bezier(.16,1,.3,1), opacity .7s ease;`;
      document.body.appendChild(s);
      requestAnimationFrame(() => {
        const dx = (Math.random() - 0.5) * 80;
        const dy = -30 - Math.random() * 60;
        s.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
        s.style.opacity = "0";
      });
      setTimeout(() => s.remove(), 750);
    });
  }
})();
