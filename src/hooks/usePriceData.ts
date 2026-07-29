//_ src/hooks/usePriceData.ts
/** @module hooks/usePriceData
 * Seeds the 'priceData' query with the build-time snapshot so the first render
 * never shows a loading state. TanStack Query decides whether that seed is
 * stale (age vs staleTime) and silently refetches in the background if so.
 */
import { useQuery } from '@tanstack/react-query';
import buildTimePriceData from '../assets/priceData.json';
import buildTimeMeta from '../assets/priceMeta.json';
import type { PriceData } from '../config/types';
import { CONSTS } from '../config/consts';

export const PRICE_DATA_KEY = ['priceData'] as const;
const MINUTE = 1000 * 60;

/** @module getPriceData
 * @description Resolves current BNB/JTS fiat prices with a three-tier fallback:
 *  Tier 1: live CoinGecko fetch (client-direct).
 *  Tier 2: /dapp/public/priceData.json + priceMeta.json — refreshed by
 *          server-side CRON + PHP + cURL every 10 minutes, independent of
 *          the DApp, so reliably near-fresh even though it's a "fallback".
 *  Tier 3: localStorage 'priceData' / 'priceData_version' — last resort for
 *          a fully offline device where even the host fetch fails. This is
 *          only ever as fresh as the last successful Tier 1 or Tier 2 write.
 * @returns {Promise<PriceData>} resolved price data, from whichever tier succeeded
 */
export async function getPriceData(): Promise<PriceData> {
	// Tier 1 — CoinGecko
	try {
		const res = await fetch(CONSTS.cg_URL);
		if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
		const data: PriceData = await res.json();
		try {
			localStorage.setItem('priceData_version', new Date().toISOString());
			localStorage.setItem('priceData', JSON.stringify(data));
		} catch {
			// incognito/private/quota — ignore, data still returns below
		}
		return data;
	} catch {
		// fall through to Tier 2
	}

	// Tier 2 — host-mirrored files, cron-refreshed every 10 minutes
	try {
		const [priceRes, metaRes] = await Promise.all([
			fetch('https://jetsettoken.com/dapp/public/priceData.json'),
			fetch('https://jetsettoken.com/dapp/public/priceMeta.json'),
		]);
		if (!priceRes.ok || !metaRes.ok) throw new Error('host mirror unavailable');
		const data: PriceData = await priceRes.json();
		const meta: { priceData_version: string } = await metaRes.json();
		try {
			localStorage.setItem('priceData_version', meta.priceData_version);
			localStorage.setItem('priceData', JSON.stringify(data));
		} catch {}
		return data;
	} catch {
		// fall through to Tier 3
	}

	// Tier 3 — localStorage, last resort (fully offline)
	try {
		const cached = localStorage.getItem('priceData');
		if (cached) return JSON.parse(cached) as PriceData;
	} catch {
		// storage unavailable or corrupt — nothing left to try
	}

	throw new Error('priceData unavailable: CoinGecko, host mirror, and localStorage all failed');
}

export function usePriceData() {
	return useQuery<PriceData>({
		queryKey: PRICE_DATA_KEY,
		queryFn: getPriceData,
		initialData: buildTimePriceData as PriceData,
		initialDataUpdatedAt: new Date(buildTimeMeta.priceData_version).getTime(),
		refetchInterval: 10 * MINUTE,
		staleTime: 10 * MINUTE,
	});
}
