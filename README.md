# AI SDLC Automation Platform

This repository contains the AI SDLC Automation Platform, a comprehensive solution for automating software development lifecycle processes.

## Project Structure

```
hcpcs/
├── frontend/
│   └── src/
│       ├── pages/
│       │   └── Login.html          # Login page
│       └── styles/
│           ├── reset.css           # CSS reset for cross-browser consistency
│           └── login.css           # Login page styles
├── tests/
│   ├── unit/
│   │   └── login-page-ui.spec.js   # Unit tests for login page UI
│   └── e2e/
│       └── login-page.spec.js      # End-to-end tests for login page
├── docs/
│   └── login-page-specification.md # Technical specification for login page
└── README.md                        # This file
```

## Features

### Login Page

The login page provides a secure and accessible entry point for user authentication.

**Location**: `frontend/src/pages/Login.html`

**Features**:
- Clean, modern interface with responsive design
- WCAG 2.1 AA compliant accessibility
- Cross-browser compatible (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Mobile-first responsive design (320px to 1920px+)
- Client-side validation with user-friendly error messages
- Keyboard navigation support
- Screen reader compatible with proper ARIA attributes

**How to Use**:

1. **Open the login page**:
   - Navigate to `frontend/src/pages/Login.html` in your browser
   - Or serve via a local web server:
     ```bash
     # Using Python 3
     cd frontend/src/pages
     python -m http.server 8080
     # Then visit: http://localhost:8080/Login.html
     ```

2. **Development**:
   - HTML structure: `frontend/src/pages/Login.html`
   - Styles: `frontend/src/styles/login.css` and `frontend/src/styles/reset.css`
   - Modify styles in the CSS files; changes will reflect immediately on page reload

3. **Testing**:
   - Unit tests: `npm test tests/unit/login-page-ui.spec.js`
   - E2E tests: `npx playwright test tests/e2e/login-page.spec.js`

**Technical Details**:
- Pure HTML/CSS with minimal vanilla JavaScript
- No external dependencies or frameworks
- Form submission currently prevents default (ready for backend integration)
- Client-side validation for UX enhancement
- See `docs/login-page-specification.md` for complete technical specification

## Getting Started

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Node.js 14+ (for running tests)
- npm or yarn (for installing test dependencies)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd hcpcs
   ```

2. **Install dependencies** (for testing):
   ```bash
   npm install
   ```

3. **Run tests**:
   ```bash
   # Unit tests
   npm run test:unit
   
   # E2E tests
   npm run test:e2e
   
   # All tests
   npm test
   ```

## Development Guidelines

### Code Standards

- **HTML**: Use semantic HTML5 elements
- **CSS**: Follow BEM-like naming conventions for classes
- **JavaScript**: Use vanilla JavaScript (ES6+), no frameworks
- **Accessibility**: Ensure WCAG 2.1 AA compliance for all new features
- **Responsive**: Test at mobile (320px), tablet (768px), and desktop (1920px) breakpoints

### Testing

- All new features must include unit tests
- UI components must include E2E tests
- Accessibility tests required for interactive elements
- Run tests before committing changes

### Browser Support

- Test in Chrome, Firefox, Safari, and Edge
- Ensure functionality on both desktop and mobile devices
- Verify keyboard navigation and screen reader compatibility

## Documentation

- **Login Page Specification**: `docs/login-page-specification.md`
  - Complete technical documentation
  - Accessibility compliance details
  - Browser support matrix
  - Security considerations

## Future Development

### Planned Features

- Backend integration for authentication
- Password strength indicator
- "Remember me" functionality
- Multi-factor authentication
- Social login options
- Dark mode support

### Backend Integration

The login page is ready for backend integration. Required API endpoint:

```
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

See `docs/login-page-specification.md` for detailed API requirements and security considerations.

## Contributing

Please follow these steps when contributing:

1. Create a feature branch from `main`
2. Implement your changes with tests
3. Ensure all tests pass
4. Run accessibility audit (axe DevTools or WAVE)
5. Submit a pull request with detailed description

## License

Copyright © 2024. All rights reserved.

## Support

For issues or questions, please contact the development team or create an issue in the repository.
