import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { describe, expect, test } from 'vitest';
import Section from './Section.svelte';

describe('Section', () => {
	test('renders label, title, and subtitle', async () => {
		render(Section, {
			label: 'Test Label',
			title: 'Test Title',
			subtitle: 'Test Subtitle'
		});

		await expect.element(page.getByText('Test Label')).toBeVisible();
		await expect.element(page.getByText('Test Title')).toBeVisible();
		await expect.element(page.getByText('Test Subtitle')).toBeVisible();
	});

	test('renders with id attribute for anchor linking', async () => {
		const { container } = render(Section, {
			id: 'test-section',
			title: 'Anchored'
		});

		const section = container.querySelector('#test-section');
		expect(section).not.toBeNull();
	});

	test('renders without optional props', async () => {
		const { container } = render(Section, {});

		const section = container.querySelector('section');
		expect(section).not.toBeNull();
	});

	test('applies dark text on light backgrounds', async () => {
		const { container } = render(Section, {
			bg: 'blush',
			title: 'Light BG'
		});

		const section = container.querySelector('section');
		expect(section?.className).toContain('bg-crimson-50');
		expect(section?.className).toContain('text-neutral-950');
	});

	test('applies light text on dark backgrounds', async () => {
		const { container } = render(Section, {
			bg: 'dark',
			title: 'Dark BG'
		});

		const section = container.querySelector('section');
		expect(section?.className).toContain('bg-background');
		expect(section?.className).toContain('text-foreground');
	});

	test('defaults to dark background', async () => {
		const { container } = render(Section, {
			title: 'Default BG'
		});

		const section = container.querySelector('section');
		expect(section?.className).toContain('text-foreground');
	});
});
