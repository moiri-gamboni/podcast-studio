<script lang="ts">
	import { brand } from '$lib/config';
	import LegalPage from '$lib/components/LegalPage.svelte';
</script>

<LegalPage title="Mentions légales" lastUpdated="10 avril 2026">
	<h2>Éditeur du site</h2>
	<p>
		{brand.name}<br />
		{brand.address}, {brand.postalCode}
		{brand.city}<br />
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
		Site web : <a href="https://www.cloudflare.com" target="_blank" rel="noopener"
			>www.cloudflare.com</a
		>.
	</p>

	<h2>Propriété intellectuelle</h2>
	<p>
		L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos, marques) est
		protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation,
		modification ou adaptation, totale ou partielle, sans l'autorisation écrite préalable de
		{brand.name}, est strictement interdite.
	</p>

	<h2>Mesure d'audience</h2>
	<p>
		Ce site utilise Cloudflare Web Analytics, un service de mesure d'audience qui ne dépose aucun
		cookie et ne collecte aucune donnée personnelle. Ce service ne nécessite pas de bandeau de
		consentement.
	</p>

	<h2>Médiation</h2>
	<p>
		Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, en cas de litige non
		résolu directement avec {brand.name}, le consommateur peut recourir gratuitement au service de
		médiation. Le médiateur compétent est :
	</p>
	<p>
		CNPM — Médiation de la consommation<br />
		27 avenue de la Libération, 42400 Saint-Chamond<br />
		<a href="https://cnpm-mediation-consommation.eu" target="_blank" rel="noopener"
			>cnpm-mediation-consommation.eu</a
		>
	</p>
	<p>
		Le consommateur peut également utiliser la plateforme européenne de règlement en ligne des
		litiges :
		<a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener"
			>ec.europa.eu/consumers/odr</a
		>.
	</p>

	<h2>Droit applicable</h2>
	<p>
		Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut
		de résolution amiable, les tribunaux français seront seuls compétents.
	</p>
</LegalPage>
