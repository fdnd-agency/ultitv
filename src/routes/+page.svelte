
<main>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a href="/tournaments" class="currentTournament">
		<h2>Current Tournament</h2>
		<p class="subtitle-small">Check the current tournaments</p>
	</a>

	<!-- svelte-ignore a11y-missing-attribute -->
	<a href="/" class="createTournament">
		<h2>Create Tournament</h2>
		<p class="subtitle-small">Create your tournament</p>
	</a>

	<!-- svelte-ignore a11y-missing-attribute -->
	<a href="/players/new" class="createPlayer">
		<h3>Create Player</h3>
		<p class="subtitle-small">Create your players</p>
	</a>

	<!-- svelte-ignore a11y-missing-attribute -->
	<a href="/teams/new" class="createTeam">
		<h3>Create Team</h3>
		<p class="subtitle-small">Create your team</p>
	</a>

	<!-- svelte-ignore a11y-missing-attribute -->
	<a href="/" class="completedTournaments">
		<h2>Completed Tournaments</h2>
		<p class="subtitle-small">View the completed tournaments</p>
	</a>

	<img class="frisbee" src="../images/frisbee.png" alt="frisbee" />
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-areas:
			'currentTournament'
			'completedTournaments'
			'createTournament'
			'createTeam'
			'createPlayer'
			'frisbee';
		gap: 1rem;
		padding: 2rem;
		width: 100%;
		height: 100dvh;
	}

	@media (pointer: fine) {
		main::-webkit-scrollbar-track {
			border-radius: 10px;
			margin: 2rem 0;
		}

		main::-webkit-scrollbar {
			width: 12px;
		}

		main::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: #a7a7a7;
		}
	}

	a {
		transition: all 0.3s ease-in-out;
		transition: padding 0.3s ease-in-out;
		box-shadow: var(--box-shadow);
		border-radius: 15px;
		background-color: white;
		padding: 1rem;
		text-decoration: none;
	}

	.createPlayer {
		grid-area: createPlayer;
		background-color: hsl(160, 100%, 95%);
	}

	.createTeam {
		grid-area: createTeam;
		background-color: hsl(160, 100%, 95%);
	}

	.createTournament {
		grid-area: createTournament;
		background-color: hsl(160, 100%, 95%);
	}

	.completedTournaments {
		grid-area: completedTournaments;
		background-color: hsl(0, 0%, 100%);
	}

	.currentTournament {
		grid-area: currentTournament;
		background-color: hsl(231, 100%, 92%);
	}

	.currentTournament:is(:hover, :focus) {
		background-color: hsl(231, 100%, 87%);
	}

	.completedTournaments:is(:hover, :focus) {
		background-color: hsl(0, 0%, 95%);
	}

	.createTournament:is(:hover, :focus),
	.createTeam:is(:hover, :focus),
	.createPlayer:is(:hover, :focus) {
		background-color: hsl(160, 100%, 90%);
	}

	.frisbee {
		grid-area: frisbee;
		box-shadow: var(--box-shadow);
		border-radius: 25px;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media only screen and (min-width: 750px) {
		main {
			display: grid;
			grid-template-rows: 1fr 1fr 1fr;
			grid-template-columns: 1fr 1fr;
			grid-template-areas:
				' currentTournament currentTournament'
				' completedTournaments completedTournaments'
				' createTournament createTournament'
				' createTeam  createPlayer'
				' frisbee frisbee';
			gap: 2rem;
			padding: 2rem;
		}

		a {
			border-radius: 25px;
			padding: 1.5rem 2.5rem;
		}
	}
	@media only screen and (min-width: 1100px) {
		main {
			display: grid;
			grid-template-rows: 1fr 1fr 1fr;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-areas:
				'currentTournament currentTournament currentTournament frisbee'
				'createTournament createTournament completedTournaments completedTournaments'
				'createTeam createPlayer completedTournaments completedTournaments';
			gap: 2rem;
			padding: 2rem;
		}
		a {
			border-radius: 25px;
			padding: 1.5rem 2.5rem;
		}
	}
</style>
