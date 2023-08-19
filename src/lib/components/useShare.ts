import toast, { CheckmarkIcon, ErrorIcon } from 'svelte-french-toast';

export function useShare(text: string) {
	if (!navigator) return;

	if (navigator.share) {
		navigator.share({
			url: text,
		});
	} else {
		navigator.clipboard
			.writeText(text)
			.then((e) =>
				toast('Link copied to clipboard!', {
					icon: CheckmarkIcon,
				})
			)
			.catch((e) =>
				toast('Failed to copy to clipboard.', {
					icon: ErrorIcon,
				})
			);
	}
}
