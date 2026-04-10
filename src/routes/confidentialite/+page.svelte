<script lang="ts">
	import { brand } from '$lib/config';
	import LegalPage from '$lib/components/LegalPage.svelte';
</script>

<LegalPage title="Politique de confidentialité" lastUpdated="10 avril 2026">
	<h2>Responsable du traitement</h2>
	<p>
		Le responsable du traitement des données personnelles est {brand.name}, {brand.address},
		{brand.postalCode}
		{brand.city}.
	</p>
	<p>
		Contact : {brand.email}<br />
		Téléphone : {brand.phone}
	</p>

	<h2>Données collectées</h2>
	<p>Nous collectons uniquement les données nécessaires à la réalisation de nos prestations :</p>
	<ul>
		<li>Nom et prénom</li>
		<li>Adresse e-mail</li>
		<li>Numéro de téléphone</li>
		<li>Données de réservation (date, créneau, formule choisie)</li>
		<li>Données de facturation (adresse, le cas échéant)</li>
	</ul>
	<p>
		Ces données sont collectées lors de la réservation en ligne ou par échange direct (e-mail,
		téléphone, WhatsApp).
	</p>

	<h2>Finalités du traitement</h2>
	<p>Les données collectées sont utilisées pour :</p>
	<ul>
		<li>La gestion des réservations et de la relation client</li>
		<li>L'envoi de confirmations, de rappels et de suivi</li>
		<li>La facturation et le suivi comptable</li>
		<li>La réponse à vos demandes de contact</li>
	</ul>

	<h2>Base légale</h2>
	<p>Le traitement de vos données repose sur :</p>
	<ul>
		<li>
			<strong>L'exécution du contrat</strong> (article 6.1.b du RGPD) : traitement des réservations, facturation,
			gestion de la prestation.
		</li>
		<li>
			<strong>L'intérêt légitime</strong> (article 6.1.f du RGPD) : gestion de la relation client, amélioration
			de nos services.
		</li>
		<li>
			<strong>L'obligation légale</strong> (article 6.1.c du RGPD) : conservation des factures et pièces
			comptables.
		</li>
	</ul>

	<h2>Durée de conservation</h2>
	<ul>
		<li>
			<strong>Données clients</strong> : 3 ans après le dernier contact ou la fin de la relation commerciale.
		</li>
		<li>
			<strong>Pièces comptables</strong> : 10 ans conformément aux obligations légales.
		</li>
	</ul>

	<h2>Sous-traitants et tiers</h2>
	<p>
		Les prestataires suivants peuvent être amenés à traiter des données dans le cadre du
		fonctionnement du site :
	</p>
	<ul>
		<li>
			<strong>Cloudflare, Inc.</strong> (hébergement et mesure d'audience) : les requêtes
			transitent par l'infrastructure Cloudflare, qui reçoit les adresses IP des visiteurs
			dans le cadre normal du protocole HTTP. Cloudflare adhère au EU-US Data Privacy
			Framework.
		</li>
	</ul>
	<p>
		Aucune donnée personnelle n'est vendue, louée ou cédée à des tiers à des fins commerciales.
	</p>

	<h2>Transferts hors Union européenne</h2>
	<p>
		L'hébergement du site par Cloudflare peut impliquer un transfert de données vers les États-Unis.
		Ce transfert est encadré par le EU-US Data Privacy Framework, assurant un niveau de protection
		adéquat conformément à la décision d'adéquation de la Commission européenne du 10 juillet 2023.
	</p>

	<h2>Cookies et mesure d'audience</h2>
	<p>
		Ce site ne dépose aucun cookie (ni de suivi, ni publicitaire, ni de fonctionnement). Aucun
		bandeau de consentement n'est nécessaire.
	</p>
	<p>
		Ce site utilise <strong>Cloudflare Web Analytics</strong>, un service de mesure d'audience
		fourni par Cloudflare, Inc. Ce service fonctionne sans cookies, sans identifiant unique et
		sans suivi inter-sites. Les statistiques produites sont agrégées et ne permettent pas
		d'identifier un visiteur individuel.
	</p>
	<p>
		Dans le cadre de ce service, les adresses IP des visiteurs sont reçues par Cloudflare lors
		des requêtes HTTP, puis supprimées sans être stockées. Ce traitement transitoire repose sur
		notre intérêt légitime (article 6.1.f du RGPD) à mesurer la fréquentation du site de
		manière proportionnée.
	</p>
	<p>
		Vous pouvez vous opposer à cette mesure d'audience en contactant {brand.email}.
	</p>

	<h2>Sécurité</h2>
	<p>
		Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos
		données contre tout accès non autorisé, toute modification, divulgation ou destruction. Les
		communications sont chiffrées via HTTPS.
	</p>

	<h2>Vos droits</h2>
	<p>
		Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique
		et Libertés, vous disposez des droits suivants :
	</p>
	<ul>
		<li>Droit d'accès à vos données personnelles</li>
		<li>Droit de rectification</li>
		<li>Droit à l'effacement (« droit à l'oubli »)</li>
		<li>Droit à la limitation du traitement</li>
		<li>Droit à la portabilité de vos données</li>
		<li>Droit d'opposition</li>
	</ul>
	<p>
		Pour exercer ces droits, contactez-nous à {brand.email}. Nous nous engageons à répondre dans un
		délai d'un mois.
	</p>
	<p>
		Si vous estimez que le traitement de vos données constitue une violation de vos droits, vous
		pouvez introduire une réclamation auprès de la CNIL :
		<a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>.
	</p>

	<h2>Modifications</h2>
	<p>
		La présente politique peut être mise à jour. La date de dernière mise à jour figure en haut de
		cette page. En cas de modification substantielle, un avis sera publié sur le site.
	</p>
</LegalPage>
