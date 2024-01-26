<script>
	import Input from '$lib/atoms/input.svelte';
	import Textarea from '$lib/atoms/Textarea.svelte';
	import InputDate from '$lib/atoms/InputDate.svelte';

	export let FormID, Method, Action;
</script>

<form id={FormID} method={Method} action={Action}>
	<Input
		Type="text"
		ID="AddPlayer"
		For="AddPlayer"
		Text="Add player ..."
		Required="required"
	/>

	<InputDate />

	<Input
		Type="text"
		ID="JerseyNumber"
		For="JerseyNumber"
		Text="Jersey number..."
		Required="required"
	/>

	<Input
		Type="text"
		ID="BirthCountry"
		For="BirthCountry"
		Text="Country of birth..."
	/>
	
	<Input
		Type="text"
		ID="ResidencePlace"
		For="ResidencePlace"
		Text="Place of residence..."
	/>

	<Textarea 
		ID="Bio" 
		For="Bio" 
		Text="Bio..." 
		/>

</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
