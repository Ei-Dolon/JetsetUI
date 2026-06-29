import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_URL =
	'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,jetset&vs_currencies=usd,gbp,eur';
const OUTPUT_PATH = path.resolve(__dirname, '../assets/priceData.json');
const META_PATH = path.resolve(__dirname, '../assets/priceMeta.json');

function getUtcTimestampString() {
	return new Date().toISOString().replace(/[-:]/g, '').replace('.000', '');
}

async function downloadPriceData() {
	try {
		console.log('[Vite+] Fetching deployment price data...');
		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error(`HTTP status: ${response.status}`);
		}

		const data = await response.json();
		const metaPayload = { version: getUtcTimestampString() };

		// Write out the raw structural output to your source layout
		fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 0), 'utf-8');
		fs.writeFileSync(META_PATH, JSON.stringify(metaPayload, null, 0), 'utf-8');
		console.log('priceData.json generated successfully!');
	} catch (error) {
		console.error('Failed to pull price data:', error);
		process.exit(1);
	}
}

void downloadPriceData();
