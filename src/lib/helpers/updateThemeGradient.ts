import type { BrandingPost } from '$lib/data/branding';

export function updateThemeGradient(themeGradient: BrandingPost['themeGradient']) {
	const background: HTMLDivElement | null = document.querySelector('.background-piece');
	if (!background) return;

	background.style.setProperty('--from', themeGradient.from);
	background.style.setProperty('--to', themeGradient.to);

	background.classList.add('move-gradient');
}
