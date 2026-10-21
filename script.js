ESSVI Internationals — Contact Details
const ESSVI_CONTACT = {
  whatsappNumber: "919567709818", // Country code + number, digits only
  phoneNumber: "+919567709818",
  email: "essvi.international@gmail.com",
  facebookUrl: "https://www.facebook.com/REPLACE-WITH-OFFICIAL-PAGE",
  instagramUrl: "https://www.instagram.com/REPLACE-WITH-OFFICIAL-PROFILE"
};

const contactLinks = {
  whatsapp: {
    href: `https://wa.me/${ESSVI_CONTACT.whatsappNumber.replace(/\D/g, "")}`,
    ready: !ESSVI_CONTACT.whatsappNumber.includes("X"),
    text: "Start a WhatsApp chat"
  },

  email: {
    href: `mailto:${ESSVI_CONTACT.email}`,
    ready: !ESSVI_CONTACT.email.includes("example.com"),
    text: ESSVI_CONTACT.email
  },

  phone: {
    href: `tel:${ESSVI_CONTACT.phoneNumber.replace(/[^\d+]/g, "")}`,
    ready: !ESSVI_CONTACT.phoneNumber.includes("X"),
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

// Set up contact links
document.querySelectorAll("[data-contact-link]").forEach((link) => {
  const key = link.dataset.contactLink;
  const item = contactLinks[key];

  if (!item) return;

  link.href = item.href;

  if (!item.ready) {
    link.classList.add("contact-link-placeholder");
    link.title = "Add the official contact details before publishing.";

    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert(
        `Please add the official ${key} details in script.js before publishing.`
      );
    });
  }

  const text = link.querySelector("[data-contact-text]");

  if (text && item.ready) {
    text.textContent = item.text;
  }
});

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Product links preselect the product in the quotation form
document.querySelectorAll("[data-product]").forEach((link) => {
  link.addEventListener("click", () => {
    const productSelect = document.querySelector("#productSelect");

    if (productSelect) {
      productSelect.value = link.dataset.product;
    }
  });
});

// Automatically update copyright year
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Quotation form — submit enquiries using Formspree
const quoteForm = document.querySelector("#quoteForm");
const formStatus = document.querySelector("#formStatus");

quoteForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!quoteForm.reportValidity()) return;

  // This must match the endpoint from your Formspree dashboard.
  if (
    !quoteForm.action ||
    quoteForm.action.includes("YOUR_FORM_ID")
  ) {
    formStatus.textContent =
      "The quotation form is not configured yet. Please add your Formspree form endpoint.";
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
    const response = await fetch(quoteForm.action, {
      method: "POST",
      body: new FormData(quoteForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      if (formStatus) {
        formStatus.textContent =
          "Thank you! Your enquiry has been sent successfully. We will contact you soon.";
      }

      quoteForm.reset();
    } else {
      const result = await response.json().catch(() => ({}));

      if (formStatus) {
        formStatus.textContent =
          result.errors
            ?.map((error) => error.message)
            .join(" ") ||
          "We could not send your enquiry. Please try again.";
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
      submitButton.innerHTML = 'Prepare enquiry <span>↗</span>';
    }
  }
});
```
