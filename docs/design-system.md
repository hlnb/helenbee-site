# Design System

## Colors

```css
:root {
	/* Primary Colors */
	--primary: #182848; /* Deep blue for main elements */
	--secondary: #4b6cb7; /* Mid blue for secondary elements */
	--accent-1: #6a82fb; /* Bright blue for highlights */

	/* Text Colors */
	--text-light: #ffffff;
	--text-dark: #333333;
	--text-muted: #666666;

	/* Background Colors */
	--background: #ffffff;
	--background-alt: #f5f5f5;
	--background-dark: #1a1a1a;

	/* Support Colors */
	--support-1: #e0e0e0; /* Borders, dividers */
	--support-2: #f0f0f0; /* Card backgrounds */
	--error: #dc3545; /* Error messages */
	--success: #28a745; /* Success messages */
}
```

## Typography

### Font Families

```css
:root {
	--font-heading: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen, Ubuntu, Cantarell, sans-serif;
	--font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen, Ubuntu, Cantarell, sans-serif;
	--font-mono: "SF Mono", SFMono-Regular, Consolas, "Liberation Mono", Menlo,
		Courier, monospace;
}
```

### Font Sizes

```css
:root {
	/* Base size: 16px */
	--text-xs: 0.75rem; /* 12px */
	--text-sm: 0.875rem; /* 14px */
	--text-base: 1rem; /* 16px */
	--text-lg: 1.125rem; /* 18px */
	--text-xl: 1.25rem; /* 20px */
	--text-2xl: 1.5rem; /* 24px */
	--text-3xl: 1.875rem; /* 30px */
	--text-4xl: 2.25rem; /* 36px */
	--text-5xl: 3rem; /* 48px */
}
```

### Font Weights

```css
:root {
	--weight-normal: 400;
	--weight-medium: 500;
	--weight-semibold: 600;
	--weight-bold: 700;
}
```

### Line Heights

```css
:root {
	--leading-none: 1;
	--leading-tight: 1.25;
	--leading-snug: 1.375;
	--leading-normal: 1.5;
	--leading-relaxed: 1.625;
	--leading-loose: 2;
}
```

## Spacing

We use a consistent spacing scale throughout the site:

```css
:root {
	--space-xs: 0.25rem; /* 4px */
	--space-sm: 0.5rem; /* 8px */
	--space-md: 1rem; /* 16px */
	--space-lg: 2rem; /* 32px */
	--space-xl: 4rem; /* 64px */
	--space-2xl: 6rem; /* 96px */
}
```

## Grid System

The site uses CSS Grid with a 12-column layout system:

```css
.grid {
	display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr));
	gap: var(--space-md);
}
```

### Breakpoints

```css
/* Mobile first approach */
:root {
	--breakpoint-sm: 640px; /* Small devices */
	--breakpoint-md: 768px; /* Medium devices */
	--breakpoint-lg: 1024px; /* Large devices */
	--breakpoint-xl: 1280px; /* Extra large devices */
}
```

## Container Widths

```css
:root {
	--container-sm: 640px;
	--container-md: 768px;
	--container-lg: 1024px;
	--container-xl: 1280px;
}
```

## Border Radius

```css
:root {
	--radius-sm: 0.125rem; /* 2px */
	--radius-md: 0.25rem; /* 4px */
	--radius-lg: 0.5rem; /* 8px */
	--radius-xl: 1rem; /* 16px */
	--radius-full: 9999px; /* Full rounded */
}
```

## Shadows

```css
:root {
	--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
	--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

## Usage Examples

### Typography

```html
<h1 class="text-4xl font-bold leading-tight">Main Heading</h1>
<p class="text-base leading-normal">Body text with normal line height</p>
<code class="font-mono text-sm">Code snippet</code>
```

### Grid Layout

```html
<div class="grid">
	<div class="col-span-12 md:col-span-6 lg:col-span-4">
		<!-- Content -->
	</div>
</div>
```

### Spacing

```html
<div class="space-y-md">
	<!-- Elements with vertical spacing -->
</div>
```
