<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		lastUpdated,
		children
	}: {
		title: string;
		lastUpdated: string;
		children?: Snippet;
	} = $props();
</script>

<div class="bg-section-blush py-20 text-secondary-foreground md:py-32">
	<div class="container mx-auto max-w-3xl">
		<h1 class="text-3xl font-bold md:text-5xl">{title}</h1>
		<p class="mt-2 text-sm text-muted-foreground">Dernière mise à jour : {lastUpdated}</p>
		<div class="prose mt-8 max-w-none">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</div>
