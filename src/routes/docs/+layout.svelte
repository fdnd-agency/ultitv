<script>
	import { Documentation} from '@fdnd/components';

	const data = {
		Players: {
			GET: '/docs/players#get',
			POST: '/docs/players#post'
		},
		Questions: {
			GET: '/docs/questions#get'
			
		}
		
	};
</script>

<Documentation {data}>
	<slot />
</Documentation>
