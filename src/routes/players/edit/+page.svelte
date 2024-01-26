<script>
	import Form from '$lib/organisms/EditPlayerForm.svelte';
	import Button from '$lib/atoms/button.svelte';
	import Link from '$lib/atoms/Link.svelte';
	import DeleteForm from '$lib/organisms/DeletePlayerForm.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		if ('showModal' in document.createElement('dialog')) {
			const showDialogBtn = document.getElementById('Delete');
			const newDialog = document.createElement('dialog');
			const DeleteForm = document.getElementById('DeleteFormContainer');
			const closeBtn = document.getElementById('closeBtn');

			newDialog.classList.add('custom-dialog');
			document.body.append(newDialog);
			newDialog.append(DeleteForm);

			if (showDialogBtn) {
				showDialogBtn.addEventListener('click', (event) => {
					newDialog.showModal();
					event.preventDefault();
				});
			}

			closeBtn.hidden = false;
			closeBtn.addEventListener('click', () => {
				newDialog.close();
			});

			submitBtn.addEventListener('click', () => {
				newDialog.close();
			});
		}
	});
</script>

<main>
	<h1>Edit Player</h1>

	<h2 class="sub-header-left">Update player content</h2>

	<section>
		<Form FormID="FormID" Method="get" Action="/players" />
	</section>

	<footer>
		<Button ButtonType="submit" Form="FormID" ButtonText="Save" />
		<Link severity="warning" Routing="#DeleteForm" ID="Delete" Text="Delete" />
	</footer>
</main>
<div id="DeleteFormContainer" class="DeleteFormContainer">
	<DeleteForm FormID="DeleteForm" Method="get" Action="/players" />
	<div class="ButtonContainer">
		<Button severity="ghost" Hidden="hidden" ButtonType="button" ID="closeBtn" ButtonText="Cancel" />
		<Button severity="warning"  ButtonType="submit" ID="submitBtn" Form="DeleteForm" ButtonText="Continue" />
	</div>
</div>

<style>
	main {
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		grid-template-columns: 1fr;

		grid-template-areas:
			'h1'
			'h2'
			'form'
			'footer';
		column-gap: 2rem;
		row-gap: 1rem;
		padding: 4rem 4%;
		width: 100%;
		height: 100vh;
		height: 100svh;
	}

	h1 {
		grid-area: h1;
		font-size: 3rem;
	}

	h2 {
		grid-area: h2;
		font-size: 1.5rem;
	}

	section {
		grid-area: form;
		margin: -10px;
		padding: 10px;
		/* margin-right: 0; */
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}

	footer {
		display: flex;
		grid-area: footer;
		gap: 1rem;
	}

	.DeleteFormContainer {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 3rem;
	}

	.ButtonContainer {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	@media (pointer: fine) {
		section::-webkit-scrollbar-track {
			margin: 10px 0;
			border-radius: 10px;
		}

		section::-webkit-scrollbar {
			width: 12px;
		}

		section::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: #a7a7a7;
		}
	}

	@media only screen and (min-width: 850px) {
		main {
			grid-template-columns: repeat(3, 1fr);
			grid-template-areas:
				'h1 h1 h1'
				'h2 h2 h2'
				'form form .'
				'footer footer footer';
		}
	}

	@media only screen and (min-width: 1000px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
				'h1 h1'
				'h2 h2'
				'form .'
				'footer footer';
		}
	}
</style>
