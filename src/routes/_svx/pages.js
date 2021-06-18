// pull in pages content
// https://vitejs.dev/guide/features.html#glob-import
const files = import.meta.glob('../../../content/**/*.svx');
export const pages = Object.entries(files).map(([path, page]) => {
	return {
		component: page,
		slug: path.replace('../../../content', '').replace(/\.(svx)$/, '')
	};
});

export async function get(url) {
	const page = pages.find(({ slug }) => slug === url);
	let component, metadata, slug;
	if (page) {
		slug = page.slug;
		const parsed = await page.component();
		component = parsed.default;
		metadata = parsed.metadata;
	}
	return {
		slug,
		component,
		metadata
	};
}
