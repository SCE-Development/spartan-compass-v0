<script lang="ts">
	let { data, form } = $props();
	console.log(data);
	let course = $derived(data.courseData);
	let reviews = $derived(data.reviewData);
	$inspect(course);
	$inspect(reviews);
</script>

<div>{course.id}</div>
<div>{course.title}</div>
<div>{course.subject}</div>
<div>{course.courseNumber}</div>
<div>{course.description}</div>

<table class="table">
	<tbody>
		{#each reviews as review, i}
			<tr>
				<th>{i + 1}</th>
				<td> {review.professorName}</td>
				<td>{review.rating}</td>
				<td>{review.review}</td>
			</tr>
		{/each}
	</tbody>
</table>
