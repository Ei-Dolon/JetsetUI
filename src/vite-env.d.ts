// Provide minimal global ImportMeta/ImportMetaEnv declarations so
// `import.meta.env` is recognized by TypeScript even if the Vite types
// (or vite-plus wrapper types) aren't present to the compiler.
interface ImportMetaEnv {
	readonly VITE_JETSETUI_WC_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	ethereum?: any;
}

declare module '*.css';
