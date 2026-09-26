// src/app/Components/LanguageContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    availableForNewProjects: "Available for new opportunities",
    heroTitle: "Malik Kashan",
    heroSubtitle: "Build a Faster, Better Website for Your Business",
    heroDesc: "I help businesses build modern, responsive and high-performance websites and web applications that look professional, perform well and help turn visitors into customers.",
    downloadCv: "Download CV",
    getAQuote: "Let's Talk",
    startYourProject: "Start Your Project",
    viewMyWork: "View My Work",
    coreOfferings: "Core Offerings",
    servicesHeading: "Web Solutions Built Around Your Business",
    servicesDesc: "From high-converting business websites to scalable web applications, I build fast, maintainable digital experiences focused on performance, usability, and measurable results.",
    exploreService: "Explore Service",
    navHome: "Home",
    navAbout: "About",
    navWork: "Work",
    navBlog: "Blog",
    navFaq: "FAQ",
    navServices: "Services",
    navContact: "Contact",
    letsTalk: "Let's Talk",
    searchPlaceholder: "Search projects, services, articles...",
    customDevelopment: "Custom Development",
    cmsOptimization: "CMS & Optimization",
    quickLinks: "Quick Links",
    allRightsReserved: "All Rights Reserved",
    backToTop: "Back To Top ↑",
    trustItems: [
      "Pakistan Based & Worldwide Clients",
      "Fast Communication & Transparent Workflow",
      "Performance-First Development (Core Web Vitals)",
      "100% Responsive Across All Devices",
      "Secure & Clean Maintainable Code",
    ],
  },
  ur: {
    availableForNewProjects: "نئے پروجیکٹس کے لیے دستیاب",
    heroTitle: "ملک کاشان",
    heroSubtitle: "اپنے کاروبار کے لیے تیز تر اور بہتر ویب سائٹ بنائیں",
    heroDesc: "میں کاروباروں کو جدید، ذمہ دار اور اعلیٰ کارکردگی والی ویب سائٹس اور ویب ایپلیکیشنز بنانے میں مدد کرتا ہوں جو پیشہ ورانہ نظر آتی ہیں اور آنے والے زائرین کو گاہکوں میں تبدیل کرتی ہیں۔",
    downloadCv: "سی وی ڈاؤن لوڈ کریں",
    getAQuote: "رابطہ کریں",
    startYourProject: "اپنا پروجیکٹ شروع کریں",
    viewMyWork: "میرا کام دیکھیں",
    coreOfferings: "بنیادی خدمات",
    servicesHeading: "آپ کے کاروبار کے لیے تیار کردہ ویب حل",
    servicesDesc: "اعلیٰ درجے کی کاروباری ویب سائٹس سے لے کر اسکیل ایبل ویب ایپلیکیشنز تک، میں کارکردگی، استعمال میں آسانی اور قابل پیمائش نتائج پر مرکوز تیز رفتار ڈیجیٹل تجربات تیار کرتا ہوں۔",
    exploreService: "مزید دیکھیں",
    navHome: "گھر",
    navAbout: "تعارف",
    navWork: "پروجیکٹس",
    navBlog: "بلاگ",
    navFaq: "سوالات",
    navServices: "خدمات",
    navContact: "رابطہ",
    letsTalk: "بات کریں",
    searchPlaceholder: "پروجیکٹس، خدمات، مضامین تلاش کریں...",
    customDevelopment: "کسٹم ڈویلپمنٹ",
    cmsOptimization: "سی ایم ایس اور آپٹیمائزیشن",
    quickLinks: "فوری لنکس",
    allRightsReserved: "تمام حقوق محفوظ ہیں",
    backToTop: "اوپر واپس جائیں ↑",
    trustItems: [
      "پاکستان میں مقیم اور عالمی کلائنٹس",
      "تیز رفتار مواصلات اور شفاف ورک فلو",
      "کارکردگی-فرسٹ ڈویلپمنٹ",
      "تمام آلات پر 100% ریسپانسیو",
      "محفوظ اور صاف ستھرا کوڈ",
    ],
  },
  es: {
    availableForNewProjects: "Disponible para nuevos proyectos",
    heroTitle: "Malik Kashan",
    heroSubtitle: "Construye un sitio web mejor y más rápido para tu negocio",
    heroDesc: "Ayudo a las empresas a construir sitios web y aplicaciones web modernos, responsivos y de alto rendimiento.",
    downloadCv: "Descargar CV",
    getAQuote: "Hablemos",
    startYourProject: "Iniciar Proyecto",
    viewMyWork: "Ver Trabajos",
    coreOfferings: "Servicios Clave",
    servicesHeading: "Soluciones Web Adaptadas a tu Negocio",
    servicesDesc: "Desde sitios web comerciales hasta aplicaciones web escalables, desarrollo experiencias digitales rápidas y eficientes.",
    exploreService: "Explorar Servicio",
    navHome: "Inicio",
    navAbout: "Acerca de",
    navWork: "Proyectos",
    navBlog: "Blog",
    navFaq: "Preguntas",
    navServices: "Servicios",
    navContact: "Contacto",
    letsTalk: "Hablemos",
    searchPlaceholder: "Buscar proyectos, servicios, artículos...",
    customDevelopment: "Desarrollo Personalizado",
    cmsOptimization: "CMS y Optimización",
    quickLinks: "Enlaces Rápidos",
    allRightsReserved: "Todos los derechos reservados",
    backToTop: "Volver arriba ↑",
    trustItems: [
      "Clientes en Pakistán y todo el mundo",
      "Comunicación rápida y flujo transparente",
      "Desarrollo enfocado en rendimiento",
      "100% Responsivo en todos los dispositivos",
      "Código seguro y mantenible",
    ],
  },
  ar: {
    availableForNewProjects: "متاح لمشاريع جديدة",
    heroTitle: "مالك كشان",
    heroSubtitle: "ابنِ موقعاً أسرع وأفضل لعملك التجاري",
    heroDesc: "أساعد الشركات في بناء مواقع وتطبيقات ويب حديثة ومتجاوبة وعالية الأداء تبدو احترافية.",
    downloadCv: "تحميل السيرة الذاتية",
    getAQuote: "تواصل معي",
    startYourProject: "ابدأ مشروعك",
    viewMyWork: "عرض أعمالي",
    coreOfferings: "الخدمات الأساسية",
    servicesHeading: "حلول ويب مصممة خصيصاً لعملك",
    servicesDesc: "من مواقع الشركات إلى تطبيقات الويب القابلة للتطوير، أبتكر تجارب رقمية سريعة وقابلة للصيانة تركز على الأداء.",
    exploreService: "استكشاف الخدمة",
    navHome: "الرئيسية",
    navAbout: "من نحن",
    navWork: "الأعمال",
    navBlog: "المدونة",
    navFaq: "الأسئلة الشائعة",
    navServices: "الخدمات",
    navContact: "اتصل بنا",
    letsTalk: "لننتحدث",
    searchPlaceholder: "البحث في المشاريع والخدمات والمقالات...",
    customDevelopment: "التطوير المخصص",
    cmsOptimization: "نظام إدارة المحتوى والتحسين",
    quickLinks: "روابط سريعة",
    allRightsReserved: "جميع الحقوق محفوظة",
    backToTop: "العودة إلى الأعلى ↑",
    trustItems: [
      "عملاء في باكستان وفي جميع أنحاء العالم",
      "اتصال سريع وعمل شفاف",
      "تطوير يركز على الأداء",
      "متجاوب 100% على جميع الأجهزة",
      "كود آمن وقابل للصيانة",
    ],
  },
  fr: {
    availableForNewProjects: "Disponible pour nouveaux projets",
    heroTitle: "Malik Kashan",
    heroSubtitle: "Créez un site web plus rapide et meilleur pour votre entreprise",
    heroDesc: "J'aide les entreprises à créer des sites web et des applications web modernes, performants et responsifs.",
    downloadCv: "Télécharger CV",
    getAQuote: "Parlons-en",
    startYourProject: "Démarrer le Projet",
    viewMyWork: "Voir mes Travaux",
    coreOfferings: "Offres Clés",
    servicesHeading: "Solutions Web Conçues pour Votre Entreprise",
    servicesDesc: "Des sites web professionnels aux applications web évolutives, je crée des expériences numériques rapides et performantes.",
    exploreService: "Explorer le Service",
    navHome: "Accueil",
    navAbout: "À propos",
    navWork: "Projets",
    navBlog: "Blog",
    navFaq: "FAQ",
    navServices: "Services",
    navContact: "Contact",
    letsTalk: "Parlons-en",
    searchPlaceholder: "Rechercher projets, services, articles...",
    customDevelopment: "Développement Sur Mesure",
    cmsOptimization: "CMS et Optimisation",
    quickLinks: "Liens Rapides",
    allRightsReserved: "Tous droits réservés",
    backToTop: "Retour en haut ↑",
    trustItems: [
      "Clients au Pakistan et mondiaux",
      "Communication rapide et transparente",
      "Performance prioritaire",
      "100% Responsive sur tous les appareils",
      "Code sécurisé et maintenable",
    ],
  },
  de: {
    availableForNewProjects: "Verfügbar für neue Projekte",
    heroTitle: "Malik Kashan",
    heroSubtitle: "Erstellen Sie eine schnellere und bessere Website für Ihr Unternehmen",
    heroDesc: "Ich helfe Unternehmen dabei, moderne, responsive und leistungsstarke Websites und Webanwendungen zu entwickeln.",
    downloadCv: "CV Herunterladen",
    getAQuote: "Lass uns reden",
    startYourProject: "Projekt Starten",
    viewMyWork: "Arbeiten Ansehen",
    coreOfferings: "Kernangebote",
    servicesHeading: "Weblösungen, die auf Ihr Unternehmen zugeschnitten sind",
    servicesDesc: "Von geschäftsorientierten Websites bis hin zu skalierbaren Webanwendungen entwickle ich schnelle und wartbare digitale Erlebnisse.",
    exploreService: "Service Erkunden",
    navHome: "Startseite",
    navAbout: "Über mich",
    navWork: "Projekte",
    navBlog: "Blog",
    navFaq: "FAQ",
    navServices: "Dienstleistungen",
    navContact: "Kontakt",
    letsTalk: "Lass uns reden",
    searchPlaceholder: "Projekte, Services, Artikel suchen...",
    customDevelopment: "Individuelle Entwicklung",
    cmsOptimization: "CMS & Optimierung",
    quickLinks: "Schnelllinks",
    allRightsReserved: "Alle Rechte vorbehalten",
    backToTop: "Nach oben ↑",
    trustItems: [
      "Kunden in Pakistan und weltweit",
      "Schnelle Kommunikation",
      "Leistungsoptimierte Entwicklung",
      "100% Responsive auf allen Geräten",
      "Sicherer und sauberer Code",
    ],
  },
};

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") || "en";
    setLangState(saved);
    const dir = saved === "ur" || saved === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = saved;
    document.documentElement.dir = dir;
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("portfolio_lang", newLang);
    const dir = newLang === "ur" || newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
    document.documentElement.dir = dir;
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
