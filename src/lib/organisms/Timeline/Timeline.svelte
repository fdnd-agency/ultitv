<script>
	import { TimelineRow } from '$lib';

	export let statistics = [];
</script>

<section id="statistics" class="timeline">
	<h3>Timeline</h3>

	<ul class="timeline-list">
		{#each statistics as statistic}
			<TimelineRow {statistic} />
		{/each}
	</ul>
</section>

<style>
	.timeline {
		--border-radius: 1em;

		flex: 1;
		border: 1px solid white;
		border-radius: 0.5rem;
		background: white;
		padding: 1em;
		height: 100%;
		font-size: 1em;
	}

	.timeline > h3 {
		/* Hide visually, but keep accessible */
		clip: rect(0 0 0 0);
		position: absolute;
		clip-path: inset(50%);
		width: 1px;
		height: 1px;
		overflow: hidden;
		white-space: nowrap;
	}

	.timeline-list {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto auto auto minmax(0, 1fr) auto;
		grid-template-areas: 'a b c d e f g';
		grid-auto-rows: min-content;
		gap: 0.5em;
		list-style: none;
	}
</style>
