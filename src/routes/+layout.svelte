<script lang="ts">
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';

	let { data } = $props();
	let user = $derived(data.user);
	let formData = $derived(data.form);
</script>

<div data-theme="dracula">
	<Header {user} {formData} />
	<slot />
</div>
