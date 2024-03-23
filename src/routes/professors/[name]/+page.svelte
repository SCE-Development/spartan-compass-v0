<script lang="ts">
	import Courses from '$lib/components/Professor Profile/Courses.svelte';
	import Avatar from '$lib/components/Professor Profile/Avatar.svelte';
	import ReviewCard from '$lib/components/Professor Profile/ReviewCard.svelte';

	let { data } = $props();
	let { ratings } = $derived(data);
</script>

<div class="flex w-full flex-col items-center">
	<Avatar professor={data.professor} courses={data.courses} showCourse={false} />
	<div class="xl:w-3/4">
		<h2 class="my-4 ml-8 text-2xl font-semibold">{data.courses?.length} Courses</h2>
		<Courses courses={data.courses} />
		<h2 class="my-4 ml-8 text-2xl font-semibold">{ratings?.length} Reviews</h2>
		<div class="flex flex-wrap px-2">
			{#each ratings as review}
				<div class="mb-4 w-full px-2">
					<ReviewCard {review} />
				</div>
			{/each}
		</div>
	</div>
</div>
