<script lang="ts">
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { data } = $props();
	let user = $derived(data.user);
	let courses = $derived(data.allCourseData);
	let formData = $derived(data.form);
</script>

<div data-theme="dracula">
	<Header {courses} {formData} {user} />
	<slot />
	<Footer />
</div>
