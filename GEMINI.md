# 📘 PROJECT BLUEPRINT: Yusuf Ramadani Portfolio (v2 - React Migration)

> **Status:** ✅ Completed  
> **Last Updated:** Jan 7, 2026

## 1. Project Overview
**Name:** Yusuf Ramadani Portfolio
**Role:** Web Developer & Frontend Developer
**Theme:** Dark, Futuristic, Galaxy/Space, Glassmorphism.
**Key Concept:** Interactive storytelling with high-end micro-interactions using React Hooks & Tailwind v4.

## 2. Tech Stack
* **Core:** React 19 (Vite)
* **Styling:** Tailwind CSS v4.1
* **Icons:** `react-icons/fa`
* **Animation:** Custom CSS Keyframes & React Hooks.

---

## 3. Project Structure
```
src/
├── components/
│   ├── Global/
│   │   ├── Preloader.jsx       ✅ Done
│   │   ├── ParticleBg.jsx      ✅ Done
│   │   ├── CustomCursor.jsx    ✅ Done
│   │   └── Navbar.jsx          ✅ Done
│   └── Sections/
│       ├── Hero.jsx            ✅ Done
│       ├── About.jsx           ✅ Done
│       ├── Experience.jsx      ✅ Done
│       ├── Projects.jsx        ✅ Done
│       └── Contact.jsx         ✅ Done
├── hooks/
│   └── useHackerEffect.js      ✅ Done
├── App.jsx                     ✅ Integrated
└── index.css                   ✅ Styled
```

---

## 4. Implementation Roadmap

### Phase 1: Setup & Configuration (✅ Done)
- [x] Initialize Vite + React project.
- [x] Install Tailwind CSS v4 & Plugin.
- [x] Configure `vite.config.js`.

### Phase 2: Assets & Utilities (✅ Done)
- [x] Install Icons: `react-icons`.
- [x] Create project folder structure.
- [x] Implement `useHackerEffect` hook.

### Phase 3: Component Development (✅ Done)
- [x] **Global Components:** Preloader, ParticleBg, CustomCursor, Navbar.
- [x] **Hero Section:** 3D Tilt & Typing effect.
- [x] **About Section:** Orbit System & Background Floating Icons.
- [x] **Experience Section:** SVG Progress Rings & Timeline.
- [x] **Projects Section:** Stacked Sticky Cards.
- [x] **Contact Section:** Futuristic Footer.

---

## 5. Summary
The portfolio is now fully migrated to React 19 with Tailwind CSS v4. All interactive features like the 3D tilt, hacker text, orbit system, and sticky scroll are functional.