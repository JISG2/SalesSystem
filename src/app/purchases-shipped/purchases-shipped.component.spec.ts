import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesShippedComponent } from './purchases-shipped.component';

describe('PurchasesShippedComponent', () => {
  let component: PurchasesShippedComponent;
  let fixture: ComponentFixture<PurchasesShippedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesShippedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
