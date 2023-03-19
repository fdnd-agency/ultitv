<script>
	import { Documentation} from '@fdnd/components';

	const data = {
		Players: {
			GET: '/docs/players#get'
		},
		Questions: {
			GET: '/docs/questions#get',
			POST: '/docs/questions#post'
		}
		
	};
</script>

<Documentation {data}>
	<slot />
</Documentation>
