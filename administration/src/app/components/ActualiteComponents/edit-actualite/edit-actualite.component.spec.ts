import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActualiteComponent } from './edit-actualite.component';

describe('EditActualiteComponent', () => {
  let component: EditActualiteComponent;
  let fixture: ComponentFixture<EditActualiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActualiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
