import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPriceListUiComponent } from './list-price-list-ui.component';

describe('ListPriceListUiComponent', () => {
  let component: ListPriceListUiComponent;
  let fixture: ComponentFixture<ListPriceListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ListPriceListUiComponent],
}).compileComponents();

    fixture = TestBed.createComponent(ListPriceListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
