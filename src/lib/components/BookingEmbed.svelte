<script lang="ts">
	let { src, title }: { src: string; title: string } = $props();

	function isValidMessage(data: unknown): data is { type: string } {
		return typeof data === 'object' && data !== null && 'type' in data;
	}

	$effect(() => {
		const expectedOrigin = new URL(src).origin;

		function onMessage(event: MessageEvent) {
			if (event.origin !== expectedOrigin) return;
			try {
				if (!isValidMessage(event.data)) return;
			} catch {
				// ignore malformed messages
			}
		}

		window.addEventListener('message', onMessage);
		return () => window.removeEventListener('message', onMessage);
	});
</script>

<div>
	<iframe
		{src}
		{title}
		sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
		loading="lazy"
		class="min-h-[600px] w-full border-0"
	></iframe>
	<p class="mt-4 text-center text-sm">
		<a href={src} target="_blank" rel="noopener noreferrer" class="text-crimson-500 underline">
			Ouvrir dans un nouvel onglet
		</a>
	</p>
</div>
