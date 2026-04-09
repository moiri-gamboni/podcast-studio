<script lang="ts">
	import Section from '$lib/components/Section.svelte';

	interface FaqItem {
		question: string;
		answer: string;
	}

	let { items }: { items: FaqItem[] } = $props();

	let openIndex = $state(-1);

	function toggle(index: number) {
		openIndex = openIndex === index ? -1 : index;
	}

	const hasRealContent = $derived(
		items.length > 0 && !items.some((i) => i.question.includes('«') || i.answer.includes('«'))
	);

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: items.map((i) => ({
				'@type': 'Question',
				name: i.question,
				acceptedAnswer: { '@type': 'Answer', text: i.answer }
			}))
		})
	);
</script>

<svelte:head>
	{#if hasRealContent}
		{@html '<script type="application/ld+json">' + jsonLd + '</' + 'script>'}
	{/if}
</svelte:head>

<Section id="faq" label="FAQ" title="Questions fréquentes">
	<div class="mt-12 divide-y divide-border">
		{#each items as item, i}
			<div>
				<button
					id="faq-btn-{i}"
					class="flex w-full items-center justify-between py-5 text-left text-lg font-semibold"
					aria-expanded={openIndex === i}
					aria-controls="faq-panel-{i}"
					onclick={() => toggle(i)}
				>
					{item.question}
					<svg
						class="h-5 w-5 shrink-0 transition-transform duration-200
							{openIndex === i ? 'rotate-180' : ''}"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				<div
					id="faq-panel-{i}"
					role="region"
					aria-labelledby="faq-btn-{i}"
					class="overflow-hidden transition-[max-height] duration-200"
					style="max-height: {openIndex === i ? '40rem' : '0'}"
				>
					<p class="pb-5 text-muted-foreground">{item.answer}</p>
				</div>
			</div>
		{/each}
	</div>
</Section>
