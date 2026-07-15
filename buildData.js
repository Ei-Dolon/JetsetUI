import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json'), 'utf8'));
const API_URL =
	'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,jetset&vs_currencies=usd,gbp,eur';
const OUTPUT_PATH = path.resolve(__dirname, './src/assets/priceData.json');
const META_PATH = path.resolve(__dirname, './src/assets/priceMeta.json');

// produce a new UTC timestamp in a 12 character format YYYYMMDDHHmm
function getUtcTimestampString() {
	return new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
}

function updateEnvFile() {
	let envContent = '';
	if (fs.existsSync('.env')) {
		envContent = fs.readFileSync('.env', 'utf8');
	}
	// Replace existing version or append a new one
	const regex = /^VITE_APP_VERSION=.*$/m;
	const newline = `VITE_APP_VERSION="${pkg.version}"`;
	if (regex.test(envContent)) {
		envContent = envContent.replace(regex, newline);
	} else {
		envContent += `\n${newline}`;
	}
	fs.writeFileSync('.env', envContent.trim() + '\n');
}

async function getPriceData() {
	try {
		process.stdout.write('[Vite+] Fetching deployment price data...\n');
		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error(`HTTP status: ${response.status}`);
		}

		const data = await response.json();
		const metaPayload = { priceData_version: getUtcTimestampString() };

		// Write out the raw structural output to your source layout
		fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 0), 'utf-8');
		fs.writeFileSync(META_PATH, JSON.stringify(metaPayload, null, 0), 'utf-8');
		process.stdout.write('priceData.json generated successfully!\n');
	} catch (error) {
		process.stderr.write('Failed to pull price data:' + error.message + '\n');
		process.exit(1);
	}
}

updateEnvFile();
void getPriceData();
