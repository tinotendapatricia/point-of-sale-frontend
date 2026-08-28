import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { VatFacade } from '@pos-frontend/vat/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { VatDetailsComponent } from '@pos-frontend/vat/ui';
import { UpdateVatComponent } from '../update-vat/update-vat.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-view-vat',
    templateUrl: './view-vat.component.html',
    styleUrls: ['./view-vat.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, ClrIcon, ClrIconModule, VatDetailsComponent, UpdateVatComponent, AsyncPipe]
})
export class ViewVatComponent implements OnInit {
  isUpdate = false;

  constructor(public vatFacade: VatFacade) {}

  ngOnInit(): void {
    this.getVat();
  }

  getVat() {
    this.isUpdate = false;
    this.vatFacade.getVat();
  }
}
