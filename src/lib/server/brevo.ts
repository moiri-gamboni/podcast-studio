const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

interface SendEmailParams {
	senderEmail: string;
	senderName: string;
	to: string;
	replyTo: string;
	subject: string;
	htmlContent: string;
}

interface SendEmailResult {
	ok: boolean;
	error?: string;
}

export async function sendEmail(apiKey: string, params: SendEmailParams): Promise<SendEmailResult> {
	try {
		const res = await fetch(BREVO_API_URL, {
			method: 'POST',
			headers: {
				'api-key': apiKey,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sender: { name: params.senderName, email: params.senderEmail },
				to: [{ email: params.to }],
				replyTo: { email: params.replyTo },
				subject: params.subject,
				htmlContent: params.htmlContent
			})
		});

		if (!res.ok) {
			const text = await res.text().catch(() => '');
			return { ok: false, error: `Brevo API ${res.status}: ${text}` };
		}

		return { ok: true };
	} catch (err) {
		return { ok: false, error: `Brevo fetch failed: ${err instanceof Error ? err.message : err}` };
	}
}

function esc(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

interface ContactFormData {
	nom: string;
	email: string;
	telephone: string;
	sujet: string;
	message: string;
}

export function buildContactNotificationHtml(data: ContactFormData): string {
	return `<p><strong>Nom:</strong> ${esc(data.nom)}</p>
<p><strong>Email:</strong> ${esc(data.email)}</p>
<p><strong>Téléphone:</strong> ${esc(data.telephone)}</p>
<p><strong>Sujet:</strong> ${esc(data.sujet)}</p>
<p><strong>Message:</strong></p>
<p>${esc(data.message)}</p>`;
}
