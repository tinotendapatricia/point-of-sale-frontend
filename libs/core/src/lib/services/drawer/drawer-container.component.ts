import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DRAWER_CONFIG, DRAWER_CONTENT } from './drawer.config';
import { DrawerRef } from './drawer-ref';

let nextId = 0;

/**
 * The panel itself: heading, close control, scrolling body, slide animation
 * and focus trap. Attached to a CDK overlay by `DrawerService`, so no host
 * application has to place anything in its own template.
 */
@Component({
    selector: 'es-drawer-container',
    standalone: true,
    imports: [PortalModule, A11yModule, MatButtonModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'es-drawer',
        '[class.es-drawer--open]': 'isOpen()',
        '[class.es-drawer--start]': "config.side === 'end'",
        role: 'dialog',
        'aria-modal': 'true',
        '[attr.aria-labelledby]': 'config.title && !config.hideHeader ? titleId : null',
        '[attr.aria-label]': 'config.title && !config.hideHeader ? null : config.ariaLabel',
    },
    template: `
        <!-- autoCapture moves focus in on open and restores it on destroy. -->
        <div class="flex h-full w-full flex-col bg-surface" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            @if (!config.hideHeader) {
                <header class="flex items-start gap-3 border-b border-hairline px-5 py-4">
                    <div class="min-w-0 flex-1">
                        <h2 [id]="titleId" class="truncate text-base font-semibold text-ink">
                            {{ config.title }}
                        </h2>
                        @if (config.subtitle) {
                            <p class="mt-0.5 truncate text-sm text-ink-muted">
                                {{ config.subtitle }}
                            </p>
                        }
                    </div>
                    @if (!config.disableClose) {
                        <button
                            mat-icon-button
                            type="button"
                            [attr.aria-label]="'Close ' + (config.title ?? 'panel')"
                            (click)="ref.close()"
                        >
                            <mat-icon>close</mat-icon>
                        </button>
                    }
                </header>
            }

            <div class="flex-1 overflow-y-auto px-5 py-4">
                <ng-template [cdkPortalOutlet]="content"></ng-template>
            </div>
        </div>
    `,
})
export class DrawerContainerComponent {
    protected readonly ref = inject(DrawerRef);
    protected readonly config = inject(DRAWER_CONFIG);
    protected readonly content = inject(DRAWER_CONTENT);
    protected readonly titleId = `es-drawer-title-${nextId++}`;

    protected readonly isOpen = signal(false);

    constructor() {
        // One frame after the panel is in the DOM, flip the class so the
        // transition actually runs instead of the panel appearing in place.
        afterNextRender(() => requestAnimationFrame(() => this.isOpen.set(true)));

        this.ref.registerExitAnimation(
            () =>
                new Promise<void>((resolve) => {
                    this.isOpen.set(false);
                    const ms = this.transitionMs();
                    if (ms === 0) {
                        resolve();
                        return;
                    }
                    setTimeout(resolve, ms);
                }),
        );
    }

    /** Honours prefers-reduced-motion, and reads the duration token. */
    private transitionMs(): number {
        if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            return 0;
        }
        const raw = getComputedStyle(document.documentElement)
            .getPropertyValue('--duration-medium')
            .trim();
        const parsed = Number.parseFloat(raw);
        if (Number.isNaN(parsed)) {
            return 240;
        }
        return raw.endsWith('ms') ? parsed : parsed * 1000;
    }
}
