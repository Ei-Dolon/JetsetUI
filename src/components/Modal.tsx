//_ src/components/Modal.tsx
import { useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

// Context so content can call close(exitCode) without prop drilling
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
	onClose: (exitCode?: number) => void;
	children: React.ReactNode;
}

// Component
export function Modal({ isOpen, title, onClose, children }: ModalProps) {
	const overlayRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);

	// Stable close wrapper so effects don't re-register
	const handleClose = useCallback((exitCode = 0) => onClose(exitCode), [onClose]);

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

	// Focus trap: move focus into dialog on open
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

	if (!isOpen) return null;

	return createPortal(
		<ModalContext value={{ close: handleClose }}>
			{/* Overlay */}
			<div
				ref={overlayRef}
				onClick={onOverlayClick}
				className="modal-overlay"
				style={overlay}
				aria-hidden="true"
			/>

			{/* Dialog */}
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal
				aria-label={title}
				tabIndex={-1}
				className="modal-dialog"
				style={dialog}
			>
				{/* Header */}
				<div style={header}>
					<span style={titleStyle}>{title}</span>
					<button
						onClick={() => handleClose(0)}
						aria-label="Close"
						style={xBtn}
					>
						✕
					</button>
				</div>

				{/* Content */}
				<div style={body}>{children}</div>

				{/* Footer */}
				<div style={footer}>
					<button
						onClick={() => handleClose(0)}
						style={closeBtn}
					>
						Close {title}
					</button>
				</div>
			</div>
		</ModalContext>,
		document.body
	);
}

const overlay: React.CSSProperties = {
	position: 'fixed',
	inset: 0,
	backgroundColor: 'rgba(0,0,0,0.6)',
	backdropFilter: 'blur(4px)',
	zIndex: 1000,
};

const dialog: React.CSSProperties = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	zIndex: 1001,
	background: '#1a1a2e',
	borderRadius: '12px',
	minWidth: 'min(90vw, 480px)',
	maxHeight: '85vh',
	display: 'flex',
	flexDirection: 'column',
	outline: 'none',
};

const header: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '1rem 1.25rem 0.75rem',
	borderBottom: '1px solid rgba(255,255,255,0.08)',
};

const titleStyle: React.CSSProperties = {
	fontFamily: 'Syne, sans-serif',
	fontWeight: 700,
	fontSize: '1.1rem',
};

const xBtn: React.CSSProperties = {
	background: 'none',
	border: 'none',
	cursor: 'pointer',
	color: 'currentColor',
	fontSize: '1rem',
	padding: '0.25rem',
	lineHeight: 1,
};

const body: React.CSSProperties = { padding: '1.25rem', overflowY: 'auto', flex: 1 };

const footer: React.CSSProperties = {
	padding: '0.75rem 1.25rem 1rem',
	display: 'flex',
	justifyContent: 'center',
	borderTop: '1px solid rgba(255,255,255,0.08)',
};

const closeBtn: React.CSSProperties = {
	padding: '0.5rem 1.5rem',
	borderRadius: '8px',
	border: '1px solid rgba(255,255,255,0.2)',
	background: 'transparent',
	cursor: 'pointer',
	fontFamily: 'DM Mono, monospace',
};
