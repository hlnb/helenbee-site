# Development Guide

## Setup

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

## Local Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build production site
- `npm run serve` - Serve production build locally

### Development Workflow

1. Create feature branch
2. Make changes
3. Test locally
4. Create pull request

## Code Standards

### Code Comments

#### 1. Component Documentation

```javascript
/**
 * Component Name
 * @description Brief description of the component's purpose
 * @param {Object} props - Component properties
 * @param {string} props.property - Description of property
 * @example
 * {% include "components/component-name.njk" %}
 */
```

#### 2. CSS Documentation

```css
/* ==========================================================================
   Component: Name
   ========================================================================== */

/**
 * Component description and usage guidelines
 * 1. Numbered annotations for complex properties
 * 2. Include any dependencies or requirements
 */

.component {
	position: relative; /* 1 */
	z-index: 1; /* 2 */
}

/* Component variants
   ========================================================================== */

.component--variant {
	/* Variant specific styles */
}

/* Component states
   ========================================================================== */

.component.is-active {
	/* State specific styles */
}
```

#### 3. JavaScript Documentation

```javascript
/**
 * Function description
 * @param {string} param - Parameter description
 * @returns {boolean} Description of return value
 * @example
 * functionName('example');
 */
function functionName(param) {
	// Implementation details
}
```

#### 4. Template Documentation

```njk
{#
  @name: Template Name
  @description: Template purpose and usage
  @param {string} param - Parameter description
  @example:
    {% include "template-name.njk" with {
      param: "value"
    } %}
#}
```

#### 5. Configuration Documentation

```javascript
/**
 * Configuration object
 * @type {Object}
 * @property {string} property - Property description
 * @example
 * module.exports = {
 *   property: "value"
 * };
 */
```

### Comment Guidelines

1. **General Rules**

   - Keep comments concise and relevant
   - Update comments when code changes
   - Remove commented-out code
   - Use consistent formatting

2. **Section Headers**

   ```css
   /* ==========================================================================
      Section Name
      ========================================================================== */
   ```

3. **TODO Comments**

   ```javascript
   // TODO: Brief description of needed changes
   // FIXME: Brief description of problem
   ```

4. **File Headers**

   ```javascript
   /**
    * @file Filename
    * @description File purpose
    * @author Your Name
    * @lastModified YYYY-MM-DD
    */
   ```

5. **Inline Comments**
   - Use sparingly
   - Explain complex logic
   - Document workarounds
   - Note browser-specific code

## Testing

1. **Local Testing**

   - Cross-browser testing
   - Mobile responsiveness
   - Performance checks
   - Accessibility validation

2. **Build Testing**
   - Run production build
   - Check asset optimization
   - Verify deployments
   - Test all features

## Version Control

1. **Branch Naming**

   - feature/feature-name
   - fix/bug-name
   - docs/documentation-update

2. **Commit Messages**
   - Use conventional commits
   - Include ticket references
   - Be descriptive but concise

## Performance Guidelines

1. **Asset Optimization**

   - Compress images
   - Minify CSS/JS
   - Use appropriate formats
   - Implement lazy loading

2. **Code Optimization**
   - Avoid redundant code
   - Use efficient selectors
   - Minimize dependencies
   - Follow best practices

## Accessibility Standards

1. **HTML Structure**

   - Use semantic markup
   - Include ARIA labels
   - Maintain heading hierarchy
   - Provide alt text

2. **Interactive Elements**
   - Ensure keyboard navigation
   - Add focus states
   - Include skip links
   - Test with screen readers

## Licensing

### Code Usage

This project uses the MIT License. When contributing:

- Ensure new code complies with MIT License terms
- Document any third-party code or dependencies
- Include license headers in new files
- Respect copyright notices

### Content Rights

- Site content © 2024 Helen Burgess
- Code examples MIT Licensed
- Third-party assets must be properly attributed
