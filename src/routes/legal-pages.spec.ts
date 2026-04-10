import { describe, expect, test } from 'vitest';

describe('legal page SEO metadata', () => {
	test('CGV page returns correct SEO data with noindex', async () => {
		const { load } = await import('./cgv/+page.ts');

		const result = load();

		expect(result.seo.title).toBe('Conditions générales de vente');
		expect(result.seo.description).toContain('Conditions générales de vente');
		expect(result.seo.noindex).toBe(true);
	});

	test('confidentialite page returns correct SEO data with noindex', async () => {
		const { load } = await import('./confidentialite/+page.ts');

		const result = load();

		expect(result.seo.title).toBe('Politique de confidentialité');
		expect(result.seo.description).toContain('confidentialité');
		expect(result.seo.noindex).toBe(true);
	});

	test('mentions-legales page returns correct SEO data with noindex', async () => {
		const { load } = await import('./mentions-legales/+page.ts');

		const result = load();

		expect(result.seo.title).toBe('Mentions légales');
		expect(result.seo.description).toContain('Mentions légales');
		expect(result.seo.noindex).toBe(true);
	});

	test('all legal pages have prerender enabled', async () => {
		const cgv = await import('./cgv/+page.ts');
		const confidentialite = await import('./confidentialite/+page.ts');
		const mentions = await import('./mentions-legales/+page.ts');

		expect(cgv.prerender).toBe(true);
		expect(confidentialite.prerender).toBe(true);
		expect(mentions.prerender).toBe(true);
	});
});
