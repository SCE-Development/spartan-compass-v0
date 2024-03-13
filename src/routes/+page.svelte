<script lang='ts'>
  import Login from '$lib/components/Login.svelte';
  import Logout from '$lib/components/Logout.svelte';

  let { data } = $props();
  let user = $derived(data.user);
</script>

{#if data?.loggedIn}
  <h1 class="text-3xl w-full flex justify-center mt-8">Logged in as {user.username}</h1>
  <Logout />
{:else}
  <h1 class="text-3xl w-full flex justify-center mt-8">Not logged in</h1>
  <Login />
{/if}