//_ ./components/PortfolioBalances.tsx
import { useState, useEffect, useMemo } from 'react';
import { useConnection, useBalance, useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import { jetsetABI } from '../config/abi';
import { CONSTS } from '../config/consts';
import './PortfolioBalances.css';
import BnbIcon from '../assets/icons/BNB.svg';
import JtsIcon from '../assets/icons/jetset.svg';

interface PriceData {
	binancecoin?: Record<string, number>;
	jetset?: Record<string, number>;
}
export type FiatKey = 'usd' | 'gbp' | 'eur';

// Define the lookup dictionary
export const FIAT_SYM: Record<FiatKey, string> = { usd: '$', gbp: '£', eur: '€' };

interface PortfolioBalancesProps {
	selFiat: FiatKey;
}

export default function PortfolioBalances({ selFiat }: PortfolioBalancesProps) {
	const { address, isConnected } = useConnection();

	const [bnbPrice, setBnbPrice] = useState<number>(0);
	const [jetsetPrice, setJetsetPrice] = useState<number>(0);

	// Native BNB balance
	const { data: bnbBalanceData, isLoading: isBnbLoading } = useBalance({ address, chainId: CONSTS.BSC_CHAIN_ID });

	// JTS token balance
	const {
		data: jetsetRaw,
		error: jetsetError,
		isPending: isJetsetPending,
	} = useReadContract({
		address: CONSTS.JTS_ADDR,
		abi: jetsetABI,
		functionName: 'balanceOf',
		args: address ? [address] : undefined,
		query: { enabled: !!address && isConnected },
	});

	// Load prices from localStorage
	useEffect(() => {
		const loadPrices = () => {
			try {
				const raw = localStorage.getItem('priceData');
				if (!raw) return;

				const parsed: PriceData = JSON.parse(raw);

				const priceBnb = parsed?.binancecoin?.[selFiat];
				if (priceBnb) setBnbPrice(priceBnb);

				const priceJts = parsed?.jetset?.[selFiat];
				if (priceJts) setJetsetPrice(priceJts);
			} catch (err) {
				console.error('Failed to parse priceData from localStorage:', err);
			}
		};

		loadPrices();

		const handleStorage = (e: StorageEvent) => {
			if (e.key === 'priceData') loadPrices();
		};
		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, [selFiat]);

	const bnbBalanceFormatted = useMemo(() => {
		if (!bnbBalanceData?.value) return '0';
		return parseFloat(formatEther(bnbBalanceData.value)).toFixed(4);
	}, [bnbBalanceData]);

	const jetsetBalanceFormatted = useMemo(() => {
		if (!jetsetRaw) return '0';
		return parseFloat(formatEther(jetsetRaw)).toFixed(4);
	}, [jetsetRaw]);

	const bnbFiatValue = useMemo(() => {
		const bal = parseFloat(bnbBalanceFormatted);
		return (bal * bnbPrice).toFixed(2);
	}, [bnbBalanceFormatted, bnbPrice]);

	const jetsetFiatValue = useMemo(() => {
		const bal = parseFloat(jetsetBalanceFormatted);
		return (bal * jetsetPrice).toFixed(2);
	}, [jetsetBalanceFormatted, jetsetPrice]);

	const totalFiat = useMemo(() => {
		return (parseFloat(bnbFiatValue) + parseFloat(jetsetFiatValue)).toFixed(2);
	}, [bnbFiatValue, jetsetFiatValue]);

	if (!isConnected || !address) {
		return <div className="portfolio-disconnected">Please reconnect your wallet.</div>;
	}

	if (isBnbLoading || isJetsetPending) {
		return <div className="portfolio-loading">Loading balances...</div>;
	}

	if (jetsetError) {
		console.error('Jetset balance error:', jetsetError);
	}

	return (
		<div className="metal-card">
			{/* Total row */}
			<div className="portfolio-total">
				<h2>
					Total Portfolio Value: {FIAT_SYM[selFiat]} {totalFiat}
				</h2>
				<h3></h3>
			</div>
			<div className="asset-row">
				{/* Row 1: Icon + Name / Balance + Symbol */}
				<div className="asset-row-header">
					<div className="asset-info">
						<img
							src={BnbIcon}
							alt="BNB"
							className="asset-icon"
						/>
						<span className="asset-name"> BNB </span>
					</div>

					<div className="asset-balance">
						{bnbBalanceFormatted} <span className="asset-symbol">BNB</span>
					</div>
				</div>

				{/* Row 2: Fiat value */}
				<div className="asset-fiat">
					{bnbFiatValue} {selFiat.toUpperCase()}
				</div>
			</div>

			<div className="asset-row">
				{/* Row 1: Icon + Name / Balance + Symbol */}
				<div className="asset-row-header">
					<div className="asset-info">
						<img
							src={JtsIcon}
							alt="Jetset"
							className="asset-icon"
						/>
						<span className="asset-name"> JETSET </span>
					</div>

					<div className="asset-balance">
						{jetsetBalanceFormatted} <span className="asset-symbol">JTS</span>
					</div>
				</div>

				{/* Row 2: Fiat value */}
				<div className="asset-fiat">
					{jetsetFiatValue} {selFiat.toUpperCase()}
				</div>
			</div>
		</div>
	);
}
