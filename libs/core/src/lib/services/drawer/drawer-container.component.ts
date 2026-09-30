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
    selector: 'pos-frontend-drawer-container',
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
    templateUrl: './drawer-container.component.html',
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
