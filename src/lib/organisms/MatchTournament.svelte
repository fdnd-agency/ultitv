<script>
    export let match;
    console.log(match);
</script>


<ol>
    <li>
        <a class="match-contain" href="/statsreader/{match.id}">
            <p class="subtitle-small">Mixed | Arena | Finale</p>
            <article class="match">
                <section class="wrapper">
                    <p class="time-label">12:45</p>
                    <section class="teams">
                        <section>
                            <img src="../images/team-logo-dog.png" loading="lazy" alt= "Team Logo: A">
                            <p> {match.team_a.name} </p>
                        </section>
                        <p class="score-label">18-12</p>
                        <section>
                            <img src="../images/team-logo-camel.png" loading="lazy" alt="Team Logo: B">
                            <p>{match.team_b.name}</p>
                        </section>
                    </section>
                </section>
                <a class="add-points-button" href="/statskeeper/{match.id}">Add Points</a>
            </article>
        </a>
    </li>
</ol>


<style>

    ol{
        list-style-type: none;
    }

    .match-contain{
        text-decoration: none;
    }

    .match-contain:focus{
        outline-color: var(--button-background-color);
    }

    .subtitle-small{
        font-size: 0.7rem;
        font-weight: bold;
        text-align: right;
        margin: 0.5rem 1rem;
    }

    .match{
        display: flex;
        background-color: var(--element-background-color);
        border-radius: 10px;
        padding: 1rem;
        justify-content: space-between;
        align-items: center;
    }

    .match:hover{
        background-color: var(--hover-background-color);
        box-shadow: var(--box-shadow);
    }

    .time-label{
        font-family: var(--primary-font-family);
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--primary-font-color);
    }

    .wrapper{
        display: flex;
        gap: 0.5rem;
        align-items: center
    }

    .teams{
        display: flex;
        flex-direction: column;
    }

    .teams section{
        display: flex;
    }

    .teams img{
        max-width: 1rem;
        max-height: 1rem;
        margin: 0rem 0.5rem 0rem 1rem
    }

    .teams p{
        font-family: var(--secondary-font-family);
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--primary-font-color);
    }

    .score-label{
        display: none;
    }

    .add-points-button{
        font-size: 0.8rem;
        font-family: var(--secondary-font-family);
        font-weight: bold;
        color: white;
        text-decoration: none;
        background-color: var(--block-by-color);
        border-radius: 20px;
        padding: 0.5rem;
        border: solid 2px var(--block-by-color);
    }

    .add-points-button:hover {
        color: var(--block-by-color);
        background-color: var(--element-background-color);
        border: solid 2px var(--block-by-color);
        transition: ease-in 0.2s;
    }

    .add-points-button:focus {
        color: var(--button-background-color);
        background-color: transparent;
        outline: none;
        border: solid 2px var(--button-background-color);
    }

    @media (min-width: 50rem){

        ol{
            margin-right: 5rem;
        }

        .match-contain{
            position: relative;
            align-items: center;
            margin-bottom: 10rem;
        }

        .subtitle-small{
            font-size: 1rem;
            margin: 0.5rem 1rem;
            padding-top: 1rem;
        }

        .time-label{
            font-size: 1rem;
        }

        .teams img{
            max-width: 1.5rem;
            max-height: 1.5rem;
        }

        .teams p{
            font-size: 1rem;
        }

        .add-points-button{
            font-size: 0.9rem;
            font-weight: 600;
        }
    }

    @media (min-width: 70rem){

        .match-contain{
            margin-right: 10rem;
        }

        .time-label{
            margin-left: 3rem;
        }

        .teams{
            flex-direction: row;
            margin-left: 8rem;
        }

        .teams > section:first-child{
            flex-direction: row-reverse;
        }

        .teams img{
            max-width: 2rem;
            max-height: 2rem;
        }

        .teams p{
            font-size: 1rem;
            margin: auto;
        }

        .score-label{
            display: block;
            padding: 0rem 1rem 0rem 2rem;
        }

        .add-points-button{
            font-size: 1rem;
            padding: 0.5rem 1rem;
        }
    }
    
</style>