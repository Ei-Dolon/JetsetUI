//_ WalletLabel0.tsx
import { useConnection } from 'wagmi';
import { getAddress } from 'viem';
import { truncateAddress, toCaip10 } from '../config/util';
import BscIcon from '../assets/icons/bsc.svg';

export default function WalletLabel() {
	const { address, connector, isConnected, chainId } = useConnection();

	// Early exit for disconnected or incomplete state
	if (!isConnected || !address || !chainId) return null;

	// Derived values
	const checksummed = getAddress(address);
	const truncated = truncateAddress(checksummed);
	const caip10 = toCaip10(checksummed, chainId);

	return (
		<div className="metal-card">
			<div>
				<span className="label">Chain: </span>
				<img
					src={BscIcon}
					alt="BNB Smart Chain"
					className="chain-icon"
				/>
				BNB Smart Chain
				<br />
				<br />
			</div>
			<div className="row">
				<span className="label">Account ID: </span>
				{caip10}
				<br />
				<br />
			</div>
			<div className="row">
				<span className="label">Wallet: </span>
				{connector?.name}
			</div>

			<div className="row">
				<span className="label">Wallet address: </span>
				{truncated}
			</div>
		</div>
	);
}
