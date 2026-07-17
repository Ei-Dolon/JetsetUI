import React from 'react';
import { useConnection } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import './App.css'; // Main stylesheet
// Sub-components (imported or defined here)
import WalletLabel from './components/WalletLabel';
import PortfolioBalances from './components/PortfolioBalances';
// import JetsetGraph from './components/JetsetGraph';
// import ConnectedButtons from './components/ConnectedButtons';
import { initStorage } from './config/initStorage';

interface HdrIconProps extends React.SVGProps<SVGSVGElement> {}

export const SettingsIcon = ({ style, ...props }: HdrIconProps) => {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill="#2cb3ff"
			style={{ width: '100%', height: '100%', objectFit: 'contain', ...style }}
			{...props}>
			<path
				stroke="#2cb3ff"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
			/>
			<path
				stroke="#2cb3ff"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M10.47 4.32c.602-1.306 2.458-1.306 3.06 0l.218.473a1.684 1.684 0 0 0 2.112.875l.49-.18c1.348-.498 2.66.814 2.162 2.163l-.18.489a1.684 1.684 0 0 0 .875 2.112l.474.218c1.305.602 1.305 2.458 0 3.06l-.474.218a1.684 1.684 0 0 0-.875 2.112l.18.49c.498 1.348-.814 2.66-2.163 2.162l-.489-.18a1.684 1.684 0 0 0-2.112.875l-.218.473c-.602 1.306-2.458 1.306-3.06 0l-.218-.473a1.684 1.684 0 0 0-2.112-.875l-.49.18c-1.348.498-2.66-.814-2.163-2.163l.181-.489a1.684 1.684 0 0 0-.875-2.112l-.474-.218c-1.305-.602-1.305-2.458 0-3.06l.474-.218a1.684 1.684 0 0 0 .875-2.112l-.18-.49c-.498-1.348.814-2.66 2.163-2.163l.489.181a1.684 1.684 0 0 0 2.112-.875l.218-.474Z"
			/>
		</svg>
	);
};

export const WalletButton = () => {
	return (
		<ConnectKitButton.Custom>
			{({ isConnected, isConnecting, show }) => {
				// Custom interactive action framework maps cleanly to ConnectKit modals
				const handleWalletClick = () => show?.();

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
	initStorage();
	const { status } = useConnection();

	const renderMainContent = () => {
		switch (status) {
			case 'connecting':
			case 'reconnecting':
				return (
					<div className="connecting-state">
						<div className="wallet-spinner" />
						<p>Syncing with blockchain...</p>
					</div>
				);

			case 'connected':
				return (
					<>
						<WalletLabel />
						<PortfolioBalances />
					</>
				);

			default:
				return (
					<>
						<div className="metal-card">
							<p style={{ textAlign: 'center' }}>
								Please connect an installed wallet that holds BNB Smart Chain
								assets.
							</p>
						</div>
					</>
				);
		}
	};

	return (
		<>
			{/* display universal frontend header and footer */}
			<header className="metallic-surface">
				<span className="header-logo" />
				<button
					className="settings-icon"
					aria-label="Settings">
					<SettingsIcon />
				</button>
			</header>

			<main className="metallic-surface">
				<section className="metal-card">{renderMainContent()}</section>
			</main>

			<footer className="metallic-surface">
				<div className="animated-bar">
					<WalletButton />
				</div>
			</footer>
		</>
	);
}
