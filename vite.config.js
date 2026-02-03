import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import PrerenderSPAPlugin from 'prerender-spa-plugin';

export default defineConfig({
	plugins: [
		react(),
		{
			...PrerenderSPAPlugin({
				staticDir: path.join(process.cwd(), 'dist'),
				routes: ['/', '/pricing', '/documentation', '/about', '/privacy', '/terms'],
			}),
			apply: 'build',
		},
	],

	base: './',

	build: {
		outDir: 'dist',
		emptyOutDir: true,
		manifest: true, // 👈 só isso
	},

	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
