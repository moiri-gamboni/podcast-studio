<script lang="ts">
	import { brand } from '$lib/config';
	import LegalPage from '$lib/components/LegalPage.svelte';
</script>

<LegalPage title="Mentions légales" lastUpdated="1er janvier 2025">
	<h2>Éditeur du site</h2>
	<p>
		{brand.name}<br />
		{brand.address}, {brand.postalCode} {brand.city}<br />
		SIRET : {brand.siret}<br />
		RCS : {brand.rcs}<br />
		Capital social : {brand.capitalSocial}<br />
		Directeur de la publication : {brand.directeurPublication}
	</p>
	<p>
		Téléphone : {brand.phone}<br />
		E-mail : {brand.email}
	</p>

	<h2>Hébergement</h2>
	<p>
		Ce site est hébergé par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis.
	</p>

	<h2>Propriété intellectuelle</h2>
	<p>
		L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos, marques) est
		protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation,
		modification ou adaptation, totale ou partielle, sans l'autorisation écrite préalable de
		{brand.name}, est strictement interdite.
	</p>
</LegalPage>
