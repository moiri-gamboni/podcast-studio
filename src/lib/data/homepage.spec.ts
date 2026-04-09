import { describe, expect, test } from 'vitest';
import { heroStats, processSteps, pricingTiers, faqItems } from './homepage';

describe('homepage data', () => {
	describe('heroStats', () => {
		test('has exactly 3 items', () => {
			expect(heroStats).toHaveLength(3);
		});

		test('each stat has non-empty value and label', () => {
			for (const stat of heroStats) {
				expect(stat.value.trim()).not.toBe('');
				expect(stat.label.trim()).not.toBe('');
			}
		});
	});

	describe('processSteps', () => {
		test('has exactly 4 items', () => {
			expect(processSteps).toHaveLength(4);
		});

		test('each step has non-empty title and description', () => {
			for (const step of processSteps) {
				expect(step.title.trim()).not.toBe('');
				expect(step.description.trim()).not.toBe('');
			}
		});
	});

	describe('pricingTiers', () => {
		test('has exactly 3 items', () => {
			expect(pricingTiers).toHaveLength(3);
		});

		test('exactly one tier is highlighted', () => {
			const highlighted = pricingTiers.filter((t) => t.highlighted);
			expect(highlighted).toHaveLength(1);
		});

		test('each tier has non-empty required fields and at least one feature', () => {
			for (const tier of pricingTiers) {
				expect(tier.name.trim()).not.toBe('');
				expect(tier.price.trim()).not.toBe('');
				expect(tier.unit.trim()).not.toBe('');
				expect(tier.cta.trim()).not.toBe('');
				expect(tier.features.length).toBeGreaterThan(0);
			}
		});
	});

	describe('faqItems', () => {
		test('is non-empty', () => {
			expect(faqItems.length).toBeGreaterThan(0);
		});

		test('each item has non-empty question and answer', () => {
			for (const item of faqItems) {
				expect(item.question.trim()).not.toBe('');
				expect(item.answer.trim()).not.toBe('');
			}
		});
	});
});
