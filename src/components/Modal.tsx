//_ src/components/Modal.tsx
/**
 * @module Modal
 * @description Generic modal wrapper: overlay + header (title, X) + body (children)
 * + footer. Portals into #modal-root. X and overlay click always discard/close —
 * they never save. Callers that need a Save action (e.g. SettingsModal) pass it
 * via `footerActions`, rendered to the left of the standard Close button.
 *
 * @param {boolean} isOpen
 * @param {string} title
 * @param {() => void} onClose - discard/close handler (X, overlay, Escape, Close button)
 * @param {React.ReactNode} [footerActions] - optional extra footer button(s), e.g. Save
 */
import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
	isOpen: boolean;
	title: string;
	onClose: () => void;
	children: React.ReactNode;
	footerActions?: React.ReactNode;
}

export function Modal({ isOpen, title, onClose, children, footerActions }: ModalProps) {
	const overlayRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);

	// Escape key
	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen, onClose]);

	// Body scroll lock
	useEffect(() => {
		if (!isOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	}, [isOpen]);

	// Focus trap entry point
	useEffect(() => {
		if (isOpen) dialogRef.current?.focus();
	}, [isOpen]);

	const onOverlayClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (e.target === e.currentTarget) onClose();
		},
		[onClose]
	);

	// Return null early when closed — fully unmounts, triggers nested cleanup
	if (!isOpen) return null;

	const modalRoot = document.getElementById('modal-root');
	if (!modalRoot) return null;

	return createPortal(
		<div
			ref={overlayRef}
			onClick={onOverlayClick}
			className={styles['overlay']}>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
				tabIndex={-1}
				className={styles['dialog']}
				onClick={(e) => e.stopPropagation()}>
				<div className={styles['header']}>
					<span
						id="modal-title"
						className={styles['title']}>
						{title}
					</span>
					<button
						onClick={onClose}
						aria-label="Close"
						className={styles['xBtn']}>
						✕
					</button>
				</div>

				<div className={styles['body']}>{children}</div>

				<div className={styles['footer']}>
					{footerActions}
					<button
						onClick={onClose}
						className={styles['closeBtn']}>
						Close
					</button>
				</div>
			</div>
		</div>,
		modalRoot
	);
}
