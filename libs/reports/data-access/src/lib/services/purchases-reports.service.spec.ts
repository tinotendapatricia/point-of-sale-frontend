import { TestBed } from '@angular/core/testing';

import { PurchasesReportsService } from './purchases-reports.service';

describe('PurchasesReportsService', () => {
  let service: PurchasesReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasesReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
