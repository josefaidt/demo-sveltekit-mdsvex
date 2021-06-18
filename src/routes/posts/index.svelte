<script context="module">
	export const prerender = true;

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page: _page, fetch }) {
		const { pages } = await import('../_svx/pages');
		const filtered = pages.filter(({ slug }) => slug.startsWith('/posts'));
		const posts = [];
		// generate content for each post
		for await (let post of filtered) {
			const parsed = await post.component();
			posts.push({
				slug: post.slug,
				...parsed
			});
		}
		// when building, only use published posts
		if (import.meta.env.PROD) {
			return {
				props: {
					posts: posts.filter(({ metadata }) => metadata.published)
				}
			};
		} else {
			return {
				props: {
					posts
				}
			};
		}
	}
</script>

<script>
	export let posts = [];
</script>

<svelte:head>
	<title>Posts</title>
</svelte:head>
<h1>Posts</h1>
<ul>
	{#each posts as post, index (index)}
		<li>
			<a href={post.slug} sveltekit:prefetch>{post.metadata.title}</a>
		</li>
	{/each}
</ul>
