//_ src/config/types.ts
/**
 * @fileoverview JetsetUI centralised type registry
 * @module config/types
 * @description Single source of truth for all shared types, constants,
 * and discriminated unions across the JetsetUI dApp.
 *
 * Data Dictionary:
 * +--------------------------------------------------------------------------+
 * ¦ Type          ¦ Shape        ¦ Purpose                                    ¦
 * +---------------+--------------+--------------------------------------------¦
 * ¦ PriceData     ¦ object       ¦ CoinGecko multi-currency price snapshot    ¦
 * ¦ PriceResponse ¦ object       ¦ Enriched cache envelope with age metadata  ¦
 * ¦ FiatCurrency  ¦ union string ¦ Display currency selector (USD/GBP/EUR)    ¦
 * +--------------------------------------------------------------------------+
 */

// Global/External type placeholders if not imported
type Address = string;

// Token Data
export interface TokenData {
	contractAddress: Address;
	/** ERC-20 / BEP-20 name field, e.g. "Jetset" */
	readonly name: string;
	/** Branded 1-6 uppercase letters, e.g. "JTS" */
	readonly symbol: TokenSymbol;
	/** On-chain decimals (uint8), e.g. 18 */
	readonly decimals: number;
	/** CoinGecko API id for price lookups */
	readonly coingeckoId: CoinGeckoId;
	/** Absolute URL to the token's display icon */
	readonly icon?: string;
}

/** CoinGecko token identifiers used in API calls. Extend as you add tokens. */
export type CoinGeckoId = 'binancecoin' | 'jetset';

// --- Price Data
/* Example priceData.json file:
{"binancecoin":{"usd":624.01,"gbp":461.01,"eur":532.33},"jetset":{"usd":0.00010252,"gbp":7.572e-05,"eur":8.746e-05}}
*/
/** CoinGecko simple-price payload for BNB and JTS */
export interface PriceData {
	binancecoin: { usd: number; gbp: number; eur: number };
	jetset: { usd: number; gbp: number; eur: number };
}

/** Enriched response envelope with staleness metadata */
export interface PriceResponse {
	data: PriceData;
	/** ISO-8601 timestamp of the data origin */
	timestamp: string;
	/** True when data comes from a bundled fallback file */
	isFallback: boolean;
	/** Age of the data in whole minutes */
	ageMinutes: number;
}

// Token symbol — branded string (runtime-validated, TS-safe)
// Encodes the "1–6 uppercase ASCII letters" rule without a huge union type.
declare const _tokenSymbolBrand: unique symbol;

/** Opaque string that has been validated as 1-6 uppercase ASCII letters. */
export type TokenSymbol = string & { readonly [_tokenSymbolBrand]: never };

/** Validate and cast — throws on invalid input. */
export function asTokenSymbol(raw: string): TokenSymbol {
	if (!/^[A-Z]{1,6}$/.test(raw)) {
		throw new TypeError(`Invalid token symbol "${raw}" — must be 1-6 uppercase ASCII letters.`);
	}
	return raw as TokenSymbol;
}

// Fiat:

/** Supported fiat display currencies */
export type FiatCurrency = 'USD' | 'GBP' | 'EUR';

/** Lowercase key used to index into PriceData currency objects */
export type FiatKey = 'usd' | 'gbp' | 'eur';

/** Maps FiatCurrency to its unicode symbol */
export const FIAT_SYMBOL: Readonly<Record<FiatCurrency, string>> = { USD: '$', GBP: '£', EUR: '€' } as const;

/** Maps FiatCurrency to its PriceData key */
export const FIAT_KEY: Readonly<Record<FiatCurrency, FiatKey>> = { USD: 'usd', GBP: 'gbp', EUR: 'eur' } as const;

export const LOCALE_BY_FIAT: Record<FiatKey, string> = { usd: 'en-US', gbp: 'en-GB', eur: 'de-DE' } as const;

/** Human-readable display metadata for each supported fiat. */
export const FIAT_META = {
	usd: { symbol: '$', name: 'US Dollar' },
	gbp: { symbol: '£', name: 'British Pound' },
	eur: { symbol: '€', name: 'Euro' },
} as const satisfies Record<FiatKey, { symbol: string; name: string }>;

export interface PriceMatrix {
	binancecoin: Record<FiatKey, number>;
	jetset: Record<FiatKey, number>;
}

// Global DApp settings stored in localStorage
export interface DAppGlobalSettings {
	jetsetui_version: string;
	priceData_version: string;
	priceData: PriceMatrix;
	selFiat: FiatCurrency;
}
