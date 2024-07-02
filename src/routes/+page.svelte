<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import ProfessorSearch from '$lib/components/ProfessorSearch.svelte';
	let { data } = $props();
	let courses = $derived(data.allCourseData);
	let professors = $derived(data.allProfessorData);
	let professorForm = $derived(data.professorForm);
	let form = $derived(data.form);
</script>

<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
	<Search {courses} formData={form} />
	<ProfessorSearch {professors} formData={professorForm} />
</div>
