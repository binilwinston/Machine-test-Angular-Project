import { ComponentFixture, TestBed } from '@angular/core/testing';

import { customerComponent } from './customer.component';

describe('CustomerComponent', () => {
  let component: customerComponent;
  let fixture: ComponentFixture<customerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ customerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(customerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
