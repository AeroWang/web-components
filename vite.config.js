import { defineConfig } from 'vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default defineConfig({
	build: {
		lib: {
			entry: {
				// eslint-disable-next-line no-undef
				a_sparkles: resolve(__dirname, 'components/Sparkles/index.js'),
			},
			name:'aw_components',
			fileName: (format, name) => {
				return `components/${name}.${format}.js`;
			},
			formats: ['es', 'umd', 'iife']
		},
	}
});
