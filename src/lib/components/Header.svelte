<script lang="ts">
	import { Menu } from 'lucide-svelte';

	import Login from '$lib/components/Login.svelte';
	import Logout from '$lib/components/Logout.svelte';
	import Search from '$lib/components/Search.svelte';

	let { user, formData } = $props();
</script>

<nav class="navbar mx-auto justify-between pt-4 md:px-6 xl:w-[75%]">
	<a href="/" class="btn btn-ghost text-2xl md:flex">Spartan Compass</a>
	<Search {formData} />

	<div class="menu menu-horizontal hidden gap-x-4 lg:flex">
		<a href="/about" class="btn btn-ghost btn-sm text-lg">About</a>
		{#if user}
			<Logout><button type="submit" class="btn btn-accent btn-sm text-lg">Log Out</button></Logout>
		{:else}
			<Login><button type="submit" class="btn btn-ghost btn-sm text-lg">Log In</button></Login>
			<Login><button type="submit" class="btn btn-accent btn-sm text-lg">Sign Up</button></Login>
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
					<li><Logout><button type="submit" class="text-lg">Log Out</button></Logout></li>
				{:else}
					<div>
						<li>
							<Login><button type="submit" class="text-lg">Log In</button></Login>
						</li>
					</div>
					<li><a href="/login" class="text-lg">Sign Up</a></li>
				{/if}
			</ul>
		</div>
	</div>
</nav>
