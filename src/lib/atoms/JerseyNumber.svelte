<script>
	export let number = 0;
</script>

<span>{number}</span>

<style>
	span {
		font-family: var(--primary-font-family);
		color: var(--primary-font-color);
		font-weight: 800;
		display: inline-block;
		vertical-align: middle;
		box-sizing: content-box;
		border: 1px solid var(--primary-font-color);
		border-radius: calc(var(--border-radius) - 0.5em);
		padding: 0.5em;
		width: 1rem;
		height: 1rem;
		/* line-height: 1; */
		text-align: center;
	}
</style>
