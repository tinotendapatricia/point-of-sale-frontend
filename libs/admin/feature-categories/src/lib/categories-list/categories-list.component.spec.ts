import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CategoryStore } from '@pos-frontend/categories/data-access';
import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  const store = {
    paginatedCategories: () => [],
    totalCategories: () => 0,
    getPaginatedLoading: () => false,
    getPaginatedCategories: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesListComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: CategoryStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page', () => {
    expect(store.getPaginatedCategories).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
});
