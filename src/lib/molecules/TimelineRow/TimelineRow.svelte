<script>
	import { JerseyNumber } from '$lib';

	export let statistic;
</script>

<li class="timeline-list__item--{statistic.lineup.team === statistic.match.team_a ? 'a' : 'b'}">
	<p>
		<JerseyNumber number={statistic.lineup.jersey_number} />
	</p>
	<p>{statistic.player.firstname} {statistic.player.lastname}</p>
	<p>20</p>

	<p>8 - 3</p>
</li>

<style>
	p {
		color: var(--primary-font-color);
		font-weight: 500;
		font-size: 1em;
	}

	[class^='timeline-list__item'] {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 1 / -1;
	}

	[class^='timeline-list__item'] p {
		margin-block: auto;
		white-space: nowrap;
	}

	[class^='timeline-list__item'] p:nth-of-type(1) {
		grid-area: a;
	}
	[class^='timeline-list__item'] p:nth-of-type(2) {
		grid-area: b;
	}
	[class^='timeline-list__item'] p:nth-of-type(3) {
		grid-area: c;
	}
	[class^='timeline-list__item'] p:nth-of-type(4) {
		grid-area: d;
		text-align: center;
	}

	.timeline-list__item--b * {
		text-align: right;
	}

	.timeline-list__item--b p:first-child {
		text-align: center;
	}

	.timeline-list__item--b p:nth-of-type(1) {
		grid-area: g;
	}
	.timeline-list__item--b p:nth-of-type(2) {
		grid-area: f;
	}
	.timeline-list__item--b p:nth-of-type(3) {
		grid-area: e;
	}
</style>
