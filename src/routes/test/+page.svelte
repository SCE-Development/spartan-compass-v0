<script lang="ts">
	import Search from '$lib/components/test/Search.svelte';
	import Table from '$lib/components/test/Table.svelte';

	let { data, form } = $props();
	let courses = $derived(data.courseData);
</script>

<Search {courses} />

{#if form?.professors}
	<Table professors={form.professors} />
{/if}
