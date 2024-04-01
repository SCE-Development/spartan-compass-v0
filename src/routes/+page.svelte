<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	let { data } = $props();
	let user = $derived(data.user);
	let formData = $derived(data.form);
</script>

{#if user}
	<h1 class="my-8 flex w-full justify-center text-3xl">Logged in as {user.username}</h1>
{:else}
	<h1 class="my-8 flex w-full justify-center text-3xl">Not logged in</h1>
{/if}


