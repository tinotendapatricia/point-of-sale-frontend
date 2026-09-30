import { type EnvironmentProviders, InjectionToken, type Injector, makeEnvironmentProviders } from '@angular/core';
import { type ComponentPortal } from '@angular/cdk/portal';

/** Which edge the panel slides in from. */
export type DrawerSide = 'end' | 'start';

/** Named panel widths. `full` spans the entire viewport width. */
export type DrawerSize = 'sm' | 'md' | 'xl' | 'full';

/**
 * `--drawer-width-*` tokens, each with a built-in fallback so a host app
 * works without defining anything — override the CSS variable to reskin.
 * `full` is fixed at 100vw; there's no sensible per-app override for it.
 */
export const DRAWER_SIZE_WIDTHS: Readonly<Record<DrawerSize, string>> = {
    sm: 'var(--drawer-width-sm, min(360px, 100vw))',
    md: 'var(--drawer-width-md, min(560px, 100vw))',
    xl: 'var(--drawer-width-xl, min(860px, 100vw))',
    full: '100vw',
};

export interface DrawerConfig<D = unknown> {
    /** Heading. Omit for a chromeless panel that draws its own header. */
    readonly title?: string;
    /** Second line under the heading — a record number, a status. */
    readonly subtitle?: string;
    /** Payload for the projected component. Read with `injectDrawerData()`. */
    readonly data?: D;
    /** Preset panel width. Defaults to `'md'`. Ignored when `width` is set. */
    readonly size?: DrawerSize;
    /** Escape hatch for a one-off CSS width. Overrides `size` when set. */
    readonly width?: string;
    /** Blocks the backdrop, Escape and the close button. Dirty forms only. */
    readonly disableClose?: boolean;
    /** Hide the built-in header when the content supplies its own. */
    readonly hideHeader?: boolean;
    readonly side?: DrawerSide;
    /** Close when the router navigates. Default true. */
    readonly closeOnNavigation?: boolean;
    /** Extra class on the overlay pane, for per-product skinning. */
    readonly panelClass?: string;
    /** Announced to screen readers on open when there is no title. */
    readonly ariaLabel?: string;
    /**
     * Parent injector for the projected component. Defaults to the injector
     * `DrawerService` was created in (the app root). Pass the caller's own
     * injector when the component being opened depends on route-scoped
     * providers — e.g. an NgRx feature registered only on that route.
     */
    readonly injector?: Injector;
}

/** Config after defaults have been merged in. */
export type ResolvedDrawerConfig<D = unknown> = Readonly<
    Required<Pick<DrawerConfig<D>, 'size' | 'disableClose' | 'hideHeader' | 'side' | 'closeOnNavigation'>> &
        DrawerConfig<D>
>;

export const DRAWER_DEFAULTS = new InjectionToken<Partial<DrawerConfig>>('DRAWER_DEFAULTS', {
    providedIn: 'root',
    factory: () => ({}),
});

/** Payload for the projected component. Prefer `injectDrawerData()`. */
export const DRAWER_DATA = new InjectionToken<unknown>('DRAWER_DATA');

/** Resolved config, read by the container to render its chrome. */
export const DRAWER_CONFIG = new InjectionToken<ResolvedDrawerConfig>('DRAWER_CONFIG');

/** The content portal the container renders. Set by DrawerService. */
export const DRAWER_CONTENT = new InjectionToken<ComponentPortal<unknown>>('DRAWER_CONTENT');

export const DRAWER_BASE_DEFAULTS: ResolvedDrawerConfig = {
    size: 'md',
    disableClose: false,
    hideHeader: false,
    side: 'end',
    closeOnNavigation: true,
};

/**
 * Optional. Sets app-wide drawer defaults, so a product can standardise its
 * panel size or side once instead of at every call site.
 *
 *   bootstrapApplication(App, {
 *     providers: [provideDrawer({ size: 'xl' })],
 *   });
 */
export function provideDrawer(defaults: Partial<DrawerConfig>): EnvironmentProviders {
    return makeEnvironmentProviders([{ provide: DRAWER_DEFAULTS, useValue: defaults }]);
}
