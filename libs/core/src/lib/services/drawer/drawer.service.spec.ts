import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { injectDrawerRef } from './drawer-ref';
import { DrawerService } from './drawer.service';

interface Payload {
    readonly label: string;
}

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<button type="button" (click)="ref.close('saved')">{{ ref.data.label }}</button>`,
})
class TestDrawerComponent {
    readonly ref = injectDrawerRef<'saved', Payload>();
}

describe('DrawerService', () => {
    let drawer: DrawerService;
    let container: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [provideNoopAnimations()] });
        drawer = TestBed.inject(DrawerService);
        container = TestBed.inject(OverlayContainer).getContainerElement();
    });

    afterEach(fakeAsync(() => {
        drawer.closeAll();
        flush();
    }));

    it('renders the projected component with its payload and title', fakeAsync(() => {
        drawer.open(TestDrawerComponent, { title: 'Invoice 4471', data: { label: 'Save' } });
        TestBed.tick();
        flush();

        expect(container.textContent).toContain('Invoice 4471');
        expect(container.textContent).toContain('Save');
        expect(container.querySelector('[role="dialog"]')).not.toBeNull();
    }));

    it('emits the result exactly once, whichever path closes it', fakeAsync(() => {
        const ref = drawer.open<TestDrawerComponent, 'saved'>(TestDrawerComponent, {
            title: 'Invoice',
            data: { label: 'Save' },
        });
        const results: Array<'saved' | undefined> = [];
        ref.afterClosed().subscribe((r) => results.push(r));

        ref.close('saved');
        ref.close('saved'); // idempotent — a second call must not re-emit
        flush();

        expect(results).toEqual(['saved']);
        expect(drawer.isOpen()).toBe(false);
        expect(container.querySelector('[role="dialog"]')).toBeNull();
    }));

    it('stacks drawers and closes only the top one', fakeAsync(() => {
        drawer.open(TestDrawerComponent, { title: 'First', data: { label: 'a' } });
        drawer.open(TestDrawerComponent, { title: 'Second', data: { label: 'b' } });
        TestBed.tick();
        flush();
        expect(drawer.openDrawers().length).toBe(2);

        drawer.closeTop();
        flush();

        expect(drawer.openDrawers().length).toBe(1);
        expect(container.textContent).toContain('First');
        expect(container.textContent).not.toContain('Second');
    }));

    it('ignores Escape when disableClose is set', fakeAsync(() => {
        drawer.open(TestDrawerComponent, {
            title: 'Locked',
            data: { label: 'a' },
            disableClose: true,
        });
        TestBed.tick();
        flush();

        container
            .querySelector('[role="dialog"]')
            ?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        flush();

        expect(drawer.isOpen()).toBe(true);
        // ...and offers no close button, so the content owns the exit.
        expect(container.querySelector('button[aria-label^="Close"]')).toBeNull();
    }));
});
