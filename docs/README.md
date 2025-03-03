# helenburgess.id.au Documentation

This documentation covers the setup, development, and maintenance of helenburgess.id.au.

## Table of Contents

1. [Project Overview](./project-overview.md)
2. [Development Guide](./development.md)
3. [Components](./components.md)
4. [Design System](./design-system.md)
5. [Content Management](./content-management.md)

## Features

### Core Features

- Built with Eleventy
- Responsive design
- Custom CSS using CSS variables
- Bulma integration for components
- Blog/Writing section
- Reading list/Book reviews
- Contact form

### Recent Additions

1. **Newsletter Subscription**

   - ConvertKit integration
   - Custom styled form
   - Privacy-friendly loading

2. **Cookie Consent**

   - GDPR compliant cookie notice
   - User preference storage
   - Customizable styling
   - Clear accept/reject options

3. **Security Headers**
   - Content Security Policy (CSP) implementation
   - Cross-Origin Resource Sharing (CORS) settings
   - Third-party resource handling

## Configuration

### Content Security Policy

The site uses a comprehensive CSP configured in `netlify.toml`:

- Allows necessary third-party resources (ConvertKit, FontAwesome, Google Fonts)
- Implements secure cookie handling
- Controls cross-origin requests

## Deployment

The site is deployed on Netlify with:

- Automatic builds from main branch
- Custom security headers
- Asset optimization

## File Structure

src/
├── includes/
│ ├── layouts/
│ └── partials/
│ ├── newsletter-cta.njk
│ └── cookie-notice.njk
├── assets/
│ └── css/
│ └── styles.css
└── pages/

## Contributing

## Contributing

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/REPOSITORY-NAME.git
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Visit `http://localhost:8080` to see your changes

### Code Style Guidelines

- Use consistent indentation (2 spaces)
- Follow the existing naming conventions
- Add comments for complex logic
- Keep functions and components focused and single-purpose
- Use semantic HTML elements
- Follow CSS BEM naming convention where applicable

### Making Changes

1. Make your changes in your feature branch
2. Test your changes locally
3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

### Submitting a Pull Request

1. Go to the original repository on GitHub
2. Click "Pull Request"
3. Select your feature branch
4. Add a clear title and description:
   - What changes were made
   - Why the changes were made
   - Any special considerations or dependencies
5. Submit the pull request

### Best Practices

- Keep pull requests focused on a single feature or fix
- Update documentation for any new features
- Add or update tests if applicable
- Ensure all existing tests pass
- Check that your code follows the project's style guidelines
- Test your changes in multiple browsers if making frontend changes

### Need Help?

- Check existing issues and pull requests
- Create an issue for discussion before making major changes
- Reach out to maintainers if you have questions

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's code of conduct guidelines

Your contributions are valued and appreciated! Thank you for helping improve this project.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

### Content License

All blog posts and personal content are © 2024 Helen Burgess. All rights reserved.

### Code License

The code in this repository is MIT licensed, which means you can use it as a template for your own site, but:

- You must include the original copyright notice
- You cannot use my personal content, images, or branding
- You must remove my personal information and replace it with your own

### Newsletter Integration

The newsletter form is implemented using ConvertKit:

- Located in `src/_includes/partials/newsletter-cta.njk`
- Privacy-friendly loading attributes
- Custom styling to match site theme

### Cookie Consent

Cookie notice implementation:

- Located in `src/_includes/partials/cookie-notice.njk`
- Uses localStorage for preference storage
- Styled to match site theme
- Mobile responsive

### Build

```bash
npm run build
```

## Development

### Prerequisites

- Node.js
- npm/yarn

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

```bash
npm run build
```
