import { booleanAttribute, computed, Directive, input } from '@angular/core';

export type PosBadgeVariant =
  | 'success'
  | 'error'
  | 'pending'
  | 'info'
  | 'void'
  | 'count';

const BASE =
  'inline-block rounded-sm px-2.5 py-0.5 text-[11px] font-semibold ' +
  'leading-snug tracking-[0.01em] whitespace-nowrap';

const TONES: Record<PosBadgeVariant, string> = {
  success: 'bg-badge-success-bg text-badge-success-fg',
  error: 'bg-badge-error-bg text-badge-error-fg',
  pending: 'bg-badge-warning-bg text-badge-warning-fg',
  info: 'bg-badge-info-bg text-badge-info-fg',
  void: 'bg-badge-neutral-bg text-badge-neutral-fg',
  count: 'px-2 tabular-nums',
};

@Directive({
  selector: '[posFrontendBadge]',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
})
export class PosBadgeDirective {
  /** Variant name. Falls back to `open` if omitted. */
  readonly variant = input<PosBadgeVariant | ''>('success', { alias: 'posFrontendBadge' });

  /** For `count`: flips the tone from error (below reorder) to success (healthy). */
  readonly ok = input(false, { transform: booleanAttribute});

  protected readonly classes = computed(() => {
    const variant = (this.variant() || 'success') as PosBadgeVariant;
    const tone = TONES[variant] ?? TONES.success;

    if (variant === 'count') {
      return `${BASE} ${tone} ${
        this.ok()
          ? 'bg-badge-success-bg text-badge-success-fg'
          : 'bg-badge-error-bg text-badge-error-fg'
      }`;
    }

    return `${BASE} ${tone}`;
  });
}