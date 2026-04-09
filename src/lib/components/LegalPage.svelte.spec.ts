import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { describe, expect, test } from 'vitest';
import LegalPage from './LegalPage.svelte';

describe('LegalPage', () => {
	test('renders title as h1', async () => {
		render(LegalPage, {
			title: 'Mentions légales',
			lastUpdated: '1er janvier 2025'
		});

		await expect.element(page.getByRole('heading', { level: 1 })).toHaveTextContent(
			'Mentions légales'
		);
	});

	test('renders lastUpdated date text', async () => {
		render(LegalPage, {
			title: 'Test',
			lastUpdated: '15 mars 2025'
		});

		await expect.element(page.getByText('15 mars 2025')).toBeVisible();
	});

	test('renders children content', async () => {
		render(LegalPage, {
			title: 'Test',
			lastUpdated: '1er janvier 2025',
			children: createTextSnippet('Contenu juridique de test')
		});

		await expect.element(page.getByText('Contenu juridique de test')).toBeVisible();
	});
});

function createTextSnippet(text: string) {
	return ((anchor: Element) => {
		const el = document.createElement('p');
		el.textContent = text;
		anchor.before(el);
		return () => el.remove();
	}) as unknown as import('svelte').Snippet;
}
