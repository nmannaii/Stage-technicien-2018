import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnimationScComponent } from './add-animation-sc.component';

describe('AddAnimationScComponent', () => {
  let component: AddAnimationScComponent;
  let fixture: ComponentFixture<AddAnimationScComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnimationScComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnimationScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
