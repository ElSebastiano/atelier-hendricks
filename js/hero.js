(function () {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const stage = hero.querySelector(".hero-stage");
  const imageLayer = hero.querySelector(".hero-layer-image");
  const lightLayer = hero.querySelector(".hero-layer-light");
  const entries = hero.querySelector(".hero-entries");

  // Reveal the "Malerei / Fotografie" entry points once the hero has been in view a moment,
  // and always show them for touch devices (no scroll-linked pinning there).
  if (entries) {
    if (isTouch || prefersReduced) {
      entries.classList.add("is-visible");
    } else if (window.IntersectionObserver) {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) entries.classList.add("is-visible");
        },
        { threshold: 0.6 }
      );
      io.observe(stage);
    } else {
      entries.classList.add("is-visible");
    }
  }

  if (prefersReduced || isTouch) return;

  const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
    })
      .fromTo(imageLayer, { scale: 1.08, yPercent: 0 }, { scale: 1.16, yPercent: -4, ease: "none" }, 0)
      .fromTo(lightLayer, { xPercent: -6, opacity: 0.5 }, { xPercent: 6, opacity: 0.95, ease: "none" }, 0);
  }

  // Subtle pointer parallax (desktop only), independent of scroll animation.
  let raf = null;
  const maxShift = 8; // px, per spec: 6–10px max
  stage.addEventListener("pointermove", (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const rect = stage.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      const tx = relX * maxShift;
      const ty = relY * maxShift * 0.6;
      imageLayer.style.setProperty("--pointer-x", tx.toFixed(2) + "px");
      imageLayer.style.setProperty("--pointer-y", ty.toFixed(2) + "px");
      imageLayer.style.translate = `${tx.toFixed(2)}px ${ty.toFixed(2)}px`;
      raf = null;
    });
  });
  stage.addEventListener("pointerleave", () => {
    imageLayer.style.translate = "0px 0px";
  });
})();
