import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGpeDeRechercheComponent } from './add-gpe-de-recherche.component';

describe('AddGpeDeRechercheComponent', () => {
  let component: AddGpeDeRechercheComponent;
  let fixture: ComponentFixture<AddGpeDeRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGpeDeRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGpeDeRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
