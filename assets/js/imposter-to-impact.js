      const programmeData = {
        "imposter-to-impact": {
          title: "Imposter to Impact™",
          category: "MASTERCLASSES · ACTIVATION JOURNEYS",
          image: "assets/images/programme-posters/imposter-to-impact-poster-thumbnail.jpeg",
          alt: "Imposter to Impact guided experience",
          audience: "People interested in exploring the themes of Imposter to Impact and choosing intentional next steps",
          mode: "Guided experience · Format confirmed with the team",
          tagline: "Learn. Reflect. Rewire. Act.",
          intro: "Imposter to Impact™ is listed among The Manomantra’s Masterclasses and Activation Journeys. Explore the experience and confirm its specific focus and format with the team.",
          about: "Imposter to Impact™ is named in The Manomantra’s Masterclasses and Activation Journeys collection. The source programme details identify the experience by name but do not provide a detailed syllabus or specific outcomes.",
          aboutTwo: "The shared practice rhythm for these experiences is Learn → Reflect → Release → Rewire → Act. The exact activities, delivery format, duration, schedule and registration details for Imposter to Impact™ should be confirmed with The Manomantra team before booking.",
          quote: "Learn → Reflect → Release → Rewire → Act",
          audienceCopy: "For people interested in this masterclass or activation journey. Please contact the team to confirm whether the current experience is suitable for your needs and what participation involves.",
          points: [
            "Learn about the theme and purpose of the experience",
            "Reflect on questions and experiences relevant to you",
            "Explore the shared practice rhythm: Learn, Reflect, Release, Rewire and Act",
            "Confirm the specific activities and intended outcomes with the team",
            "Check the delivery format, duration and schedule before registering",
            "Ask the team about the next available experience and registration steps"
          ],
          focus: [
            "Learn with intention",
            "Reflect with awareness",
            "Choose a next step"
          ],
          steps: [
            "Learn: understand the themes and ideas introduced in the experience",
            "Reflect: make space to consider your own questions and observations",
            "Act: confirm practical next steps and ways to participate with the team"
          ]
        }
      };

      const params = new URLSearchParams(window.location.search);
      const slug = (params.get("program") || "imposter-to-impact")
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

      // Imposter to Impact™ registration panel. Replace the placeholder below with the approved Razorpay payment URL before launch.
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