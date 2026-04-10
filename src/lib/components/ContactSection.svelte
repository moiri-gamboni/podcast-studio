<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { brand } from '$lib/config';
	import { enhance } from '$app/forms';

	interface FormResult {
		success?: boolean;
		errors?: Record<string, string>;
		values?: Record<string, string>;
	}

	let { form }: { form: FormResult | null } = $props();
</script>

<Section id="contact" label="Contact" title="Contactez-nous">
	<div class="mt-12 grid gap-12 md:grid-cols-2">
		<div>
			{#if form?.success}
				<div class="rounded-lg bg-green-900/20 p-6 text-green-300">
					<p class="font-semibold">Message envoyé</p>
					<p class="mt-2 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
				</div>
			{:else}
				<form method="POST" use:enhance>
					<div class="space-y-5">
						<div>
							<label for="nom" class="mb-1 block text-sm font-medium">Nom</label>
							<input
								id="nom"
								name="nom"
								type="text"
								required
								value={form?.values?.nom ?? ''}
								class="w-full rounded-lg border border-border bg-input px-4 py-2.5"
							/>
							{#if form?.errors?.nom}
								<p class="mt-1 text-sm text-red-400">{form.errors.nom}</p>
							{/if}
						</div>

						<div>
							<label for="email" class="mb-1 block text-sm font-medium">Email</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={form?.values?.email ?? ''}
								class="w-full rounded-lg border border-border bg-input px-4 py-2.5"
							/>
							{#if form?.errors?.email}
								<p class="mt-1 text-sm text-red-400">{form.errors.email}</p>
							{/if}
						</div>

						<div>
							<label for="telephone" class="mb-1 block text-sm font-medium">Téléphone</label>
							<input
								id="telephone"
								name="telephone"
								type="tel"
								value={form?.values?.telephone ?? ''}
								class="w-full rounded-lg border border-border bg-input px-4 py-2.5"
							/>
						</div>

						<div>
							<label for="sujet" class="mb-1 block text-sm font-medium">Sujet</label>
							<select
								id="sujet"
								name="sujet"
								class="w-full rounded-lg border border-border bg-input px-4 py-2.5"
							>
								<option value="">Choisir un sujet</option>
								<option value="reservation">Réservation</option>
								<option value="information">Demande d'information</option>
								<option value="partenariat">Partenariat</option>
								<option value="autre">Autre</option>
							</select>
						</div>

						<div>
							<label for="message" class="mb-1 block text-sm font-medium">Message</label>
							<textarea
								id="message"
								name="message"
								required
								rows="4"
								class="w-full rounded-lg border border-border bg-input px-4 py-2.5"
								>{form?.values?.message ?? ''}</textarea
							>
							{#if form?.errors?.message}
								<p class="mt-1 text-sm text-red-400">{form.errors.message}</p>
							{/if}
						</div>

						<div class="flex items-start gap-2">
							<input
								id="rgpd"
								name="rgpd"
								type="checkbox"
								required
								class="mt-1 rounded border-border"
							/>
							<label for="rgpd" class="text-sm text-muted-foreground">
								J'accepte que mes données soient traitées pour répondre à ma demande.
							</label>
						</div>
						{#if form?.errors?.rgpd}
							<p class="text-sm text-red-400">{form.errors.rgpd}</p>
						{/if}

						{#if form?.errors?.server}
							<p class="text-sm text-red-400">{form.errors.server}</p>
						{/if}

						<button
							type="submit"
							class="w-full rounded-lg bg-crimson-600 px-6 py-3 font-semibold text-white
								transition-colors hover:bg-crimson-700"
						>
							Envoyer
						</button>
					</div>
				</form>
			{/if}
		</div>

		<div class="space-y-6">
			<div>
				<h3 class="mb-2 text-lg font-semibold">Adresse</h3>
				<p class="text-muted-foreground">{brand.address}</p>
				<p class="text-muted-foreground">{brand.postalCode} {brand.city}</p>
			</div>

			<div>
				<h3 class="mb-2 text-lg font-semibold">Téléphone</h3>
				<a href="tel:{brand.phone}" class="text-crimson-500 hover:underline">{brand.phone}</a>
			</div>

			<div>
				<h3 class="mb-2 text-lg font-semibold">Email</h3>
				<a href="mailto:{brand.email}" class="text-crimson-500 hover:underline">{brand.email}</a>
			</div>

			<div class="aspect-video rounded-lg bg-muted" aria-label="Carte"></div>

			<div class="flex gap-4">
				<a
					href={brand.instagram}
					aria-label="Instagram"
					class="text-muted-foreground hover:text-crimson-500"
				>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
						/>
					</svg>
				</a>
				<a
					href={brand.linkedin}
					aria-label="LinkedIn"
					class="text-muted-foreground hover:text-crimson-500"
				>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
						/>
					</svg>
				</a>
				<a
					href={brand.youtube}
					aria-label="YouTube"
					class="text-muted-foreground hover:text-crimson-500"
				>
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</Section>
