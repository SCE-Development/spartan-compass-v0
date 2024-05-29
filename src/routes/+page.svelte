<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import ProfessorSearch from '$lib/components/ProfessorSearch.svelte';
	let { data } = $props();
	let courses = $derived(data.allCourseData);
	let form = $derived(data.form);
	let professors = $derived(data.professorData);
	let profForm = $derived(data.profForm);
</script>

<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
	<Search {courses} formData={form} />
	<ProfessorSearch {professors} profFormData={profForm} />
</div>
