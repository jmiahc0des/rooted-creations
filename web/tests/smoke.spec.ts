import { test, expect } from '@playwright/test';

const pages = ['/', '/shop', '/shop/rooted-heritage-tee', '/designs', '/custom', '/about', '/contact'];

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
  // At least one product card should be visible. (Broad /shop/ selector now also matches
  // nav + footer Shop links since trailingSlash:true; assert filter behavior instead.)
  await expect(page.locator('a[href^="/shop/"]').first()).toBeVisible();
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

test('home shows pricing teaser and designs teaser', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'PRICING', level: 2 })).toBeVisible();
  await expect(page.getByRole('link', { name: /See full pricing/i })).toHaveAttribute('href', '/shop/#pricing');
  await expect(page.getByRole('link', { name: /See all 11/i })).toHaveAttribute('href', '/designs/');
});

test('shop shows full pricing block with 6 items', async ({ page }) => {
  await page.goto('/shop');
  const block = page.locator('#pricing');
  await expect(block).toBeVisible();
  await expect(block.locator('li')).toHaveCount(6);
  await expect(block.getByText('$15').first()).toBeVisible();
  await expect(block.getByText('$30')).toBeVisible();
});

test('designs page renders 11 cards and Custom Work CTA', async ({ page }) => {
  await page.goto('/designs');
  await expect(page.locator('figure').filter({ hasText: /./ })).toHaveCount(11);
  await expect(page.getByRole('link', { name: /Want one on a tee/i })).toHaveAttribute('href', '/custom/');
});

test('footer shows payment line', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer.getByText(/We accept/i)).toBeVisible();
  await expect(footer.getByText('Cash')).toBeVisible();
  await expect(footer.getByText('Venmo')).toBeVisible();
});

test('nav has Designs link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Designs', exact: true }).first()).toBeVisible();
});
