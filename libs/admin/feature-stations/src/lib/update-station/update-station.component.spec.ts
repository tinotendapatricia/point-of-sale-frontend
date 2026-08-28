import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateStationComponent } from './update-station.component';

describe('UpdateStationComponent', () => {
  let component: UpdateStationComponent;
  let fixture: ComponentFixture<UpdateStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateStationComponent],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
