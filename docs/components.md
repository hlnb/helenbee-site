# Components

## Overview

All components are located in `src/_includes/components/` and use Nunjucks templating.

## Hero Component

The hero component is used for page headers and featured content areas.

### Usage

```njk
{% include "components/hero.njk" %}
```

### Properties

```yaml
hero:
  title: "Main heading text"
  subtitle: "Optional subheading text"
  image: "/assets/images/hero-image.jpg"
  overlay: true
  alignment: "center" # Options: left, center, right
  size: "large" # Options: small, medium, large
```

### Variants

1. **Full-width Hero**

```njk
{% set heroData = {
  title: "Welcome",
  subtitle: "Explore my digital garden",
  image: "/assets/images/hero.jpg",
  overlay: true,
  size: "large"
} %}
{% include "components/hero.njk" %}
```

2. **Minimal Hero**

```njk
{% set heroData = {
  title: "Blog Post Title",
  size: "small"
} %}
{% include "components/hero.njk" %}
```

## Navigation

The main navigation component adapts between mobile and desktop views.

### Usage

```njk
{% include "components/nav.njk" %}
```

### Properties

```yaml
navigation:
  logo: "/assets/images/logo.svg"
  items:
    - text: "Home"
      url: "/"
      active: true
    - text: "About"
      url: "/about"
    - text: "Writing"
      url: "/writing"
```

### Features

- Responsive design
- Mobile hamburger menu
- Active state handling
- Accessibility support
- Smooth transitions

## Writing Card

Used to display blog post previews in lists and grids.

### Usage

```njk
{% include "components/writing-card.njk" %}
```

### Properties

```yaml
post:
  title: "Post Title"
  date: "2024-01-20"
  excerpt: "Brief excerpt of the post"
  image: "/assets/images/post-image.jpg"
  url: "/writing/post-slug"
  tags: ["technology", "web development"]
```

### Features

- Responsive image handling
- Date formatting
- Tag display
- Excerpt truncation
- Hover effects

## Footer

Site-wide footer with navigation and social links.

### Usage

```njk
{% include "components/footer.njk" %}
```

### Properties

```yaml
footer:
  social:
    - platform: "GitHub"
      url: "https://github.com/username"
      icon: "github"
    - platform: "LinkedIn"
      url: "https://linkedin.com/in/username"
      icon: "linkedin"
  links:
    - text: "Privacy Policy"
      url: "/privacy"
    - text: "Terms"
      url: "/terms"
```

### Features

- Social media integration
- Secondary navigation
- Copyright notice
- Responsive layout
- Built with attribution

## Common Component Features

All components share these characteristics:

### Accessibility

- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast compliance

### Responsive Design

- Mobile-first approach
- Breakpoint handling
- Fluid typography
- Flexible layouts

### Performance

- Lazy loading images
- CSS containment
- Minimal JavaScript
- Optimized assets

### Usage Guidelines

1. **Component Import**

```njk
{# Include component #}
{% include "components/component-name.njk" %}

{# Pass data to component #}
{% set componentData = {
  property: "value"
} %}
{% include "components/component-name.njk" %}
```

2. **Custom Styling**

```css
/* Component base styles */
.component-name {
	/* Base styles */
}

/* Component variants */
.component-name--variant {
	/* Variant styles */
}
```

3. **JavaScript Integration**

```javascript
// If component requires JavaScript
document.addEventListener("DOMContentLoaded", () => {
	// Component initialization
});
```

### Testing

Components should be tested for:

- Cross-browser compatibility
- Responsive behavior
- Accessibility compliance
- Performance impact
- JavaScript functionality
