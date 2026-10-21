const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-product]").forEach((link) => {
  link.addEventListener("click", () => {
    const productSelect = document.querySelector("#productSelect");
    if (productSelect) productSelect.value = link.dataset.product;
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#quoteForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = `Product enquiry - ${data.get("product")}`;
  const body = [
    "ESSVI Internationals - Product / Export Enquiry",
    "",
    `Name: ${data.get("name")}`,
    `Company: ${data.get("company")}`,
    `Business email: ${data.get("email")}`,
    `Country / destination: ${data.get("country")}`,
    `Product interest: ${data.get("product")}`,
    `Estimated volume: ${data.get("volume") || "Not specified"}`,
    "",
    "Growing requirements / message:",
    data.get("message") || "Not specified"
  ].join("\n");

  // Replace this placeholder with the client's verified business email before launch.
  const businessEmail = "REPLACE-WITH-VERIFIED-EMAIL";
  const status = document.querySelector("#formStatus");

  if (businessEmail === "REPLACE-WITH-VERIFIED-EMAIL") {
    status.textContent = "The enquiry is ready, but the client’s verified business email must be added in script.js before this form can open a pre-addressed email.";
    const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    return;
  }

  window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
