/* =========================================================
   THE MANOMANTRA
   PROGRAMMES PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  /* =======================================================
     MOBILE NAV
  ======================================================= */

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));

      mainNav.classList.toggle("nav-open", !isOpen);

      document.body.classList.toggle("menu-open", !isOpen);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");

        mainNav.classList.remove("nav-open");

        document.body.classList.remove("menu-open");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menuToggle.setAttribute("aria-expanded", "false");

        mainNav.classList.remove("nav-open");

        document.body.classList.remove("menu-open");
      }
    });
  }

  /* =======================================================
     HEADER SCROLL
  ======================================================= */

  if (siteHeader) {
    const updateHeader = () => {
      if (window.scrollY > 30) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  /* =======================================================
     PROGRAMME REVEAL
  ======================================================= */

  const revealItems = document.querySelectorAll(
    ".programme-category, .premium-program-card",
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("programme-visible");

          observerInstance.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealItems.forEach((item) => {
      item.classList.add("programme-reveal");

      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("programme-visible");
    });
  }

  /* =======================================================
     CARD IMAGE PARALLAX — VERY SUBTLE
  ======================================================= */

  const cards = document.querySelectorAll(".premium-program-card");

  cards.forEach((card) => {
    const image = card.querySelector(".program-image");

    if (!image) return;

    card.addEventListener("mousemove", (event) => {
      if (window.innerWidth < 900) return;

      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;

      const y = (event.clientY - rect.top) / rect.height;

      const moveX = (x - 0.5) * 5;

      const moveY = (y - 0.5) * 5;

      image.style.transform = `scale(1.045) translate(${moveX}px, ${moveY}px)`;
    });

    card.addEventListener("mouseleave", () => {
      image.style.transform = "";
    });
  });

  /* =======================================================
     REDUCED MOTION
  ======================================================= */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    document.documentElement.classList.add("reduce-motion");
  }

  /* =======================================================
     CLOSE MOBILE NAV ON RESIZE
  ======================================================= */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && mainNav) {
      mainNav.classList.remove("nav-open");

      document.body.classList.remove("menu-open");

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});
