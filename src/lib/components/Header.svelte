<script lang="ts">
	import { tick } from 'svelte';
	import { slide } from 'svelte/transition';

	import { Menu, Search } from 'lucide-svelte';

	import Login from '$lib/components/Login.svelte';
	import Logout from '$lib/components/Logout.svelte';

	let { user } = $props();

	let showSearch = $state(false);
	let searchBox: HTMLInputElement | undefined = $state();

	async function toggleSearch() {
		showSearch = !showSearch;
		if (showSearch && searchBox) {
			await tick();
			searchBox.focus();
		}
	}
</script>

<nav class="navbar mx-auto place-content-between pt-4 md:px-6 xl:w-[75%]">
	{#if !showSearch}
		<a href="/" class="btn btn-ghost text-2xl">Spartan Compass</a>
	{:else}
		<input
			type="text"
			placeholder="Type here"
			class="input input-bordered input-accent mx-4 h-10 w-full"
			bind:this={searchBox}
			in:slide={{ duration: 300 }}
		/>
	{/if}

	<label
		class="input input-bordered input-accent mt-1 flex hidden h-10 w-[35%] place-content-between md:flex"
	>
		<input type="text" placeholder="Search" />
		<Search />
	</label>

	<div class="menu menu-horizontal hidden gap-x-4 lg:flex">
		<a href="/about" class="btn btn-ghost btn-sm text-lg">About</a>
		{#if user}
			<Logout><button type="submit" class="btn btn-accent btn-sm text-lg">Log Out</button></Logout>
		{:else}
			<Login><button type="submit" class="btn btn-ghost btn-sm text-lg">Log In</button></Login>
			<Login><button type="submit" class="btn btn-accent btn-sm text-lg">Sign Up</button></Login>
		{/if}
	</div>
	<div>
		<div class="md:hidden">
			<button class="btn btn-ghost" on:click={toggleSearch}><Search /> </button>
		</div>

		<div class="dropdown dropdown-end lg:hidden">
			<div tabindex="0" role="button" class="btn btn-ghost">
				<Menu />
			</div>
			<ul
				class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 outline outline-1 outline-accent/50"
			>
				<li><a href="/about" class="text-lg">About</a></li>
				{#if user}
					<li><a href="/logout" class="text-lg">Log Out</a></li>
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
