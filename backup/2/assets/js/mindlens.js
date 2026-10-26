// MindLens™ programme page — content based on The Manomantra website document (page 18).
const programmeData = {
  "mindlens": {
    title: "MindLens™",
    category: "CRITICAL THINKING · CLEARER DECISIONS",
    image: "assets/images/thumbnail-mindlens.jpeg",
    alt: "MindLens critical-thinking programme",
    audience: "Teenagers, young adults and adults",
    mode: "Standalone Programme or Institutional Workshop",
    tagline: "Think clearly. Stay curious. Decide responsibly.",
    intro: "A critical-thinking journey that helps participants question assumptions, evaluate information and make clearer decisions.",
    about: "MindLens™ develops the ability to examine thoughts, recognise bias, distinguish evidence from opinion, consider multiple perspectives and make responsible decisions.",
    aboutTwo: "Through real-life situations, reflection and discussion, participants learn to think with greater clarity, curiosity and intellectual independence. MindLens™ is available as a standalone programme or institutional workshop.",
    quote: "Clearer thinking begins when we become willing to question our assumptions.",
    audienceCopy: "Designed for teenagers, young adults and adults who want to strengthen critical thinking and make more considered decisions.",
    points: [
      "Examine thoughts and question assumptions",
      "Recognise bias and its influence on judgement",
      "Distinguish evidence from opinion",
      "Consider multiple perspectives",
      "Reflect on real-life situations",
      "Make clearer and more responsible decisions"
    ],
    focus: [
      "Question Assumptions",
      "Evaluate Information",
      "Consider Perspectives"
    ],
    steps: [
      "Explore assumptions and the way we interpret information",
      "Reflect on evidence, bias and alternative viewpoints",
      "Apply clearer thinking to real-life decisions"
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const slug = (params.get("program") || "mindlens").toLowerCase().trim();
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
  if (image) {
    image.src = data.image;
    image.alt = data.alt;
    image.onerror = () => { image.style.display = "none"; };
  }
  document.getElementById("aboutCopy").textContent = data.about;
  document.getElementById("aboutCopyTwo").textContent = data.aboutTwo;
  document.getElementById("programmeQuote").textContent = data.quote;
  document.getElementById("audienceCopy").textContent = data.audienceCopy;
  document.getElementById("ctaCopy").textContent = `Want to learn more about MindLens™? Enquire about the programme format and available opportunities.`;

  const list = document.getElementById("audienceList");
  data.points.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    list.appendChild(li);
  });

  const cardContainer = document.getElementById("focusCards");
  const icons = ["✧", "◌", "↗"];
  const descriptions = [
    "Notice assumptions and become more aware of how interpretations are formed.",
    "Explore information carefully and distinguish evidence from personal opinion.",
    "Reflect on different viewpoints before reaching a considered decision."
  ];
  data.focus.forEach((focus, i) => {
    const article = document.createElement("article");
    article.className = "pd-info-card";
    const icon = document.createElement("div");
    icon.className = "pd-card-icon";
    icon.textContent = icons[i % icons.length];
    const h = document.createElement("h3");
    h.textContent = focus;
    const p = document.createElement("p");
    p.textContent = descriptions[i];
    article.append(icon, h, p);
    cardContainer.appendChild(article);
  });

  const stepContainer = document.getElementById("journeySteps");
  const stepDescriptions = [
    "Use real-life examples to notice how assumptions shape understanding.",
    "Compare evidence and viewpoints through guided reflection and discussion.",
    "Practise approaching choices with curiosity, clarity and responsibility."
  ];
  data.steps.forEach((step, i) => {
    const article = document.createElement("article");
    article.className = "pd-step";
    const h = document.createElement("h3");
    h.textContent = step;
    const p = document.createElement("p");
    p.textContent = stepDescriptions[i];
    article.append(h, p);
    stepContainer.appendChild(article);
  });
} else if (notFound) {
  notFound.hidden = false;
}

// Registration-interest drawer. Connect the form to your website form service/backend to receive submissions.
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
document.querySelectorAll("[data-open-booking]").forEach((btn) => btn.addEventListener("click", openBookingPanel));
document.getElementById("bookingClose").addEventListener("click", closeBookingPanel);
bookingOverlay.addEventListener("click", closeBookingPanel);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && bookingDrawer.classList.contains("is-open")) closeBookingPanel();
});
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  bookingStatus.textContent = "Your form is validated, but online submission is not connected yet. Please connect this form to the website enquiry service before publishing.";
});
const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();
