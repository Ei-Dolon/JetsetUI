//_ src/main.tsx
/* React SPA render caught via div id=root in index.html
 * Imports App.tsx so it can have wrapped by the required contexts
 * including Wagmi blockchain interaction, @tanstack/react-query data fetching and cache control
 * TO ADD: Modal.tsx Provider for:
 * WalletConnection Modal Window (allows user to select from wallets installed)
 * Settings window - set defaults for DApp or for connected wallet (Fiat: USD, Sound ON, Theme: Dark)
 * Buy window (Embr third party crypto swap and onramping)
 * Receive window (QR code for connected wallet to receive funds)
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { config } from './config/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initStorage } from './config/initStorage';
import '@fontsource-variable/inter/index.css';
import './index.css';
import App from './App';

const queryClient = new QueryClient();
// initStorage returns a Promise; explicitly ignore the returned promise to satisfy
// the linter rule about handling floating promises.
void initStorage();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</WagmiProvider>
	</StrictMode>
);
