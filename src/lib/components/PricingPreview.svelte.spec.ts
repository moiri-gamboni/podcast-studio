import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { describe, expect, test } from 'vitest';
import PricingPreview from './PricingPreview.svelte';

const tiers = [
	{
		name: 'Essentiel',
		price: '49',
		unit: '/ heure',
		features: ['Studio solo', 'Micro pro', 'Export WAV'],
		cta: 'Réserver',
		bookingUrl: 'https://shaiman.podyx.com/time-slots?service=abc'
	},
	{
		name: 'Pro',
		price: '89',
		unit: '/ heure',
		features: ['Studio duo', 'Mixage inclus', 'Export multi-piste'],
		highlighted: true,
		cta: 'Réserver',
		bookingUrl: 'https://shaiman.podyx.com/time-slots?service=def'
	},
	{
		name: 'Premium',
		price: '149',
		unit: '/ heure',
		features: ['Grand studio', 'Ingénieur son', 'Montage complet'],
		cta: 'Réserver'
	}
];

describe('PricingPreview', () => {
	test('renders 3 cards, one per tier', async () => {
		render(PricingPreview, { tiers });

		const headings = page.getByRole('heading', { level: 3 });
		await expect.element(headings.first()).toBeVisible();
		expect(await headings.all()).toHaveLength(3);

		await expect.element(page.getByRole('heading', { name: 'Essentiel' })).toBeVisible();
		await expect.element(page.getByRole('heading', { name: 'Pro', exact: true })).toBeVisible();
		await expect.element(page.getByRole('heading', { name: 'Premium' })).toBeVisible();
	});

	test('highlighted card has "Populaire" badge', async () => {
		render(PricingPreview, { tiers });

		await expect.element(page.getByText('Populaire')).toBeVisible();
	});

	test('all cards have CTA links', async () => {
		render(PricingPreview, { tiers });

		const ctas = page.getByRole('link', { name: 'Réserver' });
		await expect.element(ctas.first()).toBeVisible();
		expect(await ctas.all()).toHaveLength(3);
	});

	test('displays feature lists with checkmarks', async () => {
		render(PricingPreview, { tiers });

		for (const tier of tiers) {
			for (const feature of tier.features) {
				await expect.element(page.getByText(feature)).toBeVisible();
			}
		}
	});

	test('uses per-tier booking URLs when provided', async () => {
		render(PricingPreview, { tiers });

		const links = await page.getByRole('link', { name: 'Réserver' }).all();
		const hrefs = links.map((l) => l.element().getAttribute('href'));
		expect(hrefs[0]).toBe('https://shaiman.podyx.com/time-slots?service=abc');
		expect(hrefs[1]).toBe('https://shaiman.podyx.com/time-slots?service=def');
		// Third tier has no bookingUrl, falls back to brand.bookingUrl from PUBLIC_PODYX_URL
		expect(hrefs[2]).toContain('podyx.com');
	});

	test('shows HT note below cards', async () => {
		render(PricingPreview, { tiers });

		await expect.element(page.getByText('Tous les prix sont HT')).toBeVisible();
	});
});
