import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { CategoryStore } from '@pos-frontend/categories/data-access';
import { UpdateCategoryComponent } from './update-category.component';

describe('UpdateCategoryComponent', () => {
  let component: UpdateCategoryComponent;
  let fixture: ComponentFixture<UpdateCategoryComponent>;
  const store = {
    category: () => undefined,
    getOneLoading: () => false,
    updateLoading: () => false,
    getCategory: jest.fn(),
    updateCategory: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCategoryComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: CategoryStore, useValue: store },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ categoryId: '42' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the category from the route id', () => {
    expect(store.getCategory).toHaveBeenCalledWith({ id: '42' });
  });
});
