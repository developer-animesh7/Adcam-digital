/**
 * ADCAM DIGITAL — SITE CONFIGURATION DATA
 * data/site-config.js
 *
 * Verified company data for AdCam Digital Private Limited.
 */

const ADCAM_SITE_DATA = {
  company: {
    legalName: "AdCam Digital Private Limited",
    shortName: "AdCam Digital",
    tagline: "Performance-Driven Digital Advertising & Growth",
    foundedYear: "2024",
    founders: [
      { name: "Nitesh Kumar Bagla", role: "Founder" },
      { name: "Shadab Shamim", role: "Founder" }
    ],
    mission: "To drive high-quality traffic for our advertisers while fostering long-term, collaborative relationships with our publishing partners, leveraging innovative digital tools and strategies to help businesses grow globally.",
    headquarters: {
      addressLine1: "198 ML Bagla Sadan, ICR Road",
      addressLine2: "Babhantoli",
      city: "Giridih",
      state: "Jharkhand",
      postalCode: "815301",
      country: "India",
      formatted: "198 ML Bagla Sadan, ICR Road, Babhantoli, Giridih, Jharkhand 815301, India"
    },
    contact: {
      primaryEmail: "adcamdigital@gmail.com",
      generalEmail: "adcamdigital@gmail.com",
      phone1: "+91 9430100937",
      phone2: "+91 7028687726",
      phoneFormatted: "+91 94301 00937 / +91 70286 87726",
      website: "https://www.adcamdigital.com",
      businessHours: "Monday – Friday: 9:00 AM – 6:00 PM IST"
    }
  },

  partners: {
    technology: {
      name: "NextLab Innovations",
      role: "Technology & Innovation Partner",
      url: "https://nextlabinnovations.tech",
      description: "Technology solutions and digital engineering expertise supporting the AdCam Digital advertising ecosystem with scalable digital infrastructure."
    }
  },

  navigation: [
    { label: "Home", href: "index.html", key: "home" },
    { label: "About Us", href: "pages/about.html", key: "about" },
    { label: "Services", href: "pages/services.html", key: "services" },
    { label: "Ecosystem", href: "pages/ecosystem.html", key: "ecosystem" },
    { label: "Contact Us", href: "pages/contact.html", key: "contact" }
  ],

  services: [
    {
      id: "performance-marketing",
      number: "01",
      title: "Performance Marketing",
      category: "ROI & Acquisition",
      summary: "Data-driven campaigns built on audience targeting, continuous testing, and live campaign optimization to maximize return on advertising spend.",
      highlights: ["Precision Audience Targeting", "Real-Time Tracking & Attribution", "Dynamic Budget Allocation", "Multi-KPI Optimization"]
    },
    {
      id: "traffic-generation",
      number: "02",
      title: "Traffic Generation",
      category: "Audience Reach",
      summary: "High-volume, qualified audience acquisition strategies connecting advertisers to intentional users across verified distribution networks.",
      highlights: ["Audience Quality Verification", "Channel Diversification", "Custom Traffic Sourcing", "Scalable Volume Delivery"]
    },
    {
      id: "email-marketing",
      number: "03",
      title: "Email Marketing",
      category: "Lifecycle & Retention",
      summary: "Strategic direct-to-inbox messaging designed to nurture customer relationships, deliver timely product updates, and drive repeat conversions.",
      highlights: ["Audience Segmentation", "Automated Drip Workflows", "Engaging Copy & Layouts", "Deliverability Management"]
    },
    {
      id: "social-media-marketing",
      number: "04",
      title: "Social Media Marketing",
      category: "Brand & Engagement",
      summary: "Compelling visual storytelling and multi-channel campaigns across leading social platforms to build brand recognition and engage qualified prospects.",
      highlights: ["Platform-Native Creative", "Audience Community Building", "Paid Social Amplification", "Engagement Analytics"]
    },
    {
      id: "advertising-marketing",
      number: "05",
      title: "Digital Advertising & Media",
      category: "Multi-Channel Media",
      summary: "Comprehensive multi-channel ad execution across search, display, and digital channels designed to create trust, elevate brand presence, and drive sales.",
      highlights: ["Cross-Channel Ad Execution", "High-Impact Visual Creatives", "Conversion-Focused Copy", "Channel Performance Audits"]
    },
    {
      id: "digital-strategy",
      number: "06",
      title: "Digital Strategy & Consulting",
      category: "Growth Architecture",
      summary: "End-to-end consulting that aligns marketing goals, technology choices, and channel execution into a cohesive roadmap for sustainable business growth.",
      highlights: ["Market & Competitor Analysis", "Growth Roadmap Development", "Analytics & Reporting Setup", "Partner Ecosystem Alignment"]
    },
    {
      id: "software-development",
      number: "07",
      title: "Website & Software Development",
      category: "Technology & Engineering",
      partner: "NextLab Innovations",
      summary: "Modern websites, web applications, and custom digital software solutions designed, developed, deployed, and maintained through our technology delivery partnership with NextLab Innovations.",
      highlights: ["Custom Web Development", "Web & Cloud Applications", "UI/UX & Product Design", "Software Architecture"]
    }
  ],

  testimonials: [
    {
      quote: "AdCam Digital transformed our online presence and drove incredible growth. We received long-term, quality traffic tailored to our needs.",
      author: "Verified E-Commerce Client",
      role: "Digital Growth Partner"
    },
    {
      quote: "The AdCam team is knowledgeable, professional, and a pleasure to work with. Their flexible terms and consistent communication made them an invaluable partner.",
      author: "Media & Publishing Partner",
      role: "Network Partner"
    }
  ]
};

if (typeof window !== "undefined") {
  window.ADCAM_SITE_DATA = ADCAM_SITE_DATA;
}
