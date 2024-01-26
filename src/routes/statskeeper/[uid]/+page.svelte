<script>
	import Statistic from '$lib/atoms/Statistic.svelte';
	export let data;
	// console.log(data)
	const { match, statistics } = data;


	//FUNCTION FOR INCREMENTING OR DECREMENTING THE SCORE BETWEEN TEAMS
	let teamA = match.team_a.name;
	let teamB = match.team_b.name;
	let scoreTeamA = 0;
    let scoreTeamB = 0;

	function incrementScore(team){
		if (team === teamA){
			scoreTeamA++
		} else if (team === teamB){
			scoreTeamB++
		}
	}

	function decrementScore(team){
		if(team === teamA){
			if (scoreTeamA > 0){
				scoreTeamA--
			}
		} else if (team === teamB) {
			if(scoreTeamB > 0){
				scoreTeamB--
			}
		}
	}


	//FUNCTION FOR SELECTING THE TEAM TO ADD POINTS TO
	let activeTeam = match.team_a.name;

	function selectTeam(team) {
		activeTeam = team;
	}

	// FUNCTION FOR SELECTNG PLAYER TO ADD STATS TO
	let activePlayer = match.team_a.players.firstname

	function selectPlayer(player){
		activePlayer = player
	}

	// FUNCTION FOR ADDING STATS TO PLAYERS
	export let playerStats = {}

	function addStat(statType) {
        if (activePlayer) {
            // Initialize the stat for the selected player if it doesn't exist
            if (!playerStats[activePlayer]) {
                playerStats[activePlayer] = {
                    points: 0,
                    assists: 0,
                    turnovers: 0,
                    blocks: 0
                };
            }

            // Increment the specified stat for the selected player
            playerStats[activePlayer][statType]++;
        }
    }

    function subtractStat(statType) {
        if (activePlayer && playerStats[activePlayer]) {
            // Decrement the specified stat for the selected player, ensuring it doesn't go below 0
            playerStats[activePlayer][statType] = Math.max(0, playerStats[activePlayer][statType] - 1);
        }
    }

	// FUNCTION FOR SHOWING THE DISC ON THE PLAYING FIELD

	let discs = [];
	
    function placeDisc(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      discs = [...discs, { x, y }];

	  if (discs.length > 1){
		discs.shift();
	  }
    }



</script>

<title>Statskeeper</title>
<main>
		<div class="score-count-wrapper">
			<h4>ADD POINTS</h4>
			<div class="score-count">
				<div class="score-count-team-a">
					<img src="/images/logo1.png" class="logo-team-a logo" alt="logo team a">
					<span class="team-name-a team-name">{match.team_a.name}</span>
					<div class="score-buttons">
						<button class="increment-score-team-a score-button" on:click={() => incrementScore(teamA)}>+</button>
						<button class="decrement-score-team-a score-button" on:click={() => decrementScore(teamA)}>-</button>
					</div>
				</div>
				<div class="score">
					<span>{scoreTeamA}</span>
					<span>-</span>
					<span>{scoreTeamB}</span>
				</div>
				<div class="score-count-team-b">
					<img src="/images/piratesLogo.png" class="logo-team-b logo" alt="logo team b">
					<span class="team-name-b team-name">{match.team_b.name}</span>
					<div class="score-buttons">
						<button class="increment-score-team-b score-button" on:click={() => incrementScore(teamB)}>+</button>
						<button class="decrement-score-team-b score-button" on:click={() => decrementScore(teamB)}>-</button>
					</div>
				</div>
			</div>	
		</div>
	<section class="select-team">
		<h4>SELECT TEAM</h4>
		<div class="select-team-buttons">
			<button class="select-team-button" class:selected-team={activeTeam === match.team_a.name} on:click={()=> selectTeam(match.team_a.name)}>{match.team_a.name}</button>
			<button class="select-team-button" class:selected-team={activeTeam === match.team_b.name} on:click={()=> selectTeam(match.team_b.name)}>{match.team_b.name}</button>
		</div>
	</section>
	<section class="add-stats">
		<h4>ADD STATS</h4>
		<ul class="player-list">
			{#if activeTeam === match.team_a.name}
				{#each match.team_a.players as player}
				<li>
					<button class="player" class:selected-player={activePlayer === player.id} on:click={()=> selectPlayer(player.id)}>
						<span class="jersey-number">{player.jersey_number}</span>
							<span class="player-name">{player.firstname} {player.lastname}</span>
							<div class="stats">
								<span class="statkeeper-stat goals">{playerStats[player.id]?.points || ''}</span>
								<span class="statkeeper-stat assists">{playerStats[player.id]?.assists || ''}</span>
								<span class="statkeeper-stat turnovers">{playerStats[player.id]?.turnovers || ''}</span>
								<span class="statkeeper-stat blocks">{playerStats[player.id]?.blocks || ''}</span>
							</div>
					</button>
				</li>
				{/each}
			{/if}
			{#if activeTeam === match.team_b.name}
				{#each match.team_b.players as player}
					<button class="player" class:selected-player={activePlayer === player.id} on:click={()=> selectPlayer(player.id)}>
						<span class="jersey-number">{player.jersey_number}</span>
						<span class="player-name">{player.firstname} {player.lastname}</span>
						<div class="stats">
							<span class="statkeeper-stat goals">{playerStats[player.id]?.points || ''}</span>
							<span class="statkeeper-stat assists">{playerStats[player.id]?.assists || ''}</span>
							<span class="statkeeper-stat turnovers">{playerStats[player.id]?.turnovers || ''}</span>
							<span class="statkeeper-stat blocks">{playerStats[player.id]?.blocks || ''}</span>
						</div>
					</button>
				{/each}
			{/if}
		</ul>
		<div class="stat-selector">
			<div class="add-point">
				<button class="add-point-button stat-button" on:click={() => addStat('points')}>+</button>
				<span>Point</span>
				<button class="substract-point-button stat-button" on:click={() => subtractStat('points')}>-</button>
			</div>
			<div class="add-assist">
				<button class="add-assist-button stat-button" on:click={() => addStat('assists')}>+</button>
				<span>Assist</span>
				<button class="substract-assist-button stat-button" on:click={() => subtractStat('assists')}>-</button>
			</div>
			<div class="add-turnover">
				<button class="add-turnover-button stat-button" on:click={() => addStat('turnovers')}>+</button>
				<span>Turnover</span>
				<button class="substract-turnover-button stat-button" on:click={() => subtractStat('turnovers')}>-</button>
			</div>
			<div class="add-block">
				<button class="add-block-button stat-button" on:click={() => addStat('blocks')}>+</button>
				<span>Block</span>
				<button class="substract-block-button stat-button" on:click={() => subtractStat('blocks')}>-</button>
			</div>
		</div>
	</section>
	<section class="disc-position">
		<h4>DISC POSITION</h4>
		<button class="play-field" on:click={placeDisc}>
			{#each discs as { x, y }, i }
			<div class="flag" style="left: {x}px; top: {y}px; background-color: {i === 0 ? 'grey' : 'red'};"></div>

			{/each}
			<div class="endzone-left">
				<span>ENDZONE</span>
			</div>
			<div class="midfield"></div>
			<div class="endzone-right">
				<span>ENDZONE</span>
			</div>
		</button>
	</section>
</main>

<style>

	main{
		/* display: grid; */
		display: flex;
		flex-direction: column;
		gap: 1rem;
		gap: 0.5rem;
		width: 100%;
		padding: 10px;
		background-color: var(--background-color);
		height: 100dvh;
	}

	h4{
		font-family: var(--secondary-font-family);
		font-weight: 800;
		font-size: 12px;
		color: var(--primary-font-color);
	}

	.score-count-wrapper{
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: var(--element-background-color);
		padding: 1rem;
		border-radius: 10px;
	}

	.score-count{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.score-count-team-a,
	.score-count-team-b{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 30%;
		gap: 1rem;
	}

	.team-name{
		font-family: var(--primary-font-family);
		color: var(--primary-font-color);
		font-size: 14px;
		font-weight: 600;
	}

	.logo{
		width: 3rem;
	}

	.score{
		display: flex;
		justify-content: center;
		width: 28%;
	}

	.score span:nth-of-type(1),
	.score span:nth-of-type(2),
	.score span:nth-of-type(3){
		text-align: center;
		width: 2rem;
		font-family: var(--primary-font-family);
		font-size: 32px;
		font-weight: 600;
		color: var(--primary-font-color);
	}

	.score-buttons{
		display: flex;
		gap: 1rem;
	}

	.score-button,
	.stat-button{
		border: 1px solid var(--primary-font-color);
		background-color: transparent;
		width: 50px;
		height: 30px;
		border-radius: 10px;
		cursor: pointer;
		touch-action: manipulation;
	}

	.score-button:active,
	.stat-button:active{
		background-color: var(--primary-font-color);
		color: white;
	}

	/* ---------------------------- */

	.select-team{
		display: flex;
		flex-direction: column;
		background-color: var(--element-background-color);
		border-radius: 10px;
		padding: 1rem;
		gap: 1rem;
	}

	.select-team-buttons{
		display: flex;
		gap: 1rem;
	}

	.select-team-button{
		width: 100%;
		background-color: transparent;
		border: 1px solid var(--primary-font-color);
		font-family: var(--primary-font-family);
		font-weight: 600;
		font-size: 14px;
		color: var(--primary-font-color);
		border-radius: 10px;
		height: 45px;
		cursor: pointer;
	}

	.selected-team{
		background-color: var(--primary-font-color);
		color: var(--element-background-color);
	}
	
	/* ---------------------------- */

	.add-stats{
		display: flex;
		flex-direction: column;
		background-color: var(--element-background-color);
		padding: 1rem;
		border-radius: 10px;
		height: 100%;
		gap: 1rem;
	}

	.player-list{
		height: 30dvh;
		overflow: scroll;
	}

	.player{
		display: flex;
		align-items: center;
		gap: 1rem;
		list-style-type: none;
		padding: 0.5rem 0;
		border: none;
		border-bottom: 1px solid #D3D3D3;
		background-color: transparent;
		width: 100%;
		padding: 0.5rem;
	}

	.player-name,
	.jersey-number{
		font-family: var(--secondary-font-family);
		font-size: 12px;
		color: var(--primary-font-color);
		font-weight: 500;
	}

	.jersey-number{
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--primary-font-color);
		border-radius: 5px;
		width: 32px;
		height: 25px;
	}

	.stats{
		display: flex;
		gap: 0.5rem;
		margin-left: auto;
	}

	.statkeeper-stat{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20px;
		width: 20px;
		background-color: transparent;
		border-radius: 5px;
		color: white;
		font-family: var(--secondary-font-family);
		font-weight: 600;
	}

	.goals {
		background-color: #18d02b;
	}

	.assists {
		background-color: #2974e4;
	}

	.turnovers {
		background-color: #ed4444;
	}

	.blocks {
		background-color: #ffc738;
	}

	span:empty {
		background-color: #f4f5fa;
	}

	.selected-player{
		background-color: var(--background-color);
	}

	.stat-selector{
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.add-point,
	.add-assist,
	.add-turnover,
	.add-block{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.add-point span,
	.add-assist span,
	.add-turnover span,
	.add-block span{
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--element-background-color);
		font-family: var(--primary-font-family);
		font-weight: 800;
		font-size: 12px;
		width: 75px;
		height: 45px;
		border-radius: 10px;
	}

	.add-point span{
		background-color: var(--scored-by-color);
	}

	.add-assist span{
		background-color: var(--assist-by-color);
	}

	.add-turnover span{
		background-color: var(--turnover-by-color);
	}

	.add-block span{
		background-color: var(--block-by-color);
	}

	.disc-position{
		background-color: var(--element-background-color);
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		padding: 1rem;
		gap: 1rem;
	}

	.play-field{
		position: relative;
		display: flex;
		gap: 5px;
		background-color: transparent;
		border: none;
		cursor: url(/images/discPositionCursor.svg), auto;
		height: 100%;
	}

	.play-field:active{
		background-color: transparent;
	}

	.endzone-left,
	.endzone-right{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		background-color: #BBC48F;
		height: 40vh;
		border-radius: 10px;
	}

	.endzone-left span,
	.endzone-right span{
		color: var(--primary-font-color);
		font-family: var(--primary-font-family);
		font-weight: 600;
		font-size: 18px;
	}

	.endzone-left span{
		transform: rotate(-90deg);
	}

	.endzone-right span{
		transform: rotate(90deg);
	}

	.midfield{
		flex-grow: 30;
		background-color: #E4FDE1;
		height: 100%;
		border-radius: 10px;
		z-index: 1;
	}

	.flag {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: red; /* Set your flag color */
      border-radius: 50%;
	  z-index: 10;
	  animation: pulse 1s ease-in-out infinite;
    }

	@keyframes pulse{
		0%{
			transform: scale(1);
		}

		50%{
			transform: scale(1.4);
		}
	}

	@media only screen and (min-width: 852px){
		
		main{
			display: grid;
			grid-template-columns: repeat(6, 1fr);
			grid-template-rows: repeat(6, 1fr);
		}

		.player-list{
			height: 100%;
		}

		.score-count-wrapper{
			grid-area: 1 / 4 / 3 / 7;
		}

		.select-team{
			grid-area: 1 / 1 / 2 / 4;
		}

		.add-stats{
			grid-area: 2 / 1 / 7 / 4;
		}

		.disc-position{
			grid-area: 3 / 4 / 7 / 7;	
		}

		.endzone-left,
		.endzone-right{
			height: 100%;
		}

	}

	

</style>















