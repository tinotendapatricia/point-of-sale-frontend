import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVatComponent } from './update-vat.component';

describe('UpdateVatComponent', () => {
  let component: UpdateVatComponent;
  let fixture: ComponentFixture<UpdateVatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateVatComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
