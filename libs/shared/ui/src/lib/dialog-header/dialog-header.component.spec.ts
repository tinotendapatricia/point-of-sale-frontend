import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogHeaderComponent } from './dialog-header.component';

describe('DialogHeaderComponent', () => {
    let fixture: ComponentFixture<DialogHeaderComponent>;
    const el = () => fixture.nativeElement as HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DialogHeaderComponent],
            providers: [{ provide: MatDialogRef, useValue: { close: jest.fn() } }],
        }).compileComponents();

        fixture = TestBed.createComponent(DialogHeaderComponent);
        fixture.componentRef.setInput('title', 'New Currency');
        fixture.detectChanges();
    });

    it('renders the title and a close button', () => {
        expect(el().querySelector('h2')?.textContent).toContain('New Currency');
        expect(el().querySelector('button[aria-label="Close New Currency"]')).not.toBeNull();
    });

    it('renders the subtitle when given', () => {
        fixture.componentRef.setInput('subtitle', 'USD');
        fixture.detectChanges();
        expect(el().querySelector('p')?.textContent).toContain('USD');
    });

    it('hides the close button on request', () => {
        fixture.componentRef.setInput('hideClose', true);
        fixture.detectChanges();
        expect(el().querySelector('button')).toBeNull();
    });
});
