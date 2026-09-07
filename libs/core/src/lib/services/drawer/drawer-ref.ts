import { OverlayRef } from '@angular/cdk/overlay';
import { inject } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { DRAWER_DATA, DRAWER_SIZE_WIDTHS, DrawerSize, ResolvedDrawerConfig } from './drawer.config';

/**
 * Handle for one open drawer. Returned by `DrawerService.open()` and
 * injectable inside the projected component, which is the only thing that
 * component needs to know about the drawer at all.
 */
export class DrawerRef<R = void, D = unknown> {
    private readonly result$ = new ReplaySubject<R | undefined>(1);
    private settled = false;
    private animateOut: (() => Promise<void>) | null = null;

    constructor(
        readonly config: ResolvedDrawerConfig<D>,
        private readonly overlayRef: OverlayRef,
    ) {}

    /** The payload passed in `DrawerConfig.data`. */
    get data(): D {
        return this.config.data as D;
    }

    /**
     * Idempotent. The backdrop, Escape, the header button and the content's
     * own buttons all land here, so `afterClosed()` fires exactly once.
     */
    close(result?: R): void {
        if (this.settled) {
            return;
        }
        this.settled = true;
        this.result$.next(result);

        const teardown = (): void => {
            this.overlayRef.dispose();
            this.result$.complete();
        };
        // The container animates itself out and then we drop the overlay, so
        // the panel is never yanked off screen mid-transition.
        void (this.animateOut?.() ?? Promise.resolve()).then(teardown, teardown);
    }

    /** Emits once with the result, then completes. Safe to subscribe late. */
    afterClosed(): Observable<R | undefined> {
        return this.result$.asObservable();
    }

    /**
     * Width can change after open — a drawer that expands to show a table.
     * Accepts a preset size (`'sm' | 'md' | 'xl' | 'full'`) or a raw CSS width.
     */
    resize(size: DrawerSize | string): void {
        const width = size in DRAWER_SIZE_WIDTHS ? DRAWER_SIZE_WIDTHS[size as DrawerSize] : size;
        this.overlayRef.updateSize({ width });
    }

    /** @internal Called by DrawerContainerComponent when it renders. */
    registerExitAnimation(fn: () => Promise<void>): void {
        this.animateOut = fn;
    }
}

/**
 * The DI token is the non-generic class, so the generic parameters have to be
 * re-attached at the injection site. The provider is created dynamically in
 * `DrawerService`, so narrowing is impossible — the single cast is contained
 * here rather than repeated in every drawer component.
 */
/**
 * Throws when called outside a drawer-projected component. Pass
 * `{ optional: true }` for a component that can also run standalone (e.g. a
 * routed page reused as drawer content) — it then returns `null` when there
 * is no enclosing drawer.
 */
export function injectDrawerRef<R = void, D = unknown>(options: { optional: true }): DrawerRef<R, D> | null;
export function injectDrawerRef<R = void, D = unknown>(options?: { optional?: false }): DrawerRef<R, D>;
export function injectDrawerRef<R = void, D = unknown>(options?: { optional?: boolean }): DrawerRef<R, D> | null {
    return inject(DrawerRef, { optional: options?.optional ?? false }) as DrawerRef<R, D> | null;
}

/** For components that only need the payload, not the handle. */
export function injectDrawerData<D>(): D {
    return inject(DRAWER_DATA) as D;
}
