import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

/**
 * The drawer's header chrome for MatDialog content: title bar, optional
 * subtitle and close button. Place it first in a dialog component's template.
 * The title carries `mat-dialog-title`, so the dialog is labelled by it.
 */
@Component({
    selector: 'pos-frontend-dialog-header',
    imports: [MatButtonModule, MatDialogModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dialog-header.component.html',
    styleUrl: './dialog-header.component.scss',
})
export class DialogHeaderComponent {
    readonly title = input.required<string>();
    /** Second line under the heading — a record number, a status. */
    readonly subtitle = input<string>();
    /** Hides the close button, e.g. while a request is in flight. */
    readonly hideClose = input(false);
}
