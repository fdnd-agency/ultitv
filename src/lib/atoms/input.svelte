<script>
  export let Text, For, Type, ID;
  export let Value = "";
  export let Required = "";
  export let placeholder = "";
  export let Hidden ="";
</script>

<div class="container">
  <input type={Type} id={ID} autocomplete="off" placeholder="{placeholder}" Value="{Value}" required="{Required}"/>
  <label for={For}>{Text} <span hidden="{Hidden}">(Optioneel)</span></label>
</div>

<style>
  .container {
    position: relative;
    width: 100%;
    margin-top: 1.5rem;
  }

  label {
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    right: 1.5rem;
    transition: 0.3s ease-in-out;
    cursor: text;
    font-family: var(--tertiary-font-family);
    display: flex;
    justify-content: space-between;
  }

  input {
    padding: 1rem 1.5rem;
    border-radius: 0.9rem;
    /* border: 3px solid white; */
    border: none;
    outline: 3px solid white;
    outline-offset: -3px;
    box-shadow: var(--box-shadow);
    font-size: 1rem;
    width: 100%;
    color: var(--text-color);
    transition: 0.3s ease-in-out;
  }

  input:hover,
  input:focus {
    outline: 3px solid #a5a5a5;
  }

  div input:focus ~ label,
  div input:not(:placeholder-shown) ~ label {
    top: -1.3rem;
    font-size: 12px;
  }

  span{
    font-size: 12px;
    color: gray;
  }

  .container input:required ~ label span{
    display: none;
  }
</style>
