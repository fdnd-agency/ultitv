<script>
	import Input from '$lib/atoms/input.svelte';
	import UplaodInput from '$lib/atoms/UploadInput.svelte';

	export let FormID, Method, Action;
</script>

<form id={FormID} method={Method} action={Action}>
	<Input
		Type="text"
		ID="TeamName"
		For="TeamName"
		Text="Name"
		Value="Inazuma Eleven"
		Required="required"

	/>

	<Input
		Type="text"
		ID="CountryOfOrigin"
		For="CountryOfOrigin"
		Text="Country of origin"
		Value="Japan"
		Hidden="hidden"
	/>

	<UplaodInput 
		InputType="file" 
		InputID="Upload" 
		LableFor="Upload" 
		LableText="Add logo" />
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
