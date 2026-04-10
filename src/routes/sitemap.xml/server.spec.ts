import { describe, expect, test } from 'vitest';

describe('sitemap.xml', () => {
	test('returns XML content type', async () => {
		const { GET } = await import('./+server');
		const response = await GET({ url: new URL('https://example.com/sitemap.xml') } as never);

		expect(response.headers.get('Content-Type')).toBe('application/xml');
	});

	test('returns valid XML with urlset root', async () => {
		const { GET } = await import('./+server');
		const response = await GET({ url: new URL('https://example.com/sitemap.xml') } as never);
		const body = await response.text();

		expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>');
		expect(body).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
		expect(body).toContain('</urlset>');
	});

	test('includes all 4 site pages with absolute URLs', async () => {
		const { GET } = await import('./+server');
		const response = await GET({ url: new URL('https://example.com/sitemap.xml') } as never);
		const body = await response.text();

		expect(body).toContain('<loc>https://example.com/</loc>');
		expect(body).toContain('<loc>https://example.com/cgv</loc>');
		expect(body).toContain('<loc>https://example.com/confidentialite</loc>');
		expect(body).toContain('<loc>https://example.com/mentions-legales</loc>');
	});

	test('uses origin from request URL', async () => {
		const { GET } = await import('./+server');
		const response = await GET({
			url: new URL('https://custom-domain.fr/sitemap.xml')
		} as never);
		const body = await response.text();

		expect(body).toContain('<loc>https://custom-domain.fr/</loc>');
		expect(body).not.toContain('example.com');
	});

	test('URLs have no trailing slash except homepage', async () => {
		const { GET } = await import('./+server');
		const response = await GET({ url: new URL('https://example.com/sitemap.xml') } as never);
		const body = await response.text();

		const locs = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
		expect(locs).toHaveLength(4);

		const nonHomeLocs = locs.filter((l) => l !== 'https://example.com/');
		for (const loc of nonHomeLocs) {
			expect(loc).not.toMatch(/\/$/);
		}
	});
});
