<script>
	export let data;
	const { matches } = data;
</script>

<ul>
	{#each matches as match}
		<li>
			<a href="/statsreader/{match.id}">{match.id}</a>
		</li>
	{/each}
</ul>
