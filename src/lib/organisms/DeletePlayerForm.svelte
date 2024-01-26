<script>
	import { onMount } from 'svelte';
	import InputNoLabel from '$lib/atoms/input-NoLabel.svelte';

	onMount(async () => {
		// document.getElementById('DeletePlayer').value = 'Player name';
	});

	export let FormID, Method, Action;
</script>

<form id={FormID} method={Method} action={Action}>
	<h2>Delete Player</h2>
	<p>This player will be deleted, along with all the data thas is collected. </p>
	<div class="WarningContainer">
		<b>Warning:</b> This action is not reversible. Please be certain.
	</div>
	<p>Enter the Players name “Player name” to continue:</p>

	<InputNoLabel
		Type="text"
		ID="DeletePlayer"
		For="DeletePlayer"
		Text="Delete player"
		placeholder="Name of team"
		Required="required"

	/>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.WarningContainer{
		background-color: hsl(0, 90%, 80%);
		padding: 1rem;
		border-radius: .8rem;
		color: hsl(0, 90%, 30%);
	}

	p{
		font-size: 1rem;
		font-family: var(--secondary-font-family);
	}
</style>
