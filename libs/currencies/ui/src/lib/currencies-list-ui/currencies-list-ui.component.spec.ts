import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrenciesListUiComponent } from './currencies-list-ui.component';

describe('CurrenciesListUiComponent', () => {
  let component: CurrenciesListUiComponent;
  let fixture: ComponentFixture<CurrenciesListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrenciesListUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrenciesListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
