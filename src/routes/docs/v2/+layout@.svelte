<script>
	import { Documentation} from '@fdnd/components';

	const data = {
		Players: {
			GET: '/docs/v2/players#get'
		},
		Teams: {
			GET: '/docs/v2/teams#get'
		},
		Questions: {
			GET: '/docs/v2/questions#get'
		},
		Games: {
			GET: '/docs/v2/games#get'
		},
		Stats: {
			GET: '/docs/v2/stats#get'
		}
	};
</script>

<Documentation {data}>
	<slot />
</Documentation>
