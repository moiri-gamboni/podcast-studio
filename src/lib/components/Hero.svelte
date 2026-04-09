<script lang="ts">
	import type { HeroStat } from '$lib/data/homepage';

	let { heroStats }: { heroStats: HeroStat[] } = $props();
</script>

<section class="relative flex min-h-svh flex-col justify-center bg-section-darker" aria-label="Accueil">
	<!-- Gradient overlays for text legibility -->
	<div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40"></div>
	<div class="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"></div>

	<div class="container relative z-10">
		<div class="max-w-2xl text-center md:text-left">
			<span
				class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-foreground backdrop-blur-sm"
			>
				<span class="relative flex h-2 w-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none"
					></span>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
				</span>
				Studio disponible
			</span>

			<h1 class="mt-6 font-display text-5xl font-bold leading-tight text-foreground md:text-7xl">
				Votre espace de création
			</h1>

			<p class="mt-6 text-lg text-muted-foreground md:text-xl">
				Un studio podcast professionnel, pensé pour les créateurs qui veulent un son impeccable
				sans compromis.
			</p>

			<div class="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start">
				<a
					href="#tarifs"
					class="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
				>
					Réserver une session
				</a>
				<a
					href="#studio"
					class="rounded-full border border-foreground/20 px-8 py-3 font-semibold text-foreground transition-colors hover:bg-white/10"
				>
					Découvrir le studio
				</a>
			</div>
		</div>
	</div>

	<!-- Stats bar -->
	<div class="relative z-10 mt-auto border-t border-white/10 bg-black/30 backdrop-blur-sm">
		<div class="container flex items-center justify-center gap-8 py-6 md:justify-start md:gap-16">
			{#each heroStats as stat}
				<div class="text-center">
					<p class="font-display text-3xl font-bold text-foreground md:text-4xl">{stat.value}</p>
					<p class="mt-1 text-sm text-muted-foreground">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
