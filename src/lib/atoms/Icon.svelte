<script>
	import HomeIcon from '$lib/atoms/HomeIcon.svelte';
	import PlayersIcon from '$lib/atoms/PlayersIcon.svelte';
	import TeamsIcon from '$lib/atoms/TeamsIcon.svelte';
	import TournamentsIcon from '$lib/atoms/TournamentsIcon.svelte';
	import LiveIcon from '$lib/atoms/LiveIcon.svelte';

	export let name;
</script>

{#if name === 'home'}
	<HomeIcon />
{/if}

{#if name === 'players'}
	<PlayersIcon />
{/if}

{#if name === 'teams'}
	<TeamsIcon />
{/if}

{#if name === 'tournaments'}
	<TournamentsIcon />
{/if}

{#if name === 'live'}
	<LiveIcon />
{/if}
