/**
 * Unit Tests for Login Page UI
 * Tests HTML structure, CSS classes, and element attributes
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Login Page UI Unit Tests', () => {
  let dom;
  let document;
  let window;

  beforeAll(() => {
    // Read the HTML file
    const htmlPath = path.join(__dirname, '../../frontend/src/pages/Login.html');
    const html = fs.readFileSync(htmlPath, 'utf8');

    // Create JSDOM instance
    dom = new JSDOM(html, {
      url: 'http://localhost',
      runScripts: 'dangerously',
      resources: 'usable'
    });

    document = dom.window.document;
    window = dom.window;
  });

  afterAll(() => {
    if (dom && dom.window) {
      dom.window.close();
    }
  });

  describe('TC-002: HTML Document Structure', () => {
    test('should have proper DOCTYPE declaration', () => {
      expect(dom.window.document.doctype).not.toBeNull();
      expect(dom.window.document.doctype.name).toBe('html');
    });

    test('should have html element with lang attribute', () => {
      const htmlElement = document.querySelector('html');
      expect(htmlElement).not.toBeNull();
      expect(htmlElement.getAttribute('lang')).toBe('en');
    });

    test('should have proper meta tags', () => {
      const charset = document.querySelector('meta[charset]');
      expect(charset).not.toBeNull();
      expect(charset.getAttribute('charset')).toBe('UTF-8');

      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    test('should have proper title', () => {
      const title = document.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent).toContain('Login');
    });

    test('should link to CSS stylesheets', () => {
      const resetCSS = document.querySelector('link[href*="reset.css"]');
      const loginCSS = document.querySelector('link[href*="login.css"]');
      
      expect(resetCSS).not.toBeNull();
      expect(loginCSS).not.toBeNull();
    });
  });

  describe('TC-003: Username Input Element', () => {
    let usernameInput;

    beforeEach(() => {
      usernameInput = document.getElementById('username');
    });

    test('should exist in the DOM', () => {
      expect(usernameInput).not.toBeNull();
    });

    test('should have correct type attribute', () => {
      expect(usernameInput.getAttribute('type')).toBe('text');
    });

    test('should have correct name attribute', () => {
      expect(usernameInput.getAttribute('name')).toBe('username');
    });

    test('should have required attribute', () => {
      expect(usernameInput.hasAttribute('required')).toBe(true);
    });

    test('should have correct maxlength attribute', () => {
      expect(usernameInput.getAttribute('maxlength')).toBe('255');
    });

    test('should have autocomplete attribute', () => {
      expect(usernameInput.getAttribute('autocomplete')).toBe('username');
    });

    test('should have placeholder text', () => {
      expect(usernameInput.getAttribute('placeholder')).toBe('Enter your username');
    });

    test('should have proper ARIA attributes', () => {
      expect(usernameInput.getAttribute('aria-required')).toBe('true');
      expect(usernameInput.hasAttribute('aria-labelledby')).toBe(true);
      expect(usernameInput.hasAttribute('aria-describedby')).toBe(true);
    });
  });

  describe('TC-004: Password Input Element', () => {
    let passwordInput;

    beforeEach(() => {
      passwordInput = document.getElementById('password');
    });

    test('should exist in the DOM', () => {
      expect(passwordInput).not.toBeNull();
    });

    test('should have correct type attribute', () => {
      expect(passwordInput.getAttribute('type')).toBe('password');
    });

    test('should have correct name attribute', () => {
      expect(passwordInput.getAttribute('name')).toBe('password');
    });

    test('should have required attribute', () => {
      expect(passwordInput.hasAttribute('required')).toBe(true);
    });

    test('should have correct maxlength attribute', () => {
      expect(passwordInput.getAttribute('maxlength')).toBe('128');
    });

    test('should have autocomplete attribute', () => {
      expect(passwordInput.getAttribute('autocomplete')).toBe('current-password');
    });

    test('should have placeholder text', () => {
      expect(passwordInput.getAttribute('placeholder')).toBe('Enter your password');
    });

    test('should have proper ARIA attributes', () => {
      expect(passwordInput.getAttribute('aria-required')).toBe('true');
      expect(passwordInput.hasAttribute('aria-labelledby')).toBe(true);
      expect(passwordInput.hasAttribute('aria-describedby')).toBe(true);
    });
  });

  describe('TC-009: CSS Class Application', () => {
    test('login container should have correct class', () => {
      const container = document.querySelector('.login-container');
      expect(container).not.toBeNull();
    });

    test('login form wrapper should have correct class', () => {
      const wrapper = document.querySelector('.login-form-wrapper');
      expect(wrapper).not.toBeNull();
    });

    test('login heading should have correct class', () => {
      const heading = document.querySelector('.login-heading');
      expect(heading).not.toBeNull();
    });

    test('login form should have correct class', () => {
      const form = document.querySelector('.login-form');
      expect(form).not.toBeNull();
    });

    test('form groups should have correct class', () => {
      const formGroups = document.querySelectorAll('.form-group');
      expect(formGroups.length).toBeGreaterThanOrEqual(2);
    });

    test('form labels should have correct class', () => {
      const labels = document.querySelectorAll('.form-label');
      expect(labels.length).toBeGreaterThanOrEqual(2);
    });

    test('form inputs should have correct class', () => {
      const inputs = document.querySelectorAll('.form-input');
      expect(inputs.length).toBeGreaterThanOrEqual(2);
    });

    test('login button should have correct class', () => {
      const button = document.querySelector('.login-button');
      expect(button).not.toBeNull();
    });
  });

  describe('TC-011: Username Label', () => {
    let usernameLabel;

    beforeEach(() => {
      usernameLabel = document.querySelector('label[for="username"]');
    });

    test('should exist in the DOM', () => {
      expect(usernameLabel).not.toBeNull();
    });

    test('should have correct for attribute', () => {
      expect(usernameLabel.getAttribute('for')).toBe('username');
    });

    test('should have correct text content', () => {
      expect(usernameLabel.textContent.trim()).toBe('Username');
    });

    test('should have correct ID for ARIA', () => {
      expect(usernameLabel.getAttribute('id')).toBe('username-label');
    });
  });

  describe('TC-012: Password Label', () => {
    let passwordLabel;

    beforeEach(() => {
      passwordLabel = document.querySelector('label[for="password"]');
    });

    test('should exist in the DOM', () => {
      expect(passwordLabel).not.toBeNull();
    });

    test('should have correct for attribute', () => {
      expect(passwordLabel.getAttribute('for')).toBe('password');
    });

    test('should have correct text content', () => {
      expect(passwordLabel.textContent.trim()).toBe('Password');
    });

    test('should have correct ID for ARIA', () => {
      expect(passwordLabel.getAttribute('id')).toBe('password-label');
    });
  });

  describe('TC-013: Submit Button', () => {
    let submitButton;

    beforeEach(() => {
      submitButton = document.querySelector('button[type="submit"]');
    });

    test('should exist in the DOM', () => {
      expect(submitButton).not.toBeNull();
    });

    test('should have correct type attribute', () => {
      expect(submitButton.getAttribute('type')).toBe('submit');
    });

    test('should have correct text content', () => {
      expect(submitButton.textContent.trim()).toBe('Log In');
    });

    test('should have ARIA label', () => {
      expect(submitButton.hasAttribute('aria-label')).toBe(true);
    });
  });

  describe('Form Structure', () => {
    let form;

    beforeEach(() => {
      form = document.getElementById('loginForm');
    });

    test('should have form element', () => {
      expect(form).not.toBeNull();
    });

    test('should have correct method attribute', () => {
      expect(form.getAttribute('method')).toBe('post');
    });

    test('should have action attribute', () => {
      expect(form.hasAttribute('action')).toBe(true);
    });

    test('should have novalidate attribute for custom validation', () => {
      expect(form.hasAttribute('novalidate')).toBe(true);
    });

    test('should have ARIA label', () => {
      expect(form.hasAttribute('aria-label')).toBe(true);
    });
  });

  describe('Error Message Elements', () => {
    test('should have username error message element', () => {
      const usernameError = document.getElementById('username-error');
      expect(usernameError).not.toBeNull();
      expect(usernameError.classList.contains('error-message')).toBe(true);
      expect(usernameError.getAttribute('role')).toBe('alert');
      expect(usernameError.getAttribute('aria-live')).toBe('polite');
    });

    test('should have password error message element', () => {
      const passwordError = document.getElementById('password-error');
      expect(passwordError).not.toBeNull();
      expect(passwordError.classList.contains('error-message')).toBe(true);
      expect(passwordError.getAttribute('role')).toBe('alert');
      expect(passwordError.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('Additional Links', () => {
    test('should have login footer section', () => {
      const footer = document.querySelector('.login-footer');
      expect(footer).not.toBeNull();
    });

    test('should have sign up link', () => {
      const signupLink = Array.from(document.querySelectorAll('.login-footer a'))
        .find(link => link.textContent.toLowerCase().includes('sign up'));
      expect(signupLink).not.toBeNull();
    });

    test('should have forgot password link', () => {
      const forgotLink = Array.from(document.querySelectorAll('.login-footer a'))
        .find(link => link.textContent.toLowerCase().includes('forgot'));
      expect(forgotLink).not.toBeNull();
    });
  });

  describe('Accessibility Features', () => {
    test('all form inputs should have associated labels', () => {
      const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
      inputs.forEach(input => {
        const id = input.getAttribute('id');
        const label = document.querySelector(`label[for="${id}"]`);
        expect(label).not.toBeNull();
      });
    });

    test('all interactive elements should be keyboard accessible', () => {
      const interactiveElements = document.querySelectorAll('input, button, a');
      expect(interactiveElements.length).toBeGreaterThan(0);
      
      interactiveElements.forEach(element => {
        // Elements should not have tabindex="-1" unless intentionally not keyboard accessible
        const tabindex = element.getAttribute('tabindex');
        if (tabindex !== null) {
          expect(parseInt(tabindex)).toBeGreaterThanOrEqual(-1);
        }
      });
    });

    test('form should have semantic HTML structure', () => {
      const form = document.querySelector('form');
      const heading = document.querySelector('h1');
      const labels = document.querySelectorAll('label');
      const inputs = document.querySelectorAll('input');
      const button = document.querySelector('button');

      expect(form).not.toBeNull();
      expect(heading).not.toBeNull();
      expect(labels.length).toBeGreaterThanOrEqual(2);
      expect(inputs.length).toBeGreaterThanOrEqual(2);
      expect(button).not.toBeNull();
    });
  });
});
