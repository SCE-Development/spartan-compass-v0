<script lang="ts">
	import Courses from '$lib/components/Professor Profile/Courses.svelte';
	import Avatar from '$lib/components/Professor Profile/Avatar.svelte';
	import ReviewCard from '$lib/components/Professor Profile/ReviewCard.svelte';

	let { data } = $props();
</script>

<div class="flex w-full flex-col items-center">
	<Avatar professor={data.professor} courses={data.courses} showCourse={false} />
	<div class="xl:w-3/4">
		<h2 class="my-4 ml-8 text-2xl font-semibold">
			{data.courses?.length}
			{data.courses?.length === 1 ? 'Course' : 'Courses'}
		</h2>
		<Courses courses={data.courses} />
		<h2 class="my-4 ml-8 text-2xl font-semibold">
			{data.ratings?.length}
			{data.ratings?.length === 1 ? 'Review' : 'Reviews'}
		</h2>
		<div class="flex flex-wrap px-2">
			{#each data.ratings as review}
				<div class="mb-4 w-full px-2">
					<ReviewCard {review} />
				</div>
			{/each}
		</div>
	</div>
</div>
