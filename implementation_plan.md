# Portfolio Website — Implementation Plan

> [!IMPORTANT]
> **Status: APPROVED — Ready to execute on user's go-ahead.**

## Overview

Build a **premium, single-page, data-driven portfolio website** for Mohamed Mostafa (KM-Developer) — a Game Developer / Graphics Programmer / Community Founder based in Cairo. The site uses a clean `portfolio_data.json` as the single source of truth, dynamically rendered by Vanilla HTML/CSS/JS. It is architected for zero-friction GitHub Pages deployment.

---

## Architecture Decision

| Option | Pros | Cons |
|--------|------|------|
| **Vanilla HTML + CSS + JS** | Zero build step, GitHub Pages friendly, minimal overhead | Slightly more boilerplate for templating |
| React / Next.js | Component model, dynamic imports | Needs build step, more complex GitHub Pages config |

**Decision: Vanilla HTML + CSS + JS** — fastest path to GitHub Pages deployment, no build step, and fully satisfies the dynamic JSON loading requirement via `fetch()`.

---

## File Structure

```
protfolio/
├── index.html               # Single-page shell + semantic structure
├── portfolio_data.json      # ALL content data (projects, skills, bio, links)
├── assets/
│   ├── videos/
│   │   └── portfolio_background_v2.mp4   # Hero background video (copy from root)
│   └── images/
│       ├── project-thumbnails/           # Generated placeholder images per project
│       └── profile.jpg                   # Profile photo (generated)
├── styles/
│   ├── index.css            # Design system: tokens, reset, base
│   ├── components.css       # Glassmorphism cards, nav, buttons, badges
│   ├── sections.css         # Per-section layout (hero, about, projects, skills, contact)
│   └── animations.css       # Keyframes, micro-animations, hover transitions
└── scripts/
    ├── main.js              # Bootstrap: fetch JSON, call renderers, init nav
    ├── renderer.js          # All dynamic DOM rendering functions
    └── animations.js        # Scroll-triggered animations, particle effect, typed text
```

---

## Design System

### Color Palette (HSL-based dark mode)
- **Background Base:** `hsl(220, 20%, 7%)` — deep navy-black
- **Surface / Cards:** `hsl(220, 18%, 12%)` with `rgba` glass overlay
- **Primary Accent:** `hsl(195, 90%, 55%)` — electric cyan (game-dev vibe)
- **Secondary Accent:** `hsl(265, 80%, 65%)` — deep violet
- **Text Primary:** `hsl(210, 30%, 95%)`
- **Text Muted:** `hsl(210, 15%, 60%)`
- **Glow:** `hsl(195, 90%, 55%, 0.25)`

### Typography
- **Display / Hero:** `Outfit` — bold, modern
- **Body / UI:** `Inter` — clean, readable
- Both from Google Fonts

### Glassmorphism Recipe
```css
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
```

---

## Section-by-Section Plan

### 1. Navigation
- Fixed top navbar with glassmorphism
- Logo: `KM-Developer` with subtle glow
- Links: About · Experience · Projects · Skills · Community · Contact
- Mobile: hamburger menu with smooth slide-in drawer

### 2. Hero Section
- **Fullscreen video background** using `portfolio_background_v2.mp4` (already in the folder)
- Dark overlay gradient so text is readable
- Particle/grid overlay for depth (CSS-based, no library)
- **Content:**
  - Subtitle: "Unity Game Developer · Graphics Programmer · Community Founder"
  - Name: `MOHAMED MOSTAFA`
  - Tagline (typed animation): "Transforming logic into immersive experiences, 1% better every day."
  - Two CTA buttons: `[ View My Work ]` `[ Contact Me ]`
  - Scroll indicator chevron

### 3. About Me
- Two-column layout: text left, stats/badges right
- **Philosophy blockquote** (James Clear "1% better" quote)
- Origin story: drawing → hardware → code → game dev
- Resume download button (links to the PDF)
- Stat cards: 50+ students trained, 30+ games shipped, 4+ years experience

### 4. Professional Experience
- Vertical timeline with glassmorphism cards
- Cards rendered from JSON, each with: Company, Role, Dates, bullet points
- Active role (Al-Arcade) highlighted with accent color

### 5. Community Leadership (Dedicated Section)
- Full-width feature section with bold impact metrics
- FCAI-CU Game Development Club story + metrics (23 members, 50+ students, 52-person game jam)
- Links to community LinkedIn and Linktree

### 6. Projects Grid (Filterable)
- Filter buttons: `All` · `Game Jams` · `Published Games` · `Software Engineering`
- Responsive CSS Grid (3 cols → 2 → 1)
- Each card:
  - Thumbnail image (fetched from Itch.io CDN URLs or generated placeholder)
  - Title, Category badge
  - Tech stack pills
  - Hover reveal: description + CTA buttons (Itch.io / GitHub / YouTube)
- Projects sourced 100% from JSON

### 7. Skills
- Two rows: Game Dev skills + General Programming skills
- Auto-scrolling ticker with skill icons + labels (CSS animation, no JS)
- Pause on hover

### 8. Contact ("Initiate Comms")
- Thematic header with game-dev styling
- Direct contact links with icons (Email, LinkedIn, GitHub, Itch.io, YouTube)
- Copy-to-clipboard on email click
- Footer with copyright

---

## portfolio_data.json Structure

```json
{
  "identity": { ... },
  "skills": { "game": [...], "programming": [...], "web": [...] },
  "experience": [ { "role", "company", "dates", "bullets": [] } ],
  "projects": [
    {
      "id", "title", "category", "role", "description",
      "tech": [], "thumbnail", "links": { "itch", "github", "youtube" }
    }
  ],
  "community": { "name", "role", "metrics": [], "links": {} },
  "quotes": [ { "text", "author", "source" } ],
  "links": { "linkedin", "github", "itchio", "youtube", "email" }
}
```

---

## Assets Plan

| Asset | Source | Method |
|-------|---------|--------|
| Hero background video | `portfolio_background_v2.mp4` (already exists) | Copy to `assets/videos/` |
| Project thumbnails | Itch.io CDN URLs in JSON (already in data) | Direct `<img src>` from CDN |
| Racing game thumbnail | YouTube thumb | From YouTube embed URL |
| SmartGallery thumbnail | No image available | **Generate with `generate_image` tool** |
| Library/Academic projects | No image | **Generate with `generate_image` tool** |
| Profile illustration | None provided | **Generate with `generate_image` tool** |

---

## GitHub Pages Compatibility

- All paths are **relative** (no absolute `/` prefix issues)
- No server-side routing — single `index.html`
- Video uses `<source>` with `type="video/mp4"` + `playsinline` for mobile
- `fetch()` for JSON works on `file://` with a local dev server (`npx serve .`)

---

## Verification Plan

### Automated
1. Open with `npx serve .` locally and verify all sections render
2. Use browser subagent to take screenshots of each section

### Manual
- Resize viewport: mobile (375px), tablet (768px), desktop (1440px)
- Check all links open correctly
- Verify video autoplay and loop
- Check filter buttons on projects grid

---

## Resolved Decisions

| Decision | Choice |
|----------|--------|
| Resume PDF | Link directly to `assets/docs/Mohamed Mostafa Resume 2.pdf` (committed to repo) |
| Hero video | `portfolio_background_v2.mp4` — high quality desktop + loop source |
| Mobile video fallback | `portfolio_background.mp4` (~2.5MB) as `<source media>` fallback |

---

## Changeability & Documentation Strategy

A core requirement is that **any content or asset can be swapped by editing a single file or replacing a single file**, without touching layout code. Here is how each changeable part is handled:

### 🗂️ Content Changes → `portfolio_data.json`

Every piece of user-facing text and link lives in `portfolio_data.json`. The file will have **inline comments** (as a companion `portfolio_data.README.md`) explaining every field:

| What to change | Where in JSON |
|----------------|---------------|
| Name, tagline, location | `identity` object |
| Hero typed tagline text | `identity.tagline_typed` |
| About me paragraph | `identity.bio` |
| Philosophy quote | `quotes[0]` |
| Resume PDF path | `identity.resume_path` |
| Experience entries | `experience[]` array |
| Projects (add/remove/edit) | `projects[]` array |
| Project thumbnail image | `projects[n].thumbnail` |
| Project links (Itch/GitHub/YouTube) | `projects[n].links` |
| Skills list | `skills.game[]`, `skills.programming[]` |
| Community metrics | `community.metrics[]` |
| Social links (footer/contact) | `links` object |

### 🎬 Video Background → `assets/videos/`

The hero video source path is defined in **one place only** — a `CONFIG` object at the top of `scripts/main.js`:

```js
// ── SITE CONFIGURATION ──────────────────────────────────────────────────────
// To change the hero background video, replace the file in assets/videos/
// and update the path below.
const CONFIG = {
  heroVideo:         'assets/videos/portfolio_background_v2.mp4',
  heroVideoFallback: 'assets/videos/portfolio_background.mp4',
  dataFile:          'portfolio_data.json',
  resumePath:        'assets/docs/Mohamed Mostafa Resume 2.pdf',
};
```

### 🎨 Colors & Typography → `styles/index.css` (Design Tokens Block)

All colors, fonts, and spacing are CSS Custom Properties in a clearly labeled `/* ── DESIGN TOKENS ── */` block at the very top of `index.css`. Changing the entire color scheme requires editing ~10 lines:

```css
/* ══════════════════════════════════════════════════════
   DESIGN TOKENS  —  Edit this block to restyle the site
   ══════════════════════════════════════════════════════ */
:root {
  --clr-bg:         hsl(220, 20%, 7%);   /* page background */
  --clr-surface:    hsl(220, 18%, 12%);  /* card background */
  --clr-accent:     hsl(195, 90%, 55%);  /* primary cyan accent */
  --clr-accent-2:   hsl(265, 80%, 65%);  /* secondary violet accent */
  --clr-text:       hsl(210, 30%, 95%);  /* body text */
  --clr-muted:      hsl(210, 15%, 60%);  /* secondary text */
  --font-display:   'Outfit', sans-serif;  /* headings */
  --font-body:      'Inter', sans-serif;   /* body & UI */
}
```

### 🖼️ Project Thumbnails

Each project card's `thumbnail` field in the JSON accepts:
- A **relative path**: `"assets/images/projects/my-game.png"` (local file)
- An **absolute URL**: `"https://img.itch.zone/..."` (CDN direct link — used for Itch.io games)

Swapping a thumbnail = updating that one JSON field and dropping the file into `assets/images/projects/`.

### 📄 Resume PDF

Replace the file at `assets/docs/Mohamed Mostafa Resume 2.pdf` with a newer version **using the exact same filename** — zero code changes needed. If you rename it, update `CONFIG.resumePath` in `main.js`.

### 📋 `portfolio_data.README.md`

A companion markdown file will be generated alongside `portfolio_data.json` documenting every JSON field with type, description, and example. This is the go-to reference for future content updates.
