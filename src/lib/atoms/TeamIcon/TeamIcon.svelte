<script>
	import Team1 from '$lib/atoms/TeamIcon/Team-1-icon.svelte';


	export let name;
</script>

{#if name === 'Clubname'}
	<Team1 />
{/if}

