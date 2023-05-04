<script>
	import { Branding, Wrapper, Nav } from '@fdnd/components';

	const nav = {
		Menu: {
			Home: '/',
			Docs: '/docs',
			DocsV2: '/docs/v2',
		}
	};
</script>

<Branding>
	<Wrapper>
		<Nav data={nav} />

		<slot />

	</Wrapper>
</Branding>

