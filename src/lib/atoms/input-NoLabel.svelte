<script>
  export let Text, For, Type, ID;
  export let value = "";
  export let Required = "";
  export let placeholder = "";
</script>

<div class="container">
  <input type={Type} id={ID} autocomplete="off" placeholder="{placeholder}" value="{value}" Required="{Required}" />
  <label for={For}>{Text}</label>
</div>

<style>
  .container {
    position: relative;
    width: 100%;
  }

  label {
    position: absolute;
    left: -500000px;
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
</style>
