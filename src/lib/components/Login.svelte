<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="/login" use:enhance>
	<slot />
</form>
