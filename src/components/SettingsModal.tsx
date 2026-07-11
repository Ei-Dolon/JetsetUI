//_ src/components/modal/SettingsModal.tsx
/**
 * @module SettingsModal
 * @description Modal body for DApp settings: fiat currency, sound, theme.
 * Reads from and writes to SettingsContext.
 * Caller must pass a footer with Save/Close buttons via modal.open().
 *
 * Usage:
 *   const modal  = useModal();
 *   const onOpen = () => modal.open({
 *     title:  'Settings',
 *     body:   <SettingsModal />,
 *     footer: <SettingsFooter />,
 *   });
 *
 * SettingsFooter is exported from this file for colocation convenience.
 */

import styles from './SettingsModal.module.css';

// Fiat options
const FIAT_OPTIONS = [
	{ value: 'USD', label: 'USD — US Dollar' },
	{ value: 'GBP', label: 'GBP — British Pound' },
	{ value: 'EUR', label: 'EUR — Euro' },
] as const;

// Body
export function SettingsModal() {
	return (
		<div className={styles['root']}>
			{/* Fiat currency */}
			<fieldset className={styles['fieldset']}>
				<legend className={styles['legend']}>Currency</legend>
				<div className={styles['radioGroup']}>
					{FIAT_OPTIONS.map(({ value, label }) => (
						<label
							key={value}
							className={styles['radioLabel']}>
							<input
								type="radio"
								name="fiat"
								value={value}
								className={styles['radio']}
							/>
							{label}
						</label>
					))}
				</div>
			</fieldset>
		</div>
	);
}
