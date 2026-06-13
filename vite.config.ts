import { defineConfig } from 'vite-plus';
import pkg from './package.json';

export default defineConfig({
  staged: { 'src/**/*.{ts,tsx,js,jsx}': 'vp check --fix' },
  fmt: {
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
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
	},
	define: {
    '__APP_VERSION__': JSON.stringify(pkg.version),
  },
});
