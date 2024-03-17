import type { BlogPost } from '$lib/data/blog';

export function updateThemeGradient(themeGradient: BlogPost['themeGradient']) {
	const background: HTMLDivElement | null = document.querySelector('.background-piece');
	if (!background) return;

	background.style.setProperty('--from', themeGradient.from);
	background.style.setProperty('--to', themeGradient.to);

	background.classList.add('move-gradient');
}
