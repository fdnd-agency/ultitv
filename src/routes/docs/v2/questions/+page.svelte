<h2>Questions</h2>

<h3>GET</h3>

<p>
	Een gepagineerd overzicht van alle <em>questions</em> met een aantal in te stellen
	opties welke als url parameter meegestuurd kunnen worden. Standaard worden de laatst toegevoegde
	vijf <em>questions</em> ingeladen maar dit aantal en het aantal <em>questions</em> dat geskipt worden kunnen worden ingesteld.
</p>

<h4>Url parameters:</h4>
<ul>
	<li>
		<strong>first</strong>, een getal tussen 0-100 waarmee het aantal op te halen
		<em>questions</em> wordt ingesteld.
	</li>
	<li>
		<strong>skip</strong>, een getal waarmee een aantal <em>questions</em> in de selectie worden overgeslagen.
		Dit is handig voor het instellen van paginering.
	</li>
    <li>
        <strong>type</strong>, het type van de te selecteren <em>questions</em>.
    </li>
	<li>
		<strong>direction</strong>, bepaalt de volgorde van de selectie. Standaard is DESC (aflopend)
		maar je kunt deze parameter ASC (oplopend) meegeven om de richting te veranderen.
	</li>
	<li>
		<strong>orderBy</strong>, bepaalt de sortering van de selectie. Standaard is
		<em>publishedAt</em>, de datum dat het record is toegevoegd. Alle eigenschappen van
		<em>questions</em> kunnen gebruikt worden als sortering.
	</li>
</ul>

<h4>Voorbeeld Requests:</h4>
<ul>
	<li>
		<a href="/api/v2/questions">/api/v2/questions</a>, selecteer 5 <em>questions</em>.
	</li>
	<li>
		<a href="/api/v2/questions?first=7">/api/v2/questions?first=7</a> selecteer 7 <em>questions</em>.
	</li>
	<li>
		<a href="/api/v2/questions?first=20&skip=20">/api/v2/questions?first=20&skip=20</a>, selecteer 20
		<em>questions</em> en sla de eerste 20 over. Met andere woorden, selecteer pagina 2.
	</li>
    <li>
        <a href="/api/v2/questions?type=Player">/api/v2/questions?type=Player</a>, selecteer <em>questions</em> op basis van type Player.
    </li>
	<li>
        <a href="/api/v2/questions?orderBy=title&direction=ASC">/api/v2/questions?orderBy=title&direction=ASC</a>, sorteer <em>questions</em> op basis van title.
    </li>
</ul>

<h3>POST</h3>
<p>Voeg een nieuwe Question toe</p>

<p>De volgende structuur is vereist:</p>

<pre><code>&lbrace;
	"title": "What do you like most about Ultimate?",
	"type": "Player",
&rbrace;</code></pre>

<ul><li>
	<a href="/api/v2/questions">/api/v2/questions</a>
</li></ul>


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