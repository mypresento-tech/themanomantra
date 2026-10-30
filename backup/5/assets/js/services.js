/* =========================================================
   THE MANOMANTRA — SERVICES PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       SCROLL REVEAL
    ===================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  /* =====================================================
       SERVICE CARD HOVER / TOUCH
    ===================================================== */

  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-active");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-active");
    });
  });

  /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerOffset = 20;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =====================================================
       SUBTLE HERO PARALLAX
    ===================================================== */

  const heroVisual = document.querySelector(".hero-visual");

  if (heroVisual && window.innerWidth > 900) {
    window.addEventListener("mousemove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 8;

      const y = (event.clientY / window.innerHeight - 0.5) * 8;

      heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* =====================================================
       BUTTON CLICK FEEDBACK
    ===================================================== */

  const buttons = document.querySelectorAll(
    ".btn, .service-link, .clarity-button, .bottom-button",
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("clicked");

      setTimeout(() => {
        button.classList.remove("clicked");
      }, 400);
    });
  });
});
