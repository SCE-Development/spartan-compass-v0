<script lang="ts">
    import CourseReviewCard from './CourseReviewCard.svelte';

    interface ProfessorReview {
		professorName: string;
		courseNumber: number;
		subject: string;
		userId: string;
		professorId: number;
		rating: number;
		review: string;
		courseId: number;
		createdAt: Date;
	}

	let { reviews }: { reviews: ProfessorReview[] } = $props();
</script>

<div class="flex flex-wrap px-2">
    {#each reviews as review}
        <div class="mb-4 w-full px-2">
            <CourseReviewCard {review} />
        </div>
    {/each}
</div>