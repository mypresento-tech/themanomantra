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
