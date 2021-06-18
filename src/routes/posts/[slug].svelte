<script context="module">
	import { get } from '../_svx/pages';

	export const prerender = true;

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page: _page, fetch }) {
		const { slug } = _page.params;
		const post = await get(`/posts/${slug}`);
		return {
			props: {
				component: post.component,
				...post.metadata
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
