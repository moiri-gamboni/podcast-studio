<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { localBusinessJsonLd, ogMeta, pageTitle } from '$lib/seo';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
	let scrolled = $state(false);
	let sentinel: HTMLDivElement;

	const description = 'Studio de podcast professionnel. Réservez votre session.';
	let jsonLd = $derived(localBusinessJsonLd(data.url));
	let og = $derived(
		ogMeta({
			title: pageTitle(),
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
	<title>{pageTitle()}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={data.url} />
	{#each og as tag}
		<meta property={tag.property} content={tag.content} />
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
