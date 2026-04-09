import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { describe, expect, test } from 'vitest';
import Footer from './Footer.svelte';

describe('Footer', () => {
	test('renders legal links', async () => {
		render(Footer);

		await expect.element(page.getByRole('link', { name: /Mentions l[ée]gales/i })).toBeVisible();
		await expect.element(page.getByRole('link', { name: /CGV/i })).toBeVisible();
		await expect.element(page.getByRole('link', { name: /Confidentialit[ée]/i })).toBeVisible();
	});

	test('renders social links', async () => {
		render(Footer);

		await expect.element(page.getByRole('link', { name: /Instagram/i })).toBeVisible();
		await expect.element(page.getByRole('link', { name: /LinkedIn/i })).toBeVisible();
		await expect.element(page.getByRole('link', { name: /YouTube/i })).toBeVisible();
	});

	test('renders copyright with current year', async () => {
		render(Footer);

		const year = new Date().getFullYear().toString();
		await expect.element(page.getByText(new RegExp(year))).toBeVisible();
	});

	test('renders brand name', async () => {
		render(Footer);

		await expect.element(page.getByText(/STUDIO_NAME/, { exact: true }).first()).toBeVisible();
	});
});
