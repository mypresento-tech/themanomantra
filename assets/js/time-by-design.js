// Advanced Relationship Mastery™ — based on The Manomantra website content document (page 19).
const programmeData = {
  "time-by-design": {
    title: "Time by Design™",
    category: "TIME · HABITS · INTENTIONAL LIVING",
    image: "assets/images/time-by-design-poster.jpeg",
    alt: "Time by Design workshop and toolkit poster",
    audience: "Individuals who want to manage time more intentionally and create better balance in daily life",
    mode: "Workshop & Toolkit · Details by Enquiry",
    tagline: "Take charge of your time. Design a life you love.",
    intro: "A practical workshop and toolkit to help you manage your time, build productive habits and create more balance, focus and fulfilment in daily life.",
    about: "Time by Design™ helps participants reflect on how they use their time, identify priorities and create a more intentional approach to everyday responsibilities.",
    aboutTwo: "Through practical planning, prioritising, focus and habit-building exercises, participants can explore ways to organise their time around what matters most—without treating productivity as a race.",
    quote: "The goal is not to fit more into every day. It is to make room for what matters.",
    audienceCopy: "Designed for people who want a clearer sense of priorities, more intentional routines and practical ways to balance work, responsibilities and personal life.",
    points: ["Clarify meaningful goals and priorities", "Explore practical planning and organisation tools", "Build focus and productive routines", "Make more intentional space for balance and wellbeing", "Identify small habits that can support lasting change"],
    focus: ["Goal Clarity & Priorities", "Planning, Focus & Productivity", "Balanced Living & Habits"],
    steps: ["Reflect on your current routines, commitments and priorities", "Explore planning tools and realistic ways to protect focus", "Choose small, repeatable habits that support a more intentional day"]
  }
};

const params = new URLSearchParams(window.location.search);
const slug = (params.get("program") || "time-by-design").toLowerCase().trim();
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
  const descriptions = ["Identify what matters most and decide where your time and attention can go.", "Explore practical ways to plan, prioritise, organise and work with greater focus.", "Create room for wellbeing and the activities that make life meaningful."];
  data.focus.forEach((focus, i) => {
    const article = document.createElement("article"); article.className = "pd-info-card";
    const icon = document.createElement("div"); icon.className = "pd-card-icon"; icon.textContent = icons[i];
    const h = document.createElement("h3"); h.textContent = focus;
    const p = document.createElement("p"); p.textContent = descriptions[i];
    article.append(icon, h, p); cardContainer.appendChild(article);
  });
  const stepContainer = document.getElementById("journeySteps");
  const stepDescriptions = ["Notice current patterns and where time feels stretched or fragmented.", "Build a practical approach to planning, prioritising and focusing.", "Turn your intentions into manageable habits you can review and refine."];
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
