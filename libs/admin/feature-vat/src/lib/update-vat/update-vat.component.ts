import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VatEntity, VatFacade } from '@pos-frontend/vat/data-access';

@Component({
  selector: 'pos-frontend-update-vat',
  templateUrl: './update-vat.component.html',
  styleUrls: ['./update-vat.component.css'],
})
export class UpdateVatComponent {
  @Input() vat!: VatEntity;
  @Output() closeModal = new EventEmitter();
  constructor(public vatFacade: VatFacade) {}

  ngOnInit(): void {
    // this.vatFacade.getAllVat();
  }

  public createVat(vat: any) {
    this.vatFacade.updateVat(vat);
    this.vatFacade.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(true) : null;
    });
  }
}
