<script lang="ts">
	let { data, form } = $props();
	let courses = $derived(data.courseData);
</script>

<div>hi</div>

<!-- {#if form?.professors}
	<Table professors={form.professors} />
{/if} -->
