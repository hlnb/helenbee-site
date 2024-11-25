---
layout: writing.njk
title: Building a Modern Personal Site with 11ty
description: A deep dive into creating a responsive, modular website using Eleventy, CSS Grid, and modern web practices.
date: 2024-01-20
category: technology
tags:
  - technology
  - web development
  - 11ty
image: /assets/images/DALL·E-2023-10-26-road-less-travelled.png
excerpt: A deep dive into creating a responsive, modular website using Eleventy, CSS Grid, and modern web practices.
---

## Project Overview

After years of teaching web development and building sites for others, I decided it was time to rebuild my personal site. The goal was to create a digital garden that would serve as both a portfolio and a platform for sharing my journey in technology, crafting, and personal growth.

### Project Goals

- Create a responsive, modern website that works across all devices
- Implement a modular design system for easy maintenance and scalability
- Ensure fast loading times and optimal performance
- Build a platform that's easy to update with new content
- Maintain accessibility standards
- Create a space that reflects both my professional and personal interests

### Technologies Chosen

- **Eleventy (11ty)**: A simpler static site generator that allows for rapid development and excellent performance. I chose 11ty for its flexibility, speed, and straightforward approach to content management.
- **CSS Grid & Flexbox**: Modern layout tools that enable responsive design without the overhead of a framework. This approach gives more control over the layout while keeping the codebase lean.
- **Vanilla JavaScript**: For minimal interactivity needs, focusing on performance and avoiding unnecessary dependencies.

- **Markdown**: For content creation, making it easy to write and maintain blog posts and other content.

### Design Decisions

The design process focused on creating a clean, readable interface that would showcase content effectively. Key decisions included:

1. **Typography**: Using system fonts for optimal performance while maintaining readability

   - Headings: var(--font-heading)
   - Body: var(--font-body)

2. **Color Scheme**: A carefully selected palette that reflects professionalism while maintaining personality

   - Primary: Deep blues for trust and professionalism
   - Secondary: Warm accents for personality
   - Support colors: Subtle grays for hierarchy

3. **Layout Structure**:

   - Modular grid system for consistent spacing
   - Two-column layouts for content-heavy sections
   - Card-based design for writing collections
   - Full-width hero sections for impact

4. **Mobile-First Approach**:
   - Responsive navigation with hamburger menu
   - Stacked layouts on smaller screens
   - Optimized images and typography for mobile devices

### Initial Setup

The project began with a basic 11ty installation, but quickly evolved to include:

- Custom data files for site configuration
- Modular CSS architecture
- Partial templates for reusable components
- Asset optimization pipeline

In the following sections, I'll dive deeper into the implementation details and share the challenges and solutions encountered along the way.

## Key Features

### Hero Sections

One of the most striking elements of the site is the hero section implementation. Each page type has its own hero style, while maintaining consistent design patterns:

```css
/* Hero base styles */
.hero {
	position: relative;
	padding: 4rem 2rem;
	text-align: center;
	margin-bottom: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
```

The home page features a dramatic hero image with overlay text, while other pages use either images or gradient backgrounds. This flexibility was achieved through CSS class modifiers:

```css
/* Home hero specific styles */
.home-hero {
	background-image: url("/assets/images/DALL·E-2023-10-26-road-less-travelled.png");
	background-size: cover;
	background-position: center;
	height: 60vh;
}
```

### Modular Grid System

The site uses a modular grid system that adapts to different content needs. This approach allows for consistent spacing and alignment while maintaining flexibility:

```css
[data-layout="modular-four-columns"] {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: var(--modular-gap);
}
```

This system powers various layouts across the site, from the writings collection to the introduction section.

### Writing Cards

The writing cards component showcases content in an engaging, visual way:

```css
.writing-card {
	height: 100%;
	display: flex;
	flex-direction: column;
	background: var(--background-light);
	border-radius: 8px;
	overflow: hidden;
	border: 1px solid var(--support-1);
	transition: transform 0.3s ease;
}
```

Each card features:

- Responsive images with aspect ratio maintenance
- Hover effects for better interactivity
- Clear typography hierarchy
- Consistent spacing

### Responsive Navigation

The navigation system adapts seamlessly from desktop to mobile:

```css
/* Desktop Navigation */
.navbar-menu {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

/* Mobile Navigation */
@media (max-width: 768px) {
	.navbar-menu {
		display: none;
	}

	.navbar-menu.is-active {
		display: block;
		width: 100%;
	}
}
```

Key features include:

- Hamburger menu for mobile devices
- Smooth transitions between states
- Accessible navigation patterns
- Clear visual hierarchy

### Two-Column Layout

The introduction section uses a two-column layout that gracefully collapses on mobile:

```css
.introduction-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 2rem;
	margin: 2rem 0;
}

@media (max-width: 768px) {
	.introduction-grid {
		grid-template-columns: 1fr;
	}
}
```

### Footer Design

The footer provides important site-wide information and navigation:

```css
.footer-grid {
	display: grid;
	grid-template-columns: 2fr 1fr 1fr;
	gap: 3rem;
	margin-bottom: 3rem;
}
```

Features include:

- Social media integration with icons
- Quick links for navigation
- Responsive layout
- Copyright information
- Built with attribution

### CSS Custom Properties

The site uses CSS custom properties for consistent theming:

```css
:root {
	--font-heading: system-ui, sans-serif;
	--font-body: system-ui, sans-serif;
	--primary: #182848;
	--secondary: #4b6cb7;
	--accent-1: #6a82fb;
	--text-light: #ffffff;
	--text-dark: #333333;
	--modular-gap: 2rem;
}
```

This approach allows for:

- Easy theme modifications
- Consistent color usage
- Maintainable spacing system
- Typography scale management

## Challenges & Solutions

### Grid System Implementation

#### Challenge

Initially, implementing a flexible grid system that could handle different content types while maintaining consistency across the site proved challenging. The main issues were:

- Maintaining consistent spacing
- Handling different content lengths
- Ensuring responsive behavior
- Avoiding layout shifts

#### Solution

We implemented a data-attribute based approach combined with CSS Grid:

```css
[data-layout="modular-four-columns"] {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: var(--modular-gap);
}
```

This solution:

- Provides flexibility through data attributes
- Automatically adjusts columns based on viewport width
- Maintains consistent spacing through CSS variables
- Allows for easy modifications and extensions

### Mobile Navigation

#### Challenge

The navigation menu presented several challenges:

- Initial implementation had the home link cut off on mobile
- Menu items stacked poorly on smaller screens
- Transition animations were jerky
- Layout shifts occurred when toggling the menu

#### Solution

We implemented a hamburger menu with careful attention to layout and transitions:

```css
/* Hamburger button visibility */
.hamburger {
	display: none;
}

@media (max-width: 768px) {
	.hamburger {
		display: block;
	}

	.navbar-menu {
		display: none;
		width: 100%;
	}

	.navbar-menu.is-active {
		display: block;
	}
}
```

Combined with JavaScript for smooth transitions:

```javascript
document.addEventListener("DOMContentLoaded", () => {
	const hamburger = document.querySelector(".hamburger");
	const navMenu = document.querySelector(".navbar-menu");

	if (hamburger && navMenu) {
		hamburger.addEventListener("click", () => {
			hamburger.classList.toggle("is-active");
			navMenu.classList.toggle("is-active");
		});
	}
});
```

### Hero Image Handling

#### Challenge

Hero images presented several issues:

- Inconsistent heights across different pages
- Text readability over images
- Mobile responsiveness
- Loading performance

#### Solution

We implemented a flexible hero system with consistent overlays:

```css
.hero {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60vh;
}

.hero-content {
	position: relative;
	z-index: 2;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 8px;
	padding: 2rem;
}
```

This approach:

- Maintains consistent height ratios
- Ensures text readability through semi-transparent overlays
- Scales appropriately on mobile devices
- Allows for different background types (images or gradients)

### Two-Column Content Flow

#### Challenge

The introduction section needed to:

- Display content in two columns on desktop
- Flow naturally on mobile
- Maintain proper spacing
- Keep related content together

#### Solution

We used a combination of CSS Grid and careful content structuring:

```css
.introduction-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 2rem;
}

.introduction-content {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

@media (max-width: 768px) {
	.introduction-grid {
		grid-template-columns: 1fr;
	}
}
```

This solution:

- Maintains content relationships
- Provides clean breakpoints
- Ensures consistent spacing
- Allows for future content additions

### Footer Social Icons

#### Challenge

The footer social icons presented issues with:

- Icon alignment
- Spacing consistency
- Mobile responsiveness
- Visual integration

#### Solution

We implemented Font Awesome icons with careful spacing and alignment:

```css
.social-links {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.social-links a {
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.social-links i {
	font-size: 1.2rem;
	width: 20px;
}
```

This approach:

- Ensures consistent icon sizing
- Maintains proper alignment
- Provides clear visual hierarchy
- Works responsively across devices

## Lessons Learned

### What Worked Well

#### 1. Modular Approach

Taking a modular approach to both the CSS and HTML structure proved invaluable:

- Components are easily reusable across pages
- Maintenance is simplified
- Changes can be made without affecting other parts of the site
- New features can be added with minimal friction

#### 2. CSS Custom Properties

Using CSS variables for our design system was a game-changer:

```css
:root {
	--primary: #182848;
	--secondary: #4b6cb7;
	--accent-1: #6a82fb;
	--modular-gap: 2rem;
}
```

This made it easy to:

- Maintain consistent spacing
- Update colors site-wide
- Experiment with different values
- Keep the codebase DRY (Don't Repeat Yourself)

#### 3. Mobile-First Development

Starting with mobile layouts and scaling up to desktop helped:

- Identify potential issues early
- Ensure content priority
- Create cleaner breakpoints
- Reduce CSS complexity

#### 4. 11ty as a Static Site Generator

Eleventy proved to be an excellent choice because:

- Fast build times
- Simple templating system
- Flexible content management
- Great documentation and community support

### What Could Be Improved

#### 1. Image Optimization

Future improvements could include:

- Implementing a more robust image optimization pipeline
- Adding WebP format support
- Better handling of responsive images
- Lazy loading optimization

#### 2. Performance Optimization

While the site performs well, there's room for improvement:

- Reducing CSS file size through better organization
- Implementing critical CSS
- Further optimizing JavaScript
- Adding service workers for offline support

#### 3. Content Management

Some areas that could be enhanced:

- Creating a better tagging system for blog posts
- Implementing a search functionality
- Adding filtering options for the writings section
- Improving the content creation workflow

#### 4. Accessibility

While basic accessibility was considered, we could:

- Add more ARIA labels
- Improve keyboard navigation
- Enhance focus states
- Add skip links
- Implement better screen reader support

### Future Enhancements

#### 1. Technical Additions

Planning to add:

- Dark mode support
- RSS feed
- Search functionality
- Comments system
- Newsletter integration

#### 2. Content Features

Future content improvements:

- Category pages for better organization
- Related posts suggestions
- Reading time estimates
- Progress indicators for long posts

#### 3. User Experience

Potential UX improvements:

- Smoother page transitions
- Better loading states
- Enhanced navigation for mobile
- Improved social sharing options

### Key Takeaways

1. **Start Simple, Iterate Often**

   - Begin with basic functionality
   - Add features incrementally
   - Test thoroughly at each step
   - Refactor when needed

2. **Documentation is Crucial**

   - Keep notes during development
   - Document design decisions
   - Maintain a changelog
   - Comment complex code sections

3. **Community Matters**

   - Eleventy's community provided valuable resources
   - Stack Overflow helped solve specific issues
   - GitHub discussions offered insights
   - Documentation feedback improved the process

4. **Performance First**
   - Focus on core functionality
   - Minimize dependencies
   - Optimize assets
   - Monitor performance metrics

This project has been a valuable learning experience, combining modern web development practices with practical solutions. The modular approach and focus on maintainability will make future updates and improvements easier to implement.

## Conclusion

Building this personal site with 11ty has been more than just a technical exercise—it's been a journey of combining years of web development experience with modern tools and practices. The project successfully achieved its main goals of creating a responsive, maintainable, and performant platform that serves as both a portfolio and a digital garden.

### Project Success Metrics

- **Performance**: Achieving 90+ scores on Google Lighthouse
- **Responsive Design**: Seamless experience across all devices
- **Maintainability**: Modular components and clear documentation
- **Content Management**: Easy-to-update Markdown-based system

### Personal Growth

This project reinforced several important principles:

1. The value of planning and systematic approach to development
2. The importance of progressive enhancement
3. The benefits of choosing the right tools for the job
4. The power of simplicity in both design and code

### Technical Achievements

The site demonstrates several modern web development best practices:

- CSS Grid and Flexbox for robust layouts
- Mobile-first responsive design
- Modular component architecture
- Performance optimization
- Accessibility considerations

### Moving Forward

While the site is now live and functioning well, it's viewed as a living project that will continue to evolve. Future updates will focus on:

- Enhanced user experience features
- Improved accessibility
- Additional content types
- Performance optimizations
- Community engagement features

The journey of building this site has reinforced that good web development isn't just about writing code—it's about creating an experience that serves its purpose while being maintainable, accessible, and performant. As web technologies continue to evolve, this foundation will allow for easy adaptation and growth.

Remember, as Robert Frost wrote, "Two roads diverged in a wood, and I— I took the one less traveled by, And that has made all the difference." Sometimes, choosing the simpler, more maintainable path over the trendy or complex one can lead to better long-term results.
