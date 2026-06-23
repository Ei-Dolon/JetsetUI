//_ src/env.d.ts
/// <reference types="vite-plus/client" />
// Provide minimal global ImportMeta/ImportMetaEnv declarations so
// `import.meta.env` is recognized by TypeScript even if the Vite types
// (or vite-plus wrapper types) aren't present to the compiler.
interface ImportMetaEnv {
	readonly VITE_JETSETUI_WC_ID: string;
	readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	ethereum?: any;
}

declare module '*.css';
declare module '@fontsource-variable/inter';
declare module '@fontsource-variable/inter/index.css';
