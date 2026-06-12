// src/config/config.ts
import { createConfig, http, createStorage, fallback } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { CONSTS } from './consts.ts';

declare module 'wagmi' {
	interface Register {
		config: typeof config;
	}
}

const projectId = import.meta.env.VITE_JETSETUI_WC_ID;
if (!projectId) {
	throw new Error('WalletConnect Project ID missing — check cloud.reown.com');
}

// SSR/Netlify-safe storage (harmless guard for a Vite SPA, good habit)
const storage =
	typeof window !== 'undefined' ? createStorage({ storage: window.localStorage }) : undefined;

export const connectors = [
	// EIP-6963 handles MetaMask, Brave, Trust, etc.
	// injected() here covers wallets that only announce via window.ethereum
	// (pre-EIP-6963 fallback). No shimDisconnect — removed in wagmi v2.
	injected(),

	walletConnect({
		projectId,
		metadata: {
			name: CONSTS.DAPP_NAME,
			description: CONSTS.DAPP_DESCRIPTION,
			url: CONSTS.DAPP_URL,
			icons: [CONSTS.JETSETUI_SVG_URL],
		},
		showQrModal: true,
	}),

	// metaMask() removed — multiInjectedProviderDiscovery: true means MetaMask self-announces via EIP-6963

	coinbaseWallet({ appName: CONSTS.DAPP_NAME, appLogoUrl: CONSTS.JETSETUI_SVG_URL }),
];

export const config = createConfig({
	storage,
	multiInjectedProviderDiscovery: true,
	chains: [bsc],
	connectors,
	transports: {
		// fallback() tries each URL in order, moves to next on failure.
		[bsc.id]: fallback([
			http('https://rpc.ankr.com/bsc'),
			http('https://bsc-dataseed1.binance.org'),
			http('https://bsc-dataseed2.defibit.io'),
			http('https://bsc-dataseed3.ninicoin.io'),
			http(),
		]),
	},
});
