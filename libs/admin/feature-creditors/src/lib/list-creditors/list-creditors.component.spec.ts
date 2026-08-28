import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCreditorsComponent } from './list-creditors.component';

describe('ListCreditorsComponent', () => {
  let component: ListCreditorsComponent;
  let fixture: ComponentFixture<ListCreditorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ListCreditorsComponent],
}).compileComponents();

    fixture = TestBed.createComponent(ListCreditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
