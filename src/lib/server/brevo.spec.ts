import { describe, expect, test, vi, beforeEach } from 'vitest';
import { sendEmail, buildContactNotificationHtml } from './brevo';

describe('sendEmail', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	test('calls Brevo API with correct URL, headers, and body', async () => {
		globalThis.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));

		await sendEmail('test-key', {
			senderEmail: 'studio@example.com',
			senderName: 'Studio',
			to: 'owner@example.com',
			replyTo: 'visitor@example.com',
			subject: 'Contact: Jean',
			htmlContent: '<p>Hello</p>'
		});

		expect(globalThis.fetch).toHaveBeenCalledWith(
			'https://api.brevo.com/v3/smtp/email',
			expect.objectContaining({ method: 'POST' })
		);

		const callArgs = vi.mocked(globalThis.fetch).mock.calls[0];
		const options = callArgs[1] as RequestInit;
		const headers = options.headers as Record<string, string>;
		expect(headers['api-key']).toBe('test-key');
		expect(headers['Content-Type']).toBe('application/json');

		const body = JSON.parse(options.body as string);
		expect(body.sender).toEqual({ name: 'Studio', email: 'studio@example.com' });
		expect(body.to).toEqual([{ email: 'owner@example.com' }]);
		expect(body.replyTo).toEqual({ email: 'visitor@example.com' });
		expect(body.subject).toBe('Contact: Jean');
		expect(body.htmlContent).toBe('<p>Hello</p>');
	});

	test('returns ok on 201 response', async () => {
		globalThis.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));

		const result = await sendEmail('key', {
			senderEmail: 'a@b.com',
			senderName: 'S',
			to: 'c@d.com',
			replyTo: 'e@f.com',
			subject: 'Test',
			htmlContent: '<p>Test</p>'
		});

		expect(result).toEqual({ ok: true });
	});

	test('returns ok on 200 response', async () => {
		globalThis.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));

		const result = await sendEmail('key', {
			senderEmail: 'a@b.com',
			senderName: 'S',
			to: 'c@d.com',
			replyTo: 'e@f.com',
			subject: 'Test',
			htmlContent: '<p>Test</p>'
		});

		expect(result).toEqual({ ok: true });
	});

	test('returns error on 400 response', async () => {
		globalThis.fetch = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ code: 'invalid_parameter', message: 'Bad email' }), {
				status: 400
			})
		);

		const result = await sendEmail('key', {
			senderEmail: 'a@b.com',
			senderName: 'S',
			to: 'c@d.com',
			replyTo: 'e@f.com',
			subject: 'Test',
			htmlContent: '<p>Test</p>'
		});

		expect(result.ok).toBe(false);
		expect(result.error).toBeDefined();
	});

	test('returns error on 401 response', async () => {
		globalThis.fetch = vi
			.fn()
			.mockResolvedValue(new Response(JSON.stringify({ code: 'unauthorized' }), { status: 401 }));

		const result = await sendEmail('bad-key', {
			senderEmail: 'a@b.com',
			senderName: 'S',
			to: 'c@d.com',
			replyTo: 'e@f.com',
			subject: 'Test',
			htmlContent: '<p>Test</p>'
		});

		expect(result.ok).toBe(false);
		expect(result.error).toContain('401');
	});

	test('returns error on fetch rejection', async () => {
		globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

		const result = await sendEmail('key', {
			senderEmail: 'a@b.com',
			senderName: 'S',
			to: 'c@d.com',
			replyTo: 'e@f.com',
			subject: 'Test',
			htmlContent: '<p>Test</p>'
		});

		expect(result.ok).toBe(false);
		expect(result.error).toContain('Network error');
	});
});

describe('buildContactNotificationHtml', () => {
	test('produces HTML with all fields', () => {
		const html = buildContactNotificationHtml({
			nom: 'Jean Dupont',
			email: 'jean@example.com',
			telephone: '0612345678',
			sujet: 'reservation',
			message: 'Bonjour, je voudrais réserver.'
		});

		expect(html).toContain('Jean Dupont');
		expect(html).toContain('jean@example.com');
		expect(html).toContain('0612345678');
		expect(html).toContain('reservation');
		expect(html).toContain('Bonjour, je voudrais réserver.');
	});

	test('escapes HTML in user input', () => {
		const html = buildContactNotificationHtml({
			nom: '<script>alert("xss")</script>',
			email: 'a@b.com',
			telephone: '',
			sujet: '',
			message: 'Hello & "goodbye" <b>bold</b>'
		});

		expect(html).not.toContain('<script>');
		expect(html).toContain('&lt;script&gt;');
		expect(html).toContain('&amp;');
		expect(html).toContain('&quot;goodbye&quot;');
		expect(html).toContain('&lt;b&gt;');
	});
});
