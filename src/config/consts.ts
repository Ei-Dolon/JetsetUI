//_ Project constants
export const CONSTS = {
	// const.ts - public constants for Jetset and its DApps - JetsetUI, TipTap ...

	// Jetset BEP-20 token v1 contract address 2021-11-28 to 2022-09-26
	JTS_V1_ADDR: '0xbf675ed044f2092a4f004aa5709bfa858641ce8b',

	//Jetset BEP-20 token v2 contract address
	JTS_ADDR: '0x405be90996e7f995a08c2fbd8d8822ef5b03466c',
	JTS_NAME: 'Jetset',
	JTS_SYMBOL: 'JTS',
	JTS_DECIMALS: 18,

	// BNB Smart Chain (BSC) ID: 56 || 0x38, Native token: BNB, Symbol BNB, Decimals 18
	BSC_CHAIN_ID: 0x38,
	BSC_RPC: 'https://bsc-dataseed1.binance.org/',
	BSC_RPC2: 'https://rpc.ankr.com/bsc',
	BSC_NAME: 'BNB Smart Chain',
	BSC_SYMBOL: 'BNB',
	BSC_DECIMALS: 18,
	BSC_EXPLORER: 'https://bscscan.com/',

	// DApp MetaInfo
	DAPP_NAME: 'JetsetUI',
	DAPP_DESCRIPTION: 'Jetset DApp Frontend',
	DAPP_URL: 'https://jetsettoken.com/dapp/jetsetui/',
	JETSETUI_SVG_URL: 'https://jetsettoken.com/dapp/public/jetset.svg',
	JETSETUI_ICO_URL: 'https://jetsettoken.com/dapp/jetsetui/public/favicon.ico',
	DAPP_NETLIFY_URL: 'https://jetsetui.netlify.app/',
	DAPP_RENDER_URL: 'https://jetsetui.onrender.com/',
	JETSETUI_WC_ID: import.meta.env.VITE_JETSETUI_WC_ID,
	cg_PRICEDATA_URL: 'https://jetsettoken.com/dapp/public/priceData.json',
	cg_PRICEMETA_URL: 'https://jetsettoken.com/dapp/public/priceMeta.json',
	cg_URL: 'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,jetset&vs_currencies=usd,gbp,eur',
} as const;
