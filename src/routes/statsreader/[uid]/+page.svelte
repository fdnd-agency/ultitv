<script>
	import PlayersList from '$lib/organisms/PlayersList.svelte';
	import { Fullscreen, Timeline } from '$lib';
	import { page } from '$app/stores';

	export let data;

	const { match, statistics } = data;

	const isActiveTab = (tab) => {
		return $page.url.hash === tab || $page.url.hash == '';
	};

	//FUNCTION FOR SELECTING THE TEAM TO ADD POINTS TO
	let activeTeam = match.team_a.name;

	function selectTeam(team) {
		activeTeam = team;
	}
</script>

<Fullscreen>
	<main class="page">
		<header class="page__header">
			<h1>Commentator Dashboard</h1>
		</header>

		<div class="page__content">
			<section class="statistics">
				<header class="statistics__header">
					<h2>Statistics</h2>
				</header>

				<div class="statistics__content">
					<section class="status">
						<h3>Match status</h3>

						<p>LIVE</p>
						<p>Mixed | 2 | Arena | Finale</p>
					</section>
					<section class="scoreboard">
						<h3>Scoreboard</h3>

						<article>
							<img alt="" height="64" width="64" />
							<h4>{match.team_a.name}</h4>
						</article>
						<p>0 <span class="dash">-</span> 0</p>
						<article>
							<img alt="" height="64" width="64" />
							<h4>{match.team_b.name}</h4>
						</article>
					</section>

					<nav>
						<ul>
							<li><a href="#info" class:active={$page.url.hash === '#info'}>Info</a></li>
							<li><a href="#resume" class:active={$page.url.hash === '#resume'}>Resume</a></li>
							<li>
								<a href="#statistics" class:active={$page.url.hash === '#statistics'}>Statistics</a>
							</li>
						</ul>
					</nav>

					{#if isActiveTab('#statistics')}
						<Timeline {statistics} />
					{/if}
				</div>
			</section>

			{#if isActiveTab('#info')}
				<section class="switch-team">
					<h3>Match information</h3>
					<button
						class="select-team-button"
						class:selected-team={activeTeam === match.team_a.name}
						on:click={() => selectTeam(match.team_a.name)}>{match.team_a.name}</button
					>
					<button
						class="select-team-button"
						class:selected-team={activeTeam === match.team_b.name}
						on:click={() => selectTeam(match.team_b.name)}>{match.team_b.name}</button
					>
				</section>

				<section class="team" data-selected={activeTeam === match.team_a.name}>
					<header class="team__header">
						<h2>
							<img alt="" height="32" width="32" />
							<span>{match.team_a.name}</span>
						</h2>

						<p>{match.team_a.country.name} | City</p>
					</header>

					<div class="team__content">
						<!-- <pre>{JSON.stringify(match.team_a, null, 2)}</pre> -->
						<PlayersList players={match.team_a.players} match={match.id} team={match.team_a.id} />
					</div>
				</section>

				<section class="team" data-selected={activeTeam === match.team_b.name}>
					<header class="team__header">
						<h2>
							<img alt="" height="32" width="32" />
							<span>{match.team_b.name}</span>
						</h2>

						<p>{match.team_b.country.name} | City</p>
					</header>

					<div class="team__content">
						<!-- <pre>{JSON.stringify(match.team_b, null, 2)}</pre> -->
						<PlayersList
							players={match.team_b.players}
							match={match.id}
							team={match.team_b.id}
							reversed={true}
						/>
					</div>
				</section>
			{/if}
		</div>
	</main>
</Fullscreen>

<style>
	main {
		font-size: 12px;
	}
	.page {
		height: 100dvh;
		/* font-size: 0.75rem; */
	}

	/* Inclusively Hidden */
	.page__header,
	.statistics__header,
	.status h3,
	.view-switcher h3,
	.scoreboard h3 {
		clip: rect(0 0 0 0);
		position: absolute;
		clip-path: inset(50%);
		width: 1px;
		height: 1px;
		overflow: hidden;
		white-space: nowrap;
	}

	.page__content {
		--grid-columns: 1;
		display: grid;
		grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
		grid-template-areas:
			'statistics'
			'team_a'
			'team_b';
		flex: 1;
		gap: 1em;
		padding: 1rem;
		height: 100%;
	}
	.team:first-of-type {
		grid-area: team_a;
	}
	.team:last-of-type {
		grid-area: team_b;
	}

	nav {
		border: 1px solid white;
		border-radius: 0.5rem;
		background: white;
		padding: 1em;
	}
	nav ul {
		display: flex;
		flex-direction: row;
		gap: 2em;
		list-style: none;
	}

	nav ul li a {
		color: #b1bbdd;
		text-decoration: none;
	}

	nav ul li a.active {
		color: #444d7b;
		font-weight: bold;
	}

	.switch-team {
		border: 1px solid white;
		border-radius: 0.5rem;
		background: white;
		padding: 1em;
	}

	.switch-team h3 {
		padding: 0.6em 0;
		font-weight: 700;
		font-size: 13px;
		text-transform: uppercase;
	}

	.switch-team .select-team-button {
		border: #444d7b 1px solid;
		border-radius: 25px;
		background: white;
		padding: 0.3em 1em;
		color: #444d7b;
		font-weight: 700;
	}

	.switch-team .select-team-button.selected-team {
		background: #444d7b;
		color: white;
	}

	.team {
		display: none;
		flex-flow: column nowrap;
		gap: 0.5em;
	}

	.team[data-selected='true'] {
		display: flex;
	}

	.team__header {
		grid-area: team_header;
		margin-bottom: 0px;
	}

	.scoreboard,
	.team__header {
		display: flex;
		border: 1px solid white;
		border-radius: 0.5rem;
		background: white;
		padding: 1em;
	}

	.team__header h2,
	.team__header p,
	.statistics__header h2 {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.125rem;
	}

	.team:last-child .team__header h2,
	.team:last-child .team__header p {
		flex-flow: row-reverse;
	}

	.team__content {
		flex: 1;
	}

	.statistics {
		display: flex;
		grid-area: statistics;
		flex-flow: column nowrap;
	}

	.statistics__content {
		display: flex;
		flex: 1;
		flex-flow: column nowrap;
		gap: 1em;
	}

	.statistics__content p {
		color: var(--primary-font-color);
		font-family: var(--secondary-font-family);
	}

	.status {
		display: flex;
		justify-content: space-between;
		gap: 1em;
	}

	.status p:nth-of-type(1) {
		position: relative;
		border: 1px solid #ef1111;
		border-radius: 0.5rem;
		background: #ef1111;
		padding: 1em;
		padding-left: 2em;
		color: white;
	}
	.status p:nth-of-type(1)::after {
		--size: 0.5em;
		position: absolute;
		top: 1.4em;
		left: 1em;
		border-radius: 50%;
		background: white;
		width: var(--size);
		height: var(--size);

		content: '';
	}

	.status p:nth-of-type(2) {
		flex: 1;
		border: 1px solid white;
		border-radius: 0.5em;
		background: white;
		padding: 1em;
		text-align: center;
	}

	.scoreboard {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.scoreboard * {
		text-align: center;
	}

	.scoreboard p {
		margin-block: auto;
		color: var(--primary-font-color);
		font-weight: 800;
		font-size: 36px;
		font-family: var(--primary-font-family);
	}

	.scoreboard h4 {
		color: var(--primary-font-color);
		font-family: var(--primary-font-family);
		text-transform: uppercase;
	}

	.scoreboard .dash {
		color: #b1bbdd;
	}

	@media only screen and (min-width: 48rem) {
		.page__content {
			--grid-columns: 3;
			grid-template-areas: 'team_a statistics team_b';
		}

		nav {
			display: none;
		}

		.timeline {
			display: block;
		}

		.team {
			display: flex;
		}

		.team__header {
			display: inline;
		}

		.switch-team {
			display: none;
		}
	}
</style>
