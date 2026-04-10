<script lang="ts">
	import { brand, nav } from '$lib/config';
	import MobileMenu from './MobileMenu.svelte';

	let { scrolled = false }: { scrolled?: boolean } = $props();
	let menuOpen = $state(false);
</script>

<a
	href="#main-content"
	class="fixed top-0 left-4 z-50 -translate-y-full rounded-b-md bg-primary px-4 py-2 text-primary-foreground transition-transform focus:translate-y-0"
>
	Aller au contenu
</a>

<header
	class="fixed top-0 right-0 left-0 z-40 h-20 transition-colors duration-300
		{scrolled ? 'border-b border-border/50 bg-background/80 backdrop-blur-xl' : 'bg-transparent'}"
>
	<div class="container flex h-full items-center justify-between">
		<a href="/" class="font-display text-xl font-bold tracking-wide text-foreground uppercase">
			{brand.name}
		</a>

		<nav aria-label="Navigation principale" class="hidden items-center gap-8 lg:flex">
			{#each nav as item}
				<a href={item.href} class="text-sm text-foreground/80 transition-colors hover:text-primary">
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-4">
			<a
				href={brand.bookingUrl}
				class="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 lg:block"
			>
				R&eacute;server
			</a>

			<button
				type="button"
				class="text-foreground lg:hidden"
				aria-label="Menu"
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				onclick={() => (menuOpen = !menuOpen)}
			>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					{#if menuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>
</header>

<MobileMenu open={menuOpen} onclose={() => (menuOpen = false)} />
