import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnimationScComponent } from './list-animation-sc.component';

describe('ListAnimationScComponent', () => {
  let component: ListAnimationScComponent;
  let fixture: ComponentFixture<ListAnimationScComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAnimationScComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnimationScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
