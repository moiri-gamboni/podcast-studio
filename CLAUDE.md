# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Podcast Studio — a SvelteKit app deploying to Cloudflare Workers.

**`ref/`** (gitignored): reference materials including market research, artistic direction assets (font sources, brand colors, photos), and architecture plans. Not part of the build.

## Commands

```bash
pnpm dev              # Vite dev server
pnpm build            # Production build
pnpm preview          # Preview via Wrangler on :4173
pnpm check            # svelte-check (TypeScript)
pnpm lint             # Prettier check + ESLint
pnpm format           # Auto-format
pnpm test             # Unit tests (--run) then E2E
pnpm test:unit        # Vitest in watch mode
pnpm test:e2e         # Playwright E2E
pnpm gen              # Generate Cloudflare Workers types
```

## Stack

SvelteKit 2 + Svelte 5 (runes forced) · TypeScript (strict) · Tailwind CSS v4 (`@tailwindcss/forms`) · Vite · Cloudflare Workers (`@sveltejs/adapter-cloudflare`) · pnpm · Vitest + Playwright

## Architecture

**Deployment:** Cloudflare Workers. `wrangler.jsonc` configures the worker; `svelte.config.js` sets the adapter. Server-side code has access to Cloudflare bindings via the `Platform` interface in `app.d.ts` (`env: Env`, `ctx: ExecutionContext`, `caches`, `cf`). Resend API key via `$env/static/private`.

**Design system:** Tailwind v4 `@theme` block in `layout.css` with three oklch palette scales: `crimson-*` (brand red, anchored by #e30713 at 500 and #420318 at 900), `warm-*` (peach accent, anchored by #f9c2a4 at 300), `neutral-*` (burgundy-tinted warm greys). Each has 50-950 stops. Seven semantic aliases (`background`, `foreground`, `muted`, `muted-foreground`, `border`, `input`, `ring`) reference palette stops via `var()`. Components use palette classes directly for brand colors (`bg-crimson-600`, `text-crimson-500`) and semantic classes for structural tokens (`bg-background`, `text-muted-foreground`). Named `crimson-*` to avoid overriding Tailwind's built-in `red-*` scale. Fonts: Metropolis (sans) and Squanova (display) as WOFF2 in `static/fonts/`. Brand config with `«guillemet»` placeholders in `src/lib/config.ts`.

**Content data:** Homepage section content in `src/lib/data/homepage.ts` with exported types (`FaqItem`, `PricingTier`, `ProcessStep`, `HeroStat`). Components accept data as typed props.

**SEO:** `src/lib/seo.ts` exports `localBusinessJsonLd()`, `ogMeta()`, `pageTitle()`, `breadcrumbJsonLd()`, and the `MetaTag` type. `ogMeta()` returns both OG and Twitter Card tags as `MetaTag[]`; the layout renders them with `<meta {...tag} />`. Per-page metadata flows via `page.data.seo` (`App.PageData.seo` in `app.d.ts`); each page's `+page.ts` can return `{ seo: { title?, description?, noindex? } }` and the layout falls back to defaults. Dynamic `sitemap.xml` and `robots.txt` routes use `url.origin` for absolute URLs. Legal pages prerendered with `noindex`.

**Vitest dual projects** (in `vite.config.ts`):

- **"client"** — browser-based component tests via `@vitest/browser-playwright` (headless Chromium). Matches `*.svelte.{test,spec}.{js,ts}`. Excludes `src/lib/server/**`.
- **"server"** — Node environment. Matches `*.{test,spec}.{js,ts}` excluding the Svelte patterns.

`requireAssertions: true` — every test must contain at least one `expect`.

**E2E tests:** Playwright matches `*.e2e.{ts,js}`. Config builds then previews on :4173.

## Conventions

- **Svelte 5 runes mode**: Use `$props()`, `{@render children()}`, not `export let` or `<slot/>`.
- **Test file naming**: `*.spec.ts` (unit/server), `*.svelte.spec.ts` (component/browser), `*.e2e.ts` (E2E).
- **Formatting**: Tabs, single quotes, no trailing commas, 100 char print width.
- **All dependencies are devDependencies** — everything bundles into a Workers artifact.
