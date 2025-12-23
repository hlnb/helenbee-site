# Sveltia CMS Guide

## Overview

Your site now uses **Sveltia CMS** - a modern, free, open-source content management system. It's a drop-in replacement for Decap/Netlify CMS with better performance and user experience.

## Accessing the CMS

### Production

- **URL:** https://helenburgess.id.au/admin/
- **Login:** Use your GitHub account
- **First time:** Authorize the app to access your repository

### Local Development

- **URL:** http://localhost:8080/admin/
- **Backend:** Local backend enabled for testing
- **No auth needed:** Works directly with local files

## Creating a New Post

1. **Access the CMS:**

   - Go to https://helenburgess.id.au/admin/
   - Click "Login with GitHub"

2. **Create New Writing:**

   - Click "Writings" in the left sidebar
   - Click "New Writing" button
   - Fill in the form fields

3. **Required Fields:**

   - **Title** - Post title
   - **Description** - SEO description/excerpt
   - **Publish Date** - When to publish
   - **Tags** - Select from predefined options
   - **Featured Image** - Hero image for the post
   - **Content** - Your markdown content

4. **Optional Fields:**

   - Subtitle
   - Published Date (if different from publish date)
   - Theme
   - Keywords (SEO)
   - Content Type (article, essay, reflection, story)
   - Category
   - Image Alt Text
   - Social media descriptions
   - Newsletter flag
   - Draft status

5. **Save & Publish:**
   - Click "Save" to commit to GitHub
   - Vercel automatically deploys
   - Live in ~2-3 minutes

## Field Reference

### Front Matter Structure

```yaml
---
layout: layouts/writing.njk
title: "Your Post Title"
subtitle: "Optional subtitle"
description: "SEO description and excerpt"
date: 2025-12-23T10:00:00+08:00
publishedDate: 2025-12-23T10:00:00+08:00
theme: "lived-experience"
keywords: [keyword1, keyword2]
type: article
tags:
  - lived-experience
  - healing
category: lived-experience
image: /assets/images/uploads/your-image.jpg
image_alt: "Description for accessibility"
author:
  name: "Helen Burgess"
socials:
  bluesky: "https://bsky.app/profile/@hlnbee.bsky.social"
  mastodon: "https://mastodon.social/@helenbee"
  facebook: "https://www.facebook.com/"
siteUrl: "https://helenburgess.id.au"
bluesky_description: "Custom Bluesky share text"
mastodon_description: "Custom Mastodon share text"
facebook_description: "Custom Facebook share text"
newsletter: true
draft: false
---
Your content here...
```

## File Naming & Organization

### Automatic Structure

Sveltia CMS automatically creates:

```
src/writings/YYYY/MM/YYYY-MM-DD-slug.md
```

Example:

```
src/writings/2025/12/2025-12-23-my-new-post.md
```

### Folder Structure

- **Year folders:** Automatically created (e.g., `2025/`)
- **Month folders:** Automatically created (e.g., `12/`)
- **Filename:** Generated from date and title slug

## Content Writing Tips

### Markdown Basics

```markdown
# Heading 1

## Heading 2

### Heading 3

**Bold text**
_Italic text_

[Link text](https://example.com)

![Image alt text](/path/to/image.jpg)

- Bullet list
- Another item

1. Numbered list
2. Another item
```

### Content Wrapper

Always wrap your content in a div for proper styling:

```markdown
---
# front matter here
---

<div class="content">

Your opening paragraph here.

## First Section

Content continues...

</div>
```

## Image Management

### Uploading Images

1. In the CMS, click the **Featured Image** field
2. Click "Upload" or drag-and-drop
3. Images save to: `assets/images/uploads/`
4. Automatically gets correct path in front matter

### Image Guidelines

- **Recommended size:** 1200x600px minimum
- **Format:** JPG or WebP preferred
- **Alt text:** Always provide for accessibility
- **Hero image:** Featured image displays at top of post

## Workflow

### Standard Publishing Flow

1. **Draft in CMS** → Write and save as draft
2. **Preview locally** → Test with `npm start`
3. **Publish** → Uncheck "Draft" and save
4. **Commit to GitHub** → Automatic via Sveltia
5. **Vercel deploys** → Live in 2-3 minutes

### Editing Existing Posts

1. Go to https://helenburgess.id.au/admin/
2. Click "Writings" in sidebar
3. Find and click the post to edit
4. Make changes
5. Click "Save" to commit

## Troubleshooting

### "Login Failed"

- Check GitHub authorization settings
- Revoke and re-authorize the app
- Clear browser cache

### "Cannot Save"

- Check internet connection
- Ensure you have write access to repository
- Check GitHub status page

### "Images Not Loading"

- Verify image uploaded to correct folder
- Check path starts with `/assets/images/uploads/`
- Ensure Eleventy passthrough copy is configured

### "Post Not Appearing"

- Check `draft: false` in front matter
- Verify date is not in future
- Check tags include "writings"
- Clear browser cache

### Local Backend Not Working

1. Stop the development server
2. Run: `npm start` again
3. Access http://localhost:8080/admin/
4. Should work without authentication

## Configuration

### CMS Config Location

`public/admin/config.yml`

### Key Settings

- **Backend:** GitHub (hlnb/helenbee-site)
- **Branch:** main
- **Media folder:** assets/images/uploads
- **Collections:** writings

### Customization

To modify CMS configuration:

1. Edit `public/admin/config.yml`
2. Commit and push changes
3. Reload CMS interface

## Features

### What Sveltia Offers

✅ **Git-based** - All content in your repository
✅ **Free & open source** - No subscription fees
✅ **Real-time preview** - See changes as you type
✅ **Media library** - Easy image management
✅ **Markdown editor** - Clean writing experience
✅ **Multi-field support** - Complex front matter
✅ **Local backend** - Test without deployment
✅ **Mobile friendly** - Edit on any device

### What Changed from CloudCannon

- Now uses GitHub directly (no CloudCannon proxy)
- Simpler authentication (GitHub OAuth)
- Same content structure (no migration needed)
- Same Vercel deployment workflow
- Free forever

## Advanced Usage

### Custom Slugs

Edit the slug pattern in `config.yml`:

```yaml
slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
```

### Additional Collections

Add more collections in `config.yml`:

```yaml
collections:
  - name: pages
    label: Pages
    folder: src/pages
    # ... fields
```

### Workflow Status

Enable editorial workflow for drafts/review:

```yaml
publish_mode: editorial_workflow
```

## Support & Resources

- **Sveltia Docs:** https://github.com/sveltia/sveltia-cms
- **Decap Docs:** https://decapcms.org/docs/ (compatible config)
- **Your Repo:** https://github.com/hlnb/helenbee-site
- **Live Site:** https://helenburgess.id.au

## Quick Reference

| Action       | Location | URL                                   |
| ------------ | -------- | ------------------------------------- |
| Edit content | CMS      | https://helenburgess.id.au/admin/     |
| View site    | Browser  | https://helenburgess.id.au            |
| Local dev    | Terminal | `npm start`                           |
| Local CMS    | Browser  | http://localhost:8080/admin/          |
| Deploy logs  | Vercel   | Check dashboard                       |
| Repo         | GitHub   | https://github.com/hlnb/helenbee-site |

---

**You're all set!** Go create your first post in Sveltia CMS. 🚀
