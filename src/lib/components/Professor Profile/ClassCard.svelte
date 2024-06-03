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

<div class="w-full shadow-xl card bg-base-300">
	<div class="card-body">
		<div class="flex items-center justify-between">
			<div>
				<div class="text-lg font-semibold">
					{course.subject}-{course.courseNumber}: {course.title}
				</div>
				<p class="text-gray-400">{course.description}</p>
			</div>

			<div class="ml-4">
				<div class="flex items-center justify-center h-16 mb-2 border-2 rounded-md">
					<span class="text-4xl">
						{course.averageRating ? course.averageRating : 'N/A'}
					</span>
				</div>
				<!-- eslint-disable -->
				<button
					class="btn btn-secondary btn-sm"
					onclick={() => goto(`${$page.url.pathname}/${course.subject}-${course.courseNumber}`)}
				>
					Reviews
				</button>
				<!-- eslint-enable -->
			</div>
		</div>
	</div>
</div>
