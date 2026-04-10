import { describe, expect, test } from 'vitest';

describe('robots.txt', () => {
	test('returns text/plain content type', async () => {
		const { GET } = await import('./+server');
		const response = await GET({ url: new URL('https://example.com/robots.txt') } as never);

		expect(response.headers.get('Content-Type')).toBe('text/plain');
	});

	test('allows all user agents', async () => {
		const { GET } = await import('./+server');
		const response = await GET({ url: new URL('https://example.com/robots.txt') } as never);
		const body = await response.text();

		expect(body).toContain('User-agent: *');
		expect(body).toContain('Disallow:');
	});

	test('includes Sitemap directive with origin from request', async () => {
		const { GET } = await import('./+server');
		const response = await GET({ url: new URL('https://example.com/robots.txt') } as never);
		const body = await response.text();

		expect(body).toContain('Sitemap: https://example.com/sitemap.xml');
	});

	test('uses dynamic origin', async () => {
		const { GET } = await import('./+server');
		const response = await GET({
			url: new URL('https://custom-domain.fr/robots.txt')
		} as never);
		const body = await response.text();

		expect(body).toContain('Sitemap: https://custom-domain.fr/sitemap.xml');
	});
});
