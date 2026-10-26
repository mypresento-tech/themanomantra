// MindLens™ programme page — content based on The Manomantra website document (page 18).
const programmeData = {
  "heartcode": {
    title: "HeartCode™",
    category: "RELATIONSHIPS · COMMUNICATION · EMOTIONAL AWARENESS",
    image: "assets/images/heartcode.jpeg",
    alt: "HeartCode relationship communication programme",
    audience: "Individuals, couples, parents and families",
    mode: "Online and Workshops",
    tagline: "Understand with care. Communicate with awareness.",
    intro: "A relationship-communication programme for understanding how love, care and emotional needs are expressed and received.",
    about: "HeartCode™ helps participants recognise differences in emotional expression, communicate needs with greater clarity and respond to the people they love with awareness and empathy.",
    aboutTwo: "It can be offered as an introductory relationship programme or integrated into deeper family and couple-development journeys. The programme format and current availability can be confirmed through an enquiry.",
    quote: "Connection grows when we learn to express our needs and listen with empathy.",
    audienceCopy: "For individuals, couples, parents and families who want to build greater understanding and communicate with more awareness.",
    points: [
      "Notice differences in how care and affection are expressed",
      "Understand emotional needs with greater awareness",
      "Communicate needs more clearly",
      "Practise listening with empathy",
      "Respond thoughtfully to loved ones",
      "Explore ways to strengthen everyday connection"
    ],
    focus: [
      "Understand Emotional Expression",
      "Communicate Needs Clearly",
      "Respond with Empathy"
    ],
    steps: [
      "Explore how people express and receive care differently",
      "Reflect on needs and practise clearer communication",
      "Apply awareness and empathy in everyday relationships"
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const slug = (params.get("program") || "heartcode").toLowerCase().trim();
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
  document.getElementById("ctaCopy").textContent = `Want to learn more about HeartCode™? Enquire about the programme format and available opportunities.`;

  const list = document.getElementById("audienceList");
  data.points.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    list.appendChild(li);
  });

  const cardContainer = document.getElementById("focusCards");
  const icons = ["✧", "◌", "↗"];
  const descriptions = [
    "Explore the different ways people express care and affection.",
    "Practise expressing emotional needs in clear, respectful ways.",
    "Build understanding by listening and responding with empathy."
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
    "Notice differences in emotional expression through reflection and discussion.",
    "Explore needs and practise clearer communication in everyday situations.",
    "Use empathy and awareness to support stronger connection."
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
