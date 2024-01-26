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
		Text="Name"
		Value="Mark Evens"
		Hidden="hidden"
	/>
	<InputDate
		DDValue="08"
		MMValue="09" 
		YYYYValue="2002"
		Hidden="hidden"
	/>

	<Input
		Type="text"
		ID="JerseyNumber"
		For="JerseyNumber"
		Text="Jersey number"
		Value="Number 5"
		Hidden="hidden"

	/>
	<Input
		Type="text"
		ID="BirthCountry"
		For="BirthCountry"
		Text="Country of Birth"
		Value="Japan"
		Hidden="hidden"

	/>
	<Input
		Type="text"
		ID="ResidencePlace"
		For="ResidencePlace"
		Text="Place of residence"
		Value="Tokio"
		Hidden="hidden"
	/>

	<Textarea 
		ID="Bio" 
		For="Bio" 
		Text="Bio" 
		Value="Data van de speeler"
		Hidden="hidden"

		/>

</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
