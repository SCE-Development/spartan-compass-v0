<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
</script>

<form method="POST" action="/login" use:enhance>
	<input type="hidden" name="returnUrl" value={get(page).url.pathname} />
	<slot />
</form>
