import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { computed, inject, Injectable, Injector, signal, Type } from '@angular/core';
import { filter, take } from 'rxjs';

import {
    DRAWER_BASE_DEFAULTS,
    DRAWER_CONFIG,
    DRAWER_CONTENT,
    DRAWER_DATA,
    DRAWER_DEFAULTS,
    DRAWER_SIZE_WIDTHS,
    DrawerConfig,
    ResolvedDrawerConfig,
} from './drawer.config';
import { DrawerContainerComponent } from './drawer-container.component';
import { DrawerRef } from './drawer-ref';

/**
 * Opens any standalone component as a side panel, anywhere in any app, with
 * no template wiring in the host. Built on the CDK overlay rather than
 * MatSidenav, because MatDrawerContainer finds its drawers with a content
 * query — that forces every shell to declare the panel itself, which is what
 * stopped the earlier version being reusable.
 *
 *   const ref = drawer.open(InvoiceDrawerComponent, {
 *       title: invoice.number,
 *       data: invoice,
 *   });
 *   ref.afterClosed().subscribe(result => ...);
 */
@Injectable({ providedIn: 'root' })
export class DrawerService {
    private readonly overlay = inject(Overlay);
    private readonly injector = inject(Injector);
    private readonly appDefaults = inject(DRAWER_DEFAULTS);

    private readonly stack = signal<ReadonlyArray<DrawerRef<unknown, unknown>>>([]);

    /** Open drawers, outermost first. Stacking is supported. */
    readonly openDrawers = this.stack.asReadonly();
    readonly isOpen = computed(() => this.stack().length > 0);

    open<C, R = void, D = unknown>(component: Type<C>, config: DrawerConfig<D> = {}): DrawerRef<R, D> {
        const resolved: ResolvedDrawerConfig<D> = {
            ...DRAWER_BASE_DEFAULTS,
            ...this.appDefaults,
            ...config,
        } as ResolvedDrawerConfig<D>;

        const overlayRef = this.overlay.create(this.overlayConfig(resolved));
        const ref = new DrawerRef<R, D>(resolved, overlayRef);

        // Two layers: the projected component sees the ref, the data and the
        // config; the container additionally sees the content portal it has
        // to render. Both resolve from the same chain, so the component the
        // caller passed in gets the very ref the caller is holding.
        const contentInjector = Injector.create({
            parent: resolved.injector ?? this.injector,
            providers: [
                { provide: DrawerRef, useValue: ref },
                { provide: DRAWER_DATA, useValue: resolved.data ?? null },
                { provide: DRAWER_CONFIG, useValue: resolved },
            ],
        });
        const containerInjector = Injector.create({
            parent: contentInjector,
            providers: [
                {
                    provide: DRAWER_CONTENT,
                    useValue: new ComponentPortal(component, null, contentInjector),
                },
            ],
        });

        overlayRef.attach(new ComponentPortal(DrawerContainerComponent, null, containerInjector));

        if (!resolved.disableClose) {
            overlayRef
                .backdropClick()
                .pipe(take(1))
                .subscribe(() => ref.close());

            overlayRef
                .keydownEvents()
                .pipe(filter((event) => event.keyCode === ESCAPE && !hasModifierKey(event)))
                .subscribe((event) => {
                    event.preventDefault();
                    ref.close();
                });
        }

        const typeErased = ref as unknown as DrawerRef<unknown, unknown>;
        this.stack.update((refs) => [...refs, typeErased]);
        ref.afterClosed().subscribe({
            complete: () => this.stack.update((refs) => refs.filter((r) => r !== typeErased)),
        });

        return ref;
    }

    /** Closes the topmost drawer. No-op when nothing is open. */
    closeTop(): void {
        this.stack().at(-1)?.close();
    }

    /** Useful on logout or a hard navigation. */
    closeAll(): void {
        for (const ref of [...this.stack()].reverse()) {
            ref.close();
        }
    }

    private overlayConfig(config: ResolvedDrawerConfig): OverlayConfig {
        const position = this.overlay.position().global().top('0');
        const panelClass = ['es-drawer-panel', `es-drawer-panel--${config.size}`];
        if (config.panelClass) {
            panelClass.push(config.panelClass);
        }
        return new OverlayConfig({
            positionStrategy: config.side === 'start' ? position.left('0') : position.right('0'),
            width: config.width ?? DRAWER_SIZE_WIDTHS[config.size],
            height: '100%',
            hasBackdrop: true,
            backdropClass: 'es-drawer-backdrop',
            panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            disposeOnNavigation: config.closeOnNavigation,
        });
    }
}
