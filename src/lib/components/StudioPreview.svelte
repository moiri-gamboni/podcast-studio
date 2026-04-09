<script lang="ts">
	import Section from '$lib/components/Section.svelte';
</script>

<Section id="studio" label="Le Studio" title="Découvrez nos espaces">
	<div class="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each Array(4) as _, i}
			<div
				class="aspect-[4/3] rounded-lg bg-muted"
				role="img"
				aria-label="Photo du studio {i + 1}"
			></div>
		{/each}
	</div>

	<div class="mt-8 max-w-2xl">
		<p class="text-lg text-muted-foreground">
			Un espace insonorisé, climatisé et équipé pour vos enregistrements podcast, voix off et
			interviews. Tout est prêt dès votre arrivée.
		</p>
	</div>

	<div class="mt-6">
		<button
			disabled
			class="rounded-full bg-primary/50 px-8 py-3 font-semibold text-primary-foreground cursor-not-allowed"
		>
			Voir tous les espaces
		</button>
	</div>
</Section>
