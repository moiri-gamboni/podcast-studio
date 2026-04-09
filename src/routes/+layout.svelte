<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
	let scrolled = $state(false);
	let sentinel: HTMLDivElement;

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

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Header {scrolled} />

<!-- Sentinel for scroll detection -->
<div bind:this={sentinel} class="absolute top-0 h-1"></div>

<main id="main-content">
	{@render children()}
</main>

<Footer />
