//_ src/config/initStorage.ts
import type { PriceMatrix } from './types';

export async function initializeDAppStorage(): Promise<void> {
	const appVersion = import.meta.env.VITE_APP_VERSION;

	// Check if device has initialized before
	if (localStorage.getItem(appVersion)) return;

	const res = await fetch('/priceData.json');
	if (!res.ok) {
		throw new Error(`Unable to load /priceData.json: ${res.status}`);
	}
	const defaultPrices = (await res.json()) as PriceMatrix;

	// Generate clean ISO 8601 UTC timestamp: YYYYMMDDThhmmssZ
	const cleanTimestamp = new Date().toISOString().replace(/[-:]|\.\d{3}/g, '');

	// Set device-level defaults
	localStorage.setItem('jetsetui_version', appVersion);
	localStorage.setItem('priceData_version', cleanTimestamp);
	localStorage.setItem('boolSound', 'true'); // Stored as standard boolean string
	localStorage.setItem('theme', 'dark');
	localStorage.setItem('selFiat', 'usd');
	localStorage.setItem('priceData', JSON.stringify(defaultPrices));
}
