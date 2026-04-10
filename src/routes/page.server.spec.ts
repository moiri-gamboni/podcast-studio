import { describe, expect, test, vi, beforeEach } from 'vitest';

vi.mock('$lib/server/brevo', () => ({
	sendEmail: vi.fn().mockResolvedValue({ ok: true }),
	buildContactNotificationHtml: vi.fn().mockReturnValue('<p>mock html</p>')
}));

function makeRequest(data: Record<string, string>): Request {
	const formData = new FormData();
	for (const [key, value] of Object.entries(data)) {
		formData.append(key, value);
	}
	return new Request('http://localhost', { method: 'POST', body: formData });
}

const mockPlatform = {
	env: { BREVO_API_KEY: 'test-key' }
};

const validData = {
	nom: 'Jean Dupont',
	email: 'jean@example.com',
	message: 'Bonjour, je suis intéressé par vos services.',
	rgpd: 'on'
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyResult = any;

describe('+page.server actions', () => {
	beforeEach(async () => {
		vi.restoreAllMocks();
		const { sendEmail } = vi.mocked(await import('$lib/server/brevo'));
		sendEmail.mockResolvedValue({ ok: true });
	});

	test('returns errors for empty required fields', async () => {
		const { actions } = await import('./+page.server');
		const result: AnyResult = await actions.default({
			request: makeRequest({}),
			platform: mockPlatform
		} as never);

		expect(result?.status).toBe(400);
		expect(result?.data.errors.nom).toBeDefined();
		expect(result?.data.errors.email).toBeDefined();
		expect(result?.data.errors.message).toBeDefined();
	});

	test('validates email format', async () => {
		const { actions } = await import('./+page.server');
		const result: AnyResult = await actions.default({
			request: makeRequest({ ...validData, email: 'not-an-email' }),
			platform: mockPlatform
		} as never);

		expect(result?.status).toBe(400);
		expect(result?.data.errors.email).toBeDefined();
	});

	test('requires RGPD consent', async () => {
		const { actions } = await import('./+page.server');
		const { rgpd: _, ...noRgpd } = validData;
		const result: AnyResult = await actions.default({
			request: makeRequest(noRgpd),
			platform: mockPlatform
		} as never);

		expect(result?.status).toBe(400);
		expect(result?.data.errors.rgpd).toBeDefined();
	});

	test('returns success on valid input', async () => {
		const { actions } = await import('./+page.server');
		const result = await actions.default({
			request: makeRequest(validData),
			platform: mockPlatform
		} as never);

		expect(result).toEqual({ success: true });
	});

	test('calls sendEmail with correct arguments', async () => {
		const { sendEmail } = vi.mocked(await import('$lib/server/brevo'));
		const { actions } = await import('./+page.server');

		await actions.default({
			request: makeRequest({ ...validData, telephone: '0612345678', sujet: 'reservation' }),
			platform: mockPlatform
		} as never);

		expect(sendEmail).toHaveBeenCalledWith(
			'test-key',
			expect.objectContaining({
				replyTo: 'jean@example.com',
				subject: 'Contact: Jean Dupont',
				htmlContent: '<p>mock html</p>'
			})
		);
	});

	test('returns server error when sendEmail fails', async () => {
		const { sendEmail } = vi.mocked(await import('$lib/server/brevo'));
		sendEmail.mockResolvedValue({ ok: false, error: 'Brevo API 400: bad request' });

		const { actions } = await import('./+page.server');
		const result: AnyResult = await actions.default({
			request: makeRequest(validData),
			platform: mockPlatform
		} as never);

		expect(result?.status).toBe(500);
		expect(result?.data.errors.server).toBeDefined();
	});

	test('returns server error when API key is missing', async () => {
		const { actions } = await import('./+page.server');
		const result: AnyResult = await actions.default({
			request: makeRequest(validData),
			platform: { env: {} }
		} as never);

		expect(result?.status).toBe(500);
		expect(result?.data.errors.server).toBeDefined();
	});
});
