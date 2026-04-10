<script lang="ts">
	import { brand } from '$lib/config';
	import LegalPage from '$lib/components/LegalPage.svelte';
</script>

<LegalPage title="Conditions générales de vente" lastUpdated="10 avril 2026">
	<h2>Article 1 — Objet</h2>
	<p>
		Les présentes conditions générales de vente (ci-après « CGV ») régissent les relations
		contractuelles entre {brand.name} (ci-après « le Prestataire ») et toute personne physique ou morale
		(ci-après « le Client ») procédant à la réservation et à l'utilisation des studios d'enregistrement
		podcast.
	</p>
	<p>Toute réservation implique l'acceptation pleine et entière des présentes CGV.</p>

	<h2>Article 2 — Prestations</h2>
	<p>
		Le Prestataire propose la mise à disposition de studios d'enregistrement podcast équipés de
		matériel professionnel (microphones, casques, table de mixage, logiciels), selon les formules et
		durées décrites sur le site.
	</p>
	<p>
		Les prestations complémentaires éventuelles (montage, post-production, accompagnement) font
		l'objet d'un devis distinct.
	</p>

	<h2>Article 3 — Réservation</h2>
	<p>
		Toute réservation est effectuée via la plateforme de réservation en ligne. Elle est considérée
		comme ferme et définitive après confirmation par e-mail et, le cas échéant, encaissement du
		paiement.
	</p>
	<p>Le Client s'engage à fournir des informations exactes lors de la réservation.</p>

	<h2>Article 4 — Tarifs</h2>
	<p>
		Les tarifs sont indiqués en euros TTC sur le site. Le Prestataire se réserve le droit de
		modifier ses tarifs à tout moment ; les prestations sont facturées sur la base des tarifs en
		vigueur au moment de la réservation.
	</p>

	<h2>Article 5 — Paiement</h2>
	<p>
		Le paiement s'effectue en ligne lors de la réservation ou sur place le jour de la prestation.
		Les moyens de paiement acceptés sont la carte bancaire et le virement.
	</p>
	<p>
		En cas de retard de paiement, des pénalités de retard au taux légal en vigueur seront
		applicables de plein droit, sans mise en demeure préalable, ainsi qu'une indemnité forfaitaire
		de 40 € pour frais de recouvrement.
	</p>

	<h2>Article 6 — Droit de rétractation</h2>
	<p>
		Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne
		s'applique pas aux prestations de services de loisirs devant être fournies à une date
		déterminée. La réservation d'un créneau studio à une date et un horaire précis entre dans le
		champ de cette exception.
	</p>

	<h2>Article 7 — Annulation et report</h2>
	<p>
		Toute annulation ou demande de report doit être effectuée au moins 48 heures avant le créneau
		réservé :
	</p>
	<ul>
		<li>
			<strong>Plus de 48 h avant</strong> : remboursement intégral ou report sans frais.
		</li>
		<li>
			<strong>Moins de 48 h avant</strong> : la totalité du montant reste due.
		</li>
		<li>
			<strong>Absence sans prévenir (no-show)</strong> : la totalité du montant reste due.
		</li>
	</ul>
	<p>
		En cas de force majeure (au sens de l'article 1218 du Code civil), une solution sera recherchée
		au cas par cas.
	</p>

	<h2>Article 8 — Retard</h2>
	<p>
		En cas de retard du Client, le créneau n'est pas prolongé : la session se termine à l'heure
		initialement prévue. Le montant reste dû en intégralité.
	</p>

	<h2>Article 9 — Obligations du Client</h2>
	<p>Le Client s'engage à :</p>
	<ul>
		<li>respecter les consignes d'utilisation du matériel et des locaux ;</li>
		<li>ne pas introduire de nourriture ni de boissons à proximité du matériel ;</li>
		<li>signaler immédiatement tout dysfonctionnement ou dégradation ;</li>
		<li>quitter le studio dans l'état dans lequel il l'a trouvé ;</li>
		<li>respecter les horaires réservés.</li>
	</ul>

	<h2>Article 10 — Responsabilité</h2>
	<p>
		Le Prestataire met à disposition du matériel professionnel en bon état de fonctionnement et
		s'engage à fournir un environnement adapté à l'enregistrement.
	</p>
	<p>
		Le Client est responsable de tout dommage causé au matériel ou aux locaux pendant la durée de la
		prestation. En cas de dégradation, le coût de réparation ou de remplacement sera facturé au
		Client.
	</p>
	<p>
		La responsabilité du Prestataire ne saurait être engagée en cas de perte de données ou
		d'enregistrements due à une mauvaise manipulation par le Client. Il appartient au Client de
		vérifier ses enregistrements avant de quitter le studio.
	</p>

	<h2>Article 11 — Propriété des enregistrements</h2>
	<p>
		Le Client conserve l'entière propriété intellectuelle des contenus enregistrés dans le studio.
		Le Prestataire ne revendique aucun droit sur ces contenus.
	</p>

	<h2>Article 12 — Force majeure</h2>
	<p>
		Aucune des parties ne sera tenue responsable de l'inexécution de ses obligations en cas de force
		majeure telle que définie par l'article 1218 du Code civil (catastrophe naturelle, incendie,
		panne généralisée d'électricité, pandémie, etc.). La partie affectée en informera l'autre dans
		les meilleurs délais.
	</p>

	<h2>Article 13 — Protection des données</h2>
	<p>
		Les données personnelles collectées dans le cadre de la réservation sont traitées conformément à
		notre
		<a href="/confidentialite">politique de confidentialité</a>.
	</p>

	<h2>Article 14 — Médiation</h2>
	<p>
		En cas de litige non résolu à l'amiable, le Client consommateur peut recourir gratuitement à un
		médiateur de la consommation. Les modalités sont précisées dans nos
		<a href="/mentions-legales">mentions légales</a>.
	</p>

	<h2>Article 15 — Droit applicable</h2>
	<p>
		Les présentes CGV sont régies par le droit français. En cas de litige, et à défaut de résolution
		amiable ou de médiation, les tribunaux compétents seront ceux du ressort du siège social du
		Prestataire.
	</p>
</LegalPage>
