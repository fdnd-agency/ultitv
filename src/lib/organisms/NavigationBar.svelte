<script>
	import NavItem from '$lib/molecules/NavItem.svelte';

	let items = [
		{ icon: 'home', label: 'Home', href: '/' },
		{ icon: 'players', label: 'Players', href: '/players' },
		{ icon: 'teams', label: 'Teams', href: '/teams' },
		{ icon: 'tournaments', label: 'Tournaments', href: '/tournaments' }
	];

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<nav aria-label="Main Navigation">
	<!-- <div class="menu-contain">
        <button class="menu-toggle" on:click={toggleMenu}>
            {#if isMenuOpen}
                <div class="bar close"></div>
                <div class="bar close"></div>
                <div class="bar close"></div>
            {:else}
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            {/if}
        </button>
    </div> -->
	<ul class={isMenuOpen ? 'open' : ''}>
		{#each items as item}
			<NavItem {item} />
		{/each}
	</ul>
</nav>

<style>
	nav {
		height: 100%;
	}

	/* .menu-toggle {
    position: absolute;
    cursor: pointer;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    top: 2rem;
    right: 2rem;
    border:  none;
    background-color: transparent;
}

.bar {
    background-color: var(--primary-font-color);
    height: 1rem;
    width: 100%;
    border-radius: 15px;
}

.bar:nth-child(2) {
    margin: 4px 0em;
    width: 80%;
    margin-left: auto;
}

.bar.close:nth-child(1) {
    display: none;
}

.bar.close:nth-child(2) {
    display: block;
    margin-top: 8px;
    margin-bottom: 8px;
    
}

.bar.close:nth-child(3) {
    display: none;
} */

	ul {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0;
		box-shadow: var(--box-shadow);
		border-radius: 10px;
		background-color: var(--input-background-color);
		height: 100%;
		list-style: none;
	}

	@media only screen and (max-width: 768px) {
		ul {
			flex-direction: row;
		}

		/* .menu-toggle {
        display: flex;
    }

    ul {
        display: none;
    }

    ul.open {
        display: flex;
    } */
	}
</style>
