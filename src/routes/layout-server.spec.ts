import { describe, expect, test } from 'vitest';

describe('+layout.server.ts canonical URL', () => {
	// Simulate the load function's URL handling
	function canonicalUrl(href: string): string {
		const url = new URL(href);
		return url.origin + url.pathname;
	}

	test('strips query parameters from URL', () => {
		const result = canonicalUrl('https://example.com/page?utm_source=google');

		expect(result).toBe('https://example.com/page');
	});

	test('preserves path without query params', () => {
		const result = canonicalUrl('https://example.com/about');

		expect(result).toBe('https://example.com/about');
	});

	test('strips hash fragments', () => {
		// origin + pathname excludes hash too
		const result = canonicalUrl('https://example.com/page#section');

		expect(result).toBe('https://example.com/page');
	});
});
