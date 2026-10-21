// Replace these placeholders with the client's verified contact details before publishing.
const ESSVI_CONTACT = {
  whatsappNumber: "+919567709818", // Country code + number, digits only
  phoneNumber: "+919567709818",
  email: "essvi.international@gmail.com",
  facebookUrl: "https://www.facebook.com/REPLACE-WITH-OFFICIAL-PAGE",
  instagramUrl: "https://www.instagram.com/REPLACE-WITH-OFFICIAL-PROFILE"
};
const contactLinks = {
  whatsapp: { href: `https://wa.me/${ESSVI_CONTACT.whatsappNumber}`, ready: !ESSVI_CONTACT.whatsappNumber.includes("X"), text: "Start a WhatsApp chat" },
  email: { href: `mailto:${ESSVI_CONTACT.email}`, ready: !ESSVI_CONTACT.email.includes("example.com"), text: ESSVI_CONTACT.email },
  phone: { href: `tel:${ESSVI_CONTACT.phoneNumber.replace(/[^+\\d]/g, "")}`, ready: !ESSVI_CONTACT.phoneNumber.includes("X"), text: ESSVI_CONTACT.phoneNumber },
  facebook: { href: ESSVI_CONTACT.facebookUrl, ready: !ESSVI_CONTACT.facebookUrl.includes("REPLACE-WITH"), text: "Visit our Facebook page" },
  instagram: { href: ESSVI_CONTACT.instagramUrl, ready: !ESSVI_CONTACT.instagramUrl.includes("REPLACE-WITH"), text: "Visit our Instagram profile" }
};
document.querySelectorAll("[data-contact-link]").forEach((link) => {
  const key = link.dataset.contactLink;
  const item = contactLinks[key];
  if (!item) return;
  link.href = item.href;
  if (!item.ready) {
    link.classList.add("contact-link-placeholder");
    link.title = "Add the client's verified contact details in script.js before publishing.";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Please add the client's verified " + key + " details in script.js before publishing this website.");
    });
  }
  const text = link.querySelector("[data-contact-text]");
  if (text && item.ready) text.textContent = item.text;
});

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
