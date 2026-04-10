import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendEmail, buildContactNotificationHtml } from '$lib/server/brevo';
import { brand } from '$lib/config';

export const actions = {
	default: async ({ request, platform }) => {
		const data = await request.formData();
		const nom = data.get('nom')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim() ?? '';
		const telephone = data.get('telephone')?.toString().trim() ?? '';
		const sujet = data.get('sujet')?.toString().trim() ?? '';
		const message = data.get('message')?.toString().trim() ?? '';
		const rgpd = data.get('rgpd')?.toString() ?? '';

		const errors: Record<string, string> = {};

		if (!nom) errors.nom = 'Le nom est requis';
		if (!email) {
			errors.email = "L'email est requis";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = "L'email est invalide";
		}
		if (!message) {
			errors.message = 'Le message est requis';
		} else if (message.length < 10) {
			errors.message = 'Le message doit contenir au moins 10 caractères';
		}
		if (rgpd !== 'on') {
			errors.rgpd = 'Vous devez accepter le traitement de vos données';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values: { nom, email, telephone, sujet, message } });
		}

		const apiKey = platform?.env?.BREVO_API_KEY;
		if (!apiKey) {
			return fail(500, { errors: { server: 'Configuration email manquante.' } });
		}

		const result = await sendEmail(apiKey, {
			senderEmail: brand.email,
			senderName: brand.name,
			to: brand.email,
			replyTo: email,
			subject: 'Contact: ' + nom,
			htmlContent: buildContactNotificationHtml({ nom, email, telephone, sujet, message })
		});

		if (!result.ok) {
			console.error('Brevo send failed:', result.error);
			return fail(500, { errors: { server: "Erreur lors de l'envoi. Veuillez réessayer." } });
		}

		return { success: true };
	}
} satisfies Actions;
