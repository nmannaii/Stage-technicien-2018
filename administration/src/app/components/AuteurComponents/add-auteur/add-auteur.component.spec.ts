import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuteurComponent } from './add-auteur.component';

describe('AddAuteurComponent', () => {
  let component: AddAuteurComponent;
  let fixture: ComponentFixture<AddAuteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAuteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
