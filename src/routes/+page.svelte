<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import Logout from '$lib/components/Logout.svelte';

	let { data } = $props();
	let user = $derived(data.user);
</script>

{#if data?.loggedIn}
	<h1 class="mt-8 flex w-full justify-center text-3xl">Logged in as {user.username}</h1>
	<Logout />
{:else}
	<h1 class="mt-8 flex w-full justify-center text-3xl">Not logged in</h1>
	<Login />
{/if}
