import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { ListDebtorsComponent } from './list-debtors.component';

describe('ListDebtorsComponent', () => {
  let component: ListDebtorsComponent;
  let fixture: ComponentFixture<ListDebtorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ListDebtorsComponent],
    providers: [
      provideRouter([]),
      provideNoopAnimations(),
      {
        provide: DebtorsFacade,
        useValue: {
          allDebtors$: of([]),
          totalDebtors$: of(0),
          loading$: of(false),
          getPaginatedDebtors: () => undefined,
        },
      },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(ListDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
