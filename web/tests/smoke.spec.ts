import { test, expect } from '@playwright/test';

const pages = ['/', '/shop', '/shop/rooted-heritage-tee', '/custom', '/about', '/contact'];

for (const path of pages) {
  test(`${path} renders without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('footer')).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('shop filter works', async ({ page }) => {
  await page.goto('/shop');
  await expect(page.locator('a[href^="/shop/"]')).toHaveCount(10);
  await page.getByRole('button', { name: 'Tees' }).click();
  await expect(page).toHaveURL(/cat=tees/);
});

test('product inquire link has correct mailto', async ({ page }) => {
  await page.goto('/shop/rooted-heritage-tee');
  const link = page.locator('a[href^="mailto:"]').first();
  const href = await link.getAttribute('href');
  expect(href).toContain('hello@rootedcreations.co');
  expect(href).toContain('Order');
});

test('mobile nav toggles', async ({ page }) => {
  await page.setViewportSize({ width: 380, height: 800 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /toggle menu/i });
  await toggle.click();
  await expect(page.getByRole('link', { name: 'Shop', exact: true }).first()).toBeVisible();
});
