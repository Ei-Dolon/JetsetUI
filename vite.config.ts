import { defineConfig } from 'vite-plus';
import pkg from './package.json';

const pureAnnotationCompatPlugin = () => ({
	name: 'pure-annotation-compat',
	transform(code: string, id: string) {
		if (!/[\\/]node_modules[\\/]ox[\\/]/.test(id)) {
			return null;
		}

		if (!code.includes('/*#__PURE__*/')) {
			return null;
		}

		return code.replace(/\/\*#__PURE__\*\//g, '');
	},
});

export default defineConfig({
	base: '/dapp/jetsetui/',
	define: {
		// This injects the version key directly into Vite's environment compilation step
		'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
	},

	staged: {
		// Cleaner, native hook execution path for Vite+
		'*': 'vp check --fix',
	},

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

	plugins: [
		pureAnnotationCompatPlugin(),
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

	build: { sourcemap: false },
	preview: { port: 8080 },
});
