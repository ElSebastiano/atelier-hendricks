document.documentElement.classList.remove("no-js");

// Header scroll state
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

// Lightbox for work galleries
const lightbox = document.querySelector(".lightbox");
if (lightbox) {
  const lightboxImg = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("figcaption");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  let lastFocused = null;

  const openLightbox = (imgEl) => {
    lastFocused = document.activeElement;
    lightboxImg.src = imgEl.currentSrc || imgEl.src;
    lightboxImg.alt = imgEl.alt || "";
    lightboxCaption.textContent = imgEl.dataset.caption || imgEl.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    closeBtn.focus();
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll("[data-lightbox] img").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.addEventListener("click", () => openLightbox(img));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

// Contact form: client-side only demo handling (no backend wired up yet)
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = contactForm.querySelector(".form-status");
    if (status) {
      status.textContent = "Vielen Dank. Dies ist eine Entwurfsversion – die Anfrage wurde noch nicht an ein Postfach übermittelt.";
      status.focus();
    }
  });
}
