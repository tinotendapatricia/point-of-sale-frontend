import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCreditorsUiComponent } from './list-creditors-ui.component';

describe('ListCreditorsUiComponent', () => {
  let component: ListCreditorsUiComponent;
  let fixture: ComponentFixture<ListCreditorsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCreditorsUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCreditorsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
