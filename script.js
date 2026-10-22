
const ESSVI_CONTACT = {
  whatsappNumber: "919567709818",
  phoneNumber: "9567709818",
  email: "essvi.international@gmail.com",

  // Replace these with your official social media URLs.
  facebookUrl: "https://www.facebook.com/REPLACE-WITH-OFFICIAL-PAGE",
  instagramUrl: "https://www.instagram.com/REPLACE-WITH-OFFICIAL-PROFILE"
};

// 2. WHATSAPP PREFILLED MESSAGE
const whatsappMessage =
  "Hey, I'm interested in ESSVI Internationals' coco peat products. Please share your product details and quotation.";

// 3. FORMSPREE CONFIGURATION
// Replace YOUR_FORM_ID with the ID from your Formspree dashboard.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

// 4. CONTACT LINKS
const contactLinks = {
  whatsapp: {
    href: `https://wa.me/${ESSVI_CONTACT.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`,
    ready:
      /^\d{10,15}$/.test(
        ESSVI_CONTACT.whatsappNumber.replace(/\D/g, "")
      ),
    text: "Chat with us on WhatsApp"
  },

  email: {
    href: `mailto:${ESSVI_CONTACT.email}`,
    ready:
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ESSVI_CONTACT.email),
    text: ESSVI_CONTACT.email
  },

  phone: {
    href: `tel:${ESSVI_CONTACT.phoneNumber.replace(/[^\d+]/g, "")}`,
    ready: /^\+?\d{10,15}$/.test(
      ESSVI_CONTACT.phoneNumber.replace(/[^\d+]/g, "")
    ),
    text: ESSVI_CONTACT.phoneNumber
  },

  facebook: {
    href: ESSVI_CONTACT.facebookUrl,
    ready: !ESSVI_CONTACT.facebookUrl.includes("REPLACE-WITH"),
    text: "Visit our Facebook page"
  },

  instagram: {
    href: ESSVI_CONTACT.instagramUrl,
    ready: !ESSVI_CONTACT.instagramUrl.includes("REPLACE-WITH"),
    text: "Visit our Instagram profile"
  }
};

// Apply links and display the actual contact details.
document.querySelectorAll("[data-contact-link]").forEach((link) => {
  const key = link.dataset.contactLink;
  const item = contactLinks[key];

  if (!item) return;

  const textElement = link.querySelector("[data-contact-text]");

  if (item.ready) {
    link.href = item.href;

    if (textElement) {
      textElement.textContent = item.text;
    }

    // Open external messaging/social links safely in a new tab.
    if (["whatsapp", "facebook", "instagram"].includes(key)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  } else {
    link.classList.add("contact-link-placeholder");
    link.title = `Add the correct ${key} details before publishing.`;

    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert(
        `Please add the correct ${key} details in script.js.`
      );
    });
  }
});

// 5. MOBILE NAVIGATION MENU
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  if (!mainNav) return;

  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

// Close the mobile menu when a navigation link is clicked.
mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});

// Close the menu using the Escape key.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mainNav?.classList.contains("open")) {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  }
});

// 6. PRODUCT LINKS
// Automatically select the product clicked by the visitor.
document.querySelectorAll("[data-product]").forEach((link) => {
  link.addEventListener("click", () => {
    const productSelect = document.querySelector("#productSelect");

    if (productSelect) {
      productSelect.value = link.dataset.product;
    }
  });
});

// 7. AUTOMATIC COPYRIGHT YEAR
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 8. QUOTATION FORM — FORMSPREE
const quoteForm = document.querySelector("#quoteForm");
const formStatus = document.querySelector("#formStatus");

if (quoteForm) {
  quoteForm.method = "POST";

  // Set the form endpoint from the configuration above.
  quoteForm.action = FORMSPREE_ENDPOINT;

  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Check required fields and valid email format.
    if (!quoteForm.reportValidity()) return;

    // Stop submission until a real Formspree endpoint is configured.
    if (
      !FORMSPREE_ENDPOINT ||
      FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")
    ) {
      if (formStatus) {
        formStatus.textContent =
          "The quotation form is not configured yet. Add your Formspree form ID in script.js.";
      }
      return;
    }

    const submitButton = quoteForm.querySelector(
      'button[type="submit"]'
    );

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending enquiry...";
    }

    if (formStatus) {
      formStatus.textContent = "";
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(quoteForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        if (formStatus) {
          formStatus.textContent =
            "Thank you! Your enquiry has been submitted successfully. Our team will contact you soon.";
        }

        quoteForm.reset();
      } else {
        const result = await response.json().catch(() => ({}));

        if (formStatus) {
          formStatus.textContent =
            result.errors
              ?.map((error) => error.message)
              .join(" ") ||
            "We could not submit your enquiry. Please try again.";
        }
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent =
          "Connection error. Please check your internet connection and try again.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML =
          'Prepare enquiry <span>↗</span>';
      }
    }
  });
}
