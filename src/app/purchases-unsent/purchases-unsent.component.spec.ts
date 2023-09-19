import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesUnsentComponent } from './purchases-unsent.component';

describe('PurchasesUnsentComponent', () => {
  let component: PurchasesUnsentComponent;
  let fixture: ComponentFixture<PurchasesUnsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesUnsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesUnsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
