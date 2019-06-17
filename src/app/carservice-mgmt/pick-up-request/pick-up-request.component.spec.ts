import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUpRequestComponent } from './pick-up-request.component';

describe('PickUpRequestComponent', () => {
  let component: PickUpRequestComponent;
  let fixture: ComponentFixture<PickUpRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickUpRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUpRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
