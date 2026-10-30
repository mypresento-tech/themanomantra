// Advanced Relationship Mastery™ — based on The Manomantra website content document (page 19).
const programmeData = {
  "golden-horizons": {
    title: "Golden Horizons™",
    category: "LATER LIFE · CONNECTION · PURPOSEFUL WELLBEING",
    image: "assets/images/golden-horizons-poster.jpeg",
    alt: "Golden Horizons graceful ageing programme poster",
    audience: "Individuals in later life who want to nurture connection, wellbeing, independence and meaning",
    mode: "Graceful Ageing Programme · Details by Enquiry",
    tagline: "Live well. Age gracefully. Stay you.",
    intro: "A holistic programme designed to support wellbeing, social connection, renewed purpose and meaningful living in later life.",
    about: "Golden Horizons™ recognises that later life can bring new transitions, questions and possibilities. The programme creates space to reflect on what supports a meaningful and connected life.",
    aboutTwo: "Participants explore everyday vitality, social connection, emotional wellbeing, interests, life skills and purposeful contribution. Activities and delivery can be discussed through an enquiry so the programme can be understood in the right context.",
    quote: "Every stage of life holds new possibilities for connection, purpose and growth.",
    audienceCopy: "Designed for older adults and those supporting later-life communities who want to encourage meaningful connection, independence, engagement and a positive sense of purpose.",
    points: ["Explore everyday habits that support vitality and engagement", "Nurture meaningful relationships and social connection", "Make space for emotional wellbeing and a positive outlook", "Rediscover interests, purpose and opportunities to contribute", "Reflect on life transitions with confidence and support"],
    focus: ["Health, Vitality & Life Skills", "Social Connection & Emotional Wellbeing", "Purpose, Meaning & Supportive Community"],
    steps: ["Explore what wellbeing, connection and independence mean to each participant", "Identify interests, routines and relationships that support meaningful living", "Consider practical opportunities for engagement, contribution and continued growth"]
  }
};

const params = new URLSearchParams(window.location.search);
const slug = (params.get("program") || "golden-horizons").toLowerCase().trim();
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
  const descriptions = ["Reflect on daily routines, participation and practical skills that support engaged living.", "Recognise the value of connection, shared experiences and emotional wellbeing.", "Rediscover meaningful interests and explore ways to keep learning, sharing and contributing."];
  data.focus.forEach((focus, i) => {
    const article = document.createElement("article"); article.className = "pd-info-card";
    const icon = document.createElement("div"); icon.className = "pd-card-icon"; icon.textContent = icons[i];
    const h = document.createElement("h3"); h.textContent = focus;
    const p = document.createElement("p"); p.textContent = descriptions[i];
    article.append(icon, h, p); cardContainer.appendChild(article);
  });
  const stepContainer = document.getElementById("journeySteps");
  const stepDescriptions = ["Begin with participants' interests, priorities and preferred ways of taking part.", "Explore routines and connections that can support a meaningful everyday life.", "Identify realistic opportunities to stay connected, active and purposeful."];
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
