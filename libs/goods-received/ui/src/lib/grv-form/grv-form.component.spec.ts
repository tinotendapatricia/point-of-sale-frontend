import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrvFormComponent } from './grv-form.component';

describe('GrvFormComponent', () => {
  let component: GrvFormComponent;
  let fixture: ComponentFixture<GrvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrvFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
