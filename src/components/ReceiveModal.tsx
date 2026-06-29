//_ src/components/modal/ReceiveModal.tsx
/**
 * @module ReceiveModal
 * @description Modal body showing a QR code of the connected wallet address.
 * QR generation is memoised and only active when the modal is open.
 * Usage:
 *   modal.open({
 *     title:  'Receive',
 *     body:   <ReceiveModal />,
 *     footer: <ReceiveFooter />,
 *   });
 */

import { useConnection } from 'wagmi';
import QRCode from 'react-qr-code';
import styles from './ReceiveModal.module.css';

export function ReceiveModal() {
	const { address } = useConnection();

	if (!address) return <p className={styles['empty']}>No wallet connected.</p>;

	return (
		<div className={styles['root']}>
			<div style={{ background: 'white', padding: '16px' }}>
				<QRCode
					value={address}
					level="H"
				/>
			</div>

			<p className={styles['label']}>Your wallet address</p>
			<p className={styles['address']}>{address}</p>

			<button
				className={styles['copy']}
				onClick={() => void navigator.clipboard.writeText(address)}
				type="button"
			>
				Copy address
			</button>
		</div>
	);
}
