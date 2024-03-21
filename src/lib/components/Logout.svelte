<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="/logout" use:enhance>
	<slot />
</form>
