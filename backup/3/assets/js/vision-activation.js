      const programmeData = {
        "vision-activation": {
          title: "Vision Activation™",
          category: "MASTERCLASSES · ACTIVATION JOURNEYS",
          image: "assets/images/thumbnail-vision-activation.jpeg",
          alt: "Vision Activation guided experience",
          audience: "People ready to clarify a meaningful direction and take intentional steps",
          mode: "Masterclass · Workshop · Guided Activation Journey",
          tagline: "Turn a meaningful vision into intentional action.",
          intro: "A focused experience to help you pause, reflect on what matters, and begin moving towards your chosen direction with greater intention.",
          about: "Vision Activation™ is part of The Manomantra’s masterclasses and activation experiences. These short, focused experiences introduce participants to The Manomantra Way™ before they choose a deeper programme.",
          aboutTwo: "Depending on the offering, an experience may include reflection, daily practice, journalling, accountability and live sessions. Ask us about the current format, dates and participation details before enrolling.",
          quote: "A vision becomes more meaningful when reflection is followed by a deliberate next step.",
          audienceCopy: "For people who want to make space for what matters, reflect on the direction they want to take, and translate that reflection into intentional action.",
          points: [
            "Pause and reflect on what matters most",
            "Clarify a meaningful personal direction",
            "Notice patterns or assumptions that may shape choices",
            "Identify practical actions that align with your vision",
            "Use reflection and journalling to support follow-through",
            "Build a repeatable rhythm of learning, reflection and action"
          ],
          focus: [
            "Clarify your vision",
            "Reflect with intention",
            "Move into action"
          ],
          steps: [
            "Learn: explore the theme and identify what matters to you",
            "Reflect: make space to examine your current direction and choices",
            "Act: choose realistic next steps and a practice rhythm to support follow-through"
          ]
        }
      };

      const params = new URLSearchParams(window.location.search);
      const slug = (params.get("program") || "vision-activation")
        .toLowerCase()
        .trim();
      const data = programmeData[slug];
      const content = document.getElementById("programmeContent");
      const notFound = document.getElementById("notFound");

      if (data) {
        content.hidden = false;
        document.title = `${data.title.replace("™", "").trim()} | The Manomantra`;
        document.querySelector('meta[name="description"]').content = data.intro;
        document.getElementById("breadcrumbTitle").textContent = data.title;
        document.getElementById("programmeCategory").textContent =
          data.category;
        document.getElementById("programmeTitle").innerHTML =
          data.title.replace("™", "<em>™</em>");
        document.getElementById("programmeIntro").textContent = data.intro;
        document.getElementById("programmeAudience").textContent =
          `For: ${data.audience}`;
        document.getElementById("programmeMode").textContent = data.mode;
        document.getElementById("programmeTagline").textContent = data.tagline;
        const image = document.getElementById("programmeImage");
        image.src = data.image;
        image.alt = data.alt;
        image.onerror = () => {
          image.style.display = "none";
        };
        document.getElementById("aboutCopy").textContent = data.about;
        document.getElementById("aboutCopyTwo").textContent = data.aboutTwo;
        document.getElementById("programmeQuote").textContent = data.quote;
        document.getElementById("audienceCopy").textContent = data.audienceCopy;
        document.getElementById("ctaCopy").textContent =
          `Want to learn more about ${data.title.replace("™", "")}? Ask about the next available opportunity, programme format and registration steps.`;
        const list = document.getElementById("audienceList");
        data.points.forEach((point) => {
          const li = document.createElement("li");
          li.textContent = point;
          list.appendChild(li);
        });
        const cardContainer = document.getElementById("focusCards");
        const icons = ["✧", "◌", "↗"];
        data.focus.forEach((focus, i) => {
          const article = document.createElement("article");
          article.className = "pd-info-card";
          const icon = document.createElement("div");
          icon.className = "pd-card-icon";
          icon.textContent = icons[i % icons.length];
          const h = document.createElement("h3");
          h.textContent = focus;
          const p = document.createElement("p");
          p.textContent = [
            "Build awareness and understanding that can support more intentional choices.",
            "Explore the topic through guided reflection, discussion and practical exercises.",
            "Identify useful ideas to practise and carry into everyday life.",
          ][i % 3];
          article.append(icon, h, p);
          cardContainer.appendChild(article);
        });
        const stepContainer = document.getElementById("journeySteps");
        data.steps.forEach((step, i) => {
          const article = document.createElement("article");
          article.className = "pd-step";
          const h = document.createElement("h3");
          h.textContent = step;
          const p = document.createElement("p");
          p.textContent = [
            "Begin by exploring your context, questions and current experience.",
            "Use guided reflection and practical exercises to build understanding.",
            "Choose realistic actions or insights to take into your everyday life.",
          ][i];
          article.append(h, p);
          stepContainer.appendChild(article);
        });
      } else {
        notFound.hidden = false;
      }

      // Vision Activation™ registration panel. Replace the placeholder below with the approved Razorpay payment URL before launch.
      const RAZORPAY_PAYMENT_URL =
        "https://rzp.io/l/REPLACE_WITH_APPROVED_LINK";
      const bookingDrawer = document.getElementById("bookingDrawer");
      const bookingOverlay = document.getElementById("bookingOverlay");
      const bookingForm = document.getElementById("bookingForm");
      const bookingStatus = document.getElementById("bookingStatus");
      let bookingPreviousFocus = null;
      function openBookingPanel() {
        bookingPreviousFocus = document.activeElement;
        bookingOverlay.hidden = false;
        bookingDrawer.classList.add("is-open");
        bookingDrawer.setAttribute("aria-hidden", "false");
        document.body.classList.add("booking-open");
        document.getElementById("bookingClose").focus();
      }
      function closeBookingPanel() {
        bookingDrawer.classList.remove("is-open");
        bookingDrawer.setAttribute("aria-hidden", "true");
        bookingOverlay.hidden = true;
        document.body.classList.remove("booking-open");
        if (bookingPreviousFocus) bookingPreviousFocus.focus();
      }
      document
        .querySelectorAll("[data-open-booking]")
        .forEach((btn) => btn.addEventListener("click", openBookingPanel));
      document
        .getElementById("bookingClose")
        .addEventListener("click", closeBookingPanel);
      bookingOverlay.addEventListener("click", closeBookingPanel);
      document.addEventListener("keydown", (event) => {
        if (
          event.key === "Escape" &&
          bookingDrawer.classList.contains("is-open")
        )
          closeBookingPanel();
      });
      bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!bookingForm.reportValidity()) return;
        if (RAZORPAY_PAYMENT_URL.includes("REPLACE_WITH_APPROVED_LINK")) {
          bookingStatus.textContent =
            "Registration form is ready. Add the approved Razorpay payment URL in the HTML before enabling payment.";
          return;
        }
        // Opens Razorpay in a new tab; this static page does not transmit form entries to a server.
        window.open(RAZORPAY_PAYMENT_URL, "_blank", "noopener,noreferrer");
        bookingStatus.textContent =
          "Razorpay opened in a new tab. Please complete payment there.";
      });

      document.getElementById("currentYear").textContent =
        new Date().getFullYear();