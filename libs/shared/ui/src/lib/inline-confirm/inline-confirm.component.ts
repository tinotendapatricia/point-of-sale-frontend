import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * In-page confirmation panel, for flows that should not open a modal: shows a
 * message with Cancel and a confirm button. The parent decides when to show it.
 */
@Component({
  selector: 'pos-frontend-inline-confirm',
  templateUrl: './inline-confirm.component.html',
  styleUrl: './inline-confirm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class InlineConfirmComponent {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly confirmLabel = input('Confirm');
  readonly loading = input(false);

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
}
