<h2>Players</h2>

<h3>GET</h3>

<p>
	Een gepagineerd overzicht van alle <em>players</em> met een aantal in te stellen
	opties welke als url parameter meegestuurd kunnen worden. Standaard worden de laatst toegevoegde
	tien <em>players</em> ingeladen maar dit aantal, het aantal <em>players</em> dat geskipt worden, de
	volgorde en de kolom waarop gesorteerd wordt kunnen worden ingesteld.
</p>

<h4>Url parameters:</h4>
<ul>
	<li>
		<strong>first</strong>, een getal tussen 0-100 waarmee het aantal op te halen
		<em>players</em> wordt ingesteld.
	</li>
	<li>
		<strong>skip</strong>, een getal waarmee een aantal <em>players</em> in de selectie worden overgeslagen.
		Dit is handig voor het instellen van paginering.
	</li>
	<li>
		<strong>direction</strong>, bepaalt de volgorde van de selectie. Standaard is DESC (aflopend)
		maar je kunt deze parameter ASC (oplopend) meegeven om de richting te veranderen.
	</li>
	<li>
		<strong>orderBy</strong>, bepaalt de sortering van de selectie. Standaard is
		<em>publishedAt</em>, de datum dat het record is toegevoegd. Alle eigenschappen van
		<em>players</em> kunnen gebruikt worden als sortering.
	</li>
</ul>

<h4>Voorbeeld Requests:</h4>
<ul>
	<li>
		<a href="/api/v1/players">/api/v1/players</a>, selecteer 10 <em>players</em>.
	</li>
	<li>
		<a href="/api/v1/players?first=7">/api/v1/players?first=7</a> selecteer 7 <em>players</em>.
	</li>
	<li>
		<a href="/api/v1/players?first=20&skip=20">/api/v1/players?first=20&skip=20</a>, selecteer 20
		<em>players</em> en sla de eerste 20 over. Met andere woorden, selecteer pagina 2.
	</li>
	<li>
		<a href="/api/v1/players?first=20&direction=ASC">/api/v1/players?first=20&direction=ASC</a>,
		selecteer 20 <em>players</em> in oplopende volgorde.
	</li>
	<li>
		<a href="/api/v1/players?orderBy=name">/api/v1/players?orderBy=name</a>, selecteer 10
		<em>players</em>
		gesorteerd op <em>name</em>.
	</li>
</ul>

<style>
	h4,
	ul {
		margin-top: 1rem;
	}
	ul {
		padding: 0;
		list-style: none;
	}
	li {
		margin-bottom: 0.4rem;
	}
</style>