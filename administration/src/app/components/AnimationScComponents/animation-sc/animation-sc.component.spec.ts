import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationScComponent } from './animation-sc.component';

describe('AnimationScComponent', () => {
  let component: AnimationScComponent;
  let fixture: ComponentFixture<AnimationScComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationScComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
