<script>
	import MatchTournament from "../../../lib/organisms/MatchTournament.svelte";

    export let data;
    const { tournament, matches } = data

    console.log(tournament, matches);
</script>

<title>Tournament Overview</title>

<main>
    <div>
        <h2>{tournament.name}</h2>
        <p class="subtitle-medium">{tournament.date} | {tournament.location}</p>
    </div>
    <div>
        <h4 class="subtitle-large">All matches</h4>
        <div class="green-separator"></div>
    </div>
    {#each matches as match (match.id)}
        <a href="{match.link}" aria-label="{`View details for ${match.team_a.name} and ${match.team_b.name}`}">
            <MatchTournament {match} />
        </a>
    {/each}
</main>

<style>
    main {
        width: 100%;
        padding: 3rem 2rem;
    }

    h2 {
        font-size: 1.8rem;
    }

    .subtitle-medium {
        font-size: 1rem;
    }

    .subtitle-large {
        font-size: 1rem;
        margin-top: 2rem;
    }

    .green-separator {
        border: solid 2px var(--button-background-color);
        max-width: 3rem;
        border-radius: 25px;
        margin-top: 0.2rem;
    }

    @media (min-width: 50rem) {
        main {
            padding: 4rem;
        }

        h2 {
            font-size: 3rem;
        }

        .subtitle-medium {
            font-size: 1.4rem;
            margin-top: 0.5rem;
        }

        .subtitle-large {
            font-size: 1.5rem;
            margin-top: 3rem;
        }

        .green-separator {
            max-width: 6rem;
            margin-bottom: 3rem;
        }
    }

    @media (min-width: 80rem) {
        main {
            padding: 6rem;
        }

        h2 {
            font-size: 3.8rem;
        }

        .subtitle-medium {
            font-size: 1.6rem;
        }
    }
</style>
