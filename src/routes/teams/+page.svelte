<script>
	import Link from '$lib/atoms/Link.svelte';
	import TeamCard from '$lib/molecules/TeamCard.svelte';
	import Input from '$lib/atoms/input-NoLabel.svelte';
</script>

<main>
	<h1>All Teams</h1>

	<h2 class="sub-header-left">Add and change teams</h2>
	<div class="search">
		<Input Type="text" ID="SearchTeam" For="SearchTeam" Text="Search" placeholder="search" />
	</div>
	<div class="NewTeams">
		<Link severity="primary-button" Routing="teams/new" Text="+ New team" />
	</div>
	<div class="CardContainer">
		<ul>
			<TeamCard />
		</ul>
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-rows: auto auto auto 1fr;
		grid-template-columns: 1fr;
		grid-template-areas:
			'h1 h1'
			'NewTeams NewTeams'
			'h2 h2'
			'search search'
			'CartContainer CartContainer';
		row-gap: 1rem;
		transition: all 0.3s ease-in-out;
		padding: 2rem 4%;
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

	.CardContainer {
		grid-area: CartContainer;
		margin: -3px -10px -10px -10px;
		padding: 3px 10px 10px 10px;
		/* margin-right: 0; */
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.NewTeams {
		display: flex;
		grid-area: NewTeams;
		align-items: center;
		height: 100%;
	}

	.search {
		grid-area: search;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		/* grid-template-columns: auto; */
		gap: 1rem;

		height: fit-content;
	}

	@media (pointer: fine) {
		.CardContainer::-webkit-scrollbar-track {
			margin: 10px 0;
			border-radius: 10px;
		}

		.CardContainer::-webkit-scrollbar {
			width: 12px;
		}

		.CardContainer::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: #a7a7a7;
		}
	}

	@media only screen and (min-width: 450px) {
		ul {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media only screen and (min-width: 660px) {
		main {
			grid-template-columns: 1fr 1fr;
			grid-template-areas:
				'h1 h1'
				'h2 h2'
				'search NewTeams'
				'CartContainer CartContainer';
			column-gap: 2rem;
			padding: 4rem 4%;
		}

		.NewTeams {
			justify-content: flex-end;
		}
	}

	@media only screen and (min-width: 500px) {
		ul {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media only screen and (min-width: 650px) {
		ul {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media only screen and (min-width: 750px) {
		ul {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media only screen and (min-width: 1050px) {
		ul {
			grid-template-columns: repeat(5, 1fr);
		}
	}

	@media only screen and (min-width: 1250px) {
		ul {
			grid-template-columns: repeat(6, 1fr);
		}
	}

	@media only screen and (min-width: 1550px) {
		ul {
			grid-template-columns: repeat(7, 1fr);
		}
	}
</style>
