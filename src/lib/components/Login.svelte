<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	// eslint-disable-next-line svelte/valid-compile
	let returnUrl = $page.url.pathname;
</script>

<form method="POST" action="/login" use:enhance>
	<input type="hidden" name="returnUrl" value={returnUrl} />
	<slot />
</form>
