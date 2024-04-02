<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	interface ExtendedCourse {
		id: number;
		title: string;
		subject: string;
		courseNumber: number;
		description: string | null;
		averageRating?: number;
	}

	let { course }: { course: ExtendedCourse } = $props();
</script>

<div class="card w-full bg-base-300 shadow-xl">
	<div class="card-body">
		<div class="flex items-center justify-between">
			<div>
				<div class="text-lg font-semibold">
					{course.subject}-{course.courseNumber}: {course.title}
				</div>
				<p class="text-gray-400">{course.description}</p>
			</div>

			<div class="ml-4">
				<div class="mb-2 flex h-16 items-center justify-center rounded-md border-2">
					<span class="text-4xl">
						{course.averageRating ? course.averageRating : 'N/A'}
					</span>
				</div>
				<!-- eslint-disable -->
				<button
					class="btn btn-secondary btn-sm"
					on:click={() => goto(`${$page.url.pathname}/${course.subject}-${course.courseNumber}`)}
				>
					Reviews
				</button>
				<!-- eslint-enable -->
			</div>
		</div>
	</div>
</div>
