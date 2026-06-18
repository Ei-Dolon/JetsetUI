/*_ public/sw.js
/** Versioned asset cache for JetsetUI.
// ⚠️  RELEASE CHECKLIST — update CACHE_VERSION to match APP_VERSION in
//     src/config/version.ts and package.json on every release.
//
// Cache strategy:
//   Static assets  (JS, CSS, fonts, SVG, PNG, HTML)
//     → Cache-first with network fallback.
//       First request populates cache. Subsequent requests served from cache.
//       On version bump, new SW activates → old caches evicted → fresh fetch.
//
//   API / RPC calls, coingecko, external URLs
//     → Network-only (not intercepted).
//       Price data is handled by TanStack Query with its own stale logic.
//
// Lifecycle:
//   install  → cache critical shell assets; skipWaiting() for immediate takeover
//   activate → delete ALL caches not matching CACHE_VERSION; claim all clients
//   fetch    → serve from cache or fetch + cache (static only)
// ─────────────────────────────────────────────────────────────────────────────
*/
// ⚠️ Must stay in sync with APP_VERSION in src/config/version.ts
const CACHE_VERSION = 'jetsetui-v1.0.0';

// Assets to pre-cache on SW install (app shell).
// Vite output files use content hashes; list the stable paths only.
// The full asset list is populated at runtime via the fetch handler.
const SHELL_ASSETS = [
	'/',
	'/index.html',
	'/intro.mp4', // intro video — pre-cache for instant playback
	'/icons/jetset.svg',
];

// ── URL classification ────────────────────────────────────────────────────────
const CACHE_PATTERNS = [
	/\.(?:js|mjs|css|woff2?|ttf|otf|svg|png|jpg|webp|ico|mp4|webm)(\?.*)?$/,
	/^\/(?:index\.html)?$/,
];

const BYPASS_ORIGINS = [
	'api.coingecko.com',
	'rpc.ankr.com',
	'bsc-dataseed',
	'cloud.walletconnect.org',
	'relay.walletconnect.org',
];

function isCacheable(request) {
	if (request.method !== 'GET') return false;
	const url = new URL(request.url);
	if (BYPASS_ORIGINS.some((o) => url.hostname.includes(o))) return false;
	// Same-origin static assets only
	if (url.origin !== self.location.origin) return false;
	return CACHE_PATTERNS.some((re) => re.test(url.pathname));
}

// ── Install ───────────────────────────────────────────────────────────────────
// Pre-cache the app shell; take over immediately without waiting for old SW.
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE_VERSION)
			.then((cache) => cache.addAll(SHELL_ASSETS))
			.catch((err) => {
				// Non-fatal: some shell assets may 404 in dev. Log and continue.
				console.warn('[SW] Shell pre-cache partial failure:', err);
			})
	);
	self.skipWaiting();
});

// ── Activate ──────────────────────────────────────────────────────────────────
// Delete every cache that isn't the current version (old version caches).
// Then claim all open clients so they immediately use this SW.
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((k) => k.startsWith('jetsetui-') && k !== CACHE_VERSION)
						.map((k) => {
							console.info('[SW] Evicting old cache:', k);
							return caches.delete(k);
						})
				)
			)
			.then(() => self.clients.claim())
	);
});

// ── Fetch ─────────────────────────────────────────────────────────────────────
// Cache-first for static assets; network-only for everything else.
self.addEventListener('fetch', (event) => {
	if (!isCacheable(event.request)) return; // let browser handle normally

	event.respondWith(
		caches.open(CACHE_VERSION).then((cache) =>
			cache.match(event.request).then((cached) => {
				if (cached) return cached;

				// Not in cache — fetch from network, then store for next time.
				return fetch(event.request)
					.then((response) => {
						if (response.ok) {
							cache.put(event.request, response.clone());
						}
						return response;
					})
					.catch(() => {
						// Network failed and nothing cached — return a minimal offline stub
						// for HTML requests so the app can at least render something.
						if (event.request.headers.get('accept')?.includes('text/html')) {
							return cache.match('/index.html');
						}
						// For other assets, let the error propagate.
						throw new Error(`[SW] Network and cache both failed: ${event.request.url}`);
					});
			})
		)
	);
});
