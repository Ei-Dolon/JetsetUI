//_ src/components/SettingsModal.tsx
/**
 * @module SettingsModal
 * @description Settings modal body: fiat currency selection.
 * On open, reads `selFiat` from localStorage (defaults to 'usd') into local
 * draft state. Radio selection only updates the draft — nothing is persisted
 * until Save is pressed, which writes localStorage('selFiat', value) and closes.
 * X / overlay / Escape / Close discard the draft without writing.
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 */
import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import styles from './SettingsModal.module.css';

type Fiat = 'usd' | 'gbp' | 'eur';

const FIAT_OPTIONS: { value: Fiat; label: string }[] = [
	{ value: 'usd', label: 'USD — US Dollar' },
	{ value: 'gbp', label: 'GBP — British Pound' },
	{ value: 'eur', label: 'EUR — Euro' },
];

//const DEFAULT_FIAT: Fiat = 'usd';

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
	selFiat: Fiat;
	onSaveFiat: (fiat: Fiat) => void;
}

export function SettingsModal({ isOpen, onClose, selFiat, onSaveFiat }: SettingsModalProps) {
	const [draftFiat, setDraftFiat] = useState<Fiat>(selFiat);

	useEffect(() => {
		if (isOpen) setDraftFiat(selFiat);
	}, [isOpen, selFiat]);

	const handleSave = () => {
		try {
			localStorage.setItem('selFiat', draftFiat);
			onSaveFiat(draftFiat);
		} catch {
			onSaveFiat(draftFiat);
		}
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			title="Settings"
			onClose={onClose}
			footerActions={
				<button
					onClick={handleSave}
					className={styles['saveBtn']}>
					Save Settings
				</button>
			}>
			<fieldset className={styles['fieldset']}>
				<legend className={styles['legend']}>Currency</legend>
				{FIAT_OPTIONS.map(({ value, label }) => (
					<label
						key={value}
						className={styles['radioRow']}>
						<input
							type="radio"
							name="selFiat"
							value={value}
							checked={draftFiat === value}
							onChange={() => setDraftFiat(value)}
						/>
						{label}
					</label>
				))}
			</fieldset>
		</Modal>
	);
}
