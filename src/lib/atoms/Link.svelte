<script>
	export let Routing, Text, ID;
	export let severity = 'primary';
</script>

<a class={severity} id={ID} href={Routing}>{Text}</a>

<style>
	a {
		cursor: pointer;
		border: 1px solid var(--border-color);

		background-color: var(--background-color);
		width: fit-content;
		height: fit-content;
		color: var(--text-color);
		font-size: 1rem;
		font-family: var(--primary-font-family);
		text-decoration: none;
	}

	.primary {
		--background-color: hsl(161, 49%, 58%);
		--border-color: hsl(161, 49%, 58%);
		--text-color: white;
		border-radius: 50rem;
	}

	.primary:is(:hover, :focus) {
		--background-color: hsl(161, 49%, 30%);
		--border-color: hsl(161, 49%, 30%);
		--text-color: white;
	}

	.primary-button {
		--background-color: hsl(161, 49%, 58%);
		--border-color: hsl(161, 49%, 58%);
		--text-color: white;
		box-shadow: var(--box-shadow);
		border-radius: 50rem;
		border-radius: 50rem;
		padding: 0.5rem 1.2rem;
	}

	.primary-button:is(:hover, :focus) {
		--background-color: hsl(161, 49%, 30%);
		--border-color: hsl(161, 49%, 30%);
		--text-color: white;
	}

	.warning {
		box-shadow: var(--box-shadow);
		border-radius: 50rem;
		padding: 0.5rem 1.2rem;

		--background-color: hsl(0, 46%, 58%);
		--border-color: hsl(0, 46%, 58%);
		--text-color: white;
	}

	.warning:is(:hover, :focus) {
		--background-color: hsl(0, 46%, 30%);
		--border-color: hsl(0, 46%, 30%);
	}
</style>
