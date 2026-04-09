import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { describe, expect, test } from 'vitest';
import FaqAccordion from './FaqAccordion.svelte';

const items = [
	{ question: 'Quelle est la durée minimum ?', answer: 'Une heure minimum par session.' },
	{ question: 'Le matériel est-il fourni ?', answer: 'Oui, tout le matériel est inclus.' },
	{ question: 'Peut-on annuler ?', answer: 'Annulation gratuite 48h avant.' }
];

describe('FaqAccordion', () => {
	test('only one item open at a time', async () => {
		render(FaqAccordion, { items });

		const buttons = page.getByRole('button');
		const firstButton = buttons.nth(0);
		const secondButton = buttons.nth(1);

		await firstButton.click();
		await expect.element(firstButton).toHaveAttribute('aria-expanded', 'true');
		await expect.element(secondButton).toHaveAttribute('aria-expanded', 'false');

		await secondButton.click();
		await expect.element(firstButton).toHaveAttribute('aria-expanded', 'false');
		await expect.element(secondButton).toHaveAttribute('aria-expanded', 'true');
	});

	test('clicking open item closes it', async () => {
		render(FaqAccordion, { items });

		const firstButton = page.getByRole('button').nth(0);

		await firstButton.click();
		await expect.element(firstButton).toHaveAttribute('aria-expanded', 'true');

		await firstButton.click();
		await expect.element(firstButton).toHaveAttribute('aria-expanded', 'false');
	});

	test('aria-expanded toggles correctly', async () => {
		render(FaqAccordion, { items });

		const buttons = page.getByRole('button');
		for (let i = 0; i < items.length; i++) {
			await expect.element(buttons.nth(i)).toHaveAttribute('aria-expanded', 'false');
		}

		await buttons.nth(1).click();
		await expect.element(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
		await expect.element(buttons.nth(1)).toHaveAttribute('aria-expanded', 'true');
		await expect.element(buttons.nth(2)).toHaveAttribute('aria-expanded', 'false');
	});

	test('chevron rotates on open', async () => {
		const { container } = render(FaqAccordion, { items });

		const firstButton = page.getByRole('button').nth(0);
		const chevron = () => container.querySelectorAll('svg')[0];

		expect(chevron()?.classList.contains('rotate-180')).toBe(false);

		await firstButton.click();
		expect(chevron()?.classList.contains('rotate-180')).toBe(true);
	});
});
