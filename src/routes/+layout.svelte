<script lang="ts">
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';

	let { data } = $props();
	let user = $derived(data.user);
</script>

<div data-theme="dracula">
	<Header {user} />
	<slot />
</div>
