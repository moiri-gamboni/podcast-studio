import { describe, expect, test, vi, beforeEach } from 'vitest';

function makeRequest(data: Record<string, string>): Request {
	const formData = new FormData();
	for (const [key, value] of Object.entries(data)) {
		formData.append(key, value);
	}
	return new Request('http://localhost', { method: 'POST', body: formData });
}

const mockPlatform = {
	env: { RESEND_API_KEY: 'test-key' }
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
	beforeEach(() => {
		vi.restoreAllMocks();
		globalThis.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
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
		expect(globalThis.fetch).toHaveBeenCalledWith(
			'https://api.resend.com/emails',
			expect.objectContaining({ method: 'POST' })
		);
	});

	test('returns server error when email send fails', async () => {
		globalThis.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 500 }));

		const { actions } = await import('./+page.server');
		const result: AnyResult = await actions.default({
			request: makeRequest(validData),
			platform: mockPlatform
		} as never);

		expect(result?.status).toBe(500);
		expect(result?.data.errors.server).toBeDefined();
	});
});
