<script lang="ts">
	let { data } = $props();
	let { user } = $derived(data);
</script>

{#if user}
	<main>
		<h1 class="flex justify-center align-middle text-3xl">My Account</h1>
		<p class="flex justify-center align-middle text-lg">Welcome, {user.username}</p>
	</main>
{:else}
	<main>
		<h1 class="flex justify-center align-middle text-3xl">Please log in to view this page</h1>
	</main>
{/if}
