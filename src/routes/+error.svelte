<script lang="ts">
	import { page } from '$app/state';
	import { pageTitle } from '$lib/seo';
</script>

<svelte:head>
	<title>{pageTitle(`Erreur ${page.status}`)}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-[60vh] flex-col items-center justify-center text-center">
	<h1 class="text-6xl font-bold text-crimson-500">{page.status}</h1>
	<p class="mt-4 text-xl text-muted-foreground">
		{page.error?.message ?? 'Une erreur est survenue'}
	</p>
	<a
		href="/"
		class="mt-8 rounded-full bg-crimson-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-crimson-700"
	>
		Retour &agrave; l&apos;accueil
	</a>
</div>
