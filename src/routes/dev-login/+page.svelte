<script lang="ts">
	import { enhance } from '$app/forms';

	import { toast } from 'svelte-sonner';
</script>

<main class="flex min-h-screen flex-col items-center pt-64">
	<div class="rounded-lg-100 w-full max-w-md space-y-8 bg-base-300 p-8 shadow-lg">
		<h1 class="text-center text-4xl font-bold">Dev Login</h1>
		<form
			method="post"
			class="space-y-4"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'failure') {
						toast.error(result.data?.error as string);
					}
					if (result.type ==="redirect") {
						toast.success('Created account')
						window.location = result.location
					}
				};
			}}
		>
			<label class="block text-sm font-medium" for="email">Email</label>
			<input
				id="email"
				class="input input-secondary mt-1 w-full"
				type="email"
				name="email"
				placeholder="Enter your email"
				required
			/>
			<button class="btn btn-secondary mt-4 w-full" type="submit">Log In</button>
		</form>
	</div>
</main>
