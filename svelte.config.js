import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError({ path, message }) {
				// Placeholder URLs (guillemet-wrapped) are expected during development
				if (path.includes('%C2%AB') || path.includes('\u00ab')) return;
				throw new Error(message);
			},
			handleMissingId: 'warn'
		}
	}
};

export default config;
