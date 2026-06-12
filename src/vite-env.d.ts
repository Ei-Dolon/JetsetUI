/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_JETSETUI_WC_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	ethereum?: any;
}
