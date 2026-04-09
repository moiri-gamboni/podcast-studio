import { describe, expect, test } from 'vitest';
import { localBusinessJsonLd, ogMeta, pageTitle } from './seo';

describe('localBusinessJsonLd', () => {
	test('returns valid schema with @context and @type', () => {
		const result = localBusinessJsonLd('https://example.com');

		expect(result['@context']).toBe('https://schema.org');
		expect(result['@type']).toBe('LocalBusiness');
	});

	test('includes name and url from brand config', () => {
		const result = localBusinessJsonLd('https://example.com');

		expect(result.name).toContain('\u00ab');
		expect(result.url).toBe('https://example.com');
	});

	test('includes postal address', () => {
		const result = localBusinessJsonLd('https://example.com');

		expect(result.address['@type']).toBe('PostalAddress');
		expect(result.address.addressCountry).toBe('FR');
	});

	test('includes geo coordinates', () => {
		const result = localBusinessJsonLd('https://example.com');

		expect(result.geo['@type']).toBe('GeoCoordinates');
		expect(result.geo).toHaveProperty('latitude');
		expect(result.geo).toHaveProperty('longitude');
	});
});

describe('ogMeta', () => {
	test('returns required OG properties', () => {
		const result = ogMeta({
			title: 'Test Page',
			description: 'A test',
			url: 'https://example.com'
		});

		expect(result).toContainEqual({ property: 'og:title', content: 'Test Page' });
		expect(result).toContainEqual({ property: 'og:description', content: 'A test' });
		expect(result).toContainEqual({ property: 'og:url', content: 'https://example.com' });
		expect(result).toContainEqual({ property: 'og:type', content: 'website' });
		expect(result).toContainEqual({ property: 'og:locale', content: 'fr_FR' });
	});

	test('includes site_name from brand', () => {
		const result = ogMeta({
			title: 'Test',
			description: 'Test',
			url: 'https://example.com'
		});

		const siteName = result.find((m) => m.property === 'og:site_name');
		expect(siteName).toBeDefined();
		expect(siteName!.content).toContain('\u00ab');
	});

	test('includes og:image when provided', () => {
		const result = ogMeta({
			title: 'Test',
			description: 'Test',
			url: 'https://example.com',
			image: 'https://example.com/image.jpg'
		});

		expect(result).toContainEqual({
			property: 'og:image',
			content: 'https://example.com/image.jpg'
		});
	});

	test('omits og:image when not provided', () => {
		const result = ogMeta({
			title: 'Test',
			description: 'Test',
			url: 'https://example.com'
		});

		expect(result.find((m) => m.property === 'og:image')).toBeUndefined();
	});
});

describe('pageTitle', () => {
	test('returns brand name when no title given', () => {
		const result = pageTitle();

		expect(result).toContain('\u00ab');
	});

	test('prepends title with separator when given', () => {
		const result = pageTitle('Tarifs');

		expect(result).toMatch(/^Tarifs \| /);
		expect(result).toContain('\u00ab');
	});
});
