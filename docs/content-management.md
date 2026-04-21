# Content Management

## Overview

Content for helenburgess.id.au is managed through Markdown files and Nunjucks templates. This guide covers the content creation process, formatting standards, and available features.

## Directory Structure

```
src/
├── _data/                  # Site data and configuration
│   ├── metadata.js        # Site metadata
│   └── site.json         # Site configuration
├── _examples/             # Example content templates
│   └── writing.md        # Example writing post
├── _includes/             # Templates and partials
│   ├── layouts/          # Page layouts
│   │   ├── base.njk     # Base template
│   │   ├── page.njk     # Static page template
│   │   ├── post.njk     # Blog post template
│   │   └── writing.njk  # Writing template
│   └── partials/         # Reusable components
│       ├── footer.njk   # Site footer
│       └── header.njk   # Site header
├── css/                   # Stylesheets
│   ├── forms.css
│   ├── grid-four-six.css
│   ├── grid-layouts.css
│   ├── grid-modular.css
│   ├── styles.css
│   ├── variables.css
│   └── writing-single.css
├── category/              # Category pages
│   └── technology.njk
├── feed/                  # RSS/JSON feeds
│   ├── feed.11tydata.js
│   ├── feed.njk
│   └── json.njk
├── pages/                 # Static pages
│   ├── about.njk
│   ├── contact.njk
│   ├── index.njk
│   ├── privacy-policy.njk
│   └── writings.njk
├── sitemap/               # XML sitemap
│   └── sitemap.xml.njk
└── writings/              # Blog posts
    ├── 2018-06-29-anzac-day.md
    ├── 2018-06-29-ehealth-systems.md
    ├── 2018-07-24-css-grid-experiment.md
    ├── 2019-05-27-giving-your-hads-some-help.md
    └── 2024-11-24-building-modern-personal-site-with-11ty.md
```

## Writing New Posts

### File Naming Convention

```bash
YYYY-MM-DD-title-slug.md
# Example: 2024-11-24-building-modern-personal-site-with-11ty.md
```

### Front Matter Template

```yaml
---
layout: writing.njk
title: Your Post Title
description: Brief description for SEO and social sharing
date: YYYY-MM-DD
category: technology
tags:
  - technology
  - web development
  - 11ty
image: /assets/images/post-image.jpg
excerpt: Brief excerpt for listings and social sharing
---
```

### Required Fields

- `layout`: Template to use (writing.njk for blog posts)
- `title`: Post title
- `date`: Publication date
- `description`: SEO description
- `category`: Primary category (matches category directory structure)

### Optional Fields

- `tags`: Array of relevant tags
- `image`: Featured image path
- `excerpt`: Custom excerpt (defaults to first paragraph if not provided)

> Tip: The CMS now includes an **Excerpt** field—fill it in so feeds, listings, and social previews use your curated summary instead of the opening paragraph.

## Content Types

### Blog Posts (`/writings/`)

- Technical tutorials
- Project updates
- Personal reflections
- Industry insights

### Static Pages (`/pages/`)

- About (`about.njk`)
- Home (`index.njk`)
- Contact (`contact.njk`)
- Privacy Policy (`privacy-policy.njk`)
- Writings Index (`writings.njk`)

### Category Pages (`/category/`)

- Technology (`technology.njk`)
- Additional categories as needed

## Feeds and Sitemaps

### RSS/JSON Feeds (`/feed/`)

- RSS Feed (`feed.njk`)
- JSON Feed (`json.njk`)
- Feed configuration (`feed.11tydata.js`)

### Sitemap (`/sitemap/`)

- XML Sitemap (`sitemap.xml.njk`)

## Styling

CSS is organized into modular files:

- `variables.css`: Design tokens and variables
- `styles.css`: Main stylesheet
- `forms.css`: Form styles
- `grid-layouts.css`: Grid system
- `grid-modular.css`: Modular grid components
- `grid-four-six.css`: Specific grid layouts
- `writing-single.css`: Writing post styles

## Content Guidelines

1. **Headings**

```markdown
## Second Level Heading

### Third Level Heading

#### Fourth Level Heading
```

2. **Text Formatting**

```markdown
**Bold text**
_Italic text_
`Inline code`
```

3. **Code Blocks**

```markdown
code goes here
```

4. **Links**

```markdown
[Link Text](https://example.com)
```

5. **Images**

```markdown
![Alt Text](path/to/image.jpg)
```

## Image Guidelines

1. File format:
   - Use .jpg for photographs
   - Use .png for screenshots/graphics
   - Use .svg for icons/logos

2. Image sizes:
   - Featured images: 1200x630px
   - In-content images: max-width 800px
   - Thumbnails: 300x300px

3. Optimization:
   - Compress all images before upload

4. Accessibility:
   - Include alt text for accessibility
   - Use descriptive filenames

## Categories and Tags

Main categories:

- technology
- web development
- personal
- projects
- design
- writing
- lived experience

## Tag Guidelines

- Use lowercase
- Hyphenate compound words (e.g. web-development)
- Be consistent with existing tags
- Limit to 5 tags per post
- Tags should be specific and descriptive
- Tags should be singular and not plural

## Content Types

### Blog Posts

- technical tutorials
- personal reflections
- project updates
- industry insights

### Static Pages

- About
- Contact
- Privacy Policy
- Terms of Service

## SEO Best Practices

1. Titles
   - include target keyword
   - keep under 60 characters
   - be descriptive and not promotional

- be descriptive and engaging

2. Meta descriptions
   - 150 - 160 characters
   - include target keyword
   - Compelling call to action

3. URLs
   - use hyphenated lowercase words
   - be descriptive and concise
   - include primary keyword

## Publishing Workflow

1. **Content Creation**
   - Create new markdown file in `/writings/`
   - Add front matter
   - Write content
   - Add images

2. **Review Process**
   - Spell check
   - Grammar check
   - Link verification
   - Image optimization

3. **Publishing**
   - Commit to repository
   - Push to main branch
   - Netlify automatically deploys

## Books Workflow

Book pages live in `src/books/` and now use the dedicated `layouts/book.njk` layout.

### Book Front Matter

Each book can include:

```yaml
layout: layouts/book.njk
title: "The Body Keeps the Score"
author: "Bessel van der Kolk"
dateRead: 2024-03-10
rating: 5
review: "Short summary of why the book mattered."
coverImage: "/assets/images/books/body-keeps-score.jpg"
tags: ["books"]
bookCategory:
  - trauma
  - ptsd-recovery
comments: "Optional shorter note shown as My Notes."
```

### Adding Reflections

- Add your longer reflections directly in the Markdown body below the front matter.
- The book layout renders that body under the heading `What I Found Helpful`.
- If the body is empty, the page shows a placeholder prompt instead.

### Book Categories

- Use `bookCategory` to group books by topic for future browsing and filtering.
- `bookCategory` accepts either a single string or a list, but a list is preferred.
- Example:

```yaml
bookCategory:
  - stoicism
  - mindfulness
  - habits
```

### How Categories Are Used

- `collections.books` is the main Eleventy collection for all book pages.
- `collections.booksByCategory` groups books by `bookCategory`.
- The `/reading/` page automatically shows topic links once books have been categorised.
- Individual book pages display their assigned topics in the summary panel.

## Content Maintenance

1. Regular Tasks
   - Update outdated content
   - Fix broken links
   - Optimize images

2. Review Analytics
   - Google Analytics
   - Track page views
   - Monitor user behavior
   - Update Tags/Categories

3. Version Control
   - Document major content updates
   - Use updated front matter
   - Keep change history
   - Archive outdated content

## Analytics and Monitoring

1. Google Analytics
   - Track page views
   - Monitor user behavior
   - Analyze popular content
   - Track conversion goals

2. Performance Monitoring
   - Page load times
   - Image load times
   - Core Web Vitals
   - Mobile responsiveness

## Accessibility Guidelines

1. Text Content
   - Use clear headings
   - Write descriptive links
   - Maintain good contrast
   - Use semantic markup

2. Images
   - Provide alt text
   - Use descriptive filenames
   - Consider color blindness
   - Avoid text in images

## Emergency Updates

1. Content Corrections
   - Update content directly
   - Add correction notice
   - Update timestamp
   - Document changes

2. Technical Issues
   - Use draft status
   - Remove problematic content
   - Document in changelog
   - Notify relevant parties
