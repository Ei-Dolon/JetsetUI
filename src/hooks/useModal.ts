//_ src/hooks/useModal.ts
/**
 * @module useModal
 * @description Minimal boolean-state hook for a single modal's open/closed state.
 * No generic-manager indirection — the modal's own component (e.g. SettingsModal)
 * owns its content and save logic; this hook only owns visibility.
 *
 * @example
 * const settingsModal = useModal();
 * <button onClick={settingsModal.open}>Settings</button>
 * <SettingsModal isOpen={settingsModal.isOpen} onClose={settingsModal.close} />
 */

import { useState, useCallback } from 'react';

export function useModal() {
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	return { isOpen, open, close };
}
