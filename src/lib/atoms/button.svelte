<script>
	export let ButtonType, ButtonText, Form, ID;
	export let severity = 'primary';
	export let Hidden ="";
</script>

<button class={severity} id="{ID}" type={ButtonType} form={Form} hidden="{Hidden}">{ButtonText}</button>

<style>
	button {
		border-radius: 50rem;
		padding: 0.5rem 1.2rem;
		font-size: 1rem;
		font-family: var(--primary-font-family);
    height: fit-content;
    width: fit-content;
    cursor: pointer;


		background-color: var(--background-color);
    border: 3px solid var(--border-color);
		color: var(--tekst-color);

	}

	.primary {
		--background-color: hsl(161, 49%, 58%);
		--border-color: hsl(161, 49%, 58%);
		--tekst-color: white;

		box-shadow: var(--box-shadow);
	}

	.primary:is(:hover, :focus) {
		--background-color: hsl(161, 49%, 30%);
		--border-color: hsl(161, 49%, 30%);
	}

	.secondary {
		--background-color: white;
		--border-color: white;
		--tekst-color: white;
	}

	.ghost {
		--background-color: transparent;
		--border-color: hsl(161, 49%, 58%);
		--tekst-color: hsl(161, 49%, 58%);
	}

  .ghost:is(:hover, :focus) {
		--border-color: hsl(161, 49%, 30%);
		--tekst-color: hsl(161, 49%, 30%);
	}

  .warning {
		box-shadow: var(--box-shadow);

		--background-color: hsl(0, 46%, 58%);
		--border-color: hsl(0, 46%, 58%);
		--tekst-color: white;
	}

	.warning:is(:hover, :focus) {
		--background-color: hsl(0, 46%, 30%);
		--border-color: hsl(0, 46%, 30%);
	}
</style>
