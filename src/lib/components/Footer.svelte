<script lang="ts">
	import { brand, nav } from '$lib/config';
</script>

<footer class="bg-neutral-950 text-foreground">
	<div class="container py-16">
		<div class="grid gap-12 md:grid-cols-4">
			<!-- Brand -->
			<div>
				<p class="font-display text-xl font-bold tracking-wide uppercase">{brand.name}</p>
				<p class="mt-2 text-muted-foreground">{brand.tagline}</p>
			</div>

			<!-- Navigation -->
			<div>
				<h3 class="mb-4 text-sm font-semibold tracking-widest uppercase">Navigation</h3>
				<ul class="space-y-2">
					{#each nav as item}
						<li>
							<a
								href={item.href}
								class="text-muted-foreground transition-colors hover:text-crimson-500"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h3 class="mb-4 text-sm font-semibold tracking-widest uppercase">Contact</h3>
				<ul class="space-y-2 text-muted-foreground">
					<li>{brand.address}</li>
					<li>{brand.postalCode} {brand.city}</li>
					<li>
						<a href="tel:{brand.phone}" class="transition-colors hover:text-crimson-500">
							{brand.phone}
						</a>
					</li>
					<li>
						<a href="mailto:{brand.email}" class="transition-colors hover:text-crimson-500">
							{brand.email}
						</a>
					</li>
				</ul>
			</div>

			<!-- Social -->
			<div>
				<h3 class="mb-4 text-sm font-semibold tracking-widest uppercase">Suivez-nous</h3>
				<ul class="space-y-2">
					<li>
						<a
							href={brand.instagram}
							target="_blank"
							rel="noopener noreferrer"
							class="text-muted-foreground transition-colors hover:text-crimson-500"
						>
							Instagram
						</a>
					</li>
					<li>
						<a
							href={brand.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							class="text-muted-foreground transition-colors hover:text-crimson-500"
						>
							LinkedIn
						</a>
					</li>
					<li>
						<a
							href={brand.youtube}
							target="_blank"
							rel="noopener noreferrer"
							class="text-muted-foreground transition-colors hover:text-crimson-500"
						>
							YouTube
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Bottom bar -->
	<div class="border-t border-border/30">
		<div class="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
			<div class="flex gap-6 text-sm text-muted-foreground">
				<a href="/mentions-legales" class="transition-colors hover:text-crimson-500">
					Mentions l&eacute;gales
				</a>
				<a href="/cgv" class="transition-colors hover:text-crimson-500">CGV</a>
				<a href="/confidentialite" class="transition-colors hover:text-crimson-500">
					Confidentialit&eacute;
				</a>
			</div>
			<p class="text-sm text-muted-foreground">
				&copy; {new Date().getFullYear()}
				{brand.name}. Tous droits r&eacute;serv&eacute;s.
			</p>
		</div>
	</div>
</footer>
