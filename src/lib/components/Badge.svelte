<script lang="ts">
	export let color = '';
	export let style: 'primary' | 'secondary' | 'outlined' | 'danger' = 'primary';
	export let disabled = false;
	export let stickTo: 'left top' | 'left bottom' | 'right top' | 'right bottom' | null = null;
</script>

<span
	class="badge {style} {stickTo ?? ''}"
	class:sticky={stickTo}
	aria-disabled={disabled}
	style={color ? `--custom-color: ${color}` : ''}
>
	<slot />
</span>

<style lang="scss">
	.badge {
		display: inline-flex;
		align-items: center;

		padding: 0.25rem 0.5rem;
		gap: 0.5rem;

		font-size: 0.85rem;
		font-family: inherit;
		font-weight: 500;
		text-align: center;

		user-select: none;

		background: var(--custom-color, var(--_bg));
		color: var(--_text_color);
		border: 1px solid var(--color-on-background);
		border-radius: 99px;

		&.primary {
			--_bg: var(--color-on-background);
			--_text_color: var(--color-background);
		}
		&.secondary {
			--_bg: var(--color-background);
			--_text_color: var(--color-on-background);
		}
		&.outlined {
			--_bg: transparent;
			--_text_color: var(--color-on-background);
		}
		&.danger {
			--_bg: var(--color-error);
			--_text_color: var(--color-background);
		}
		&.sticky {
			position: absolute;
			z-index: 5;

			&.top {
				top: -5px;
			}
			&.bottom {
				bottom: -5px;
			}
			&.left {
				left: -5px;
			}
			&.right {
				right: -5px;
			}
		}
	}
</style>
