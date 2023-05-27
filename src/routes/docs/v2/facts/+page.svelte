<h2>Facts</h2>

<h3>GET</h3>

<p>
	Een gepagineerd overzicht van alle <em>facts</em> met een aantal in te stellen
	opties welke als url parameter meegestuurd kunnen worden. Standaard worden de laatst toegevoegde
	vijf <em>facts</em> ingeladen maar dit aantal en het aantal <em>facts</em> dat geskipt worden kunnen worden ingesteld.
</p>

<h4>Url parameters:</h4>
<ul>
	<li>
		<strong>first</strong>, een getal tussen 0-100 waarmee het aantal op te halen
		<em>facts</em> wordt ingesteld.
	</li>
	<li>
		<strong>skip</strong>, een getal waarmee een aantal <em>facts</em> in de selectie worden overgeslagen.
		Dit is handig voor het instellen van paginering.
	</li>
	<li>
		<strong>direction</strong>, bepaalt de volgorde van de selectie. Standaard is DESC (aflopend)
		maar je kunt deze parameter ASC (oplopend) meegeven om de richting te veranderen.
	</li>
	<li>
		<strong>orderBy</strong>, bepaalt de sortering van de selectie. Standaard is
		<em>publishedAt</em>, de datum dat het record is toegevoegd. Alle eigenschappen van
		<em>facts</em> kunnen gebruikt worden als sortering.
	</li>
</ul>

<h4>Voorbeeld Requests:</h4>
<ul>
	<li>
		<a href="/api/v2/facts">/api/v2/facts</a>, selecteer 5 <em>facts</em>.
	</li>
	<li>
		<a href="/api/v2/facts?first=7">/api/v2/facts?first=7</a> selecteer 7 <em>facts</em>.
	</li>
	<li>
		<a href="/api/v2/facts?first=20&skip=20">/api/v2/facts?first=20&skip=20</a>, selecteer 20
		<em>facts</em> en sla de eerste 20 over. Met andere woorden, selecteer pagina 2.
	</li>
	<li>
        <a href="/api/v2/facts?orderBy=answer&direction=ASC">/api/v2/facts?orderBy=answer&direction=ASC</a>, sorteer <em>fact</em> op basis van answer.
    </li>
</ul>

<h3>POST</h3>
<p>Voeg een nieuwe Fact toe die gekoppeld is aan Question (via de id van de Question) & aan Player (via de id van de Player)</p>
<p>Haal hier alle Questions met bijbehorende id's op: /api/v2/questions</p>
<p>Haal hier alle Players met bijbehorende id's op: /api/v2/players</p>

<p>De volgende structuur is vereist:</p>

<pre><code>&lbrace;
	"answer": "For fun!",
    "question": "clgqw2if61cur0bwc7ebvkofr", <span>// Question id</span>
    "reference": "clhao1v92474p0bw1376viwz7" <span>// Player id</span>
&rbrace;</code></pre>

<ul><li>
	<a href="/api/v2/facts">/api/v2/facts</a>
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
	span{
		color: rgb(7, 198, 7);
	}
</style>