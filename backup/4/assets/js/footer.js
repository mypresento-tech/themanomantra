/* =========================================
   MANOMANTRA FOOTER JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------------------
     Current Year
  ----------------------------------------- */

  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------
     Smooth Internal Navigation
  ----------------------------------------- */

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

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* -----------------------------------------
     Footer Reveal Animation
  ----------------------------------------- */

  const footerItems = document.querySelectorAll(
    ".footer-brand, .footer-column, .footer-statement, .footer-bottom",
  );

  footerItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(25px)";
    item.style.transition = `opacity 0.7s ease ${index * 0.08}s,
       transform 0.7s ease ${index * 0.08}s`;
  });

  const footer = document.querySelector(".site-footer");

  if (footer && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          footerItems.forEach((item) => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(footer);
  } else {
    footerItems.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });
  }

  /* -----------------------------------------
     Social Button Micro Interaction
  ----------------------------------------- */

  const socialButtons = document.querySelectorAll(".social-link");

  socialButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.boxShadow = "0 8px 20px rgba(231, 169, 0, 0.18)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.boxShadow = "none";
    });
  });
});
