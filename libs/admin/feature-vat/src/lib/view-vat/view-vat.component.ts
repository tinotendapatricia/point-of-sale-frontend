import { Component, OnInit } from '@angular/core';
import { VatFacade } from '@pos-frontend/vat/data-access';

@Component({
    selector: 'pos-frontend-view-vat',
    templateUrl: './view-vat.component.html',
    styleUrls: ['./view-vat.component.css'],
    standalone: false
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
