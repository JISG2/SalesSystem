import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUnsentComponent } from './details-unsent.component';

describe('DetailsUnsentComponent', () => {
  let component: DetailsUnsentComponent;
  let fixture: ComponentFixture<DetailsUnsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsUnsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUnsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
