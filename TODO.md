# TODO

- [ ] Check mediator choice (CNPM) with Shaiman — referenced in mentions-legales, must match actual registration
- [ ] Check Squanova (display font) license — verify it covers web embedding / commercial use

## SEO: Content-Dependent

These require real brand content (replacing `«guillemet»` placeholders in `src/lib/config.ts`):

- [ ] Replace all placeholder values in `src/lib/config.ts`
- [ ] Create OG image (1200x630px) and pass to `ogMeta({ image })` in `+layout.svelte`
- [ ] Generate favicons (favicon.ico, apple-touch-icon-180.png, favicon-32/16.png) and add to `static/site.webmanifest` icons array
- [ ] Add real images with `<img>` tags and descriptive `alt` text (currently placeholder `<div>` elements)
- [ ] Create About page for E-E-A-T (team, expertise, studio story)
- [ ] Optimize Hero H1 with keywords: "studio podcast" + city name
- [ ] Write per-page meta descriptions with target keywords (150-160 chars)
- [ ] Add real client logos to TrustBar component
- [ ] Add `Service`/`Offer` structured data for pricing tiers (needs real prices)
