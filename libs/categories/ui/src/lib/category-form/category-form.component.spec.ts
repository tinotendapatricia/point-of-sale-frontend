import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { CategoryEntity } from '@pos-frontend/categories/data-access';
import { CategoryFormComponent } from './category-form.component';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the edited values on submit', () => {
    const category: CategoryEntity = { id: 1, name: 'Drinks', code: 'DRK', createdAt: '', updatedAt: '' };
    fixture.componentRef.setInput('category', category);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);

    fixture.nativeElement.querySelector('button[type=submit]').click();

    expect(emitted).toHaveBeenCalledWith({ name: 'Drinks', code: 'DRK' });
  });

  it('does not emit while invalid', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);

    fixture.nativeElement.querySelector('button[type=submit]').click();

    expect(emitted).not.toHaveBeenCalled();
  });
});
