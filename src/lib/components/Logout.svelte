<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="?/logout" use:enhance class="m-32 flex justify-center">
	<button class="btn" type="submit" name="action" value="logout">Log Out</button>
</form>
