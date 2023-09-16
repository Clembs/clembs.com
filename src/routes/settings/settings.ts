import IconSettings from '@tabler/icons-svelte/dist/svelte/icons/IconSettings.svelte';
import IconUserCircle from '@tabler/icons-svelte/dist/svelte/icons/IconUserCircle.svelte';
import IconPaint from '@tabler/icons-svelte/dist/svelte/icons/IconPaint.svelte';
import { get, writable } from 'svelte/store';
import { defaultUserPreferences, type UserPreferences } from '../../lib/db/UserPreferences';
import { browser } from '$app/environment';
import { page } from '$app/stores';

export type SettingsTab = {
	icon: any;
	label: string;
	title: string;
	url: string;
};

export const settingsTabs: SettingsTab[] = [
	{
		icon: IconSettings,
		label: 'Account',
		title: 'Account Settings',
		url: '/settings',
	},
	{
		icon: IconUserCircle,
		label: 'Account',
		title: 'Account Settings',
		url: '/settings',
	},
	{
		icon: IconPaint,
		label: 'Theme',
		title: 'Theme Settings',
		url: '/settings/theme',
	},
];

export function useSettingsStore() {
	if (!browser) {
		return;
	}

	const remoteUserData = get(page)?.data?.userData;
	let userPreferences = remoteUserData?.preferences;

	if (!userPreferences) {
		const localStringValue = localStorage.getItem('userPreferences');
		const localJSONValue = localStringValue ? JSON.parse(localStringValue) : defaultUserPreferences;

		userPreferences = localJSONValue;
	}

	return writable<UserPreferences>({ ...defaultUserPreferences, ...userPreferences });
}

export const settingsStore = useSettingsStore();
