import { defineConfig } from 'vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default defineConfig({
	build: {
		// minify: 'terser',
		// sourcemap: true,
		lib: {
			entry: resolve('.', 'main.js'), // 配置入口文件路径
			name: 'aero-sparkles',
			fileName: 'index',
			formats: ['es', 'umd'], // 打包生成的格式
		},
	},
});
