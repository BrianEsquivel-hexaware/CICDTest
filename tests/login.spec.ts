import { expect, test } from '@playwright/test';

const username = process.env.ORANGEHRM_USERNAME || 'Admin';
const password = process.env.ORANGEHRM_PASSWORD || 'admin123';

test.beforeEach(async ({ page }) => {
  await page.goto('/web/index.php/auth/login');
});

test('muestra el formulario de inicio de sesión', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'Login' }),
  ).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('permite iniciar sesión con credenciales válidas', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/dashboard\/index/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('muestra un error con credenciales inválidas', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('usuario-invalido');
  await page.getByRole('textbox', { name: 'Password' }).fill('clave-invalida');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();
});
