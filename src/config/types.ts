//_ src/config/types.ts

export type Theme = 'dark' | 'light';
export type FiatCurrency = 'usd' | 'gbp' | 'eur';

export interface PriceMatrix {
	binancecoin: Record<FiatCurrency, number>;
	jetset: Record<FiatCurrency, number>;
}

/*// Global DApp settings stored in localStorage
export interface DAppGlobalSettings {
	jetsetui_version: string;
	priceData_version: string;
	priceData: PriceMatrix;
	boolSound: boolean;
	theme: Theme;
	selFiat: FiatCurrency;

}
 */
// Wallet-specific settings saved under the 0x address key
export interface WalletSettings {
	boolSound: boolean;
	theme: Theme;
	selFiat: FiatCurrency;
}
