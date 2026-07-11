//_ src/components/Modal.tsx
/**
<Modal
  isOpen={...}
  title={...}
  optional onSave={...}
  onClose={...}
*/
import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

// ── Context so content can call close(exitCode) without prop drilling ──
interface ModalCtx {
	close: (exitCode?: number) => void;
}

const ModalContext = createContext<ModalCtx | null>(null);

export const useModalContext = () => {
	const ctx = useContext(ModalContext);
	if (!ctx) throw new Error('useModalContext must be used inside <Modal>');
	return ctx;
};

// Types
interface ModalProps {
	isOpen: boolean;
	title: string;
	onSave?: (exitCode?: number) => void;
	onClose: (exitCode?: number) => void;
	children: React.ReactNode;
}

// Component
export function Modal({ isOpen, title, onSave, onClose, children }: ModalProps) {
	const overlayRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const [animationState, setAnimationState] = useState<'open' | 'closed'>(() =>
		isOpen ? 'open' : 'closed'
	);
	const [shouldRender, setShouldRender] = useState(isOpen);
	const portalRoot = document.getElementById('portal-root');

	// Stable close wrapper so effects don't re-register
	const handleClose = useCallback((exitCode = 0) => onClose(exitCode), [onClose]);

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
			setAnimationState('open');
		} else if (shouldRender) {
			setAnimationState('closed');
		}
	}, [isOpen, shouldRender]);

	// ESC key
	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose(0);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen, handleClose]);

	// Body scroll lock
	useEffect(() => {
		if (!isOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	}, [isOpen]);

	// Focus trap: move focus into modal window on open
	useEffect(() => {
		if (isOpen) dialogRef.current?.focus();
	}, [isOpen]);

	// Click outside
	const onOverlayClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (e.target === overlayRef.current) handleClose(0);
		},
		[handleClose]
	);
	const handleAnimationEnd = useCallback(
		(event: React.AnimationEvent<HTMLDivElement>) => {
			if (animationState === 'closed' && event.currentTarget.dataset['state'] === 'closed') {
				setShouldRender(false);
			}
		},
		[animationState, setShouldRender]
	);

	if (!shouldRender) return null;

	if (!isOpen) return null;

	return createPortal(
		<ModalContext value={{ close: handleClose }}>
			{/* Overlay */}
			<div
				className={styles['overlay']}
				ref={overlayRef}
				data-state={animationState}
				onAnimationEnd={handleAnimationEnd}
				onClick={onOverlayClick}
			/>

			{/* Dialog */}
			<div
				className={styles['dialog']}
				ref={dialogRef}
				role="dialog"
				aria-modal
				aria-label={title}
				tabIndex={-1}
				data-state={animationState}
				onAnimationEnd={handleAnimationEnd}>
				{/* Header */}
				<div className={styles['header']}>
					<span className={styles['title']}>{title}</span>
					<button
						onClick={() => handleClose(0)}
						aria-label="Close"
						className={styles['xBtn']}>
						✕
					</button>
				</div>

				{/* Content */}
				<div className={styles['body']}>{children}</div>

				{/* Footer */}
				<div className={styles['footer']}>
					<button
						onClick={() => handleClose(0)}
						className={styles['closeBtn']}>
						Close {title}
					</button>
					{onSave && (
						<button
							onClick={() => onSave(1)}
							className={styles['saveBtn']}>
							Save {title}
						</button>
					)}
				</div>
			</div>
		</ModalContext>,
		portalRoot || document.body
	);
}
