<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { brand } from '$lib/config';

	interface PricingTier {
		name: string;
		price: string;
		unit: string;
		features: string[];
		highlighted?: boolean;
		cta: string;
	}

	let { tiers }: { tiers: PricingTier[] } = $props();
</script>

<Section id="tarifs" label="Tarifs" title="Nos formules" bg="blush">
	<div class="mt-12 grid gap-8 md:grid-cols-3">
		{#each tiers as tier (tier.name)}
			<div
				class="relative flex flex-col rounded-xl bg-neutral-800 p-8 shadow-lg
					{tier.highlighted ? 'ring-2 ring-crimson-500' : ''}"
			>
				{#if tier.highlighted}
					<span
						class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-crimson-600 px-4 py-1
							text-xs font-semibold text-white"
					>
						Populaire
					</span>
				{/if}

				<h3 class="text-xl font-bold text-neutral-50">{tier.name}</h3>

				<p class="mt-4">
					<span class="text-4xl font-bold text-neutral-50">{tier.price} €</span>
					<span class="text-muted-foreground">{tier.unit}</span>
				</p>

				<ul class="mt-6 flex-1 space-y-3">
					{#each tier.features as feature, i (i)}
						<li class="flex items-center gap-2 text-neutral-50">
							<svg
								class="h-5 w-5 shrink-0 text-crimson-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
							</svg>
							{feature}
						</li>
					{/each}
				</ul>

				<a
					href={brand.bookingUrl}
					rel="external"
					class="mt-8 block rounded-lg bg-crimson-600 px-6 py-3 text-center font-semibold
						text-white transition-colors hover:bg-crimson-700"
				>
					{tier.cta}
				</a>
			</div>
		{/each}
	</div>

	<p class="mt-8 text-center text-sm text-muted-foreground">Tous les prix sont HT</p>
</Section>
