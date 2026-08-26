import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { DebtorsEntity } from '@pos-frontend/debtors/data-access';
import { ProductsEntity } from '@pos-frontend/products/data-access';

@Component({
    selector: 'pos-frontend-reports-form',
    templateUrl: './reports-form.component.html',
    styleUrls: ['./reports-form.component.scss'],
    standalone: false
})
export class ReportsFormComponent implements OnInit {
  //@Input() report!: ReportsEntity;
  @Input() btnState = ClrLoadingState.DEFAULT;
  @Input() title = '';
  @Output() getPdf = new EventEmitter();
  @Output() getExcel = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() btnTitle!: string;
  @Input() isDate = false;
  @Input() debtors: DebtorsEntity[] | undefined;
  @Input() products: ProductsEntity[] | undefined;
  @Input() isDebtor = false;
  @Input() isProduct = false;
  @Input() isOrderNumber = false;
  @Input() isGrvNumber = false;
  @Input() isExcel = false;
  @Input() isBatch = false;
  @Input() isAdjustmentNumber = false;
  

  public reportForm!: UntypedFormGroup;
  public opened = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.reportForm = this.formBuilder.group({
      fromDate: '',
      toDate: '',
      debtor: '',
      product:'',
      currency: '',
      orderNumber:'',
      grvNumber:'',
      batchNumber: '',
      adjustmentNumber:'',
      id: '',
    });
  }
}
