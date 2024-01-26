<script>
	import Form from '$lib/organisms/NewPlayerForm.svelte';
	import Button from '$lib/atoms/button.svelte';
</script>

<main>
	<h1>New Player</h1>

	<h2 class="sub-header-left">Add player content</h2>

	<section>
		<Form FormID="FormID" Method="get" Action="/players" />
	</section>

	<footer><Button ButtonType="submit" Form="FormID" ButtonText="Save" /></footer>
</main>

<style>
	main {
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		grid-template-columns: 1fr;

		grid-template-areas:
			'h1'
			'h2'
			'form'
			'footer';
		column-gap: 2rem;
		row-gap: 1rem;
		padding: 4rem 4%;
		width: 100%;
		height: 100vh;
		height: 100svh;
	}

	h1 {
		grid-area: h1;
		font-size: 3rem;
	}

	h2 {
		grid-area: h2;
		font-size: 1.5rem;
	}

	section {
		grid-area: form;
		margin: -10px;
		padding: 10px;
		/* margin-right: 0; */
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}

	footer {
		grid-area: footer;
	}

	@media (pointer: fine) {
		section::-webkit-scrollbar-track {
			margin: 10px 0;
			border-radius: 10px;
		}

		section::-webkit-scrollbar {
			width: 12px;
		}

		section::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: #a7a7a7;
		}
	}

	@media only screen and (min-width: 850px) {

		main {
			grid-template-columns: repeat(3, 1fr);
			grid-template-areas:
				'h1 h1 h1'
				'h2 h2 h2'
				'form form .'
				'footer footer footer';
		}
	}

	@media only screen and (min-width: 1000px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
				'h1 h1'
				'h2 h2'
				'form .'
				'footer footer';
		}
	}
</style>
