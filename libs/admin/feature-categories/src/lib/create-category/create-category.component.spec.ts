import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CategoryStore } from '@pos-frontend/categories/data-access';
import { CreateCategoryComponent } from './create-category.component';

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  const store = { createLoading: () => false, createCategory: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoryComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: CategoryStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creates the category from the form value', () => {
    const el: HTMLElement = fixture.nativeElement;
    const name = el.querySelector<HTMLInputElement>('#category-name')!;
    const code = el.querySelector<HTMLInputElement>('#category-code')!;
    name.value = 'Drinks';
    name.dispatchEvent(new Event('input'));
    code.value = 'DRK';
    code.dispatchEvent(new Event('input'));

    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(store.createCategory).toHaveBeenCalledWith({
      data: { name: 'Drinks', code: 'DRK' },
      callback: expect.any(Function),
    });
  });
});
