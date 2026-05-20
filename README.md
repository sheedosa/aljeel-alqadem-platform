# Aljeel Alqadem — B2B Wholesale Platform

A mobile-first B2B wholesale storefront prototype for **Jeel Qadem**, presented inside an iOS device frame. Bilingual (Arabic / English with full RTL flip), with tiered volume pricing as the hero feature.

## Live demo

Once GitHub Pages finishes building, the prototype will be live at:

**https://sheedosa.github.io/aljeel-alqadem-platform/**

## Run locally

The app loads `.jsx` via Babel standalone, so it must be served over HTTP (not opened directly from `file://`):

```bash
cd "/path/to/aljeel-alqadem-platform"
python3 -m http.server 8000
# then open http://localhost:8000
```

## What's inside

- `index.html` / `Jeel Qadem.html` — entry point (loads React 18 + Babel via CDN)
- `ios-frame.jsx` — iOS device frame wrapper
- `tweaks-panel.jsx` — design tweak panel
- `src/app.jsx` — top-level app state + routing
- `src/screens.jsx` — Home, Categories, Brand, Product, Cart, Orders, Account
- `src/components.jsx` — shared UI primitives (header, chips, cards, stepper, etc.)
- `src/data.jsx` — dummy catalog (electronics: XO, LDNIO, Baseus, Anker)
- `src/styles.css` — design tokens, typography, layout rules
- `assets/` — Jeel Qadem logos + brand logos

## Features

- Mobile-first iOS-framed prototype
- Bilingual AR / EN with one-tap RTL flip
- Brand carousel (XO → LDNIO → Baseus → Anker)
- Shop-by-category grid
- Tiered / volume pricing with price breaks at qty
- Case-pack quantity stepper
- Cart management with running total
- Order tracking states
- Search + filtering
- Login / account state

## Origin

Designed in Claude Design (claude.ai/design) and exported as an HTML/CSS/JS prototype.
