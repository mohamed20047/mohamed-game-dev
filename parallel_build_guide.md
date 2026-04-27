# Parallel Build Guide — Mohamed Mostafa Portfolio

> All 5 chats can be started simultaneously. Each is fully self-contained.
> Working directory for ALL chats: `c:\Users\darsh\OneDrive\Desktop\mohamed\protfolio`

---

## SHARED CONTRACT
*(Included in every prompt — this is the single source of truth for class names, IDs, and JSON shape)*

### HTML Section IDs (anchors)
```
#hero  #about  #experience  #projects  #skills  #community  #contact
```

### Key Element IDs
```
nav-menu          → <nav> element
nav-toggle        → hamburger button
hero-video        → <video> in hero
hero-title        → <h1> name
hero-typed        → typed-text span
projects-grid     → <div> holding project cards
filter-buttons    → <div> holding filter pills
skills-track-1    → first skills row ticker
skills-track-2    → second skills row ticker
contact-email-btn → copy-to-clipboard email button
```

### CSS Class Names (components)
```
.glass-card       → glassmorphism card style
.btn-primary      → cyan filled CTA button
.btn-outline      → outline CTA button
.badge            → small tech/category pill
.badge--game      → green tint  (game jams)
.badge--published → cyan tint   (published games)
.badge--software  → violet tint (software engineering)
.section-label    → small uppercase eyebrow text above h2
.stat-card        → small metric card (50+ students etc.)
.timeline-item    → experience timeline entry
.project-card     → project grid card
.skill-item       → individual skill in ticker
.active           → active nav link / active filter button
```

### portfolio_data.json Top-Level Schema
```json
{
  "identity":   { "name", "alias", "tagline_subtitle", "tagline_typed", "bio", "origin_story", "location", "email", "phone", "resume_path" },
  "quotes":     [ { "text", "author", "source" } ],
  "stats":      [ { "value", "label" } ],
  "skills": {
    "game":        [ { "name", "icon_svg_or_emoji" } ],
    "programming": [ { "name", "icon_svg_or_emoji" } ]
  },
  "experience": [ { "role", "company", "type", "dates", "current", "bullets": [] } ],
  "projects":   [ { "id", "title", "category", "role", "description", "tech": [], "thumbnail", "links": { "itch", "github", "youtube" } } ],
  "community":  { "name", "role", "dates", "description", "metrics": [ { "value", "label" } ], "links": { "linkedin", "linktree" } },
  "links":      { "linkedin", "github", "itchio", "youtube", "email" }
}
```

### Design Tokens
```
--clr-bg:       hsl(220, 20%,  7%)   deep navy-black
--clr-surface:  hsl(220, 18%, 12%)   card surface
--clr-accent:   hsl(195, 90%, 55%)   electric cyan
--clr-accent-2: hsl(265, 80%, 65%)   deep violet
--clr-text:     hsl(210, 30%, 95%)
--clr-muted:    hsl(210, 15%, 60%)
--font-display: 'Outfit', sans-serif
--font-body:    'Inter', sans-serif
Glassmorphism: background rgba(255,255,255,0.04); backdrop-filter blur(16px); border 1px solid rgba(255,255,255,0.08); border-radius 16px
```

### Source Data Summary
```
Name:     Mohamed Mostafa  |  Alias: KM-Developer
Title:    Unity Game Developer | Graphics Programmer | Community Founder
Location: Cairo, Egypt
Email:    Mohamed.5.20047@gmail.com
Bio/Origin: Began with drawing → hardware → programming → discovered game dev as the intersection of art, audio, and code.

Philosophy Quote (James Clear):
"if you can get 1 percent better each day for one year, you'll end up thirty-seven times better by the time you're done."

Stats: 50+ Students Trained | 30+ Games Shipped | 4+ Years Experience | 23 Club Members

Skills - Game: Unity, C#, GLSL/Shaders, OpenGL, VFX, DOTween, ML Agents, Multiplayer Networking
Skills - Programming: C++, Python, Java, SQL, Dart, HTML/CSS/JS, Django, Spring Boot, Kotlin

Links:
  LinkedIn:  https://www.linkedin.com/in/mohamed-game-dev/
  GitHub:    https://github.com/mohamed20047
  Itch.io:   https://mohamed20047.itch.io/
  YouTube:   https://www.youtube.com/@KMDeveloper
  Email:     Mohamed.5.20047@gmail.com

Experience (newest first):
1. Game Developer (Part-Time) | Al-Arcade Studio | Apr 2026–Present [CURRENT]
   - Integrated Unity with Supabase for auth & data management
   - Enhanced game feel using DOTween for polished player feedback
   - Managed version control branches & resolved merge conflicts

2. Back-End Dev Intern (Java Spring Boot) | Banque Misr | Jul–Aug 2025
   - Weekly team projects using Docker, Git, external APIs
   - Applied Spring Boot, SQL, MongoDB, testing, caching

3. Game Dev Instructor | European Universities in Egypt | Jan–Feb 2025
   - 7-unit Unity/C# course for 15 students
   - 10 interactive workshops (4h each)

4. Flutter Mobile Dev Trainee | ITI | Jan–Feb 2025
   - Android apps with Dart, Flutter, Firebase

5. Game Developer (Freelance) | Remote | May 2021–Jan 2025
   - Multiple genres: action, puzzle, racing, simulation
   - Led 3-member team: 300-level racing game, 150 cars, AI, LAN multiplayer
   - 60+ lectures, 30+ games with students

6. 3D Game Dev & Educator | KM Developer | Aug 2020–Jan 2022
   - Arabic game dev education resources
   - Discord, YouTube, WhatsApp communities

Projects:
1. id:"racing"       | 3D Top-Down Car Racing (Freelance) | category:"published" | tech:[Unity,C#,ML Agents,GLSL] | thumb:"https://img.youtube.com/vi/HH5XTct8avo/hqdefault.jpg" | youtube:"https://youtu.be/HH5XTct8avo"
2. id:"backyard"     | Back Yard (Zanga Game Jam)          | category:"gamejam"   | tech:[Unity,C#] | thumb:"https://img.itch.zone/aW1nLzE0ODk2NjY5LnBuZw==/315x250%23c/RsC%2B2O.png" | itch:"https://mohamed20047.itch.io/back-yard" | youtube:"https://youtu.be/DOFLfcJMIe4"
3. id:"kitchen"      | Kitchen Chaos                       | category:"published" | tech:[Unity,C#] | thumb:"" | itch:"https://mohamed20047.itch.io/cooking-game"
4. id:"infection"    | Thought Infection (عدوى فكرية)      | category:"gamejam"   | tech:[Unity,C#] | thumb:"https://img.itch.zone/aW1nLzY1MzYwNTguanBn/original/0uOZrj.jpg" | itch:"https://mohamed20047.itch.io/thought-infection"
5. id:"spacemonkey"  | Space Monkey (قرد الفضاء)           | category:"gamejam"   | tech:[Unity,C#] | thumb:"https://img.itch.zone/aW1nLzU0ODA5NjcuanBn/original/UeiCBP.jpg" | itch:"https://mohamed20047.itch.io/space-monkey"
6. id:"stable"       | STABLE BUILD 02                     | category:"published" | tech:[Unity,C#] | thumb:"" | itch:"https://mohamed20047.itch.io/stable-build" | youtube:"https://youtu.be/PLYO7QM8KUg"
7. id:"potato"       | Potato Legacy                       | category:"published" | tech:[Unity,C#] | thumb:"" | itch:"https://mohamed20047.itch.io/potato-legacy" | youtube:"https://youtu.be/fSft6hQBKp8"
8. id:"bolt"         | 2D Platformer Bolt                  | category:"gamejam"   | tech:[Unity,C#] | thumb:"https://img.itch.zone/aW1nLzcxMzI5NzEucG5n/original/wDYA5Y.png" | itch:"https://mohamed20047.itch.io/2d-platformer-bolt"
9. id:"warzone"      | War Zone                            | category:"gamejam"   | tech:[Unity,C#] | thumb:"https://img.itch.zone/aW1nLzQ1MjY2NDEuanBn/original/YTTiNo.jpg" | itch:"https://mohamed20047.itch.io/ware-zone"
10. id:"smartgallery"| SmartGallery (Graduation Project)   | category:"software"  | tech:[Kotlin,SQLite,ONNX,MobileCLIP2,OCR] | thumb:"assets/images/projects/smartgallery.png" | github:"https://github.com/y0riii/Smart-gallery"
11. id:"library"     | University Library Website          | category:"software"  | tech:[HTML,CSS,JS,Django] | thumb:"assets/images/projects/library.png" | github:"https://github.com/mohamed20047"

Community:
  Name: FCAI-CU Game Development Club
  Role: Founder & Community Manager | Sep 2023–Present
  Mission: Bridging university education and industry requirements
  Metrics: 23+ Team Members | 50+ Students Trained | 30+ Games Completed | 52 Game Jam Participants | 19 Games in 4 Days | 240+ Event Tickets
  LinkedIn: https://www.linkedin.com/company/fcai-cu-game-development-club/
  Linktree:  https://linktr.ee/fcai_gd
```

---

## CHAT A — Data & Folder Structure

**Goal:** Create the complete folder structure and all data/config files.

**Working directory:** `c:\Users\darsh\OneDrive\Desktop\mohamed\protfolio`

**Your job:** Create exactly the following files with the content specified below.

### Step 1 — Create folders
Run these PowerShell commands:
```powershell
New-Item -ItemType Directory -Force -Path "assets\videos"
New-Item -ItemType Directory -Force -Path "assets\images\projects"
New-Item -ItemType Directory -Force -Path "assets\docs"
New-Item -ItemType Directory -Force -Path "styles"
New-Item -ItemType Directory -Force -Path "scripts"
```

Then copy the video and PDF:
```powershell
Copy-Item "portfolio_background_v2.mp4" "assets\videos\portfolio_background_v2.mp4"
Copy-Item "portfolio_background.mp4"    "assets\videos\portfolio_background.mp4"
Copy-Item "Mohamed Mostafa Resume 2.pdf" "assets\docs\Mohamed Mostafa Resume 2.pdf"
```

### Step 2 — Create `portfolio_data.json`
Write a complete, valid JSON file at `portfolio_data.json` using ALL the source data from the SHARED CONTRACT above.

Rules:
- No comments inside the JSON (pure valid JSON)
- Use the exact schema defined in the SHARED CONTRACT
- For projects with no thumbnail URL, use the relative path listed (e.g. `"assets/images/projects/smartgallery.png"`)
- For projects with no thumbnail at all, use an empty string `""`
- `identity.resume_path` must be `"assets/docs/Mohamed Mostafa Resume 2.pdf"`
- `identity.tagline_typed` = `"Transforming logic into immersive experiences — 1% better every day."`

### Step 3 — Create `portfolio_data.README.md`
Write a clean markdown file documenting every single field in the JSON:
- What it is, its type, example value, and which part of the website it affects.
- Start with a "Quick Reference" table then go field by field.

### Step 4 — Create empty placeholder files
Create these empty files so other chats can fill them without path errors:
```
index.html
styles/index.css
styles/components.css
styles/sections.css
styles/animations.css
scripts/main.js
scripts/renderer.js
scripts/animations.js
```

**Done when:** All folders exist, `portfolio_data.json` is valid JSON, README exists, placeholder files exist.

---

## CHAT B — HTML Shell (`index.html`)

**Goal:** Write the complete `index.html` — semantic structure for all 8 sections.

**Working directory:** `c:\Users\darsh\OneDrive\Desktop\mohamed\protfolio`

**IMPORTANT:** Use ONLY the IDs and class names from the SHARED CONTRACT. Do NOT write any CSS or JS inline. Do NOT hardcode any content text — leave `data-*` attributes or empty containers that JS will fill. The only exceptions are: the `<video>` tag sources, the `<title>`, and structural placeholders with comments.

**Your job:** Overwrite `index.html` with:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- SEO meta tags (title, description, og:*), Google Fonts (Outfit+Inter), 
       4 CSS link tags (index, components, sections, animations) -->
</head>
<body>
  <nav id="nav-menu">  <!-- glass nav: logo + links + hamburger #nav-toggle --> </nav>

  <section id="hero">
    <!-- fullscreen <video id="hero-video" autoplay muted loop playsinline>
           <source src="assets/videos/portfolio_background_v2.mp4" type="video/mp4">
           <source src="assets/videos/portfolio_background.mp4"    type="video/mp4">
         </video>
         dark overlay div
         hero content: subtitle span, <h1 id="hero-title">, <span id="hero-typed">, 2 CTA buttons, scroll chevron -->
  </section>

  <section id="about">   <!-- 2-col: blockquote left, stat-cards right, resume btn --> </section>
  <section id="experience"> <!-- timeline: JS fills .timeline-item cards --> </section>
  <section id="community">  <!-- metrics grid, links --> </section>

  <section id="projects">
    <!-- <div id="filter-buttons"> 4 filter pills </div>
         <div id="projects-grid"> JS fills .project-card items </div> -->
  </section>

  <section id="skills">
    <!-- 2 auto-scroll rows: <div id="skills-track-1"> and <div id="skills-track-2"> 
         JS fills .skill-item elements inside each track -->
  </section>

  <section id="contact">
    <!-- "Initiate Comms" heading, contact link buttons, footer -->
  </section>

  <!-- 3 script tags at bottom: renderer.js, animations.js, main.js (in that order) -->
</body>
</html>
```

Expand every section fully with real semantic HTML. Use `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`, `<time>` etc. appropriately. Add `aria-label` and `aria-hidden` where appropriate. Include a `<noscript>` warning. Every interactive element must have a unique `id`.

**Done when:** `index.html` is complete, valid HTML5, passes basic structure check.

---

## CHAT C — CSS (All 4 Stylesheets)

**Goal:** Write all 4 CSS files. Do NOT write any JS or HTML.

**Working directory:** `c:\Users\darsh\OneDrive\Desktop\mohamed\protfolio`

### File 1: `styles/index.css`
- CSS reset (modern: `box-sizing`, `margin:0`, `scroll-behavior: smooth`)  
- Google Fonts `@import` fallback (in case HTML link fails)
- **`/* ══ DESIGN TOKENS ══ */` block** — all `--clr-*` and `--font-*` custom properties with inline comments explaining each
- Base typography: body, h1-h4, p, a  
- Utility classes: `.container` (max-width 1200px, centered), `.section-label`, `.sr-only`
- Scrollbar styling (dark, thin, accent-colored thumb)

### File 2: `styles/components.css`
- `.glass-card` — glassmorphism recipe
- `.btn-primary` / `.btn-outline` — CTA buttons with hover glow transitions
- `.badge`, `.badge--game`, `.badge--published`, `.badge--software` — colored pills
- `.stat-card` — metric display card
- `.timeline-item` — experience timeline entry with connector line
- `.project-card` — card with image, overlay hover effect revealing description + links
- `.skill-item` — skill ticker chip
- Nav: `#nav-menu` glass bar, links, active state, `#nav-toggle` hamburger, mobile drawer

### File 3: `styles/sections.css`
- `#hero` — fullscreen, video positioning, overlay gradient, content centering
- `#about` — two-column responsive grid
- `#experience` — timeline vertical layout  
- `#community` — full-width feature, metrics grid  
- `#projects` — `#filter-buttons` flex row, `#projects-grid` CSS Grid (3→2→1 cols)
- `#skills` — overflow hidden ticker container, two rows
- `#contact` — centered layout, link icon grid, footer
- Full responsive breakpoints: 1024px (tablet), 768px (mobile)

### File 4: `styles/animations.css`
- `@keyframes` for: `fadeInUp`, `glowPulse`, `tickerScroll`, `typingBlink`
- `.project-card:hover` overlay slide-up transition
- `.btn-primary:hover` glow box-shadow
- `.glass-card:hover` subtle border glow
- `.skill-item` in `#skills-track-1` scrolls left continuously; `#skills-track-2` scrolls right
- Scroll-reveal base class `.reveal` (opacity:0, translateY 30px) and `.reveal.visible` (opacity:1, translateY:0)
- `prefers-reduced-motion` media query that disables all animations

**Done when:** All 4 `.css` files are written and complete.

---

## CHAT D — JavaScript (All 3 Scripts)

**Goal:** Write all 3 JavaScript files. Do NOT write any HTML or CSS.

**Working directory:** `c:\Users\darsh\OneDrive\Desktop\mohamed\protfolio`

**Key rule:** ALL text content comes from the fetched JSON. Never hardcode strings that appear in `portfolio_data.json`. The only hardcoded strings allowed are: section headings labels like "About Me", "Experience", "Projects", "Skills", "Community", "Initiate Comms" (these are layout labels, not data).

### File 1: `scripts/main.js`
```js
// ── SITE CONFIGURATION ──────────────────────────────────────────────────────
// To swap the video: replace the file in assets/videos/ and update heroVideo.
// To swap the resume: replace file at resumePath (same filename = zero changes).
// To change any content: edit portfolio_data.json — no JS changes needed.
const CONFIG = {
  heroVideo:         'assets/videos/portfolio_background_v2.mp4',
  heroVideoFallback: 'assets/videos/portfolio_background.mp4',
  dataFile:          'portfolio_data.json',
  resumePath:        'assets/docs/Mohamed Mostafa Resume 2.pdf',
};
```
Then: `fetch(CONFIG.dataFile)` → parse JSON → call all renderer functions → init nav toggle → init filter buttons → init scroll reveal → wire resume button to `CONFIG.resumePath`.

### File 2: `scripts/renderer.js`
Write individual exported/global render functions (one per section):
- `renderHero(identity)` — set `#hero-title` text, call `initTypedText(identity.tagline_typed)` 
- `renderAbout(identity, quotes, stats)` — fill bio, blockquote, stat cards
- `renderExperience(experience)` — build `.timeline-item` elements in `#experience`
- `renderCommunity(community)` — fill metrics, links in `#community`
- `renderProjects(projects)` — build `.project-card` elements in `#projects-grid`. Each card must include: thumbnail img, title, category badge, tech pills, description, and link buttons (only for non-null links)
- `renderSkills(skills)` — clone skill items into `#skills-track-1` (game skills) and `#skills-track-2` (programming skills). Duplicate items ×3 to ensure seamless ticker loop.
- `renderContact(links)` — fill contact link buttons with hrefs in `#contact`

### File 3: `scripts/animations.js`
- `initTypedText(text, elementId)` — types text char by char with blinking cursor, loops
- `initScrollReveal()` — IntersectionObserver on all `.reveal` elements → adds `.visible`
- `initNavHighlight()` — IntersectionObserver on each section → highlights matching nav link
- `initFilterButtons()` — click on `#filter-buttons` pills filters `#projects-grid` cards by `data-category` attribute; active pill gets `.active` class; filter=`all` shows everything
- `initNavToggle()` — hamburger open/close for mobile drawer
- `initEmailCopy()` — click on `#contact-email-btn` copies email to clipboard, shows tooltip "Copied!"
- `initVideoFallback()` — if `#hero-video` fails to load, set poster image fallback

**Done when:** All 3 `.js` files are written, no syntax errors, all functions are called correctly from `main.js`.

---

## CHAT E — Image Assets (generate_image tool only)

**Goal:** Generate 4 images using the `generate_image` tool and save them to the correct paths.

**Working directory:** `c:\Users\darsh\OneDrive\Desktop\mohamed\protfolio`

**IMPORTANT:** After generating each image, copy/move the artifact file to the correct path under `assets/images/projects/`. Use PowerShell `Copy-Item` to do this.

### Image 1 — `assets/images/projects/smartgallery.png`
**Prompt:** "App screenshot mockup for SmartGallery — a premium dark-mode Android gallery app. Shows a clean grid of photos with a search bar at top. The UI has a deep navy background, uses modern Material Design 3 with a glassmorphism search bar. Corner shows a face recognition overlay box in cyan. Bottom overlay text reads 'SmartGallery · AI-Powered · On-Device'. Ultra sharp, professional app store screenshot style."

### Image 2 — `assets/images/projects/library.png`
**Prompt:** "Screenshot mockup of a university library management website. Dark mode, modern UI with glassmorphism cards. Shows a book catalog table with search and filter controls, sidebar navigation with links like 'Books', 'Members', 'Borrow History'. Accent color is electric cyan. Clean, professional, like a premium SaaS dashboard. Cairo University Library System."

### Image 3 — `assets/images/profile.png`
**Prompt:** "Professional digital avatar / illustration of a young male game developer. Sleek dark background with cyan and violet gradient light accents. The figure faces forward, wearing a dark hoodie, confident expression. No facial detail — stylized geometric art style like a modern portfolio headshot illustration. Subtle game controller and code bracket motifs in the dark background. Square 1:1 ratio."

### Image 4 — `assets/images/projects/warzone-kitchen-placeholder.png`
**Prompt:** "Generic game development project thumbnail card. Dark background with a glowing cyan grid floor and violet horizon glow. Center shows a stylized controller icon and the text 'View on Itch.io' in white. Corner badge says 'Unity · C#'. Premium, dark-mode, game-dev aesthetic. Used as a fallback thumbnail."

**Done when:** All 4 images are saved to their correct `assets/images/` paths.

---

## Execution Order

```
Start all 5 chats at the same time ✓

Chat A must finish first before you test the site
(it creates the folder structure all others write into).

Chats B, C, D, E can all run truly in parallel.

After all finish → open a final chat to:
1. Run: npx serve . (in the protfolio folder)
2. Open browser and verify all sections render correctly
3. Fix any integration issues between HTML/CSS/JS
```
