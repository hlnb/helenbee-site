# AGENTS.md — HelenBurgess.id.au

## Project purpose

HelenBurgess.id.au is a reflective writing site grounded in lived experience, healing, resilience, creativity, Stoicism, mindfulness, technology, and craft.

This is a writing-first project.

Protect the author’s voice, emotional honesty, and readability.
Do not turn the site into generic self-help, marketing copy, or SEO-driven content.

---

## Audience

Primary readers include:

- veterans
- reflective creatives
- people navigating recovery, identity, grief, burnout, or change
- readers seeking grounded, humane writing rather than polished performance

---

## Tone and editorial voice

The writing should be:

- reflective
- compassionate
- plain English
- emotionally honest
- calm, thoughtful, and credible

Avoid:

- inflated self-help language
- therapy-speak overload
- cliché motivational phrasing
- flattening subtle writing into generic web copy
- over-optimising prose at the expense of humanity

---

## Working style

- Prefer incremental changes over rewrites
- Preserve the author’s voice unless explicitly asked to reshape it
- Improve clarity, rhythm, structure, and readability without removing lived texture
- Keep changes scoped and explain meaningful tradeoffs
- Ask before making broad structural changes to collections, slugs, templates, or content architecture

### Post workflow

- When creating or revising a HelenBurgess post, prefer using the `helenburgess-post-builder` skill if it is available
- Reuse the site’s existing post structure, front matter conventions, and template patterns
- Preserve categories, tags, dates, slugs, and layout references unless explicitly asked to change them

---

## Content rules

- Keep first-person writing natural
- Respect ambiguity and nuance
- Do not overwrite emotional texture with tidy conclusions
- Prefer depth over performance
- Use headings only when they genuinely improve readability
- Maintain continuity with the site’s established themes and voice

---

## Content workflow (Sveltia CMS)

- HelenBurgess.id.au uses Sveltia CMS for content management
- The preferred workflow is the local Sveltia setup
- Do not assume the live/admin CMS workflow is the primary editing path
- Preserve compatibility with the current local Sveltia workflow when changing:
  - front matter structure
  - collections
  - file locations
  - content schemas
- If a proposed change could affect Sveltia configuration or editorial usability, flag it before implementing

---

## Metadata and structure

- Preserve existing slugs unless explicitly asked to change them
- Preserve front matter shape and collection logic
- When creating a new post, ensure metadata is complete and consistent with current conventions
- Be careful with:
  - dates
  - tags
  - categories
  - excerpts
  - descriptions
  - hero image references

---

## Build and dev commands

```bash
npm install          # install dependencies
npm run start        # dev server at http://localhost:8080 (live reload)
npm run build        # production build → _site/
npm run debug        # verbose build output
npm run content:plan # content planning CLI
npm run content:status # content status CLI
```

Output directory: `_site/`. Deployed to Vercel; build on push to `main`.

See [docs/development.md](docs/development.md) for full workflow.

---

## Post file conventions

**Location:** `src/writings/YYYY/MM/YYYY-MM-DD-slug.md`

**Layout:** always `layouts/writing.njk`

**Front matter fields** (match these exactly):

```yaml
layout: layouts/writing.njk
title: ""
subtitle: "" # optional
description: "" # required; used for SEO and excerpt
excerpt: "" # optional; feed/preview summary
date: YYYY-MM-DDTHH:MM:SS
publishedDate: YYYY-MM-DDTHH:MM:SS
theme: "" # optional
keywords: [] # list of SEO keywords
type: article # article | essay | reflection | story
tags: [] # free-form list
category: "" # lived-experience | technology | reflection | creative | craft
series: "" # mental-health | technology | (empty)
image: /assets/images/other/filename.jpg # required; hero image
image_alt: ""
image_credit:
  photographer: ""
  profile_url: ""
  photo_url: ""
author:
  name: Helen Burgess
socials:
  bluesky: https://bsky.app/profile/@hlnbee.bsky.social
  mastodon: https://mastodon.social/@helenbee
  facebook: https://www.facebook.com/profile.php?id=61572267654772
siteUrl: https://helenburgess.id.au
bluesky_description: ""
mastodon_description: ""
facebook_description: ""
newsletter: true
draft: false # set true to keep unpublished
```

See [docs/content-management.md](docs/content-management.md) for full detail.

---

## Technical expectations

- Respect the current Eleventy (v3) setup and template conventions
- Templates use Nunjucks (`.njk`); CSS is vanilla/modular — no framework
- Keep changes compatible with the existing markdown + layout workflow
- Do not present older or legacy patterns as current if the repo has moved on
- Avoid broad refactors unless explicitly requested

---

## Validation

Before finishing:

- verify front matter formatting
- verify layout references
- verify internal links if changed
- run the build if appropriate
- clearly note any uncertain assumptions

---

## What to avoid

- do not rewrite personal essays into generic articles
- do not force SEO language into reflective writing
- do not casually rename files or change slugs
- do not restructure the site architecture without approval
- do not over-polish the prose until it loses its human voice
