//_ src/components/modal/BuyModal.tsx
/**
 * @module BuyModal
 * @description Modal body embedding the Flooz.trade iframe for BSC token purchase.
 * Invalidates balance queries on close so the dashboard reflects any purchase.
 * Usage:
 *   modal.open({
 *     title:  'Buy JTS',
 *     body:   <BuyModal />,
 *   });
 */

import { useConnection } from 'wagmi';
import { CONSTS } from '../config/consts';
import { Modal } from './Modal';
import styles from './BuyModal.module.css';

interface BuyModalProps {
	isOpen: boolean;
	onClose: () => void;
}
const FLOOZ_URL = (address: string, theme: 'dark' | 'light') =>
	`https://flooz.trade/embed/swap?` +
	`network=bsc` +
	`&toTokenAddress=${CONSTS.JTS_ADDR}` +
	`&backgroundColor=transparent` +
	`&theme=${theme}` +
	`&refId=jetset` +
	`&connectedWallet=${address}`;

// Body
export function BuyModal({ isOpen, onClose }: BuyModalProps) {
	const { address } = useConnection();

	const src = address != null ? FLOOZ_URL(address, 'dark') : FLOOZ_URL('', 'dark');

	return (
		<Modal
			isOpen={isOpen}
			title="Buy Crypto"
			onClose={onClose}>
			<div className={styles['root']}>
				<iframe
					className={styles['iframe']}
					src={src}
					title="Buy Jetset tokens via Flooz"
					allow="clipboard-read; clipboard-write"
					referrerPolicy="no-referrer"
				/>
			</div>
		</Modal>
	);
}
