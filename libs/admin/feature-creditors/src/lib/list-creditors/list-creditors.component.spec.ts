import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CreditorsFacade } from '@pos-frontend/creditors/data-access';
import { ListCreditorsComponent } from './list-creditors.component';

describe('ListCreditorsComponent', () => {
  let component: ListCreditorsComponent;
  let fixture: ComponentFixture<ListCreditorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ListCreditorsComponent],
    providers: [
      provideRouter([]),
      provideNoopAnimations(),
      {
        provide: CreditorsFacade,
        useValue: {
          allCreditors$: of([]),
          totalCreditors$: of(0),
          loading$: of(false),
          getPaginatedCreditors: () => undefined,
        },
      },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(ListCreditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
