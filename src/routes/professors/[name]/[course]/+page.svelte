<script lang="ts">
	import Avatar from '$lib/components/Professor Profile/Avatar.svelte';

	let { data } = $props();
</script>

<Avatar professor={data.professor} courses={data.courses} showCourse={data.showCourse} />
