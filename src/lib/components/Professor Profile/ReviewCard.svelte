<script lang="ts">
	interface Review {
		id: number;
		userId: string;
		professorId: number;
		rating: number;
		courseId: number;
		review: string;
		createdAt: Date;
		classNum: string;
		classTitle: string | undefined;
	}

	let { review }: { review: Review } = $props();
</script>

<div class="card w-full bg-base-300 shadow-xl">
	<div class="card-body">
		<div class="flex">
			<div class="border-r-2 pr-8">
				<div class="mb-2 px-1 text-xl">Quality</div>
				<div class="mb-2 flex h-16 items-center justify-center rounded-md border-2">
					<span class="text-4xl">
						{review.rating}
					</span>
				</div>
			</div>

			<div class="w-full pl-8 pr-2">
				<div class="mb-2 flex justify-between text-lg font-semibold">
					<!-- could later turn this to anchor tag when course page is done -->
					<span>{review.classNum}: {review.classTitle}</span>
					<span class="text-base">{new Date(review.createdAt).toLocaleDateString()}</span>
				</div>
				<p class="text-gray-400">{review.review}</p>
			</div>
		</div>
	</div>
</div>
