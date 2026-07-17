import { ConnectKitButton } from 'connectkit';
import './App.css';
import './anim.css';

const WalletButton = () => {
	return (
		<ConnectKitButton.Custom>
			{({ isConnected, isConnecting, show }) => {
				// Custom interactive action framework maps cleanly to ConnectKit modals
				const handleWalletClick = (): void => {
					if (show) {
						show();
					}
				};

				// Derive structural CSS classes based on active state parameters
				const getSpriteClass = (): string => {
					if (isConnecting) return 'wallet-btn-sprite animateConnecting';
					if (isConnected) return 'wallet-btn-sprite btnDisconnect';
					return 'wallet-btn-sprite animateConnect';
				};

				// Dynamic label for better accessibility
				const getAriaLabel = (): string => {
					if (isConnecting) return 'Connecting to wallet';
					if (isConnected) return 'Disconnect wallet';
					return 'Connect wallet';
				};

				return (
					<button
						className="wallet-btn-trigger"
						onClick={handleWalletClick}
						disabled={isConnecting}
						aria-label={getAriaLabel()}>
						<span className={getSpriteClass()} />
					</button>
				);
			}}
		</ConnectKitButton.Custom>
	);
};

export default function App() {
	return (
		<>
			{/* display universal frontend header and footer */}
			<header className="metallic-surface">
				<span className="header-logo" />
			</header>

			<main className="metallic-surface">
				<br />
				<br />
				<section className="metal-card">
					<h2>Main Feature Dashboard</h2>
					<p>This layout content areas will safely scroll below the main header layer.</p>
					<p>
						Footer layer is fixed and will always be visible at the bottom of the
						viewport.
					</p>
					<br />
					<p>
						Wallet connection button is fixed in the footer layer and will always be
						visible at the bottom of the viewport.
					</p>
				</section>
				<br />
				<section className="metal-card">
					<h2>Main Feature Dashboard 2</h2>
					<p>This layout content areas will safely scroll below the main header layer.</p>
					<p>
						Footer layer is fixed and will always be visible at the bottom of the
						viewport.
					</p>
					<br />
					<p>
						Wallet connection button is fixed in the footer layer and will always be
						visible at the bottom of the viewport.
					</p>
				</section>
			</main>

			<footer className="metallic-surface">
				<div className="animated-bar">
					<WalletButton />
				</div>
			</footer>
		</>
	);
}
