<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';
	import { localBusinessJsonLd, ogMeta, pageTitle } from '$lib/seo';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
	let scrolled = $state(false);
	let sentinel: HTMLDivElement;

	const defaultDescription = 'Studio de podcast professionnel. Réservez votre session.';
	let seo = $derived(page.data.seo);
	let title = $derived(pageTitle(seo?.title));
	let description = $derived(seo?.description ?? defaultDescription);
	let jsonLd = $derived(localBusinessJsonLd(data.url));
	let og = $derived(
		ogMeta({
			title,
			description,
			url: data.url
		})
	);

	$effect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				scrolled = !entry.isIntersecting;
			},
			{ threshold: 0 }
		);
		observer.observe(sentinel);
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={data.url} />
	<link rel="alternate" hreflang="fr" href={data.url} />
	{#if seo?.noindex}<meta name="robots" content="noindex" />{/if}
	{#each og as tag}
		<meta {...tag} />
	{/each}
	{@html '<script type="application/ld+json">' + JSON.stringify(jsonLd) + '</script>'}
</svelte:head>

<Header {scrolled} />

<!-- Sentinel for scroll detection -->
<div bind:this={sentinel} class="absolute top-0 h-1"></div>

<main id="main-content">
	{@render children()}
</main>

<Footer />
