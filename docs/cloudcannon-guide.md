# CloudCannon CMS Guide

## Your Site is Connected! 🎉

CloudCannon is already set up and working with your site (as shown by the recent "Updated 2 files via CloudCannon" commit).

## Quick Start: Creating Content

### Method 1: Via CloudCannon Dashboard (Recommended)

1. **Go to CloudCannon:**

   - Visit: https://app.cloudcannon.com
   - Log in with your account

2. **Navigate to Writings:**

   - In the sidebar, click **Collections**
   - Select **Writings**

3. **Create New Post:**

   - Click **+ Add Writing** button
   - Fill in the form:
     - **Title:** Your post title
     - **Date:** Publication date (defaults to today)
     - **Excerpt:** Short summary (1-2 sentences)
     - **Tags:** Select from dropdown or add new ones
     - **Category:** Choose: lived-experience, technology, reflection, or creative
     - **Image:** Upload or browse to `assets/images/uploads/`

4. **Write Content:**

   - Use the content editor to write your markdown
   - Preview available in CloudCannon

5. **Save & Publish:**
   - Click **Save**
   - CloudCannon commits to GitHub
   - Vercel automatically rebuilds your site
   - Live in ~1-2 minutes!

### Method 2: Using Schema Template Locally

```bash
# 1. Copy the template
cp .cloudcannon/schemas/writing.md src/writings/2025/11/2025-11-24-my-post-title.md

# 2. Edit the file
# Fill in front matter and content

# 3. Commit and push
git add src/writings/2025/11/2025-11-24-my-post-title.md
git commit -m "Add: My Post Title"
git push origin main
```

### Method 3: Create from Scratch

Create a new file: `src/writings/YYYY/MM/YYYY-MM-DD-slug.md`

```markdown
---
layout: layouts/writing.njk
title: "My Post Title"
date: 2025-11-24
excerpt: "A brief summary of this post"
tags:
  - lived-experience
  - mental-health
category: lived-experience
image: /assets/images/uploads/my-image.jpg
---

Your content here in markdown...

## Subheading

Paragraph text...
```

## Front Matter Fields Reference

### Required Fields

- **layout:** `layouts/writing.njk` (always use this)
- **title:** Post title (string)
- **date:** Publication date (YYYY-MM-DD or ISO format)
- **tags:** Array of tags (at least one)

### Optional but Recommended

- **excerpt:** Short summary (displayed on listings)
- **category:** Primary category (lived-experience, technology, reflection, creative)
- **image:** Featured image path (relative to site root)
- **description:** SEO description (if different from excerpt)

### Other Available Fields

- **publishedDate:** Original publication date if republishing
- **theme:** Thematic grouping
- **keywords:** Array of SEO keywords
- **author:** Author object with name and details
- **socials:** Social media links object

## File Naming Convention

**Pattern:** `YYYY-MM-DD-slug.md`

**Location:** `src/writings/YYYY/MM/`

**Examples:**

- `src/writings/2025/11/2025-11-24-my-healing-journey.md`
- `src/writings/2025/12/2025-12-25-christmas-reflection.md`

## Image Management

### Via CloudCannon:

1. In the post editor, click the **Image** field
2. Click **Choose File** or drag & drop
3. Images auto-upload to `assets/images/uploads/`
4. Path is auto-inserted: `/assets/images/uploads/filename.jpg`

### Manually:

1. Add images to: `assets/images/uploads/`
2. Reference in front matter: `image: /assets/images/uploads/my-image.jpg`
3. Use in markdown: `![Alt text](/assets/images/uploads/my-image.jpg)`

## Common Tags

Existing tags you can use:

- `lived-experience`, `veterans`, `mental-health`, `ptsd`
- `technology`, `web development`, `11ty`, `AI`
- `personal journey`, `healing`, `therapy`
- `creativity`, `digital art`, `knitting`
- `meditation`, `mindfulness`, `stoicism`, `freemasonry`

You can always create new tags!

## Workflow Summary

```
Write in CloudCannon → Save → Commit to GitHub → Vercel builds → Live site
```

**Timeline:** Changes typically live within 1-2 minutes.

## Checking Your Posts

### Locally:

```bash
npm run start
# Visit: http://localhost:8080/writings/
```

### Production:

- Visit: https://helenburgess.id.au/writings/
- Individual post: https://helenburgess.id.au/writings/YYYY/MM/YYYY-MM-DD-slug/

## Troubleshooting

### Post Not Showing Up?

- Check front matter has required fields (title, date, tags, layout)
- Verify file is in correct location: `src/writings/YYYY/MM/`
- Check build logs in Vercel dashboard

### Images Not Loading?

- Ensure image path starts with `/assets/images/uploads/`
- Check file exists in `assets/images/uploads/` directory
- Verify image was committed to git

### Editing Conflicts?

- Always pull latest before editing locally: `git pull origin main`
- If conflict occurs, CloudCannon shows merge options

## Tips

1. **Draft Posts:** Add `draft: true` to front matter to hide from listings
2. **Scheduling:** Set future dates - post won't show until that date
3. **Categories:** Keep consistent - use existing categories when possible
4. **Excerpts:** Aim for 1-2 sentences, ~150 characters
5. **Tags:** Use 3-5 relevant tags per post
6. **Images:** Optimize before uploading (recommend < 500KB, .jpg or .webp)

## Need Help?

- CloudCannon Docs: https://cloudcannon.com/documentation/
- Eleventy Docs: https://www.11ty.dev/docs/
- Your site repo: https://github.com/hlnb/helenbee-site

---

**You're all set!** Go create your first post in CloudCannon. 🚀
