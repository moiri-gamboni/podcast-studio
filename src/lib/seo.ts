import { brand } from '$lib/config';

export type MetaTag = { property?: string; name?: string; content: string };

export function localBusinessJsonLd(url: string, image?: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': url + '#business',
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
		priceRange: brand.priceRange,
		sameAs: [brand.instagram, brand.linkedin, brand.youtube],
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: brand.googleRating,
			reviewCount: brand.googleReviewCount,
			bestRating: '5'
		},
		...(image ? { image } : {})
	} as const;
}

export function ogMeta(opts: { title: string; description: string; url: string; image?: string }) {
	const tags: MetaTag[] = [
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
	tags.push(
		{ name: 'twitter:card', content: 'summary_large_image' },
		{ name: 'twitter:title', content: opts.title },
		{ name: 'twitter:description', content: opts.description }
	);
	if (opts.image) {
		tags.push({ name: 'twitter:image', content: opts.image });
	}
	return tags;
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: item.url
		}))
	};
}

export function pageTitle(title?: string) {
	return title ? title + ' | ' + brand.name : brand.name;
}
