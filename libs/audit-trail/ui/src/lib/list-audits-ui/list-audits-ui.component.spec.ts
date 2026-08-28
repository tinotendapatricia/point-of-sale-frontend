import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAuditsUiComponent } from './list-audits-ui.component';

describe('ListAuditsUiComponent', () => {
  let component: ListAuditsUiComponent;
  let fixture: ComponentFixture<ListAuditsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ListAuditsUiComponent],
}).compileComponents();

    fixture = TestBed.createComponent(ListAuditsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
