import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pos-frontend-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrl: './print-receipt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintReceiptComponent {}
