# Portfolio Data README

This document serves as a quick reference for all the fields inside `portfolio_data.json`. It acts as the single source of truth for the website's content.

## Quick Reference Table

| Section | Description | Used In |
| --- | --- | --- |
| `identity` | Personal information, bio, contact info, and resume link | Hero, About, Contact, Navigation |
| `quotes` | Favorite quotes and philosophies | About |
| `stats` | High-level metrics showing impact and experience | About |
| `skills` | Grouped technical skills with icons | Skills Ticker |
| `experience` | Work history, roles, and achievements | Experience Timeline |
| `projects` | Portfolio projects, games, and software apps | Projects Grid |
| `community` | Leadership roles and metrics | Community Section |
| `links` | Social media and professional profiles | Footer, Contact |

---

## Field by Field Breakdown

### `identity`
Object containing personal information.
- `name` (String): Your full name. Example: `"Mohamed Mostafa"`
- `alias` (String): Your nickname or brand name. Example: `"KM-Developer"`
- `tagline_subtitle` (String): High-level title. Example: `"Unity Game Developer | Graphics Programmer | Community Founder"`
- `tagline_typed` (String): The text that types out in the hero section. Example: `"Transforming logic into immersive experiences — 1% better every day."`
- `bio` (String): A short biography.
- `origin_story` (String): A sentence detailing how you started.
- `location` (String): Your location. Example: `"Cairo, Egypt"`
- `email` (String): Your email address. Example: `"Mohamed.5.20047@gmail.com"`
- `phone` (String): Your phone number. Example: `"+20 1157467984"`
- `resume_path` (String): Relative path to your resume file. Example: `"assets/docs/Mohamed Mostafa Resume 2.pdf"`

### `quotes`
Array of quote objects.
- `text` (String): The quote itself.
- `author` (String): Who said it.
- `source` (String): Where it's from (optional).

### `stats`
Array of high-level metric objects.
- `value` (String): The metric number/value. Example: `"50+"`
- `label` (String): The metric description. Example: `"Students Trained"`

### `skills`
Object dividing skills into categories like `game` and `programming`.
- `name` (String): Name of the skill. Example: `"Unity"`
- `icon_svg_or_emoji` (String): An emoji or SVG string representing the skill. Example: `"🎮"`

### `experience`
Array of job role objects.
- `role` (String): Your job title. Example: `"Game Developer (Part-Time)"`
- `company` (String): Where you worked. Example: `"Al-Arcade Studio"`
- `type` (String): Employment type. Example: `"Part-Time"`
- `dates` (String): The timeframe. Example: `"Apr 2026–Present"`
- `current` (Boolean): True if it's your current role.
- `bullets` (Array of Strings): Key achievements and tasks.

### `projects`
Array of project objects.
- `id` (String): Unique identifier. Example: `"racing"`
- `title` (String): Project title. Example: `"3D Top-Down Car Racing"`
- `category` (String): One of `"published"`, `"gamejam"`, or `"software"`. Used for filtering.
- `role` (String): Your role on the project.
- `description` (String): Project description.
- `tech` (Array of Strings): Technologies used. Example: `["Unity", "C#"]`
- `thumbnail` (String): URL or relative path to the thumbnail image. Use `""` if none.
- `links` (Object): Links to `"itch"`, `"github"`, and `"youtube"`. Use `""` if not applicable.

### `community`
Object detailing community leadership.
- `name` (String): Name of the community. Example: `"FCAI-CU Game Development Club"`
- `role` (String): Your position. Example: `"Founder & Community Manager"`
- `dates` (String): The timeframe. Example: `"Sep 2023–Present"`
- `description` (String): Brief description of the community's mission.
- `metrics` (Array of Objects): Similar to `stats`, with `value` and `label`.
- `links` (Object): Links to `"linkedin"` and `"linktree"`.

### `links`
Object with your social links.
- `linkedin` (String): LinkedIn profile URL.
- `github` (String): GitHub profile URL.
- `itchio` (String): Itch.io profile URL.
- `youtube` (String): YouTube channel URL.
- `email` (String): Contact email address.
