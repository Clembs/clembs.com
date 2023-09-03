import IconKeyboard from '@tabler/icons-svelte/dist/svelte/icons/IconKeyboard.svelte';
import IconLayoutBottombar from '@tabler/icons-svelte/dist/svelte/icons/IconLayoutBottombar.svelte';
import Icon123 from '@tabler/icons-svelte/dist/svelte/icons/Icon123.svelte';
import IconBold from '@tabler/icons-svelte/dist/svelte/icons/IconBold.svelte';
import IconItalic from '@tabler/icons-svelte/dist/svelte/icons/IconItalic.svelte';
import IconStrikethrough from '@tabler/icons-svelte/dist/svelte/icons/IconStrikethrough.svelte';
import IconUnderline from '@tabler/icons-svelte/dist/svelte/icons/IconUnderline.svelte';

interface KbdShortcutGroup {
	label: string;
	shortcuts: KbdShortcut[];
}

interface KbdShortcut {
	keys: string[];
	label: string;
	icon: any;
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
	{
		label: 'Comments',
		shortcuts: [
			{
				keys: [ctrl, 'B'],
				label: 'Bold selected text',
				icon: IconBold,
			},
			{
				keys: [ctrl, 'I'],
				label: 'Italicize selected text',
				icon: IconItalic,
			},
			{
				keys: [ctrl, 'S'],
				label: 'Strikethough selected text',
				icon: IconStrikethrough,
			},
			{
				keys: [ctrl, 'U'],
				label: 'Underline selected text',
				icon: IconUnderline,
			},
		],
	},
];
