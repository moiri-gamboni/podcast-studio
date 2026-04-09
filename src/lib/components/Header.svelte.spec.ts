import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { describe, expect, test } from 'vitest';
import Header from './Header.svelte';

describe('Header', () => {
	test('renders nav with aria-label', async () => {
		render(Header);

		const nav = page.getByRole('navigation', { name: 'Navigation principale' });
		await expect.element(nav).toBeVisible();
	});

	test('renders brand name link', async () => {
		render(Header);

		const brandLink = page.getByRole('link', { name: /STUDIO_NAME/ });
		await expect.element(brandLink).toBeVisible();
	});

	test('renders booking CTA', async () => {
		render(Header);

		const cta = page.getByRole('link', { name: /R[ée]server/i });
		await expect.element(cta).toBeVisible();
	});

	test('hamburger button has aria-expanded', async () => {
		render(Header);

		const hamburger = page.getByRole('button', { name: /menu/i });
		await expect.element(hamburger).toHaveAttribute('aria-expanded', 'false');
	});

	test('skip-to-content link exists', async () => {
		render(Header);

		const skipLink = page.getByRole('link', { name: /contenu/i });
		await expect.element(skipLink).toBeInTheDocument();
	});
});
