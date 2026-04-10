import { describe, expect, test } from 'vitest';
import { breadcrumbJsonLd, localBusinessJsonLd, ogMeta, pageTitle } from './seo';
import type { MetaTag } from './seo';

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

	test('includes @id derived from url', () => {
		const result = localBusinessJsonLd('https://example.com');

		expect(result['@id']).toBe('https://example.com#business');
	});

	test('includes sameAs with social links', () => {
		const result = localBusinessJsonLd('https://example.com');

		expect(result.sameAs).toBeInstanceOf(Array);
		expect(result.sameAs).toHaveLength(3);
	});

	test('includes aggregateRating', () => {
		const result = localBusinessJsonLd('https://example.com');

		expect(result.aggregateRating['@type']).toBe('AggregateRating');
		expect(result.aggregateRating).toHaveProperty('ratingValue');
		expect(result.aggregateRating).toHaveProperty('reviewCount');
		expect(result.aggregateRating.bestRating).toBe('5');
	});

	test('includes image when provided', () => {
		const result = localBusinessJsonLd('https://example.com', 'https://example.com/photo.jpg');

		expect(result.image).toBe('https://example.com/photo.jpg');
	});

	test('omits image when not provided', () => {
		const result = localBusinessJsonLd('https://example.com');

		expect(result).not.toHaveProperty('image');
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

	test('includes Twitter Card tags', () => {
		const result = ogMeta({
			title: 'Test Page',
			description: 'A test',
			url: 'https://example.com'
		});

		expect(result).toContainEqual({ name: 'twitter:card', content: 'summary_large_image' });
		expect(result).toContainEqual({ name: 'twitter:title', content: 'Test Page' });
		expect(result).toContainEqual({ name: 'twitter:description', content: 'A test' });
	});

	test('includes twitter:image when image provided', () => {
		const result = ogMeta({
			title: 'Test',
			description: 'Test',
			url: 'https://example.com',
			image: 'https://example.com/image.jpg'
		});

		expect(result).toContainEqual({
			name: 'twitter:image',
			content: 'https://example.com/image.jpg'
		});
	});

	test('omits twitter:image when not provided', () => {
		const result = ogMeta({
			title: 'Test',
			description: 'Test',
			url: 'https://example.com'
		});

		expect(result.find((m) => m.name === 'twitter:image')).toBeUndefined();
	});

	test('result satisfies MetaTag[]', () => {
		const result: MetaTag[] = ogMeta({
			title: 'Test',
			description: 'Test',
			url: 'https://example.com'
		});

		expect(result.length).toBeGreaterThan(0);
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

describe('breadcrumbJsonLd', () => {
	test('returns valid schema with @context and @type', () => {
		const result = breadcrumbJsonLd([{ name: 'Home', url: 'https://example.com' }]);

		expect(result['@context']).toBe('https://schema.org');
		expect(result['@type']).toBe('BreadcrumbList');
	});

	test('maps items to ListItem elements with 1-based positions', () => {
		const result = breadcrumbJsonLd([
			{ name: 'Home', url: 'https://example.com' },
			{ name: 'Tarifs', url: 'https://example.com/tarifs' }
		]);

		expect(result.itemListElement).toHaveLength(2);
		expect(result.itemListElement[0]).toEqual({
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			item: 'https://example.com'
		});
		expect(result.itemListElement[1]).toEqual({
			'@type': 'ListItem',
			position: 2,
			name: 'Tarifs',
			item: 'https://example.com/tarifs'
		});
	});

	test('returns empty itemListElement for empty input', () => {
		const result = breadcrumbJsonLd([]);

		expect(result.itemListElement).toEqual([]);
	});
});
