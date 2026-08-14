import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesByStationComponent } from './sales-by-station.component';

describe('SalesByStationComponent', () => {
  let component: SalesByStationComponent;
  let fixture: ComponentFixture<SalesByStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesByStationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesByStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
