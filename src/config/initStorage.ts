//_ src/config/initStorage.ts

export async function initStorage() {
	const appVersion = import.meta.env.VITE_APP_VERSION;

	// Check if device has initialized before
	if (localStorage.getItem(appVersion)) return;

	const res = await fetch('/priceData.json');
	if (!res.ok) {
		throw new Error(`Unable to load priceData.json: ${res.status}`);
	}

	// Generate clean ISO 8601 UTC timestamp: YYYYMMDDhhmm
	const cleanTimestamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');

	// Set device-level defaults
	localStorage.setItem('jetsetui_version', appVersion);
	localStorage.setItem('priceData_version', cleanTimestamp);
	localStorage.setItem('priceData', JSON.stringify(res));
	localStorage.setItem('selFiat', 'usd');
}
