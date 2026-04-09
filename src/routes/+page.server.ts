import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

function esc(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

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

		const apiKey = platform?.env?.RESEND_API_KEY;
		if (!apiKey) {
			return fail(500, { errors: { server: 'Configuration email manquante.' } });
		}

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + apiKey,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: 'contact@example.com',
				to: ['contact@example.com'],
				replyTo: email,
				subject: 'Contact: ' + nom,
				html: `<p><strong>Nom:</strong> ${esc(nom)}</p>
<p><strong>Email:</strong> ${esc(email)}</p>
<p><strong>Téléphone:</strong> ${esc(telephone)}</p>
<p><strong>Sujet:</strong> ${esc(sujet)}</p>
<p><strong>Message:</strong></p>
<p>${esc(message)}</p>`
			})
		});

		if (!res.ok) {
			return fail(500, { errors: { server: "Erreur lors de l'envoi. Veuillez réessayer." } });
		}

		return { success: true };
	}
} satisfies Actions;
