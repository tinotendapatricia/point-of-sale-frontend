import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { type ReportFormValue, ReportsFormComponent } from './reports-form.component';

describe('ReportsFormComponent', () => {
  let component: ReportsFormComponent;
  let fixture: ComponentFixture<ReportsFormComponent>;

  const empty: ReportFormValue = {
    fromDate: '',
    toDate: '',
    debtor: null,
    product: null,
    orderNumber: null,
    grvNumber: null,
    batchNumber: null,
    adjustmentNumber: null,
    download: false,
  };
  const button = (label: string): HTMLButtonElement =>
    [...fixture.nativeElement.querySelectorAll('button')].find((b: HTMLButtonElement) =>
      b.textContent?.includes(label)
    );

  const setInput = (id: string, value: string): void => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector(`#${id}`);
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('views the PDF with no fields shown', () => {
    const emitted = jest.fn();
    component.pdfRequested.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).toHaveBeenCalledWith(empty);
  });

  it('downloads the PDF from the PDF button', () => {
    const emitted = jest.fn();
    component.pdfRequested.subscribe(emitted);
    button('PDF').click();
    expect(emitted).toHaveBeenCalledWith({ ...empty, download: true });
  });

  it('requires the dates when isDate is set', () => {
    fixture.componentRef.setInput('isDate', true);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.pdfRequested.subscribe(emitted);

    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).not.toHaveBeenCalled();

    setInput('report-from-date', '2024-01-01');
    setInput('report-to-date', '2024-01-31');
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).toHaveBeenCalledWith({
      ...empty,
      fromDate: '2024-01-01',
      toDate: '2024-01-31',
    });
  });

  it('shows the excel button only when isExcel is set', () => {
    expect(button('Excel')).toBeUndefined();
    fixture.componentRef.setInput('isExcel', true);
    fixture.detectChanges();

    const emitted = jest.fn();
    component.excelRequested.subscribe(emitted);
    button('Excel').click();
    expect(emitted).toHaveBeenCalledWith({ ...empty, download: true });
  });
});
