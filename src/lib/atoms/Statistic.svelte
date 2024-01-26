<script>
	export let number;
	export let type = 'goals';
</script>

<span class={type}>{number || ''}</span>

<style>
	span {
		--color: white;

		display: inline-block;
		vertical-align: middle;
		box-sizing: content-box;
		border: 1px solid var(--color);
		border-radius: calc(var(--border-radius) - 0.5em);
		background: var(--color);
		padding: 0.5em;
		width: 1rem;
		height: 1rem;
		color: white;
		line-height: 1;
		text-align: center;
	}

	.goals {
		--color: var(--scored-by-color);
	}
	
	.assists {
		--color: var(--assist-by-color);	
	}

	.blocks {
		--color: var(--block-by-color);
	}

	.turnovers {
		--color: var(--turnover-by-color);
	}

	span:empty {
		--color: #f4f5fa;
	}
</style>
