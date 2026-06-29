//_ src/components/Modal.tsx
/**
 * @module Modal
 * @description Base modal component. Renders into #modal-root via React Portal.
 * Handles overlay click, Escape key, body scroll lock, focus trap, and CSS
 * open/close transitions. Footer renders Close only, or Close + Save when
 * onSave is provided. X button always discards and closes.
 */

import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave?: () => void;
	title: string;
	labelId?: string;
	children: ReactNode;
}

const FOCUSABLE = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(', ');

export function Modal({
	isOpen,
	onClose,
	onSave,
	title,
	labelId = 'modal-title',
	children,
}: ModalProps) {
	const dialogRef = useRef<HTMLDivElement>(null);
	const portalRoot = document.getElementById('modal-root');

	// Body scroll lock
	useEffect(() => {
		if (!isOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	}, [isOpen]);

	// Escape key close
	useEffect(() => {
		if (!isOpen) return;
		const handleKey = (e: globalThis.KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, [isOpen, onClose]);

	// Focus trap
	useEffect(() => {
		if (!isOpen || !dialogRef.current) return;
		const el = dialogRef.current;
		const focusable = () => Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));

		// Focus first element on open
		queueMicrotask(() => focusable()[0]?.focus());

		const handleKeyDown = (e: globalThis.KeyboardEvent) => {
			if (e.key !== 'Tab') return;
			const nodes = focusable();
			if (!nodes.length) return;
			const first = nodes[0];
			const last = nodes[nodes.length - 1];
			if (!first || !last) return;
			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};

		el.addEventListener('keydown', handleKeyDown);
		return () => el.removeEventListener('keydown', handleKeyDown);
	}, [isOpen]);

	if (!isOpen || !portalRoot) return null;

	const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) onClose();
	};

	return createPortal(
		<div
			className="modal-overlay"
			onClick={handleOverlayClick}
			aria-hidden="false"
		>
			<div
				ref={dialogRef}
				className="modal-dialog"
				role="dialog"
				aria-modal="true"
				aria-labelledby={labelId}
			>
				<header className="modal-header">
					<h2
						id={labelId}
						className="modal-title"
					>
						{title}
					</h2>
					<button
						className="modal-close-x"
						onClick={onClose}
						aria-label="Close"
					>
						&times;
					</button>
				</header>

				<div className="modal-body">{children}</div>

				<footer className="modal-footer">
					<button
						className="modal-btn modal-btn--close"
						onClick={onClose}
					>
						Close
					</button>
					{onSave !== undefined && (
						<button
							className="modal-btn modal-btn--save"
							onClick={onSave}
						>
							Save
						</button>
					)}
				</footer>
			</div>
		</div>,
		portalRoot
	);
}
