# AdCam Digital — Corporate Marketing Website

## Overview

Official corporate marketing website for **AdCam Digital Private Limited** (`www.adcamdigital.com`).
AdCam Digital is a performance-driven digital advertising, traffic generation, and digital marketing solutions provider.

---

## Brand & Entity Details

- **Legal Entity:** AdCam Digital Private Limited
- **Brand:** AdCam Digital
- **Founders:** Nitesh Kumar Bagla & Shadab Shamim
- **Headquarters:** 198 ML Bagla Sadan, ICR Road, Babhantoli, Giridih, Jharkhand 815301, India
- **Contact:** `adcamdigital@gmail.com` | `+91 94301 00937` / `+91 70286 87726`
- **Official Website:** [https://www.adcamdigital.com](https://www.adcamdigital.com)
- **Technology & Innovation Partner:** NextLab Innovations ([https://nextlabinnovations.tech](https://nextlabinnovations.tech))

---

## Project Structure

```text
ADCAM-NEW/
├── index.html                      # Homepage (Core Corporate Landing Experience)
├── 404.html                        # 404 Error Page
├── robots.txt                      # Search Engine Access Rules
├── sitemap.xml                     # Search Engine Sitemap Index
├── start-server.bat                # Windows Local Development Server Launcher
├── start-server.ps1                # PowerShell Local Development Server Launcher
├── README.md                       # Project Documentation
├── .gitignore                      # Git Version Control Exclusions
│
├── pages/
│   ├── about.html                  # About Us (Company Story, Mission, Leadership)
│   ├── services.html               # Services (Performance Marketing, Traffic, Email, Social, Media)
│   ├── ecosystem.html              # Ecosystem & Technology Partnership (NextLab Innovations)
│   ├── contact.html                # Contact Us (Business Inquiries & Verified Contacts)
│   ├── privacy-policy.html         # Privacy Policy
│   └── terms.html                  # Terms and Conditions of Service
│
├── assets/
│   ├── images/
│   │   ├── brand/                  # Official AdCam Logos & Brand Assets
│   │   ├── partners/               # Technology Partner Logos (NextLab Innovations)
│   │   └── services/               # Service & Media Icons
│   └── icons/                      # Favicons & Web Icons
│
├── css/
│   ├── variables.css               # Design Token System (Colors, Spacing, Typography)
│   ├── reset.css                   # Modern CSS Reset
│   ├── base.css                    # Base Element Styles
│   ├── typography.css              # Typography Scale & Classes
│   ├── layout.css                  # Grid, Flex, Container Primitives
│   ├── components.css              # Buttons, Cards, Badges, CTA Blocks
│   ├── navigation.css              # Header, Desktop Nav & Mobile Panel
│   ├── footer.css                  # Site Footer & Partner Strip
│   ├── ecosystem.css               # Ecosystem Flow Diagrams & Partner Features
│   ├── animations.css              # Scroll Reveal & Micro-Interactions
│   ├── responsive.css              # Responsive Breakpoint Rules & WCAG Touch Targets
│   └── pages/                      # Page-Specific Stylesheets
│       ├── home.css
│       ├── about.css
│       ├── services.css
│       ├── ecosystem.css
│       └── contact.css
│
├── js/
│   ├── config.js                   # Application Public Configuration
│   ├── navigation.js               # Mobile Menu, Scroll State, Focus Trap
│   ├── animations.js               # IntersectionObserver Scroll Reveal
│   ├── interactions.js             # Accordions, Tabs, Smooth Scroll
│   └── main.js                     # Application Entry & Bootstrap
│
└── data/
    └── site-config.js              # Centralized Company & Service Metadata
```

---

## Local Development Server

Run the local web server using either launcher:

- **Windows Batch:** Double-click `start-server.bat`
- **PowerShell:** Run `.\start-server.ps1`

Server starts on `http://localhost:3000` and automatically opens in your default browser.
