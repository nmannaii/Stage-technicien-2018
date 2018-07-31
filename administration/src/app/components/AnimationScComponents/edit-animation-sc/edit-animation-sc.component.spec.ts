import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnimationScComponent } from './edit-animation-sc.component';

describe('EditAnimationScComponent', () => {
  let component: EditAnimationScComponent;
  let fixture: ComponentFixture<EditAnimationScComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnimationScComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnimationScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
