<script>
	export let DDValue = "";
	export let MMValue = "";
	export let YYYYValue = "";
	export let Hidden ="";
</script>

<div class="DateOfBirth-container">
	<legend >Date of birth <span hidden="{Hidden}">(Optioneel)</span></legend>
	<div class="input-container">
		<input type="tekst" id="Day" autocomplete="bday-day" placeholder="DD" value="{DDValue}" inputmode="numeric" />
		<label for="Day">Welke dag ben je geboren</label>
		/
		<input type="tekst" id="Month" autocomplete="bday-month" value="{MMValue}" placeholder="MM" inputmode="numeric" />
		<label for="Month">Welke maand ben je geboren</label>
		/
		<input type="tekst" id="Year" autocomplete="bday-year" value="{YYYYValue}" placeholder="YYYY" inputmode="numeric" />
		<label for="Jaar">Welke jaar ben je geboren</label>
	</div>
</div>

<style>
	.DateOfBirth-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: .5rem;
		outline: none;
		border: none;
		width: 100%;
	}

	legend {
		padding: 0 1.5rem;
		font-size: 12px;
		font-family: var(--tertiary-font-family);
		display: flex;
		justify-content: space-between;
	}

	.input-container {
		display: flex;
		align-items: center;
		gap: 0.2rem;

		transition: 0.3s ease-in-out;
		outline: 3px solid white;
		outline-offset: -3px;
		box-shadow: var(--box-shadow);
		/* border: 3px solid white; */
		border-radius: 0.9rem;
		background-color: var(--input-background-color);
		width: 100%;
		width: 100%;
		color: var(--text-color);
		font-size: 1rem;
	}

	.input-container > label {
		position: absolute;
		left: -500000px;
		transition: 0.3s ease-in-out;
		cursor: text;
		font-family: var(--tertiary-font-family);
	}

	.input-container:hover,
	.input-container:focus {
		outline: 3px solid #a5a5a5;
	}

	input {
		border: 1px solid red;
		border: none;
		border-radius: 0.9rem;
		padding: 1rem 1.5rem;
		width: 100%;
		font-size: 1rem;
	}

	#Day {
		width: 30%;
		min-width: 4.5em;

	}

	#Month {
		width: 30%;
		min-width: 4.8em;

	}

	#Year {
		width: 40%;
		min-width: 5.8em;

	}

	input:is(:hover, :focus) {
		outline: none;
		border: none;
	}

	input::placeholder {
		font-size: 1rem;
		font-family: var(--tertiary-font-family);
	}

	input:focus::-webkit-input-placeholder {
		color: lightgray;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	span{
    font-size: 12px;
    color: gray;
  }
</style>
