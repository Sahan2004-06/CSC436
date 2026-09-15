# Static Foundations

**CSC 436 · Full-Stack Web Development · Project 1 of 6**

A cybersecurity-themed personal portfolio site built with semantic HTML,
modern CSS (Flexbox + Grid), and vanilla JavaScript. No frameworks, no build step —
pure browser-native code.

## Live URL

https://nimble-capybara-2af565.netlify.app

## What's built here

| Requirement | How it's met |
|---|---|
| Semantic HTML | `header`, `nav`, `main`, 4× `section`, `article`, `footer` — logical h1 → h2 → h3 hierarchy |
| Flexbox | Navigation bar (logo ↔ links), skills card row, footer (copyright ↔ links), hero action buttons |
| CSS Grid | About section (text column \| stat cards), 2×2 stat sub-grid, projects auto-fit `minmax` gallery |
| Responsive | Mobile-first; no horizontal scroll at 375 px; hamburger nav drawer on mobile |
| JavaScript | Scroll spy (active nav links), mobile nav toggle with hamburger animation, project tag filter |
| Real content | Actual bio, real project names, real email and GitHub links |

## How to run locally

No build tools required. Open `index.html` in any modern browser:

```bash
# Option A — just open the file
open index.html

# Option B — tiny local server (avoids any file:// quirks)
npx serve .
# or
python3 -m http.server 8080
```

## Deploying to Netlify

1. Push this repo to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
3. Choose your GitHub repo.
4. Leave all build settings blank (no build command, no publish directory override — Netlify finds `index.html` automatically).
5. Click **Deploy site**.

Every subsequent `git push` redeploys automatically.

## Project structure

```
/
├── index.html   ← entire site (HTML + CSS + JS, single file)
└── README.md    ← this file
```

## JavaScript interactions

Three interactions, all vanilla DOM — no libraries:

**Scroll spy** (`updateScroll`)  
Listens to `scroll` events, checks each `section`'s `getBoundingClientRect()`,
and toggles `.active` on the matching nav link. Also adds a border to the
fixed nav once the user scrolls past 8 px.

**Mobile nav toggle** (`openNav` / `closeNav`)  
The hamburger button toggles `.open` on the `#nav-drawer` div and animates
its three `<span>` elements into an × via inline `transform` and `opacity`.
Closes on link tap and on `Escape` key.

**Project tag filter**  
Each filter button carries a `data-filter` value. Each project card carries
`data-tags` (space-separated). On click, the handler removes `.active` from
all buttons, sets it on the clicked one, then toggles `.hidden` on cards
whose `data-tags` don't include the selected filter.

---

*CSC 436 · Fall 2026 · Sahan Chathuranga Kumarage Don*
