import { expect, test } from '@playwright/test';

const username = process.env.ORANGEHRM_USERNAME;
const password = process.env.ORANGEHRM_PASSWORD;

test.beforeEach(async ({ page }) => {
  await page.goto('/web/index.php/auth/login');
});

test('displays the login form', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'Login' }),
  ).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('logs in with valid credentials', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/dashboard\/index/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('shows an error with invalid credentials', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('invalid-user');
  await page.getByRole('textbox', { name: 'Password' }).fill('invalid-password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();
});
