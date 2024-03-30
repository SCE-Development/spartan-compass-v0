<script lang="ts">
	import CourseAvatar from '$lib/components/Course Page/CourseAvatar.svelte';
	import Professors from '$lib/components/Course Page/Professors.svelte';
	import CourseReviews from '$lib/components/Course Page/CourseReviews.svelte';
	let { data } = $props();
	let course = $derived(data.courseData);
	let reviews = $derived(data.reviewData);
	let professors = $derived(data.professorsWithAverageRatings);
	$inspect(course);
	$inspect(professors);
</script>

<div class="flex w-full flex-col items-center">
	<CourseAvatar {course} />
	<div class="xl:w-3/4">
		{#if professors.length === 0}
			<div class="card w-full bg-base-300 shadow-xl">
				<div class="card-body">
					<div class="flex justify-center text-center">
						<p class="text-2xl text-gray-400">No professors or reviews yet</p>
					</div>
				</div>
			</div>
		{:else}
			<h2 class="my-4 ml-8 text-3xl font-semibold">
				{professors?.length}
				{professors?.length === 1 ? 'Professor' : 'Professors'}
			</h2>
			<Professors {professors} />
			<h2 class="my-4 ml-8 text-2xl font-semibold">
				{reviews?.length}
				{reviews?.length === 1 ? 'Review' : 'Reviews'}
			</h2>
			<CourseReviews {reviews} />
		{/if}
	</div>
</div>
