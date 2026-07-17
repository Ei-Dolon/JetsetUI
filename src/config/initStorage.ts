//_ src/config/initStorage.ts
import priceData from '../assets/priceData.json';
import priceMeta from '../assets/priceMeta.json';

export function initStorage() {
	const appVersion = import.meta.env.VITE_APP_VERSION;

	// Check if device has initialized before
	if (localStorage.getItem(appVersion)) return;

	// Set device-level defaults
	localStorage.setItem('jetsetui_version', appVersion);
	localStorage.setItem('priceData_version', priceMeta.priceData_version);
	localStorage.setItem('priceData', JSON.stringify(priceData));
	localStorage.setItem('selFiat', 'usd');
}
