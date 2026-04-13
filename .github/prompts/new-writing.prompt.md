---
description: "Draft a new writing post for HelenBurgess.id.au from a topic or theme"
name: New Writing Post
argument-hint: "Topic, theme, or working title for the post"
agent: agent
---

Draft a complete new writing post for HelenBurgess.id.au.

## What to produce

1. A fully scaffolded markdown file at the correct path (`src/writings/YYYY/MM/YYYY-MM-DD-slug.md`) with today's date
2. Complete front matter — all fields filled in or thoughtfully left empty with a comment
3. A draft body in Helen's voice — reflective, compassionate, plain English, emotionally honest
4. Social media descriptions pre-filled for Bluesky, Mastodon, and Facebook
5. `draft: true` set by default

## Voice and tone

Write as Helen writes: first-person, grounded, calm. Prefer lived texture over tidy conclusions. Do not use self-help clichés, therapy-speak, or motivational platitudes. Use headings only if they genuinely aid readability — most posts don't need them.

## Front matter

Use the full schema from [AGENTS.md](../../AGENTS.md#post-file-conventions). Choose appropriate values for:

- `type`: article | essay | reflection | story
- `category`: lived-experience | technology | reflection | creative | craft
- `series`: mental-health | technology | (leave empty if not applicable)
- `tags`: suggest based on topic; can be refined

Leave `image` set to `/assets/images/other/placeholder_n9qtza.png` unless a specific image is provided.

## After drafting

- Confirm the file path is correct
- Note any front matter fields that need manual attention (image, image_alt, keywords)
- Suggest 2–3 relevant tag additions if appropriate
