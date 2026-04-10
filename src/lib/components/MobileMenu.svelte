<script lang="ts">
	import { slide } from 'svelte/transition';
	import { brand, nav } from '$lib/config';

	let { open = false, onclose }: { open?: boolean; onclose?: () => void } = $props();
</script>

{#if open}
	<div
		id="mobile-menu"
		class="fixed inset-x-0 top-20 z-30 border-b border-border/50 bg-background/95 backdrop-blur-xl lg:hidden"
		transition:slide={{ duration: 200 }}
	>
		<nav aria-label="Menu mobile" class="container flex flex-col gap-2 py-6">
			{#each nav as item}
				<a
					href={item.href}
					class="rounded-md px-4 py-3 text-lg text-foreground hover:text-primary"
					onclick={() => onclose?.()}
				>
					{item.label}
				</a>
			{/each}
			<a
				href={brand.bookingUrl}
				class="mt-4 rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground"
				onclick={() => onclose?.()}
			>
				R&eacute;server
			</a>
		</nav>
	</div>
{/if}
