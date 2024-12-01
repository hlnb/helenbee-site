# Project Overview

## Architecture

This site is built using [11ty](https://www.11ty.dev/) as a static site generator.

### Directory Structure

```
helenburgess.id.au/
├── src/
│   ├── _includes/
│   ├── _data/
│   ├── assets/
│   ├── writings/
│   └── pages/
├── docs/
├── .eleventy.js
├── netlify.toml
└── package.json
```

### Key Dependencies

#### Core

- **@11ty/eleventy**: Static site generator (v2.0.0+)
- **markdown-it**: Markdown processing and customization
- **nunjucks**: Template engine for layouts and includes

#### Asset Processing

- **@11ty/eleventy-img**: Image optimization and responsive images
- **@11ty/eleventy-plugin-directory-output**: Manages output directory structure
- **clean-css**: CSS minification
- **html-minifier**: HTML minification

#### Development

- **npm-run-all**: Run multiple npm scripts
- **cross-env**: Cross-platform environment variables
- **browser-sync**: Local development server with live reload
- **rimraf**: Cross-platform directory cleanup

#### Content Enhancement

- **@11ty/eleventy-plugin-rss**: RSS feed generation
- **@11ty/eleventy-plugin-syntaxhighlight**: Code syntax highlighting
- **luxon**: Date formatting and manipulation
- **slugify**: URL-friendly slug generation

#### Optional/Planned

- **eleventy-plugin-reading-time**: Estimate reading time for articles
- **eleventy-plugin-search**: Static search functionality
- **@11ty/eleventy-plugin-webc**: Web Components support
- **eleventy-plugin-toc**: Table of contents generation

## Build Process

1. Content processing (Markdown → HTML)
2. Template rendering
3. Asset optimization
4. Static site generation

## Deployment

### Netlify Configuration

The site is deployed using Netlify. Configuration is managed through `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "_site"
  node_version = "20.x"

[build.environment]
  TZ = "Australia/Sydney"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
```

### Deployment Process

1. **Automatic Deployments**:

   - Push to `main` branch triggers automatic deployment
   - Preview deployments created for pull requests
   - Deploy previews available for review

2. **Build Settings**:

   - Node.js version: 20.x
   - Build command: `npm run build`
   - Publish directory: `_site`
   - Environment: Australia/Sydney timezone

3. **Domain Configuration**:

   - Primary domain: helenburgess.id.au
   - SSL: Automatic HTTPS via Let's Encrypt
   - Force HTTPS enabled

4. **Security Headers**:

   - Content Security Policy (CSP) enabled
   - XSS protection enabled
   - Frame protection enabled
   - MIME type sniffing protection

5. **Performance**:
   - Asset optimization enabled
   - Automatic image optimization
   - Brotli compression
   - Cache control headers

### Monitoring

- Build logs available in Netlify dashboard
- Deploy notifications in GitHub
- Status badges for build status
- Analytics through Google Analytics
  - Pageview tracking
  - Event tracking
  - User behavior analysis
  - Performance monitoring
  - Custom dimensions for content categories
  - Site search tracking
  - Goal conversion tracking

### Google Analytics Configuration

```html
<!-- Google tag (gtag.js) -->
<script
	async
	src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}
	gtag("js", new Date());
	gtag("config", "G-XXXXXXXXXX", {
		anonymize_ip: true,
		cookie_flags: "SameSite=None;Secure",
	});
</script>
```

Note: Replace `G-XXXXXXXXXX` with your actual Google Analytics measurement ID.

### Privacy Considerations

- Cookie consent banner implementation
- IP anonymization enabled
- Compliance with GDPR and other privacy regulations
- Data retention policies configured
- User opt-out mechanism available

### Rollback Process

In case of deployment issues:

1. Access Netlify dashboard
2. Navigate to Deploys section
3. Select previous working deploy
4. Click "Publish deploy"
