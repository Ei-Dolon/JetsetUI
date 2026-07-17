//_ WalletLabel0.tsx
import { useConnection } from 'wagmi';
import { getAddress } from 'viem';

import { truncateAddress, toCaip10, getWalletName } from '../config/util';
import BscIcon from '../assets/icons/bsc.svg';

export default function WalletLabel() {
	const { address, connector, isConnected, chainId } = useConnection();

	// Early exit for disconnected or incomplete state
	if (!isConnected || !address || !chainId) return null;

	// Derived values
	const checksummed = getAddress(address);
	const truncated = truncateAddress(checksummed);
	const caip10 = toCaip10(checksummed, chainId);
	const walletName = getWalletName(connector?.id ?? 'unknown');

	return (
		<div className="wallet-label">
			<div className="row">
				<span className="label">Chain:</span>
				<span className="chain-icon">{BscIcon}</span>
				BNB Smart Chain
			</div>

			<div className="row">
				<span className="label">Wallet address:</span>
				{truncated}
			</div>

			<hr />

			<div className="row">
				<span className="label">Wallet:</span>
				{walletName}
			</div>

			<div className="row">
				<span className="label">Account ID:</span>
				{caip10}
			</div>
		</div>
	);
}
