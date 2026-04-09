import { brand } from '$lib/config';

export function localBusinessJsonLd(url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: brand.name,
		url,
		telephone: brand.phone,
		email: brand.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: brand.address,
			addressLocality: brand.city,
			postalCode: brand.postalCode,
			addressCountry: 'FR'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: brand.latitude,
			longitude: brand.longitude
		},
		openingHours: brand.openingHours,
		priceRange: brand.priceRange
	} as const;
}

export function ogMeta(opts: {
	title: string;
	description: string;
	url: string;
	image?: string;
}) {
	const tags: { property: string; content: string }[] = [
		{ property: 'og:title', content: opts.title },
		{ property: 'og:description', content: opts.description },
		{ property: 'og:url', content: opts.url },
		{ property: 'og:type', content: 'website' },
		{ property: 'og:locale', content: 'fr_FR' },
		{ property: 'og:site_name', content: brand.name }
	];
	if (opts.image) {
		tags.push({ property: 'og:image', content: opts.image });
	}
	return tags;
}

export function pageTitle(title?: string) {
	return title ? title + ' | ' + brand.name : brand.name;
}
