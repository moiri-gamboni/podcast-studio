<script lang="ts">
	import { brand } from '$lib/config';
	import LegalPage from '$lib/components/LegalPage.svelte';
</script>

<LegalPage title="Conditions générales de vente" lastUpdated="1er janvier 2025">
	<h2>Objet</h2>
	<p>
		Les présentes conditions générales de vente régissent les relations contractuelles entre
		{brand.name} et ses clients dans le cadre de la réservation et de l'utilisation des studios d'enregistrement
		podcast.
	</p>

	<h2>Réservation</h2>
	<p>
		Toute réservation est effectuée via la plateforme de réservation en ligne et est considérée
		comme ferme et définitive dès sa confirmation par e-mail. La réservation implique l'acceptation
		pleine et entière des présentes conditions.
	</p>

	<h2>Tarifs</h2>
	<p>
		Les tarifs sont indiqués en euros TTC sur le site. {brand.name} se réserve le droit de modifier ses
		tarifs à tout moment. Les prestations sont facturées sur la base des tarifs en vigueur au moment de
		la réservation.
	</p>

	<h2>Annulation</h2>
	<p>
		Toute annulation doit être effectuée au moins 48 heures avant le créneau réservé. Passé ce
		délai, la totalité du montant sera due. En cas de force majeure, une solution sera recherchée au
		cas par cas.
	</p>

	<h2>Paiement</h2>
	<p>
		Le paiement s'effectue en ligne lors de la réservation ou sur place le jour de la prestation.
		Les moyens de paiement acceptés sont la carte bancaire et le virement.
	</p>

	<h2>Responsabilité</h2>
	<p>
		{brand.name} met à disposition du matériel professionnel en bon état de fonctionnement. Le client
		est responsable de tout dommage causé au matériel ou aux locaux pendant la durée de la prestation.
	</p>
</LegalPage>
