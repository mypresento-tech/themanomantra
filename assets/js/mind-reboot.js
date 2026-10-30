// Advanced Relationship Mastery™ — based on The Manomantra website content document (page 19).
const programmeData = {
  "mind-reboot": {
    title: "Mind Reboot™",
    category: "MINDSET · PERSONAL DEVELOPMENT · WELLBEING",
    image: "assets/images/mind-reboot-poster.jpeg",
    alt: "Mind Reboot 10-day reset programme poster",
    audience: "Individuals seeking a calmer, clearer and more intentional approach to everyday life",
    mode: "10-Day Reset · Details by Enquiry",
    tagline: "Pause. Reflect. Reconnect. Reset your mind.",
    intro: "A focused 10-day reset programme centred on reflection, emotional balance, mental clarity and simple practices for more intentional living.",
    about: "Mind Reboot™ invites participants to pause and notice the thoughts, habits and everyday pressures that influence how they feel and respond.",
    aboutTwo: "Through reflection and practical daily exercises, participants explore emotional balance, clearer thinking, healthy habits and a stronger connection with themselves. The programme supports learning and personal development; it does not promise or guarantee specific health outcomes.",
    quote: "A small pause can create space for a more conscious next step.",
    audienceCopy: "Designed for adults who want to pause, reflect on their current patterns and explore practical ways to bring more clarity, balance and intention into daily life.",
    points: ["Make space to pause and reflect", "Explore practices for emotional balance", "Notice thought patterns and support clearer decisions", "Build simple, supportive daily habits", "Reconnect with personal values and purposeful action"],
    focus: ["Pause & Self-Reflection", "Emotional Balance & Clarity", "Healthy Habits & Intentional Living"],
    steps: ["Pause and notice your current thoughts, routines and needs", "Explore reflection practices and habits that support clarity", "Choose practical next steps for a more intentional daily rhythm"]
  }
};

const params = new URLSearchParams(window.location.search);
const slug = (params.get("program") || "mind-reboot").toLowerCase().trim();
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
  const descriptions = ["Create space to observe your everyday patterns with curiosity rather than judgement.", "Explore simple practices that may support reflection, emotional awareness and clearer thinking.", "Choose manageable habits that help you reconnect with yourself and move forward intentionally."];
  data.focus.forEach((focus, i) => {
    const article = document.createElement("article"); article.className = "pd-info-card";
    const icon = document.createElement("div"); icon.className = "pd-card-icon"; icon.textContent = icons[i];
    const h = document.createElement("h3"); h.textContent = focus;
    const p = document.createElement("p"); p.textContent = descriptions[i];
    article.append(icon, h, p); cardContainer.appendChild(article);
  });
  const stepContainer = document.getElementById("journeySteps");
  const stepDescriptions = ["Take stock of what is happening in daily life and what you would like to shift.", "Try practical reflection and habit-building exercises at a manageable pace.", "Identify the practices you want to continue beyond the 10-day reset."];
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
