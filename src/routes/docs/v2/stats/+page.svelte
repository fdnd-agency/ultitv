<h2>Stats</h2>

<h3>GET</h3>

<p>
	Een gepagineerd overzicht van alle <em>stats</em> met een aantal in te stellen
	opties welke als url parameter meegestuurd kunnen worden. Standaard worden de laatst toegevoegde
	vijf <em>stats</em> ingeladen maar dit aantal en het aantal <em>stats</em> dat geskipt worden kunnen worden ingesteld.
</p>

<h4>Url parameters:</h4>
<ul>
	<li>
		<strong>first</strong>, een getal tussen 0-100 waarmee het aantal op te halen
		<em>stats</em> wordt ingesteld.
	</li>
	<li>
		<strong>skip</strong>, een getal waarmee een aantal <em>stats</em> in de selectie worden overgeslagen.
		Dit is handig voor het instellen van paginering.
	</li>
    <li>
        <strong>id</strong>, het id van de te selecteren <em>stats</em>.
    </li>
</ul>

<h4>Voorbeeld Requests:</h4>
<ul>
	<li>
		<a href="/api/v2/stats">/api/v2/stats</a>, selecteer 5 <em>stats</em>.
	</li>
	<li>
		<a href="/api/v2/stats?first=7">/api/v2/stats?first=7</a> selecteer 7 <em>stats</em>.
	</li>
	<li>
		<a href="/api/v2/stats?first=20&skip=20">/api/v2/stats?first=20&skip=20</a>, selecteer 20
		<em>stats</em> en sla de eerste 20 over. Met andere woorden, selecteer pagina 2.
	</li>
    <li>
        <a href="/api/v2/stats?id=123">/api/v2/stats?id=123</a>, selecteer <em>stats</em> op basis van id.
    </li>
</ul>

<h3>POST</h3>
<p>Voeg een nieuw Point toe aan Stats</p>

<p>De volgende structuur is vereist:</p>

<pre><code>&lbrace;
	"startedOnOffence" : "clgqvvl3t1doq0bw9ig7aqct5", <span>// Team id</span>
	"startedOnDefence" : "clgr5v9is1tn10bw9hm2lx5xw", <span>// Team id</span>
	"scored" : "clgqvvl3t1doq0bw9ig7aqct5", <span>// Team id</span>
	"team1Score" : 4,
	"team2Score" : 4,
	"scoredBy" : "clhgs1bbv33wk0aw05juthkgo", <span>// Player id</span>
	"assistBy" : "clhgs4hwp346t0bw5wg091gqv", <span>// Player id</span>
	"team1Class" : "hold",
	"team1OorD" : "O",
	"team2Class" : "conceded",
	"team2OorD" : "D",
	"stat" : "clhgruvjx337r0bw52z76h6ye" <span>// Stat id</span>
&rbrace;</code></pre>

<ul><li>
	<a href="/api/v2/stats">/api/v2/stats</a>
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