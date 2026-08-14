import { TestBed } from '@angular/core/testing';

import { StockTakeServiceService } from './stock-take.service.service';

describe('StockTakeServiceService', () => {
  let service: StockTakeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTakeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
})