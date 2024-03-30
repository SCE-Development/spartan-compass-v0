<script lang="ts">
	import CourseAvatar from '$lib/components/Course Page/CourseAvatar.svelte';
	let { data } = $props();
	let course = $derived(data.courseData);
	let reviews = $derived(data.reviewData);
	let professorsWithAverageRatings = $derived(data.professorsWithAverageRatings);
	$inspect(course)
	$inspect(professorsWithAverageRatings);
</script>

<CourseAvatar {course} />


