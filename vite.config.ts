import { defineConfig } from 'vite-plus';
import { version } from './package.json';

export default defineConfig({
	define: { __APP_VERSION__: JSON.stringify(version) },
	plugins: [
		{
			name: 'html-transform',
			transformIndexHtml(html) {
				return html.replace(
					/<title>(.*?)<\/title>/,
					`<title>JetsetU v${version} - Jetset DApp Frontend</title>`
				);
			},
		},
	],
	staged: { 'src/**/*.{ts,tsx,js,jsx}': 'vp check --fix' },
	fmt: {
		ignorePatterns: ['**/*.md', 'node_modules/**', 'dist/**'],
		printWidth: 100,
		tabWidth: 4,
		useTabs: true,
		trailingComma: 'es5',
		singleQuote: true,
		quoteProps: 'consistent',
		objectWrap: 'collapse',
		singleAttributePerLine: true,
		bracketSameLine: false,
		semi: true,
		bracketSpacing: true,
		endOfLine: 'lf',
	},
	lint: {
		ignorePatterns: ['node_modules/**', 'dist/**'],
		jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
		rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
		options: { typeAware: true, typeCheck: true },
	},
});
