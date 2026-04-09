<script lang="ts">
	import type { Snippet } from 'svelte';

	type BgVariant = 'default' | 'blush' | 'peach' | 'cream' | 'dark' | 'darker';

	const bgClasses: Record<BgVariant, string> = {
		default: 'bg-background text-foreground',
		blush: 'bg-section-blush text-secondary-foreground',
		peach: 'bg-section-peach text-secondary-foreground',
		cream: 'bg-section-cream text-secondary-foreground',
		dark: 'bg-section-dark text-foreground',
		darker: 'bg-section-darker text-foreground'
	};

	let {
		id,
		label,
		title,
		subtitle,
		bg = 'default',
		children
	}: {
		id?: string;
		label?: string;
		title?: string;
		subtitle?: string;
		bg?: BgVariant;
		children?: Snippet;
	} = $props();
</script>

<section {id} class="{bgClasses[bg]} py-20 md:py-32" aria-label={title ?? label}>
	<div class="container">
		{#if label}
			<p class="mb-4 text-xs font-semibold tracking-widest text-primary uppercase">{label}</p>
		{/if}
		{#if title}
			<h2 class="text-3xl font-bold md:text-5xl">{title}</h2>
		{/if}
		{#if subtitle}
			<p class="mt-4 text-lg text-muted-foreground">{subtitle}</p>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
</section>
