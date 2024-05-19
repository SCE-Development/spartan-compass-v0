<script lang="ts">
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';

	let { data, children } = $props();
	let user = $derived(data.user);
	let courses = $derived(data.allCourseData);
	let formData = $derived(data.form);
</script>

<div data-theme="dracula">
	<Header {courses} {formData} {user} />
	{@render children()}
</div>
