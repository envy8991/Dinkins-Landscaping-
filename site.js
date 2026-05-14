import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";
import { mergeSiteContent } from "./site-content.js";

let db = null;

if (isFirebaseConfigured()) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

const setText = (selector, value, allowHtml = false) => {
  document.querySelectorAll(selector).forEach((element) => {
    if (allowHtml) {
      element.innerHTML = value || "";
    } else {
      element.textContent = value || "";
    }
  });
};

const setHref = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    if (value) element.setAttribute("href", value);
  });
};

function serviceCard(service, index) {
  const gridPlacement = index === 4 ? " lg:col-start-2" : "";
  return `
    <div class="group glass-card relative p-10 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300${gridPlacement}">
      <div class="h-16 w-16 rounded-xl bg-orange-50 text-brandOrange flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-brandOrange group-hover:text-white transition-all duration-300">
        <i class="fa-solid ${service.icon || "fa-seedling"}"></i>
      </div>
      <h3 class="text-2xl font-black font-heading mb-4 text-brandDark uppercase tracking-tight">${escapeHtml(service.title)}</h3>
      <p class="text-slate-600 leading-relaxed">${escapeHtml(service.description)}</p>
    </div>`;
}

function photoCard(photo, index) {
  const staggerClass = index % 2 === 1 ? " md:translate-y-10" : "";
  const url = photo.url || "";
  const alt = photo.alt || "Dinkins Land Management project photo";
  return `
    <a href="${escapeAttribute(url)}" target="_blank" rel="noopener noreferrer" class="portfolio-card group block overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl shadow-black/30${staggerClass}" aria-label="Open larger view of ${escapeAttribute(alt)}">
      <img src="${escapeAttribute(url)}" alt="${escapeAttribute(alt)}" class="h-80 w-full object-cover md:h-[31rem]" loading="lazy" />
    </a>`;
}

function customSection(section, index) {
  if (section.enabled === false) return "";
  const reversed = index % 2 === 1 ? " lg:[&>*:first-child]:order-2" : "";
  const image = section.imageUrl
    ? `<img src="${escapeAttribute(section.imageUrl)}" alt="${escapeAttribute(section.imageAlt || section.title || "Custom website section")}" class="h-80 w-full rounded-[2rem] object-cover shadow-2xl" loading="lazy" />`
    : "";
  const button = section.buttonText && section.buttonHref
    ? `<a href="${escapeAttribute(section.buttonHref)}" class="inline-flex items-center gap-3 bg-brandOrange px-7 py-3 rounded-full font-heading text-sm uppercase font-black text-white hover:bg-orange-600 transition-all">${escapeHtml(section.buttonText)} <i class="fa-solid fa-arrow-right"></i></a>`
    : "";
  return `
    <section class="py-20 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center${reversed}">
        <div>${image}</div>
        <div class="glass-card relative rounded-3xl p-8 md:p-10">
          <p class="font-heading text-sm uppercase tracking-[0.32em] text-brandOrange mb-4 font-black">${escapeHtml(section.eyebrow || "More From Dinkins")}</p>
          <h2 class="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight mb-5">${escapeHtml(section.title)}</h2>
          <p class="text-lg text-slate-600 leading-relaxed mb-8 whitespace-pre-line">${escapeHtml(section.body)}</p>
          ${button}
        </div>
      </div>
    </section>`;
}

function renderSite(content) {
  setText('[data-content="business.phoneDisplay"]', content.business.phoneDisplay);
  setText('[data-content="business.email"]', content.business.email);
  setHref('[data-link="business.phoneHref"]', content.business.phoneHref);
  setHref('[data-link="business.emailHref"]', content.business.emailHref);
  setHref('[data-link="business.facebookUrl"]', content.business.facebookUrl);
  setText('[data-content="hero.eyebrow"]', content.hero.eyebrow);
  setText('[data-content="hero.titleHtml"]', content.hero.titleHtml, true);
  setText('[data-content="hero.description"]', content.hero.description);
  setText('[data-content="services.heading"]', content.services.heading);
  setText('[data-content="portfolio.eyebrow"]', content.portfolio.eyebrow);
  setText('[data-content="portfolio.title"]', content.portfolio.title);
  setText('[data-content="portfolio.description"]', content.portfolio.description);
  setText('[data-content="portfolio.ctaText"]', content.portfolio.ctaText);
  setText('[data-content="contact.heading"]', content.contact.heading);
  setText('[data-content="contact.description"]', content.contact.description);
  setText('[data-content="footer.tagline"]', content.footer.tagline);

  const servicesGrid = document.getElementById("servicesGrid");
  if (servicesGrid) servicesGrid.innerHTML = content.services.items.map(serviceCard).join("");

  const portfolioGrid = document.getElementById("portfolioGrid");
  if (portfolioGrid) portfolioGrid.innerHTML = content.portfolio.photos.map(photoCard).join("");

  const customSections = document.getElementById("customSections");
  if (customSections) customSections.innerHTML = content.customSections.map(customSection).join("");
}

async function loadSiteContent() {
  if (!db) {
    renderSite(mergeSiteContent());
    return;
  }

  try {
    const snapshot = await getDoc(doc(db, "siteContent", "home"));
    renderSite(mergeSiteContent(snapshot.exists() ? snapshot.data() : {}));
  } catch (error) {
    console.warn("Could not load editable site content. Showing default content.", error);
    renderSite(mergeSiteContent());
  }
}

window.saveQuoteRequest = async (quoteRequest) => {
  if (!db) return null;
  return addDoc(collection(db, "quoteRequests"), {
    ...quoteRequest,
    status: "New",
    ownerNotes: "",
    source: "website",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value = "") {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

loadSiteContent();
