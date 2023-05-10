<script>
	import { Documentation} from '@fdnd/components';

	const data = {
		Players: {
			GET: '/docs/v1/players#get',
			POST: '/docs/v1/players#post'
		},
		Questions: {
			GET: '/docs/v1/questions#get'
			
		}
		
	};
</script>

<Documentation {data}>
	<slot />
</Documentation>
