import type { RequestHandler } from './$types';

const paths = ['/', '/cgv', '/confidentialite', '/mentions-legales'];

export const GET: RequestHandler = ({ url }) => {
	const urls = paths.map((p) => `  <url><loc>${url.origin}${p}</loc></url>`).join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
