<script>
	import NavigationBar from '$lib/organisms/NavigationBar.svelte';
</script>

<header>
	<NavigationBar />
</header>

<div>
	<slot />
</div>

<style>
	@import '$lib/styles/global.css';

	:global(body) {
		display: grid;
		grid-template-columns: auto min-content;
		grid-template-areas: 'div header';
		background-color: var(--background-color);
		font-family: var(--primary-font-family);
	}

	header {
		position: sticky;
		top: 0;
		grid-area: header;
		padding: 1rem 1rem 1rem 0;
		height: 100vh;
		height: 100dvh;
	}

	div {
		display: contents;
		grid-area: div;
	}

	@media only screen and (max-width: 768px) {
		:global(body) {
			grid-template-columns: unset;
			grid-template-areas:
				'header'
				'div';
		}

		header{
			position: unset;
			height: fit-content;
			padding: 1rem;

		}
	}
</style>
