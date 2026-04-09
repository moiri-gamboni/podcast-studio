<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import type { ProcessStep } from '$lib/data/homepage';

	let { steps }: { steps: ProcessStep[] } = $props();
</script>

<Section label="Comment ça marche" title="Un processus simple">
	<div class="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
		<!-- Connecting line on desktop -->
		<div
			class="absolute top-12 right-6 left-6 hidden h-px border-t border-dashed border-primary/20 md:block"
		></div>

		{#each steps as step, i}
			<div class="relative rounded-xl bg-card p-6">
				<p class="font-display text-6xl font-bold text-primary/10">{i + 1}</p>
				<h3 class="mt-2 text-xl font-bold text-card-foreground">{step.title}</h3>
				<p class="mt-2 text-muted-foreground">{step.description}</p>
			</div>
		{/each}
	</div>
</Section>
