import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListUiComponent } from './category-list-ui.component';

describe('CategoryListUiComponent', () => {
  let component: CategoryListUiComponent;
  let fixture: ComponentFixture<CategoryListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CategoryListUiComponent],
}).compileComponents();

    fixture = TestBed.createComponent(CategoryListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
