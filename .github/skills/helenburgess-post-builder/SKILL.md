---
name: helenburgess-post-builder
description: "Create or revise a writing post for HelenBurgess.id.au. Use when creating a new post, scaffolding front matter, drafting content in Helen's voice, or revising an existing writing piece. Covers file naming, front matter fields, voice and tone, category/tag conventions, and social media copy."
argument-hint: "Describe the topic, theme, or title of the post"
---

# HelenBurgess Post Builder

## When to Use

- Creating a new post from scratch
- Scaffolding a new post file with correct front matter
- Revising or improving an existing writing piece
- Generating social media descriptions for a post
- Checking front matter completeness and correctness

## Procedure

### Creating a new post

1. **Establish the topic** — ask or infer the title, theme, and rough content direction if not provided
2. **Determine metadata** — suggest `type`, `category`, `series`, and `tags` based on the topic; confirm with the user if uncertain
3. **Determine the date** — use today's date unless told otherwise
4. **Generate the slug** — lowercase, hyphen-separated, derived from the title; keep it short and meaningful
5. **Create the file** at `src/writings/YYYY/MM/YYYY-MM-DD-slug.md`
6. **Scaffold complete front matter** using the template below
7. **Draft the content** in Helen's voice — or leave a placeholder if the user will write it
8. **Verify** front matter formatting, valid field values, and layout reference before finishing

### Revising an existing post

1. Read the current file in full before making any changes
2. Preserve the author's voice — improve clarity and rhythm without flattening emotional texture
3. Keep changes scoped and incremental; explain meaningful tradeoffs
4. Do not change the slug, date, or file path unless explicitly asked
5. Verify front matter after edits

---

## Front Matter Template

```yaml
layout: layouts/writing.njk
title: ""
subtitle: "" # optional
description: "" # required — one or two sentences; used for SEO and feed preview
excerpt: "" # optional — slightly longer summary for feeds
date: YYYY-MM-DDTHH:MM:SS
publishedDate: YYYY-MM-DDTHH:MM:SS
theme: "" # optional — thematic framing word or phrase
keywords:
  - keyword one
  - keyword two
type: article # article | essay | reflection | story
tags:
  - tag-one
  - tag-two
category: lived-experience # lived-experience | technology | reflection | creative | craft
series: "" # mental-health | technology | (leave empty if none)
image: /assets/images/other/filename.jpg # required; use placeholder if image not yet chosen
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
bluesky_description: "" # ~280 chars including link; use hashtags relevant to topic
mastodon_description: "" # same as bluesky or slight variation
facebook_description: "" # warmer, less hashtag-heavy; 1-2 sentences
newsletter: true
draft: true # set false only when ready to publish
```

---

## Voice and Tone

Helen's writing is:

- reflective, compassionate, plain English
- emotionally honest without oversharing
- calm, grounded, credible
- first-person but not navel-gazing

Avoid:

- inflated self-help language ("unlock your potential", "transform your life")
- therapy-speak overload
- cliché motivational phrasing
- tidy conclusions that erase complexity
- SEO-stuffed prose

---

## File Location

Posts live at: `src/writings/YYYY/MM/YYYY-MM-DD-slug.md`

Example: `src/writings/2026/04/2026-04-13-on-starting-again.md`

---

## Audience

Primary readers: veterans, reflective creatives, people navigating recovery, identity, grief, burnout, or change. Write for humans, not search engines.

---

## Common Tag Groups

| Theme                           | Common tags                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| Mental health / neurodivergence | AuDHD, ADHD, autism, neurodivergent, masking, lived experience, veteran mental health |
| Resilience / healing            | healing, recovery, resilience, identity, grief, burnout                               |
| Stoicism / reflection           | Stoicism, mindfulness, reflection, presence                                           |
| Creativity / craft              | creativity, writing, craft, art, making                                               |
| Technology                      | AI, technology, digital life                                                          |

---

## Social Copy Guidelines

- **Bluesky/Mastodon**: Lead with a line from the piece or a resonant question. Include `[link]` placeholder. Add 3–5 relevant hashtags. Max ~280 chars.
- **Facebook**: More conversational. One or two sentences. No need for hashtags. Warmer framing.

---

## Reference

See [docs/content-management.md](../../../docs/content-management.md) for the full content conventions guide.
