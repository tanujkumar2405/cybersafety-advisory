# CyberSafety Advisory — 5-Page Website

A modern, professional, and fully responsive multi-page website for cyber fraud advisory and education.

## 📋 Project Overview

**Website Name:** CyberSafety Advisory  
**Purpose:** Cyber fraud awareness, incident guidance (advisory only), and digital safety education  
**Target Audience:** General public, cyber fraud victims, students, parents, professionals  
**Tech Stack:** HTML5 + CSS3 + Vanilla JavaScript (no frameworks, no backend)

---

## 🏗️ Website Structure

### 5 Main Pages

#### 1. **HOME PAGE** (`index.html`)
- Hero section with clear value statement and CTAs
- Trust indicators (mission, ethical commitment)
- Quick service cards linking to other pages
- FAQ section addressing common concerns
- CTA band encouraging contact

#### 2. **HOW WE HELP PAGE** (`how-we-help.html`)
- 5-step advisory process explained in detail:
  1. Calm & Assess
  2. Classify the Incident
  3. Guide Safe Actions
  4. Reporting Awareness
  5. Future Safety
- Incident decision helper (interactive buttons)
- "What we do vs. what we don't" clarity section

#### 3. **SAFETY RESOURCES PAGE** (`resources.html`)
- Immediate action checklist for active fraud
- Cyber hygiene best practices (6 categories):
  - Password Security
  - Mobile Security
  - Device Safety
  - Banking Safety
  - Email Protection
  - Social Media Safety
- 12 scam red flags identification list
- UPI & banking safety tips
- Social media protection steps
- Downloadable resources section

#### 4. **ABOUT US PAGE** (`about.html`)
- Mission and vision statements
- Student-led initiative explanation
- 6 core values (Empathy, Clarity, Privacy, Honesty, Education, Ethics)
- Ethical boundaries (Do's and Don'ts)
- Certifications (CSCU, ECSS)
- Transparency commitment

#### 5. **CONTACT US PAGE** (`contact.html`)
- Contact form with client-side validation
- Form fields: Name, Email, Phone, Incident Type, Description
- Forbidden word detection (OTP, password, etc.)
- Expectations setting section
- Emergency resources list
- Contact-specific FAQ (5 questions)

---

## 🎨 Design System

### Color Palette
- **Primary Blue:** `#0b4b8a` (deep, trustworthy)
- **Secondary Teal:** `#2a9d8f` (calm, supporting)
- **Background:** `#f7f9fb` (light, clean)
- **Text:** `#0f1723` (dark, readable)
- **Muted:** `#6b7280` (secondary text)

### Typography
- **Font Family:** Inter, system fonts
- **Base Font Size:** 16px
- **Line Height:** 1.5

### Spacing & Layout
- **Base Unit:** 18px
- **Max Width:** 1100px
- **Card Padding:** 18px–24px
- **Responsive breakpoints:** 640px, 900px

### Interactive Elements
- **Button padding:** 12px 16px (min-height: 44px)
- **Tap targets:** 44×44px minimum (mobile accessible)
- **Focus indicators:** 3px outline
- **Transitions:** 200ms–500ms
- **Animations:** Respect prefers-reduced-motion

---

## ⚙️ Technical Features

### Accessibility
✅ Semantic HTML5 markup  
✅ ARIA labels and roles  
✅ Keyboard navigation  
✅ Skip link  
✅ Color contrast WCAG AA  
✅ Mobile tap targets ≥44×44px  
✅ Proper heading hierarchy  
✅ Alt text for images  

### Responsiveness
- Mobile-first approach
- Breakpoints: 640px, 900px
- Grid-based layouts
- Hamburger menu on mobile
- Fluid typography

### JavaScript Features
- Navigation toggle (mobile menu)
- FAQ accordion with keyboard support
- Interactive incident decision helper
- Client-side form validation
- Downloadable checklist generation
- Scroll animations (Intersection Observer)
- Smooth scrolling with focus management
- Auto-updating copyright year

### Security & Privacy
✅ No external trackers  
✅ No analytics  
✅ No backend database  
✅ No payment processing  
✅ No data collection  
✅ No third-party scripts  
✅ Client-side validation only  
✅ Forbidden word filtering  

---

## 📁 File Structure

```
project-root/
├── index.html              # Home page
├── how-we-help.html       # 5-step process
├── resources.html         # Safety resources
├── about.html             # About us & values
├── contact.html           # Contact form
│
├── css/
│   └── style.css          # Main stylesheet (285+ lines)
│
├── js/
│   └── main.js            # All JavaScript (310+ lines)
│
├── img/
│   ├── logo.svg           # Logo
│   └── hero.svg           # Hero illustration
│
└── README.md              # This file
```

---

## 🚀 Features Implemented

✅ Modern responsive design  
✅ 5-page multi-page structure  
✅ Interactive FAQ accordion  
✅ Mobile hamburger menu  
✅ Scroll-triggered animations  
✅ Incident decision helper  
✅ Contact form with validation  
✅ Downloadable checklist  
✅ Comprehensive navigation  
✅ WCAG AA accessibility  
✅ Privacy-first approach  
✅ No backend required  

---

## 📱 Responsive Breakpoints

| Device | Width | Adjustments |
|--------|-------|------------|
| Mobile | <640px | 1-column, hamburger menu |
| Tablet | 640–900px | 2-column grids |
| Desktop | >900px | 3-column, full nav |

---

## 🚀 Getting Started

### View the Website
1. Open `index.html` in a web browser
2. Use the navigation menu to explore all 5 pages
3. Fill out forms or download resources

### Deploy
- Upload to static hosting (Netlify, GitHub Pages, etc.)
- No build process required
- No backend needed

### Customize
- **Colors:** Edit `:root` in `css/style.css`
- **Content:** Edit HTML files
- **Styles:** Modify `css/style.css`
- **Scripts:** Modify `js/main.js`

---

## 🔒 Legal & Ethical Standards

### Prohibited Phrases
❌ "Recovery," "Refund," "Guaranteed"  
❌ "Hack" without context  
❌ Impersonation of officials  

### Required Statements
✅ "Advisory and educational only"  
✅ "Not affiliated with banks/police/government"  
✅ "Do not handle funds or access accounts"  
✅ Clear ethical boundaries  

---

## 📄 License

CyberSafety Advisory © 2026. Student-led, non-profit cyber safety initiative.

**Last Updated:** January 3, 2026

