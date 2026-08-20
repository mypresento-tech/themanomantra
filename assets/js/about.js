/* =========================================================
   THE MANOMANTRA
   ABOUT PAGE INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

  const menuToggle = document.getElementById("aboutMenuToggle");

  const nav = document.getElementById("aboutNav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =====================================================
       HEADER SCROLL
    ===================================================== */

  const header = document.getElementById("siteHeader");

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

  const revealElements = document.querySelectorAll(".reveal-about");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =====================================================
       BOOKING MODAL
    ===================================================== */

  const modal = document.getElementById("aboutBookingModal");

  const closeButton = document.getElementById("aboutModalClose");

  const overlay = modal?.querySelector(".modal-overlay");

  const bookingButtons = document.querySelectorAll("[data-booking]");

  const openModal = () => {
    if (!modal) return;

    modal.classList.add("open");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal) return;

    modal.classList.remove("open");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  };

  bookingButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButton?.addEventListener("click", closeModal);

  overlay?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  /* =====================================================
       DEMO FORM
    ===================================================== */

  const form = document.getElementById("aboutBookingForm");

  const message = document.getElementById("aboutFormMessage");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button");

    submitButton.disabled = true;

    submitButton.textContent = "Enquiry Sent ✓";

    if (message) {
      message.textContent = "Thank you. We will connect with you soon.";
    }

    setTimeout(() => {
      form.reset();

      submitButton.disabled = false;

      submitButton.textContent = "Send My Enquiry →";
    }, 2500);
  });
});

/* =========================================
   MANOMANTRA — KEY HIGHLIGHTS JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#key-highlights");

  const items = document.querySelectorAll(".highlight-item");

  if (!section || !items.length) {
    return;
  }

  /* Initial state */

  items.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
  });

  /* Reveal */

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.transition = "opacity 0.6s ease, transform 0.6s ease";

              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, index * 100);
          });

          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(section);
});
/* =========================================
   THE MANOMANTRA
   PROFESSIONAL BACKGROUND — JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#professional-background");

  if (!section) return;

  const cards = section.querySelectorAll(".pb-card");

  const experience = section.querySelector(".pb-experience");

  /* =====================================
       INITIAL STATE
    ===================================== */

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
  });

  if (experience) {
    experience.style.opacity = "0";
    experience.style.transform = "translateY(20px)";
  }

  /* =====================================
       INTERSECTION OBSERVER
    ===================================== */

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        /* Cards */

        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.transition = "opacity 0.65s ease, transform 0.65s ease";

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";
          }, index * 90);
        });

        /* Experience */

        if (experience) {
          setTimeout(
            () => {
              experience.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

              experience.style.opacity = "1";

              experience.style.transform = "translateY(0)";
            },
            cards.length * 90 + 180,
          );
        }

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    },
  );

  observer.observe(section);

  /* =====================================
       REDUCED MOTION
    ===================================== */

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {
    cards.forEach((card) => {
      card.style.opacity = "1";

      card.style.transform = "none";

      card.style.transition = "none";
    });

    if (experience) {
      experience.style.opacity = "1";

      experience.style.transform = "none";

      experience.style.transition = "none";
    }
  }
});

/* =========================================
   THE MANOMANTRA
   CERTIFICATIONS & ACHIEVEMENTS — JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#certifications");

  if (!section) return;

  const cards = section.querySelectorAll(".certification-card");

  const footer = section.querySelector(".certification-footer");

  /* =====================================
       INITIAL STATE
    ===================================== */

  cards.forEach((card) => {
    card.style.opacity = "0";

    card.style.transform = "translateY(25px)";
  });

  if (footer) {
    footer.style.opacity = "0";

    footer.style.transform = "translateY(18px)";
  }

  /* =====================================
       SCROLL REVEAL
    ===================================== */

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";
          }, index * 100);
        });

        if (footer) {
          setTimeout(
            () => {
              footer.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

              footer.style.opacity = "1";

              footer.style.transform = "translateY(0)";
            },
            cards.length * 100 + 180,
          );
        }

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    },
  );

  observer.observe(section);

  /* =====================================
       REDUCED MOTION
    ===================================== */

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {
    cards.forEach((card) => {
      card.style.opacity = "1";

      card.style.transform = "none";

      card.style.transition = "none";
    });

    if (footer) {
      footer.style.opacity = "1";

      footer.style.transform = "none";

      footer.style.transition = "none";
    }
  }
});

/* =========================================
   THE MANOMANTRA
   CERTIFICATIONS & ACHIEVEMENTS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#certifications");

  if (!section) return;

  const items = section.querySelectorAll(".cert-item");

  /* =====================================
       SCROLL REVEAL
    ====================================== */

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("is-visible");
          }, index * 120);
        });

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
    },
  );

  observer.observe(section);

  /* =====================================
       REDUCED MOTION
    ====================================== */

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {
    items.forEach((item) => {
      item.classList.add("is-visible");

      item.style.transition = "none";
    });
  }
});
