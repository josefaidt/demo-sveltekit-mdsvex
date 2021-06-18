import { resolve } from 'path';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter()
	},
	preprocess: [
		mdsvex({
			layout: resolve('src/routes/_svx/index.svelte')
		})
	]
};

export default config;
