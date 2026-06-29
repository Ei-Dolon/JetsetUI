//_ src/config/types.ts

export type FiatCurrency = 'usd' | 'gbp' | 'eur';

export interface PriceMatrix {
	binancecoin: Record<FiatCurrency, number>;
	jetset: Record<FiatCurrency, number>;
}

// Global DApp settings stored in localStorage
export interface DAppGlobalSettings {
	jetsetui_version: string;
	priceData_version: string;
	priceData: PriceMatrix;
	selFiat: FiatCurrency;
}

export interface Settings {
	selFiat: FiatCurrency;
}
