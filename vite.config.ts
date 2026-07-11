import { defineConfig } from 'vite-plus';
import { version } from './package.json';

export default defineConfig({
	staged: { 'src/**/*.{ts,tsx,js,jsx}': 'vp check --fix' },
	fmt: {
		ignorePatterns: ['dist/**'],
		printWidth: 100,
		tabWidth: 4,
		useTabs: true,
		trailingComma: 'es5',
		semi: true,
		singleQuote: true,
		quoteProps: 'consistent',
		objectWrap: 'collapse',
		singleAttributePerLine: true,
		bracketSameLine: true,
		bracketSpacing: true,
		endOfLine: 'lf',
		insertFinalNewline: true,
		sortPackageJson: true,
		overrides: [
			{ files: ['**/*.json'], options: { trailingComma: 'none' } },
			{
				files: ['**/*.md'],
				options: { proseWrap: 'preserve', embeddedLanguageFormatting: 'auto' },
			},
		],
	},
	lint: {
		ignorePatterns: ['dist/**'], // 'node_modules/**' is safely ignored by default
		options: { typeAware: true, typeCheck: true },
		rules: {
			'no-console': ['error', { allow: ['error'] }],
			'vite-plus/prefer-vite-plus-imports': 'error',
		},
		jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
	},
	run: {
		tasks: {
			'fetch:prices': {
				// Runs a lightweight Node native fetch operation
				command: 'node ./src/config/fetchPriceData.js',
			},
		},
	},
	plugins: [
		{
			name: 'html-transform',
			transformIndexHtml(html) {
				return html.replace(
					/<title>(.*?)<\/title>/,
					`<title>JetsetUI v${version} - Jetset DApps Frontend</title>`
				);
			},
		},
	],
	server: { port: 5173, strictPort: true },
	build: { sourcemap: true },
	preview: { port: 8080 },
});
