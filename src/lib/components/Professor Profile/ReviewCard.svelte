<script lang="ts">
  import { goto } from "$app/navigation";

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
      <div class="pr-8 border-r-2">
        <div class="text-xl mb-2 px-1">Quality</div>
        <div class="flex justify-center items-center border-2 rounded-md h-16 mb-2">
          <span class="text-4xl">
            {review.rating}
          </span>
        </div>
      </div>
      
      <div class="w-full pr-2 pl-8">
        <div class="flex text-lg font-semibold justify-between mb-2">
          <span>{review.classNum}: {review.classTitle}</span>
          <span class="text-base">{new Date(review.createdAt).toLocaleDateString()}</span>
        </div>
        <p class="text-gray-400">{review.review}</p>
      </div>
    </div>
  </div>
</div>