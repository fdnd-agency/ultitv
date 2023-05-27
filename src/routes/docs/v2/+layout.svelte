<script>
	import { Documentation} from '@fdnd/components';

	const data = {
		Players: {
			GET: '/docs/v2/players#get',
			POST: '/docs/v2/players#post'
		},
		Teams: {
			GET: '/docs/v2/teams#get',
			POST: '/docs/v2/teams#post'
		},
		Questions: {
			GET: '/docs/v2/questions#get',
			POST: '/docs/v2/questions#post'
		},
		Facts: {
			GET: '/docs/v2/facts#get',
			POST: '/docs/v2/facts#post'
		},
		Games: {
			GET: '/docs/v2/games#get'
		},
		Stats: {
			GET: '/docs/v2/stats#get',
			POST: '/docs/v2/stats#post'
		}
	};
</script>

<Documentation {data}>
	<slot />
</Documentation>
