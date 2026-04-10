<script lang="ts">
	import { brand } from '$lib/config';
	import Section from '$lib/components/Section.svelte';
</script>

<Section bg="cream">
	<div class="flex flex-col items-center gap-8 md:flex-row md:justify-between">
		<!-- Google rating badge -->
		<div class="flex items-center gap-3 text-secondary-foreground">
			<span class="font-display text-3xl font-bold">{brand.googleRating}</span>
			<div class="flex flex-col">
				<div class="flex gap-0.5 text-amber-500" aria-hidden="true">
					{#each Array.from({ length: 5 }, (_v, i) => i) as i (i)}
						<svg class="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
							/>
						</svg>
					{/each}
				</div>
				<span class="text-sm">{brand.googleReviewCount} avis sur Google</span>
			</div>
		</div>

		<!-- Client logo marquee -->
		<div class="group relative w-full overflow-hidden md:w-2/3" aria-label="Logos de nos clients">
			<div
				class="animate-marquee flex group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]"
			>
				{#each Array.from({ length: 2 }, (_v, i) => i) as j (j)}
					<div class="flex shrink-0 items-center gap-12 px-6">
						{#each Array.from({ length: 6 }, (_v, i) => i) as i (i)}
							<div
								class="h-8 w-24 rounded bg-secondary-foreground/10"
								aria-label="Logo client {i + 1}"
							></div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</Section>

<style>
	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	:global(.animate-marquee) {
		animation: marquee 30s linear infinite;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.animate-marquee) {
			animation: none;
		}
	}
</style>
