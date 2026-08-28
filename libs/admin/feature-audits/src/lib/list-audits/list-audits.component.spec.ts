import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAuditsComponent } from './list-audits.component';

describe('ListAuditsComponent', () => {
  let component: ListAuditsComponent;
  let fixture: ComponentFixture<ListAuditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ListAuditsComponent],
}).compileComponents();

    fixture = TestBed.createComponent(ListAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
