import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { VatEntity, VatFacade } from '@pos-frontend/vat/data-access';
import { VatFormComponent } from '../../../../../vat/ui/src/lib/vat-form/vat-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-update-vat',
    templateUrl: './update-vat.component.html',
    styleUrls: ['./update-vat.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [VatFormComponent, AsyncPipe]
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
