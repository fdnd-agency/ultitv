<script>
	import { onMount } from 'svelte';

	export let keyboardShortcutEnabled = true;

	let element;
	let supported;

	const supportedOptions = [
		{ request: 'requestFullscreen', exit: 'exitFullscreen' }, // Standard
		{ request: 'mozRequestFullScreen', exit: 'mozCancelFullScreen' }, // Firefox
		{ request: 'webkitRequestFullscreen', exit: 'webkitExitFullscreen' }, // Safari
		{ request: 'msRequestFullscreen', exit: 'msExitFullscreen' } // IE11
	];

	onMount(() => {
		// Find the supported method
		supported = supportedOptions.find((value) => value.request in element);
	});

	function onKeyDown(event) {
		if (keyboardShortcutEnabled && event.key === 'f') {
			toggle(event);
		}
	}

	function toggle(event) {
		if (!supported) return;

		if (!document.fullscreenElement) {
			element[supported.request]();
		} else {
			document[supported.exit]();
		}

		event.preventDefault();
	}
</script>

<div bind:this={element}>
	{#if supported}
		<button on:click={toggle}>Toggle fullscreen</button>
	{/if}

	<slot />
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
	div {
		display: contents;
	}

	button {
		position: absolute;
		right: 0;
	}
</style>
