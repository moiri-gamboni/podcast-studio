import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { describe, expect, test } from 'vitest';
import BookingEmbed from './BookingEmbed.svelte';

describe('BookingEmbed', () => {
	test('renders iframe with correct src', async () => {
		const { container } = render(BookingEmbed, {
			src: 'https://booking.example.com/widget',
			title: 'Réserver'
		});

		const iframe = container.querySelector('iframe');
		expect(iframe).not.toBeNull();
		expect(iframe!.getAttribute('src')).toBe('https://booking.example.com/widget');
	});

	test('has title attribute for accessibility', async () => {
		const { container } = render(BookingEmbed, {
			src: 'https://booking.example.com/widget',
			title: 'Réserver un créneau'
		});

		const iframe = container.querySelector('iframe');
		expect(iframe!.getAttribute('title')).toBe('Réserver un créneau');
	});

	test('has sandbox attribute', async () => {
		const { container } = render(BookingEmbed, {
			src: 'https://booking.example.com/widget',
			title: 'Réserver'
		});

		const iframe = container.querySelector('iframe');
		expect(iframe!.getAttribute('sandbox')).toBe(
			'allow-scripts allow-same-origin allow-forms allow-popups'
		);
	});

	test('fallback link is visible with correct href', async () => {
		render(BookingEmbed, {
			src: 'https://booking.example.com/widget',
			title: 'Réserver'
		});

		const link = page.getByRole('link', { name: /nouvel onglet/i });
		await expect.element(link).toBeVisible();
		expect(link.element().getAttribute('href')).toBe('https://booking.example.com/widget');
	});
});
