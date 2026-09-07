import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { VatFacade } from '@pos-frontend/vat/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { VatDetailsComponent } from '@pos-frontend/vat/ui';
import { UpdateVatComponent } from '../update-vat/update-vat.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-view-vat',
    templateUrl: './view-vat.component.html',
    styleUrls: ['./view-vat.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, MatIconModule, VatDetailsComponent, AsyncPipe]
})
export class ViewVatComponent implements OnInit {
  private readonly dialog = inject(MatDialog);

  constructor(public vatFacade: VatFacade) {}

  ngOnInit(): void {
    this.getVat();
  }

  getVat() {
    this.vatFacade.getVat();
  }

  update() {
    this.dialog
      .open(UpdateVatComponent, { width: '420px' })
      .afterClosed()
      .subscribe((updated) => updated && this.getVat());
  }
}
