<script>
	export let data;
    const { tournaments } = data

    console.log(tournaments);
</script>

<title>All Tournaments</title>

<main>
    <div class="intro-heading">
        <h2>All Tournaments</h2>
        <p class="subtitle-medium">View all tournaments</p>
    </div>
    <ol>
        {#each tournaments as tournament }
                <li>
                    <a href="/tournaments/{tournament.id}">
                        <div class="tournament-contain">
                            <h3 class="subtitle-large">{tournament.name}</h3>
                            <p class="subtitle-small">{tournament.date}</p>
                            <p class="subtitle-small">{tournament.location}</p>
                        </div>
                    </a>
                </li>
        {/each}
    </ol>
</main>

<style>

    main{
        width: 100%;
        padding: 3rem 2rem;
    }

    .intro-heading{
        margin-bottom: 2rem;
    }

    h2 {
        font-size: 1.8rem;
    }

    .subtitle-medium {
        font-size: 1rem;
    }

    li{
        list-style-type: none;
    }

    a{
        background-color: var(--element-background-color);
        text-decoration: none;
        text-align: center;
    }

    a:focus{
        outline-color: var(--button-background-color);
    }

    .tournament-contain{
        background-color: var(--element-background-color);
        border-radius: 20px;
        padding: 2rem;
        box-shadow: var(--box-shadow);
    }

    .tournament-contain:hover{
        background-color: var(--hover-background-color);
    }

    .subtitle-large {
        font-size: 1rem;
    }

    .subtitle-small{
        font-size: 0.8rem;
    }

    .subtitle-small:last-child{
        font-size: 0.8rem;
        font-weight: bold;
        margin-top: 1rem;
    }

    @media (min-width: 50rem) {

        main{
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
            font-size: 1.3rem;
        }

        .subtitle-small{
            font-size: 1rem;
        }

        .subtitle-small:last-child{
            font-size: 1rem;
        }
    }

    @media (min-width: 80rem) {

        main{
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