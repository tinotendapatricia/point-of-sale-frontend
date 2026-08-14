import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewGroupAuthoritiesComponent } from './view-group-authorities.component';

describe('ViewGroupAuthoritiesComponent', () => {
  let component: ViewGroupAuthoritiesComponent;
  let fixture: ComponentFixture<ViewGroupAuthoritiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewGroupAuthoritiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewGroupAuthoritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
