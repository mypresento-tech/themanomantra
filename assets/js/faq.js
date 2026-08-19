document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-icon");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Accordion behaviour: close the others first.
      faqItems.forEach((other) => {
        other.classList.remove("active");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-icon").textContent = "+";
      });

      if (!isOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        icon.textContent = "−";
      }
    });
  });
});
