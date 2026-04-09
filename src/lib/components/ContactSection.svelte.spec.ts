import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { describe, expect, test } from 'vitest';
import ContactSection from './ContactSection.svelte';

describe('ContactSection', () => {
	test('all required fields present', async () => {
		render(ContactSection, { form: null });

		await expect.element(page.getByLabelText('Nom')).toBeVisible();
		await expect.element(page.getByLabelText('Email')).toBeVisible();
		await expect.element(page.getByLabelText('Message')).toBeVisible();
		await expect.element(page.getByRole('checkbox')).toBeVisible();
	});

	test('sujet select exists', async () => {
		render(ContactSection, { form: null });

		await expect.element(page.getByLabelText('Sujet')).toBeVisible();
	});

	test('error messages display when form prop has errors', async () => {
		render(ContactSection, {
			form: {
				errors: { nom: 'Le nom est requis', email: 'Email invalide' },
				values: { nom: '', email: 'bad' }
			}
		});

		await expect.element(page.getByText('Le nom est requis')).toBeVisible();
		await expect.element(page.getByText('Email invalide')).toBeVisible();
	});

	test('success message displays when form.success is true', async () => {
		render(ContactSection, { form: { success: true } });

		await expect.element(page.getByText('Message envoyé')).toBeVisible();
	});
});
