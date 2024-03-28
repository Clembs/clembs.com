import IconKeyboard from '@tabler/icons-svelte/dist/svelte/icons/IconKeyboard.svelte';
import IconLayoutBottombar from '@tabler/icons-svelte/dist/svelte/icons/IconLayoutBottombar.svelte';
import Icon123 from '@tabler/icons-svelte/dist/svelte/icons/Icon123.svelte';
import type { ComponentType } from 'svelte';

interface KbdShortcutGroup {
	label: string;
	shortcuts: KbdShortcut[];
}

interface KbdShortcut {
	keys: string[];
	label: string;
	icon: ComponentType;
}

export const ctrl = 'Ctrl',
	alt = 'Alt',
	shift = 'Shift',
	option = '⌘';

export const modifierKeys = [ctrl, alt, shift, option];

export const shortcutGroups: KbdShortcutGroup[] = [
	{
		label: 'Miscellaneous',
		shortcuts: [
			{
				keys: [ctrl, '/'],
				label: 'Show keyboard shortcuts',
				icon: IconKeyboard,
			},
			{
				keys: [alt, 'N'],
				label: 'Focus navigation',
				icon: IconLayoutBottombar,
			},
			{
				keys: ['F3'],
				label: 'Debug menu',
				icon: Icon123,
			},
		],
	},
];
