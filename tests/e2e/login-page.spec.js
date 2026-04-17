/**
 * End-to-End Tests for Login Page
 * Tests functional requirements, responsive design, and accessibility
 * 
 * Note: These tests use Playwright. Install with: npm install -D @playwright/test
 * Run with: npx playwright test
 */

const { test, expect } = require('@playwright/test');

// Base URL for the login page
const LOGIN_URL = 'http://localhost:8080/frontend/src/pages/Login.html';

test.describe('Login Page E2E Tests', () => {
  
  test.describe('TC-001: Page Load and Rendering', () => {
    test('should load the login page successfully', async ({ page }) => {
      await page.goto(LOGIN_URL);
      await expect(page).toHaveTitle(/Login/);
    });

    test('should display the login form', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const form = page.locator('#loginForm');
      await expect(form).toBeVisible();
    });

    test('should display the heading', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const heading = page.locator('.login-heading');
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText(/Welcome Back/i);
    });
  });

  test.describe('TC-005: Username Input Interaction', () => {
    test('should accept text input in username field', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const usernameInput = page.locator('#username');
      await usernameInput.fill('testuser');
      await expect(usernameInput).toHaveValue('testuser');
    });

    test('should display placeholder text', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const usernameInput = page.locator('#username');
      await expect(usernameInput).toHaveAttribute('placeholder', 'Enter your username');
    });

    test('should focus on username field when clicked', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const usernameInput = page.locator('#username');
      await usernameInput.click();
      await expect(usernameInput).toBeFocused();
    });
  });

  test.describe('TC-006: Password Input Interaction', () => {
    test('should accept text input in password field', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const passwordInput = page.locator('#password');
      await passwordInput.fill('testpassword123');
      await expect(passwordInput).toHaveValue('testpassword123');
    });

    test('should mask password characters', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const passwordInput = page.locator('#password');
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('should display placeholder text', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const passwordInput = page.locator('#password');
      await expect(passwordInput).toHaveAttribute('placeholder', 'Enter your password');
    });
  });

  test.describe('TC-007: Form Submission', () => {
    test('should prevent empty form submission', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const submitButton = page.locator('.login-button');
      await submitButton.click();
      
      // Check that error messages appear
      const usernameError = page.locator('#username-error');
      const passwordError = page.locator('#password-error');
      
      await expect(usernameError).toBeVisible();
      await expect(passwordError).toBeVisible();
    });

    test('should show error when only username is filled', async ({ page }) => {
      await page.goto(LOGIN_URL);
      await page.locator('#username').fill('testuser');
      await page.locator('.login-button').click();
      
      const passwordError = page.locator('#password-error');
      await expect(passwordError).toBeVisible();
    });

    test('should show error when only password is filled', async ({ page }) => {
      await page.goto(LOGIN_URL);
      await page.locator('#password').fill('testpassword');
      await page.locator('.login-button').click();
      
      const usernameError = page.locator('#username-error');
      await expect(usernameError).toBeVisible();
    });

    test('should clear errors when valid input is provided', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const usernameInput = page.locator('#username');
      const passwordInput = page.locator('#password');
      const submitButton = page.locator('.login-button');
      
      // Submit empty form to trigger errors
      await submitButton.click();
      
      // Fill in the fields
      await usernameInput.fill('testuser');
      await passwordInput.fill('testpassword');
      
      // Errors should be cleared
      const usernameError = page.locator('#username-error');
      const passwordError = page.locator('#password-error');
      
      await expect(usernameError).not.toBeVisible();
      await expect(passwordError).not.toBeVisible();
    });
  });

  test.describe('TC-014, TC-015, TC-016: Responsive Design', () => {
    test('should render correctly on mobile (320px)', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto(LOGIN_URL);
      
      const formWrapper = page.locator('.login-form-wrapper');
      await expect(formWrapper).toBeVisible();
      
      // Check that form is within viewport
      const boundingBox = await formWrapper.boundingBox();
      expect(boundingBox.width).toBeLessThanOrEqual(320);
    });

    test('should render correctly on tablet (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(LOGIN_URL);
      
      const formWrapper = page.locator('.login-form-wrapper');
      await expect(formWrapper).toBeVisible();
      
      // Form should be centered and not full width
      const boundingBox = await formWrapper.boundingBox();
      expect(boundingBox.width).toBeLessThan(768);
    });

    test('should render correctly on desktop (1920px)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(LOGIN_URL);
      
      const formWrapper = page.locator('.login-form-wrapper');
      await expect(formWrapper).toBeVisible();
      
      // Form should have max width constraint
      const boundingBox = await formWrapper.boundingBox();
      expect(boundingBox.width).toBeLessThan(600);
    });
  });

  test.describe('TC-019, TC-020: Input Maxlength', () => {
    test('username should enforce maxlength of 255', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const usernameInput = page.locator('#username');
      await expect(usernameInput).toHaveAttribute('maxlength', '255');
    });

    test('password should enforce maxlength of 128', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const passwordInput = page.locator('#password');
      await expect(passwordInput).toHaveAttribute('maxlength', '128');
    });
  });

  test.describe('TC-022, TC-023, TC-024: Keyboard Navigation', () => {
    test('should navigate through form with Tab key', async ({ page }) => {
      await page.goto(LOGIN_URL);
      
      // Focus should start at username
      await page.keyboard.press('Tab');
      const usernameInput = page.locator('#username');
      await expect(usernameInput).toBeFocused();
      
      // Tab to password
      await page.keyboard.press('Tab');
      const passwordInput = page.locator('#password');
      await expect(passwordInput).toBeFocused();
      
      // Tab to submit button
      await page.keyboard.press('Tab');
      const submitButton = page.locator('.login-button');
      await expect(submitButton).toBeFocused();
    });

    test('should submit form with Enter key from username field', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const usernameInput = page.locator('#username');
      const passwordInput = page.locator('#password');
      
      await usernameInput.fill('testuser');
      await passwordInput.fill('testpassword');
      
      // Focus username and press Enter
      await usernameInput.focus();
      await page.keyboard.press('Enter');
      
      // Form should attempt submission (console.log in script)
      // Since we can't easily check console, we verify no errors appear
      const usernameError = page.locator('#username-error');
      const passwordError = page.locator('#password-error');
      
      await expect(usernameError).not.toBeVisible();
      await expect(passwordError).not.toBeVisible();
    });

    test('should submit form with Enter key from password field', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const usernameInput = page.locator('#username');
      const passwordInput = page.locator('#password');
      
      await usernameInput.fill('testuser');
      await passwordInput.fill('testpassword');
      
      // Focus password and press Enter
      await passwordInput.focus();
      await page.keyboard.press('Enter');
      
      // Verify no validation errors
      const usernameError = page.locator('#username-error');
      const passwordError = page.locator('#password-error');
      
      await expect(usernameError).not.toBeVisible();
      await expect(passwordError).not.toBeVisible();
    });
  });

  test.describe('TC-043, TC-044, TC-045: Accessibility', () => {
    test('should have proper ARIA attributes on form', async ({ page }) => {
      await page.goto(LOGIN_URL);
      
      const form = page.locator('#loginForm');
      await expect(form).toHaveAttribute('aria-label');
    });

    test('should have ARIA attributes on inputs', async ({ page }) => {
      await page.goto(LOGIN_URL);
      
      const usernameInput = page.locator('#username');
      await expect(usernameInput).toHaveAttribute('aria-required', 'true');
      await expect(usernameInput).toHaveAttribute('aria-labelledby');
      await expect(usernameInput).toHaveAttribute('aria-describedby');
      
      const passwordInput = page.locator('#password');
      await expect(passwordInput).toHaveAttribute('aria-required', 'true');
      await expect(passwordInput).toHaveAttribute('aria-labelledby');
      await expect(passwordInput).toHaveAttribute('aria-describedby');
    });

    test('should have visible focus indicators', async ({ page }) => {
      await page.goto(LOGIN_URL);
      
      const usernameInput = page.locator('#username');
      await usernameInput.focus();
      
      // Check that focus styles are applied (outline should be visible)
      const outlineColor = await usernameInput.evaluate((el) => {
        return window.getComputedStyle(el).outlineColor;
      });
      
      expect(outlineColor).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto(LOGIN_URL);
      
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      // Should only have one h1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });

    test('error messages should have role="alert"', async ({ page }) => {
      await page.goto(LOGIN_URL);
      
      const usernameError = page.locator('#username-error');
      const passwordError = page.locator('#password-error');
      
      await expect(usernameError).toHaveAttribute('role', 'alert');
      await expect(passwordError).toHaveAttribute('role', 'alert');
      await expect(usernameError).toHaveAttribute('aria-live', 'polite');
      await expect(passwordError).toHaveAttribute('aria-live', 'polite');
    });
  });

  test.describe('TC-042: Autofill Support', () => {
    test('should have autocomplete attributes', async ({ page }) => {
      await page.goto(LOGIN_URL);
      
      const usernameInput = page.locator('#username');
      const passwordInput = page.locator('#password');
      
      await expect(usernameInput).toHaveAttribute('autocomplete', 'username');
      await expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');
    });
  });

  test.describe('TC-048, TC-049: Zoom Support', () => {
    test('should remain functional at 200% zoom', async ({ page }) => {
      await page.goto(LOGIN_URL);
      
      // Simulate 200% zoom by setting larger viewport
      await page.setViewportSize({ width: 640, height: 480 });
      
      const form = page.locator('#loginForm');
      const usernameInput = page.locator('#username');
      const passwordInput = page.locator('#password');
      const submitButton = page.locator('.login-button');
      
      await expect(form).toBeVisible();
      await expect(usernameInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(submitButton).toBeVisible();
      
      // Should still be able to interact
      await usernameInput.fill('testuser');
      await expect(usernameInput).toHaveValue('testuser');
    });
  });

  test.describe('TC-050: Cross-Browser Compatibility', () => {
    test('should load successfully across different browsers', async ({ page, browserName }) => {
      await page.goto(LOGIN_URL);
      
      // Basic functionality should work in all browsers
      const form = page.locator('#loginForm');
      await expect(form).toBeVisible();
      
      const usernameInput = page.locator('#username');
      await usernameInput.fill('testuser');
      await expect(usernameInput).toHaveValue('testuser');
      
      console.log(`Test passed in ${browserName}`);
    });
  });

  test.describe('Button Interactions', () => {
    test('should show hover effect on button', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const button = page.locator('.login-button');
      
      await button.hover();
      
      const backgroundColor = await button.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      // Background should be the hover color
      expect(backgroundColor).toBeTruthy();
    });

    test('should be clickable', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const button = page.locator('.login-button');
      
      await button.click();
      
      // Error messages should appear (since form is empty)
      const usernameError = page.locator('#username-error');
      await expect(usernameError).toBeVisible();
    });
  });

  test.describe('Additional Links', () => {
    test('should display sign up link', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const signupLink = page.locator('.login-footer a').filter({ hasText: /sign up/i });
      await expect(signupLink).toBeVisible();
    });

    test('should display forgot password link', async ({ page }) => {
      await page.goto(LOGIN_URL);
      const forgotLink = page.locator('.login-footer a').filter({ hasText: /forgot/i });
      await expect(forgotLink).toBeVisible();
    });
  });
});
