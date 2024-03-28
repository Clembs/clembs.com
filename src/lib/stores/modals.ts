import { writable } from 'svelte/store';

export const showLoginDialog = writable(false);
export const showRestrictedAccountDialog = writable(false);
