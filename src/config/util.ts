//_ src/config/util.ts

export function truncateAddress(address?: string): string {
	if (!address) return '';
	const lower = address.toLowerCase();
	return `${lower.slice(0, 7)}…${lower.slice(-5)}`;
}

export function toCaip10(address: string, chainId: number): string {
	return `eip155:${chainId}:${address}`;
}

export function getWalletName(connectorId?: string): string {
	if (!connectorId) return 'Unknown';

	// Handle injected wallets with heuristics
	if (connectorId === 'injected') {
		const eth = (window as any)?.ethereum;

		if (eth?.isBraveWallet) return 'Brave Wallet';
		if (eth?.isMetaMask) return 'MetaMask';
		if (eth?.isCoinbaseWallet) return 'Coinbase Wallet';
		if (eth?.isTrust) return 'Trust Wallet';
		if (eth?.isOpera) return 'Opera Wallet';

		return 'Injected Wallet (unknown)';
	}

	// Known connector IDs from wagmi ecosystem
	const map: Record<string, string> = {
		metaMask: 'MetaMask',
		walletConnect: 'WalletConnect',
		coinbaseWallet: 'Coinbase Wallet',
		ledger: 'Ledger',
		trezor: 'Trezor',
	};

	return map[connectorId] ?? 'Unknown';
}
