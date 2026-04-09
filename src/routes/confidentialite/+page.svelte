<script lang="ts">
	import { brand } from '$lib/config';
	import LegalPage from '$lib/components/LegalPage.svelte';
</script>

<LegalPage title="Politique de confidentialité" lastUpdated="1er janvier 2025">
	<h2>Responsable du traitement</h2>
	<p>
		Le responsable du traitement des données personnelles est {brand.name}, {brand.address},
		{brand.postalCode} {brand.city}.
	</p>

	<h2>Données collectées</h2>
	<p>Dans le cadre de nos activités, nous pouvons collecter les données suivantes :</p>
	<ul>
		<li>Nom et prénom</li>
		<li>Adresse e-mail</li>
		<li>Numéro de téléphone</li>
		<li>Données de réservation (date, créneau, formule choisie)</li>
	</ul>

	<h2>Finalités</h2>
	<p>Les données collectées sont utilisées pour :</p>
	<ul>
		<li>La gestion des réservations et de la relation client</li>
		<li>L'envoi de confirmations et de rappels</li>
		<li>La facturation</li>
	</ul>

	<h2>Base légale</h2>
	<p>
		Le traitement des données repose sur l'exécution du contrat (réservation) et le consentement de
		l'utilisateur lorsque applicable.
	</p>

	<h2>Durée de conservation</h2>
	<p>
		Les données personnelles sont conservées pour la durée nécessaire à la gestion de la relation
		commerciale, et au maximum 3 ans après le dernier contact.
	</p>

	<h2>Vos droits</h2>
	<p>
		Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, de
		limitation du traitement, de portabilité et d'opposition. Pour exercer ces droits, contactez-nous
		à {brand.email}.
	</p>

	<h2>Cookies</h2>
	<p>
		Ce site utilise des outils d'analyse respectueux de la vie privée qui ne déposent aucun cookie
		de suivi. Aucun consentement n'est requis pour ces mesures d'audience anonymes.
	</p>

	<h2>Contact DPO</h2>
	<p>
		Pour toute question relative à la protection de vos données, vous pouvez contacter notre
		délégué à la protection des données à l'adresse suivante : {brand.email}.
	</p>
</LegalPage>
