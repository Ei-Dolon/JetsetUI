//_ src/hooks/usePriceData.ts
/**
 * @module hooks/usePriceData
 * @description Fetches BNB/Jetset fiat prices with a two-tier network
 * fallback: CoinGecko live, then the CRON-refreshed host mirror. If both
 * fail, throws — React Query then automatically keeps serving the last
 * cached value (seeded from build-time data via initDApp's
 * setQueryDefaults, or whatever was last successfully fetched).
 * Updates localStorage's priceData + priceData_version after
 * any successful fetch (from either tier).
 *  Storage writes must never throw into the query pipeline.
 */
import { useQuery } from '@tanstack/react-query';
import type { PriceData, PriceMeta } from '../config/types';
import { CONSTS } from '../config/consts';

/**
 * @function persistPriceData
 * @description Updates localStorage's priceData + priceData_version after
 * any successful fetch (from either tier). Wrapped in try/catch per project
 * convention — storage writes must never throw into the query pipeline.
 */
function persistPriceData(data: PriceData, version: string): void {
	try {
		localStorage.setItem('priceData', JSON.stringify(data));
		localStorage.setItem('priceData_version', version);
	} catch {
		// Private/incognito or storage disabled — non-fatal.
	}
}

/**
 * @function fetchPriceData
 * @description Tier 1: CoinGecko live. Tier 2: host mirror (priceData.json
 * + priceMeta.json, refreshed by CRON every 10 min). Throws only if both
 * fail — React Query's cache (seeded/initialData) is the implicit final
 * fallback and needs no handling here.
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
async function getPriceData(): Promise<PriceData> {
	// Tier 1 — CoinGecko
	try {
		const res = await fetch(CONSTS.cg_URL);
		if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
		const data: PriceData = await res.json();
		persistPriceData(data, new Date().toISOString());
		return data;
	} catch {
		// Fall through to host mirror — CoinGecko rate-limited or unreachable.
	}

	// Tier 2 — host-mirrored files, cron-refreshed every 10 minutes
	try {
		const [priceRes, metaRes] = await Promise.all([fetch(CONSTS.cg_PRICEDATA_URL), fetch(CONSTS.cg_PRICEMETA_URL)]);
		if (!priceRes.ok || !metaRes.ok) throw new Error('Host mirror fetch failed');
		const data: PriceData = await priceRes.json();
		const meta: PriceMeta = await metaRes.json();
		persistPriceData(data, meta.priceData_version);
		return data;
	} catch {
		// Both tiers exhausted.
	}

	throw new Error('priceData unavailable: CoinGecko, host mirror, and localStorage all failed');
}

/**
 * @function usePriceData
 * @description Access pattern: usePriceData().data?.jetset.usd,
 * usePriceData().data?.binancecoin.gbp. initialData/initialDataUpdatedAt
 * come from initDApp's setQueryDefaults — do not redeclare them here, or
 * they'll override the build-time seed's real timestamp on every mount.
 */
export function usePriceData() {
	return useQuery({ queryKey: ['priceData'], queryFn: getPriceData });
}
