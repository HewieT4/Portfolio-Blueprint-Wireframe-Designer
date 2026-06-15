# Interactive Blueprint & Wireframe Portfolio Designer

An interactive developer portfolio that reimagines the traditional "project cards and text" layout as a CAD software interface or architectural blueprint. Built to immediately demonstrate dual expertise in pixel-perfect frontend design and sound full-stack engineering logic.

---

## Table of Contents

- [Concept & Aesthetic](#concept--aesthetic)
- [Core Features](#core-features)
  - [1. Interactive Layout Controls](#1-interactive-layout-controls-viewport--theme-toggling)
  - [2. Mobile-Responsive Sub-Tab System](#2-mobile-responsive-sub-tab-system)
  - [3. Dynamic Skills Inventory & Filtering Deck](#3-dynamic-skills-inventory--filtering-deck)
  - [4. Animated Chronology Axis (Work Experience)](#4-animated-chronology-axis-work-experience)
  - [5. Payload-Driven Contact Gateway](#5-payload-driven-contact-gateway)
  - [6. Interactive System Architecture & Design Tokens Explorer](#6-interactive-system-architecture--design-tokens-explorer)
- [Design Tokens](#design-tokens)
- [Contact](#contact)

---

## Concept & Aesthetic

At its core, this site is a **developer's canvas** — a high-contrast workspace theme combining deep carbon grays, pure off-whites, and metallic gold accents.

| Element | Value |
|---|---|
| Background (Carbon) | `#050505` |
| Text (Off-White) | Pure off-white |
| Accent (Gold) | `#d0a080` |

### Dual-State Presentation Layer

Visitors can toggle the live portfolio view between two modes:

- **Wireframe / Blueprint Mode** — Displays container classes, CSS parameters, font tracking, relative spacing outlines, and margin telemetry, presenting the site as an annotated technical drawing.
- **Hi-Fi Mock Mode** — Displays a modern, polished, dark-themed live design interface, showing the finished product.

### Spec Inspector Integration

Every section of the portfolio is fully interactive. Clicking on any section — **Hero, About, Skills, Experience, or Contact Form** — opens a persistent **Blueprint Inspector Panel** alongside it, dynamically revealing:

- Engineering specs
- Design tokens
- Responsive breakpoints
- Design rationale
- Code snippets for that exact segment

---

## Core Features

### 1. Interactive Layout Controls (Viewport & Theme Toggling)

- Toggle the preview container between **Desktop, Tablet, and Mobile** presets to see how the site structure flows across viewports.
- A fully integrated **Blueprint / Hi-Fi switcher** lets visitors swap presentation modes instantly.
- A simulated **dark-theme toggle** reactively updates the layout's aesthetic indicators.

### 2. Mobile-Responsive Sub-Tab System

- **On wide desktop screens:** a side-by-side layout is used — the preview canvas on the left, and the Spec Inspector Panel on the right.
- **On narrow mobile devices:** side-by-side panels would break standard screen boundaries, so an elegant two-tab system is used instead:
  1. **Showcase Preview**
  2. **Spec Inspector**

  Clicking any section dynamically focus-shifts the mobile user to the Spec Inspector tab, letting recruiters inspect code blueprints smoothly even from a smartphone.

### 3. Dynamic Skills Inventory & Filtering Deck

- Categorizes and lists engineering competencies across **Frontend, Backend, and Infrastructure**.
- Visitors can filter items seamlessly.
- Hovering over or selecting an item dynamically renders design thresholds and current expertise levels.

### 4. Animated Chronology Axis (Work Experience)

- Displays professional history as a structured data spine.
- A live **"Timeline Crawler" particle** tracks down the left side of the screen, dynamically calculating simulated parsing indices that indicate how deep the visitor has navigated through the history.

### 5. Payload-Driven Contact Gateway

- A fully functional mock form styled like a **terminal packet router**.
- Submissions trigger a success-state simulation that visually outlines how a user-submitted contact payload is processed before being routed to the destination email.

### 6. Interactive System Architecture & Design Tokens Explorer

Additional tabs let users step away from the wireframe inspector to explore:

- **Live Architecture Flowchart** — a visual data and file map of the portfolio application itself.
- **Design System Token Deck** — a reference sheet of color hexes, font declarations, and border dimensions used throughout the site.

---

## Design Tokens

| Token | Description | Value |
|---|---|---|
| `--color-carbon` | Primary background | `#050505` |
| `--color-offwhite` | Primary text color | Off-white |
| `--color-gold` | Accent / highlight color | `#d0a080` |

---

## Contact

Submissions made through the Payload-Driven Contact Gateway are routed to:

📧 **sefellethekiso@gmail.com**
