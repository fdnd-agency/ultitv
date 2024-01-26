<script>
	export let LableText, LableFor, InputType, InputID;
</script>

<div class="input-container">
	<input
		type={InputType}
		id={InputID}
		autocomplete="off"
		placeholder=""
		accept=".png, .jpg, .webp,"
	/>

	<label class="subtitle-large" for={LableFor}
		><svg
			for={LableFor}
			width="73"
			height="73"
			viewBox="0 0 73 73"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3 36.5C3 40.8993 3.8665 45.2555 5.55004 49.3199C7.23357 53.3843 9.70116 57.0773 12.8119 60.1881C15.9227 63.2988 19.6157 65.7664 23.6801 67.45C27.7445 69.1335 32.1007 70 36.5 70C40.8993 70 45.2555 69.1335 49.3199 67.45C53.3843 65.7664 57.0773 63.2988 60.1881 60.1881C63.2988 57.0773 65.7664 53.3843 67.45 49.3199C69.1335 45.2555 70 40.8993 70 36.5C70 27.6152 66.4705 19.0944 60.1881 12.8119C53.9056 6.52945 45.3848 3 36.5 3C27.6152 3 19.0944 6.52945 12.8119 12.8119C6.52945 19.0944 3 27.6152 3 36.5Z"
				stroke="#444D7B"
				stroke-width="5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M25 37H47"
				stroke="#444D7B"
				stroke-width="5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M36 26V48"
				stroke="#444D7B"
				stroke-width="5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		{LableText}
	</label>
</div>

<style>
	.input-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	label {
		/* position: absolute; */

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		transition: 0.3s ease-in-out;
		cursor: pointer;
		margin-top: 1.5rem;
		outline: 3px solid white;
		outline-offset: -3px;
		box-shadow: var(--box-shadow);
		border: none;
		border-radius: 0.9rem;
		background-color: var(--element-background-color);
		padding: 2.5rem 1.5rem;
		width: 100%;
		font-size: 1.2rem;
		font-family: var(--tertiary-font-family);
	}

	input[type='file'] {
		display: none;
	}

	label:hover,
	label:focus {
		outline: 3px solid #a5a5a5;
	}

	div label:focus ~ label,
	div label:not(:placeholder-shown) ~ label {
		top: -1.3rem;
		font-size: 12px;
	}
</style>
