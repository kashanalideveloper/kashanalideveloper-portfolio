// src/app/lib/site.js
// Central site configuration — keep contact details in one place.

export const SITE = {
  name: "Malik Kashan",
  email: "kashanalikot@gmail.com",
  phoneDisplay: "+92 328 1944386",
  phoneIntl: "+923281944386",
  whatsappNumber: "923281944386",
  github: "https://github.com/kashanalideveloper/",
  url: "https://kashanalideveloper-portfolio.vercel.app/",
  cvFile: "/Malik_Kashan_CV_Final.pdf",
  location: {
    city: "Lahore",
    region: "Punjab",
    country: "Pakistan",
    label: "Lahore, Pakistan",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Lahore%2C%20Punjab%2C%20Pakistan",
  },
};

// Pre-filled message used for every WhatsApp link on the site.
export const WHATSAPP_MESSAGE =
  "Hello Kashan, I found your portfolio and I'm interested in discussing a website/web development project. I'd like to know more about your services and discuss my requirements. Let's talk!";

// Opens WhatsApp universally across mobile and desktop.
export const whatsappLink = (text = WHATSAPP_MESSAGE) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;