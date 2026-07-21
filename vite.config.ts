import { defineConfig } from 'vite-plus';
import pkg from './package.json';

export default defineConfig({
	base: './',
	define: {
		// This injects the version key directly into Vite's environment compilation step
		'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
	},
	staged: { '*': 'vp check --fix' },
	fmt: {
		ignorePatterns: ['dist/**'],
		printWidth: 120,
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
			{ files: ['**/*.md'], options: { proseWrap: 'preserve', embeddedLanguageFormatting: 'auto' } },
		],
	},
	lint: {
		ignorePatterns: ['dist/**'], // 'node_modules/**' is safely ignored by default
		options: { typeAware: true, typeCheck: true },
		rules: { 'no-console': ['error', { allow: ['error'] }], 'vite-plus/prefer-vite-plus-imports': 'error' },
		jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
	},
	plugins: [
		{
			name: 'html-transform',
			transformIndexHtml(html) {
				return html.replace(
					/<title>(.*?)<\/title>/,
					`<title>JetsetUI v${pkg.version} - Jetset DApps Frontend</title>`
				);
			},
		},
	],
	preview: { port: 8080 },

	build: {
		manifest: true,
		sourcemap: false,
		chunkSizeWarningLimit: 900,
		rolldownOptions: {
			output: {
				codeSplitting: {
					minSize: 20000,
					minShareCount: 1,
					groups: [
						{ test: /node_modules\/react(?:-dom)?\//, name: 'react' },
						{ test: /node_modules\/(wagmi|viem)\//, name: 'wallet' },
						{ test: /node_modules\/(connectkit)\//, name: 'connect' },
						{ test: /node_modules\/@tanstack\/react-query\//, name: 'query' },
						{ test: /node_modules\/(react-qr-code)\//, name: 'ui' },
					],
				},
			},
		},
	},
});
