---
description: "Use when editing, reviewing, creating, or checking any writing post for HelenBurgess.id.au. Covers front matter conventions, voice and tone, file naming, valid field values, and what to avoid."
applyTo: "src/writings/**/*.md"
---

# Writing Post Conventions — HelenBurgess.id.au

## File path

```
src/writings/YYYY/MM/YYYY-MM-DD-slug.md
```

Slug: lowercase, hyphen-separated, concise. Do not change an existing slug unless explicitly asked.

## Front matter — required fields

| Field           | Notes                                                                       |
| --------------- | --------------------------------------------------------------------------- |
| `layout`        | Always `layouts/writing.njk`                                                |
| `title`         | Post title                                                                  |
| `description`   | Required. One or two sentences for SEO and feed preview                     |
| `date`          | ISO 8601: `YYYY-MM-DDTHH:MM:SS`                                             |
| `publishedDate` | Same as `date` unless republishing                                          |
| `type`          | `article` \| `essay` \| `reflection` \| `story`                             |
| `category`      | `lived-experience` \| `technology` \| `reflection` \| `creative` \| `craft` |
| `image`         | Required path under `/assets/images/other/`                                 |
| `draft`         | `true` until ready to publish                                               |

## Front matter — optional but common fields

- `subtitle` — short secondary line
- `excerpt` — slightly longer summary for feeds
- `series` — `mental-health` \| `technology` \| empty string
- `keywords` — list of SEO terms
- `tags` — free-form list; see tag groups below
- `theme` — optional thematic framing word
- `image_alt` — accessibility description for hero image
- `image_credit` — `photographer`, `profile_url`, `photo_url` (Unsplash fields)
- `bluesky_description`, `mastodon_description`, `facebook_description` — social copy
- `newsletter` — boolean, default `true`

## Voice and tone

Helen's writing is:

- reflective, compassionate, plain English
- emotionally honest — don't scrub the lived texture
- calm and credible, not performative

**Do not:**

- use self-help clichés ("unlock your potential", "transform your life")
- overload with therapy-speak
- add tidy conclusions that erase ambiguity
- stuff SEO keywords into the prose
- rewrite personal essays into generic articles

## Common tag groups

| Theme           | Tags                                                                       |
| --------------- | -------------------------------------------------------------------------- |
| Neurodivergence | `AuDHD`, `ADHD`, `autism`, `neurodivergent`, `masking`, `lived experience` |
| Resilience      | `healing`, `recovery`, `resilience`, `identity`, `grief`, `burnout`        |
| Stoicism        | `Stoicism`, `mindfulness`, `reflection`                                    |
| Creativity      | `creativity`, `writing`, `craft`, `art`                                    |
| Technology      | `AI`, `technology`, `digital life`                                         |

## Social copy

- **Bluesky / Mastodon**: ~280 chars, lead with a resonant line or question, include `[link]` placeholder, 3–5 hashtags
- **Facebook**: warmer, 1–2 sentences, fewer or no hashtags

## Before finishing any post edit

- Verify front matter formatting (no tabs in YAML, colons followed by a space)
- Confirm `layout: layouts/writing.njk` is present
- Check `draft` status is intentional
- Do not alter the slug or file path without explicit instruction
