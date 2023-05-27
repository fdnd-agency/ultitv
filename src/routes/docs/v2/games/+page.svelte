<h2>Games</h2>

<h3>GET</h3>

<p>
	Een gepagineerd overzicht van alle <em>games</em> met een aantal in te stellen
	opties welke als url parameter meegestuurd kunnen worden. Standaard worden de laatst toegevoegde
	vijf <em>games</em> ingeladen maar dit aantal en het aantal <em>games</em> dat geskipt worden kunnen worden ingesteld.
</p>

<h4>Url parameters:</h4>
<ul>
	<li>
		<strong>first</strong>, een getal tussen 0-100 waarmee het aantal op te halen
		<em>games</em> wordt ingesteld.
	</li>
	<li>
		<strong>skip</strong>, een getal waarmee een aantal <em>games</em> in de selectie worden overgeslagen.
		Dit is handig voor het instellen van paginering.
	</li>
    <li>
        <strong>id</strong>, het id van de te selecteren <em>game</em>.
    </li>
	<li>
		<strong>direction</strong>, bepaalt de volgorde van de selectie. Standaard is DESC (aflopend)
		maar je kunt deze parameter ASC (oplopend) meegeven om de richting te veranderen.
	</li>
	<li>
		<strong>orderBy</strong>, bepaalt de sortering van de selectie. Standaard is
		<em>publishedAt</em>, de datum dat het record is toegevoegd. Alle eigenschappen van
		<em>teams</em> kunnen gebruikt worden als sortering.
	</li>
</ul>

<h4>Voorbeeld Requests:</h4>
<ul>
	<li>
		<a href="/api/v2/games">/api/v2/games</a>, selecteer 5 <em>games</em>.
	</li>
	<li>
		<a href="/api/v2/games?first=7">/api/v2/games?first=7</a> selecteer 7 <em>games</em>.
	</li>
	<li>
		<a href="/api/v2/games?first=20&skip=20">/api/v2/games?first=20&skip=20</a>, selecteer 20
		<em>games</em> en sla de eerste 20 over. Met andere woorden, selecteer pagina 2.
	</li>
    <li>
        <a href="/api/v2/games?id=123">/api/v2/games?id=123</a>, selecteer <em>games</em> op basis van id.
    </li>
	<li>
        <a href="/api/v2/games?orderBy=gameStatus&direction=ASC">/api/v2/games?orderBy=gameStatus&direction=ASC</a>, sorteer <em>games</em> op basis van gameStatus.
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