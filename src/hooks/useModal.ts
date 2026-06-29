//_ src/hooks/useModal.ts
/**
 * @module useModal
 * @description Minimal hook for controlling a single modal's open/closed state.
 * Returns open state plus stable open/close handlers.
 *
 * @example
 * const { isOpen, open, close } = useModal();
 * <button onClick={open}>Settings</button>
 * <SettingsModal isOpen={isOpen} onClose={close} />
 */

import { useState, useCallback } from 'react';

export interface UseModalReturn {
	isOpen: boolean;
	open: () => void;
	close: () => void;
}

export function useModal(initialOpen = false): UseModalReturn {
	const [isOpen, setIsOpen] = useState(initialOpen);
	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	return { isOpen, open, close };
}
