<script lang="ts">
	import { heroStats, processSteps, pricingTiers, faqItems } from '$lib/data/homepage';
	import Hero from '$lib/components/Hero.svelte';
	import TrustBar from '$lib/components/TrustBar.svelte';
	import StudioPreview from '$lib/components/StudioPreview.svelte';
	import ProcessSteps from '$lib/components/ProcessSteps.svelte';
	import PricingPreview from '$lib/components/PricingPreview.svelte';
	import FaqAccordion from '$lib/components/FaqAccordion.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<Hero {heroStats} />
<TrustBar />
<StudioPreview />
<ProcessSteps steps={processSteps} />
<PricingPreview tiers={pricingTiers} />
<FaqAccordion items={faqItems} />
<ContactSection {form} />
