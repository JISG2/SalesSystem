import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsShippedComponent } from './details-shipped.component';

describe('DetailsShippedComponent', () => {
  let component: DetailsShippedComponent;
  let fixture: ComponentFixture<DetailsShippedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsShippedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
