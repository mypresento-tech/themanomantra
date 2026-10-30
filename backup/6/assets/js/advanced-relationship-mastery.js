// Advanced Relationship Mastery™ — based on The Manomantra website content document (page 19).
const programmeData = {
  "advanced-relationship-mastery": {
    title: "Advanced Relationship Mastery™",
    category: "RELATIONSHIPS · COMMUNICATION · CONSCIOUS PARTNERSHIP",
    image: "assets/images/advanced-relationship-mastery.jpeg",
    alt: "Advanced Relationship Mastery programme",
    audience: "Primarily for married women",
    mode: "Guided Online Programme",
    tagline: "Understand your patterns. Build a conscious partnership.",
    intro: "An in-depth programme for strengthening emotional connection, communication, boundaries, attraction, intimacy and conscious partnership.",
    about: "Advanced Relationship Mastery™ supports married women in understanding their relationship blueprint, attachment patterns and recurring couple cycles.",
    aboutTwo: "It explores feeling unseen, communication, boundaries, emotional and sexual intimacy, attraction, marriage after motherhood, digital-age pressures, betrayal recovery and the creation of a more conscious partnership. The programme centres dignity, mutuality, consent and relational wellbeing.",
    quote: "A conscious partnership begins with awareness, honest communication and mutual respect.",
    audienceCopy: "Designed primarily for married women who want to understand recurring relationship patterns and explore healthier ways to build connection and partnership.",
    points: [
      "Explore relationship blueprints and attachment patterns",
      "Recognise recurring couple cycles",
      "Understand experiences of feeling unseen",
      "Explore communication and healthy boundaries",
      "Reflect on emotional and sexual intimacy with dignity and consent",
      "Consider attraction, motherhood and digital-age pressures",
      "Explore betrayal recovery and conscious partnership"
    ],
    focus: [
      "Relationship Patterns & Attachment",
      "Communication, Boundaries & Intimacy",
      "Conscious Partnership & Relational Wellbeing"
    ],
    steps: [
      "Build awareness of relationship blueprints and recurring patterns",
      "Explore communication, boundaries and emotional needs",
      "Identify conscious, respectful ways to support partnership wellbeing"
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const slug = (params.get("program") || "advanced-relationship-mastery").toLowerCase().trim();
const data = programmeData[slug];
const content = document.getElementById("programmeContent");
const notFound = document.getElementById("notFound");

if (data && content) {
  content.hidden = false;
  document.title = `${data.title.replace("™", "").trim()} | The Manomantra`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.content = data.intro;
  document.getElementById("breadcrumbTitle").textContent = data.title;
  document.getElementById("programmeCategory").textContent = data.category;
  document.getElementById("programmeTitle").innerHTML = data.title.replace("™", "<em>™</em>");
  document.getElementById("programmeIntro").textContent = data.intro;
  document.getElementById("programmeAudience").textContent = `For: ${data.audience}`;
  document.getElementById("programmeMode").textContent = data.mode;
  document.getElementById("programmeTagline").textContent = data.tagline;
  const image = document.getElementById("programmeImage");
  if (image) { image.src = data.image; image.alt = data.alt; image.onerror = () => { image.style.display = "none"; }; }
  document.getElementById("aboutCopy").textContent = data.about;
  document.getElementById("aboutCopyTwo").textContent = data.aboutTwo;
  document.getElementById("programmeQuote").textContent = data.quote;
  document.getElementById("audienceCopy").textContent = data.audienceCopy;
  document.getElementById("ctaCopy").textContent = `Enquire to learn more about ${data.title.replace("™", "")}, its current format and enrolment details.`;

  const list = document.getElementById("audienceList");
  data.points.forEach(point => { const li = document.createElement("li"); li.textContent = point; list.appendChild(li); });
  const cardContainer = document.getElementById("focusCards");
  const icons = ["✧", "◌", "↗"];
  const descriptions = [
    "Explore how relationship blueprints and attachment patterns may shape recurring experiences.",
    "Reflect on communication, boundaries, emotional needs and intimacy with care and respect.",
    "Consider mutuality, consent, repair and wellbeing within a conscious partnership."
  ];
  data.focus.forEach((focus, i) => {
    const article = document.createElement("article"); article.className = "pd-info-card";
    const icon = document.createElement("div"); icon.className = "pd-card-icon"; icon.textContent = icons[i];
    const h = document.createElement("h3"); h.textContent = focus;
    const p = document.createElement("p"); p.textContent = descriptions[i];
    article.append(icon, h, p); cardContainer.appendChild(article);
  });
  const stepContainer = document.getElementById("journeySteps");
  const stepDescriptions = [
    "Notice personal relationship patterns and the cycles that may repeat.",
    "Explore needs, boundaries and communication in a psychologically responsible way.",
    "Consider practical, respectful choices that support connection and shared wellbeing."
  ];
  data.steps.forEach((step, i) => {
    const article = document.createElement("article"); article.className = "pd-step";
    const h = document.createElement("h3"); h.textContent = step;
    const p = document.createElement("p"); p.textContent = stepDescriptions[i];
    article.append(h, p); stepContainer.appendChild(article);
  });
} else if (notFound) { notFound.hidden = false; }

// Registration-interest drawer. Connect the form to the website enquiry service/backend before launch.
const bookingDrawer = document.getElementById("bookingDrawer");
const bookingOverlay = document.getElementById("bookingOverlay");
const bookingForm = document.getElementById("bookingForm");
const bookingStatus = document.getElementById("bookingStatus");
let bookingPreviousFocus = null;
function openBookingPanel() {
  bookingPreviousFocus = document.activeElement; bookingOverlay.hidden = false;
  bookingDrawer.classList.add("is-open"); bookingDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("booking-open"); document.getElementById("bookingClose").focus();
}
function closeBookingPanel() {
  bookingDrawer.classList.remove("is-open"); bookingDrawer.setAttribute("aria-hidden", "true");
  bookingOverlay.hidden = true; document.body.classList.remove("booking-open");
  if (bookingPreviousFocus) bookingPreviousFocus.focus();
}
document.querySelectorAll("[data-open-booking]").forEach(btn => btn.addEventListener("click", openBookingPanel));
document.getElementById("bookingClose").addEventListener("click", closeBookingPanel);
bookingOverlay.addEventListener("click", closeBookingPanel);
document.addEventListener("keydown", event => { if (event.key === "Escape" && bookingDrawer.classList.contains("is-open")) closeBookingPanel(); });
bookingForm.addEventListener("submit", event => {
  event.preventDefault(); if (!bookingForm.reportValidity()) return;
  bookingStatus.textContent = "Your form is validated, but online submission is not connected yet. Please connect this form to the website enquiry service before publishing.";
});
const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();


// PAYMENT LINK NOT CONFIGURED: do not redirect to any gateway until an approved programme-specific payment URL and open intake are confirmed.
