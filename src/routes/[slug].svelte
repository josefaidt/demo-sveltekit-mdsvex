<script context="module">
	import { get } from './_svx/pages';

	export const prerender = true;

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page: _page, fetch }) {
		const { slug } = _page.params;
		const page = await get(`/${slug}`);
		return {
			props: {
				component: page.component,
				...page.metadata
			}
		};
	}
</script>

<script>
	export let component;
	export let title;
	export let description;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<svelte:component this={component} />
