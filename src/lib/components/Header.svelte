<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import Login from '$lib/components/Login.svelte';
	import Logout from '$lib/components/Logout.svelte';
	import Search, { type Course } from '$lib/components/Search.svelte';
	import type { User } from 'lucia';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { SearchSchema } from '$lib/forms/schema';
	import { page } from '$app/stores';
	import { dev } from '$app/environment';

	type Props = {
		user: User | undefined;
		formData: SuperValidated<Infer<SearchSchema>>;
		courses: Course[];
	};

	let { user, formData, courses }: Props = $props();
</script>

<nav class="navbar mx-auto justify-between pt-4 md:px-6 xl:w-[75%]">
	<a href="/" class="btn btn-ghost text-2xl md:flex">Spartan Compass</a>
	<!-- eslint-disable-next-line svelte/valid-compile -->
	{#if $page.url.pathname !== '/'}
		<Search {courses} {formData} />
	{/if}
	<div class="menu menu-horizontal hidden gap-x-4 lg:flex">
		<a href="/account" class="btn btn-ghost btn-sm text-lg">My Account</a>
		{#if user}
			<Logout>
				<button type="submit" class="btn btn-accent btn-sm text-lg">Log Out</button>
			</Logout>
		{:else if dev}
			<a href="/dev-login" class="btn btn-ghost btn-sm text-lg">Dev Login</a>
		{:else}
			<Login>
				<button type="submit" class="btn btn-ghost btn-sm text-lg">Log In</button>
			</Login>
			<Login>
				<button type="submit" class="btn btn-accent btn-sm text-lg">Sign Up</button>
			</Login>
		{/if}
	</div>
	<div class="lg:hidden">
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost">
				<Menu />
			</div>
			<ul
				class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 outline outline-1 outline-accent/50"
			>
				<li><a href="/about" class="text-lg">About</a></li>
				{#if user}
					<Logout>
						<li>
							<button type="submit" class="text-lg">Log Out</button>
						</li>
					</Logout>
				{:else if dev}
					<a href="/dev-login" class="btn btn-ghost btn-sm text-lg">Dev Login</a>
				{:else}
					<div>
						<Login>
							<li>
								<button type="submit" class="text-lg">Log In</button>
							</li>
						</Login>
					</div>
					<div>
						<Login>
							<li>
								<a href="/login" class="text-lg">Sign Up</a>
							</li>
						</Login>
					</div>
				{/if}
			</ul>
		</div>
	</div>
</nav>
