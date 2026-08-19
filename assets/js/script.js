/* =========================================
   THE MANOMANTRA - script.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     ELEMENTS
  ========================================= */

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  const backdrop = document.getElementById("bookingBackdrop");
  const modalClose = document.getElementById("modalClose");
  const bookingForm = document.getElementById("bookingForm");
  const formNote = document.getElementById("formNote");

  /* =========================================
     STICKY HEADER
     Header stays visible.
     It becomes compact after scrolling.
  ========================================= */

  const updateHeader = () => {
    if (!header) return;

    const isScrolled = window.scrollY > 45;

    header.classList.toggle("scrolled", isScrolled);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    /* Close menu after clicking navigation */

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================================
     ACTIVE NAVIGATION
  ========================================= */

  const sections = document.querySelectorAll("main section[id]");

  const navLinks = mainNav ? mainNav.querySelectorAll('a[href^="#"]') : [];

  const updateActiveNavigation = () => {
    let currentSection = "home";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= 160) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const target = link.getAttribute("href");

      link.classList.toggle("active", target === `#${currentSection}`);
    });
  };

  updateActiveNavigation();

  window.addEventListener("scroll", updateActiveNavigation, { passive: true });

  /* =========================================
     BOOKING MODAL
  ========================================= */

  const openBooking = () => {
    if (!backdrop) return;

    backdrop.classList.add("open");

    backdrop.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    /* Focus first field */

    setTimeout(() => {
      const firstInput = bookingForm?.querySelector("input");

      if (firstInput) {
        firstInput.focus();
      }
    }, 150);
  };

  const closeBooking = () => {
    if (!backdrop) return;

    backdrop.classList.remove("open");

    backdrop.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
  };

  /* All booking buttons */

  document.querySelectorAll("[data-open-booking]").forEach((button) => {
    button.addEventListener("click", openBooking);
  });

  /* Close button */

  if (modalClose) {
    modalClose.addEventListener("click", closeBooking);
  }

  /* Click outside modal */

  if (backdrop) {
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) {
        closeBooking();
      }
    });
  }

  /* =========================================
     ESCAPE KEY
  ========================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeBooking();

      if (mainNav && menuToggle) {
        mainNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  /* =========================================
     BOOKING FORM
  ========================================= */

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = bookingForm.querySelector(".submit-btn");

      if (!submitButton) return;

      const originalText = submitButton.innerHTML;

      submitButton.disabled = true;

      submitButton.innerHTML = "Request Sent ✓";

      if (formNote) {
        formNote.textContent = "Thank you. Your request has been recorded.";
      }

      /*
          Demo form behaviour.

          Later this can be connected to:

          - PHP
          - ASP.NET
          - PostgreSQL
          - Email API
          - WhatsApp API
          - CRM
        */

      setTimeout(() => {
        bookingForm.reset();

        submitButton.disabled = false;

        submitButton.innerHTML = originalText;

        if (formNote) {
          formNote.textContent = "";
        }
      }, 2500);
    });
  }

  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =========================================
     CLOSE MOBILE MENU
     WHEN CLICKING OUTSIDE
  ========================================= */

  document.addEventListener("click", (event) => {
    if (!mainNav || !menuToggle) {
      return;
    }

    const clickedInsideNav = mainNav.contains(event.target);

    const clickedMenuButton = menuToggle.contains(event.target);

    if (
      !clickedInsideNav &&
      !clickedMenuButton &&
      mainNav.classList.contains("open")
    ) {
      mainNav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
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

        rootMargin: "0px 0px -45px 0px",
      },
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    /* Fallback */

    revealItems.forEach((item) => {
      item.classList.add("visible");
    });
  }

  /* =========================================
     CLOSE MOBILE NAV ON RESIZE
  ========================================= */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960 && mainNav && menuToggle) {
      mainNav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* =========================================
     PAGE READY
  ========================================= */

  document.body.classList.add("page-ready");
});
/* =========================================================
   WHY CHOOSE US
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".why-card");

  if (!cards.length) return;

  /* Add initial state */
  cards.forEach((card) => {
    card.classList.add("why-card-hidden");
  });

  /* Reveal on scroll */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("why-card-visible");

            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    cards.forEach((card) => {
      observer.observe(card);
    });
  } else {
    cards.forEach((card) => {
      card.classList.add("why-card-visible");
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-section");

  if (!hero) return;

  // Small entrance animation
  requestAnimationFrame(() => {
    hero.classList.add("hero-visible");
  });

  // Smooth scrolling for hero buttons
  const heroLinks = hero.querySelectorAll('a[href^="#"]');

  heroLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});

/* =========================================================
   WHO WE SUPPORT ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".who-support-section .reveal");

  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 80}ms`;

    observer.observe(item);
  });
});
/* =====================================================
   THE MANOMANTRA WAY
   Reveal Animation
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal-way");

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const journeyCards = document.querySelectorAll(".journey-step");

  if (!journeyCards.length) return;

  /* Scroll reveal */

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("journey-visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  journeyCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(35px)";

    card.style.transition = `opacity 0.7s ease ${index * 0.1}s,
             transform 0.7s ease ${index * 0.1}s,
             box-shadow 0.35s ease`;

    observer.observe(card);
  });

  /* Add visible state */

  const style = document.createElement("style");

  style.textContent = `
        .journey-step.journey-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

  document.head.appendChild(style);
});
/* =========================================================
   HOW I CAN HELP YOU THRIVE — JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const thriveCards = document.querySelectorAll(".thrive-card");

  if (!thriveCards.length) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("thrive-visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  thriveCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 100}ms`;

    observer.observe(card);
  });
});

/* =========================================================
   TESTIMONIALS SECTION JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const introLeft = document.querySelector(".testimonials-intro-left");

  const introRight = document.querySelector(".testimonials-intro-right");

  const cards = document.querySelectorAll(".testimonial-card");

  /* -----------------------------------------
       Fallback
    ----------------------------------------- */

  if (!("IntersectionObserver" in window)) {
    if (introLeft) {
      introLeft.classList.add("is-visible");
    }

    if (introRight) {
      introRight.classList.add("is-visible");
    }

    cards.forEach((card) => {
      card.classList.add("is-visible");
    });

    return;
  }

  /* -----------------------------------------
       Intersection Observer
    ----------------------------------------- */

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  /* Observe heading */

  if (introLeft) {
    observer.observe(introLeft);
  }

  if (introRight) {
    observer.observe(introRight);
  }

  /* Observe cards */

  cards.forEach((card) => {
    observer.observe(card);
  });

  /* -----------------------------------------
       Subtle Card Tilt
       Desktop only
    ----------------------------------------- */

  if (window.matchMedia("(min-width: 901px)").matches) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;

        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -1.5;

        const rotateY = ((x - centerX) / centerX) * 1.5;

        card.style.transform = `translateY(-8px)
                     perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
});
/* =========================================
   CLARITY CTA ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const bookingButton = document.querySelector("[data-booking]");

  if (!bookingButton) return;

  bookingButton.addEventListener("click", () => {
    // Replace this with the real Calendly / booking URL.
    const bookingUrl = "https://calendly.com/";

    // Temporary behaviour:
    // Change the URL above to your actual booking page.
    if (bookingUrl && bookingUrl !== "https://calendly.com/") {
      window.open(bookingUrl, "_blank", "noopener,noreferrer");
      return;
    }

    alert("Add your booking URL inside clarity-cta.js.");
  });
});
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
