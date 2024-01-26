<script>
	import Icon from '$lib/atoms/Icon.svelte';

	export let item;
</script>

<li>
	<a href={item.href}>
		<Icon name={item.icon} />
		<span>{item.label}</span>
	</a>
</li>

<style>
	
	li {
		width: 100%;
	}

	a {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		transition: 0.2s;
		padding: 1em;
		color: var(--primary-font-color);
		font-family: var(--secondary-font-family);
		text-decoration: none;
		width: 100%;
		aspect-ratio: 1;
	}
	
	a:is(:hover, :focus) {
		background: rgba(0, 0, 0, 0.1);
	}
	
	@media only screen and (max-width: 768px){
		
		a{
			gap: 0;
			padding: 1rem 0;
			aspect-ratio: unset;
			font-size: clamp(10px, 3vw, 16px ) ;
		}
	}

</style>
