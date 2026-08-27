import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CreditorsFacade } from '@pos-frontend/creditors/data-access';

@Component({
    selector: 'pos-frontend-update-creditor',
    templateUrl: './update-creditor.component.html',
    styleUrls: ['./update-creditor.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UpdateCreditorComponent {

  @Output() closeModal = new EventEmitter();
  @Input() creditor:any
  constructor(
    public creditorsService: CreditorsFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.creditorsFacade.getAllCreditors();
  }

  public createCreditor(creditor: any) {
    this.creditorsService.updateCreditor(creditor);
    this.creditorsService.loaded$.subscribe((res) => {
      res ? this.closeModal.emit() : null;
    });
  }
}
