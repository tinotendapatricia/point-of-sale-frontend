import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CategoriesFacade } from '@pos-frontend/categories/data-access';

import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CategoriesListComponent],
    providers: [
      provideRouter([]),
      provideNoopAnimations(),
      {
        provide: CategoriesFacade,
        useValue: {
          allCategories$: of([]),
          totalCategories$: of(0),
          loading$: of(false),
          getPaginatedCategories: () => undefined,
        },
      },
    ],
})
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
